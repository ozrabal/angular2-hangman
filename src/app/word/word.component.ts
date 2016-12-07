import { Component, OnInit, Output } from '@angular/core';
import {WordnikApiService} from "../wordnik-api.service";
import {MissedLettersComponent} from '../missed-letters/missed-letters.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  entryComponents: [MissedLettersComponent],
  host: { '(window:keydown)': 'onKey($event.keyCode)' }
})

export class WordComponent implements OnInit {
    key: string;
    word: string[];
    playing: boolean = false;
    correctLetters: string[];
    @Output() message: string;
    @Output() searchword: string;
    @Output() wrongLetters: string[];

    /**
     * constructor
     * @param {WordnikApiService} _wordnikApiService
     */
    constructor(private _wordnikApiService: WordnikApiService) { }

    /**
     * initialize on start
     */
    ngOnInit() {
        this.initGame();
    }

    /**
     * Initialize on click "new game"
     * @param {boolean} start
     */
    onClickNew(start: boolean){
        if(start){
            this.initGame();
        }
    }

    /**
     * reset params, call API & initialize game
     */
    initGame(){
        this.word = [];
        this.message = '';
        this.searchword = '';
        this.wrongLetters = [];
        this.correctLetters = [];
        this.playing = true;
        this._wordnikApiService.fetchWord().subscribe(
            data => { this.word = data.word.toLowerCase().split(''); },
            error => console.log('Error fetching word')
        );
    }

    /**
     *
     * @param {number} code
     * @returns {boolean}
     */
    static validKey(code: number){
        if((code > 64 && code < 91)){
            return true;
        }
    }

    /**
     * on letter key pressed
     * @param {number} keycode
     */
    onKey(keycode: number){
        if(WordComponent.validKey(keycode) && this.playing) {
            this.key = String.fromCharCode(keycode).toLowerCase();
            this.checkLetter();
            this.updateGameState();
        }
    }

    /**
     * checks if key exists in the array
     * @param {string} key
     * @param {array} checkArray
     * @returns {boolean}
     */
    private static inArray(key: string, checkArray: string[]){
        return checkArray.indexOf(key) > -1;
    }

    /**
     * checks if letter exists in searched word
     * @param {string} letter
     * @returns {boolean}
     */
    letterCorrect(letter: string){
        return this.word.indexOf(letter) > -1;
    }

    /**
     * assign checked letter to correct or wrong arrays
     */
    checkLetter(){
        if(this.letterCorrect(this.key)){
            if(!WordComponent.inArray(this.key, this.correctLetters)){
                this.pushCorrectLetter(this.key);
            }
        }else{
            if(!WordComponent.inArray(this.key, this.wrongLetters)){
                this.wrongLetters.push(this.key);
            }
        }
    }

    /**
     * checks & update state of the game
     */
    updateGameState(){
        if(this.correctLetters.length == this.word.length){
            this.win();
            this.playing = false;
        }
        if (this.wrongLetters.length > 11) {
            this.lose();
            this.playing = false;
            this.searchword = this.word.join('');
        }
    }

    /**
     * pust correct letter to correct letters array
     * @param {string} letter
     */
    pushCorrectLetter(letter:string){
        var count = 0;
        for(var i = 0; i < this.word.length; ++i){
            if(this.word[i] == letter) {
                this.correctLetters.push(letter);
                count++;
            }
        }
    }

    /**
     * game over
     */
    lose(){
        console.log('lost');
        this.message= 'You lose';
    }

    /**
     * you win
     */
    win(){
        console.log('win');
        this.message = 'You win';
    }

    /**
     * checks if letter is correct
     * @param {string} letter
     * @returns {boolean}
     */
    isCorrect(letter: string){
        return this.correctLetters.indexOf(letter) > -1;
    }
}

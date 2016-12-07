import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  inputs: ['wrongLetters']
})
export class ManComponent {

  wrongLetters: string[];
  manClass: string;
  constructor() { }

  ngDoCheck() {
    this.manClass = 'state-' + this.wrongLetters.length;
  }
}
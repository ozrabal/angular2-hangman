import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  inputs: ['message', 'word'],
})
export class ModalComponent {
    @Output() onClickNew = new EventEmitter<boolean>();

    constructor() { }
    public newGame(start: boolean){
        this.onClickNew.emit(start);
    }
}
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-missed-letters',
  templateUrl: './missed-letters.component.html',
  inputs: ['wrongLetters']

})
export class MissedLettersComponent {
  constructor() { }
}

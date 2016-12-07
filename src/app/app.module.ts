import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { WordnikApiService } from "./wordnik-api.service";
import { MissedLettersComponent } from './missed-letters/missed-letters.component';
import { ManComponent } from './man/man.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    MissedLettersComponent,
    ManComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WordnikApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

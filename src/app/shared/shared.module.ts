import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToSpacePipe } from './convert-to-space.pipe';
import { HighlightDirective } from './highlight.directive';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConvertToSpacePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    ConvertToSpacePipe,
    HighlightDirective,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, HttpClientModule],
  exports: [CommonModule, BrowserAnimationsModule, HttpClientModule],
})
export class CoreModule {}

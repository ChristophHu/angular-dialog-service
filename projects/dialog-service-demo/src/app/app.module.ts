import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DialogServiceModule } from 'projects/dialog-service/src/public-api';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    DialogServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

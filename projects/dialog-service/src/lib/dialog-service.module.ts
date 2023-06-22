import { NgModule } from '@angular/core';
import { DialogServiceComponent } from './components/dialog-service.component';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    DialogServiceComponent
  ],
  imports: [
  ],
  exports: [
    DialogServiceComponent
  ],
  providers: [
    DialogService
  ]
})
export class DialogServiceModule { }

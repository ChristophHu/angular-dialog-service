import { Component } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { DialogComponent } from './dialog/dialog.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private dialogService: DialogService) {}

  openDialog(): void {
    // open a dialog by component
    const contentRef = this.dialogService.open(ContentComponent, {
      title: 'Peach is here by Dialog',
      data: { id: '123'},
      onClose: (data: any) => {
        console.log('closed with data')
        console.log(data);
      },
      // pass all your custom events
      // onPeach: (data) => {
      //   console.log('do something with', data);
      // },
    });

    // its easier to deal with Peach directly:
    contentRef.onPeach.subscribe((data: any) => {
      console.log('do something with', data);
    });
  }
}

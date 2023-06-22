import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { DialogService } from 'projects/dialog-service/src/public-api';

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
      css: 'bg-red-300',
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

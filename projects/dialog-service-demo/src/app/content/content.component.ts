import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogServiceComponent } from 'projects/dialog-service/src/public-api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @Input() peachSomething: string = 'Die aktuelle Streife ist beendet.';
  @Output() onPeach: EventEmitter<string> = new EventEmitter<string>();

  // we can use another method
  @Output() onChildClose: EventEmitter<void> = new EventEmitter<void>();

  // optionally define data
  data: any;

  // optionally find Rose
  dialog!: DialogServiceComponent;

  constructor() {
    console.log('created');
  }

  ok(): void {
    console.log('peach ok');
  }

  click(): void {
    this.onPeach.emit('peach clicked');
  }

  close(): void {
    // call rose
    this.dialog.close('123');

    // or this for closing without emitting
    // this.onChildClose.emit();
  }
}

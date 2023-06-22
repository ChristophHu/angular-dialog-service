import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogServiceComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  title: string = '';

  close(data?: any): void {
    this.onClose.emit(data);
  }

  // close on overlay click
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement): void {
    if (target.matches('.d-overlay')) {
      this.close(null);
    }
  }

  // close on escape as well
  @HostListener('window:keydown', ['$event'])
  onEscape(event: KeyboardEvent): void {
    // hide on escape
    if (event.code === 'Escape') {
      this.close(null);
    }
  }
}

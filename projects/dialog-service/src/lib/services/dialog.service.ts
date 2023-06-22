import {
  ApplicationRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  StaticProvider,
  Type,
  createComponent,
} from '@angular/core'

import { DOCUMENT } from '@angular/common';
import { DialogServiceComponent } from '../components/dialog-service.component';

export interface IDialogOptions {
  title?: string;
  data?: any;
  css?: string;
  id?: string;
  onClose?: (res: any) => void;
  onPeach?: (res: any) => void;
  providers?: StaticProvider[];
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // keep references of known ids
  dialogs: { [key: string]: DialogServiceComponent | null } = {};

  constructor(
    // bring in the application ref
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  // open method
  public open(c: Type<any>, options?: IDialogOptions) {
    // create injector of providers

    const _injector = options?.providers?.length
      ? Injector.create({ providers: options.providers })
      : undefined;

    // first, create the child
    const childRef = createComponent(c, {
      environmentInjector: this.appRef.injector,
      elementInjector: _injector,
    });

    // attach
    this.appRef.attachView(childRef.hostView);

    // get root nodes
    const rootNode = (<EmbeddedViewRef<any>>childRef.hostView).rootNodes;

    // then create the dialog that will host it
    const componentRef = createComponent(DialogServiceComponent, {
      environmentInjector: this.appRef.injector,
      // pass the child here
      projectableNodes: [rootNode],
    });

    // append to body, we will use platform document for this
    const dialogElement = (<EmbeddedViewRef<any>>componentRef.hostView)
      .rootNodes[0];

    if (options?.css) {
      dialogElement.classList.add(...options.css.split(' '));
    }
    if (options?.id) {
      dialogElement.id = options.id;
      // add to collection
      this.dialogs[options.id] = componentRef.instance;
    }
    this.doc.body.append(dialogElement);

    // attach view
    this.appRef.attachView(componentRef.hostView);

    // pass properties to parent
    componentRef.instance.title = options?.title || '';

    // pass properties to child
    childRef.instance.data = options?.data;
    childRef.instance.dialog = componentRef.instance;

    // when closed destroy
    const s = componentRef.instance.onClose.subscribe((res) => {
      // call onclose if exists
      if (options?.onClose) {
        options.onClose(res);
      }
      // destroy parent and child
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();

      this.appRef.detachView(childRef.hostView);
      childRef.destroy();

      // get rid of reference
      if (options?.id) {
        delete this.dialogs[options.id];
      }

      s.unsubscribe();
    });
    return childRef.instance;
  }

  public get(id: string) {
    // find the dialog ref component in collection
    return this.dialogs[id] || null;
  }
}

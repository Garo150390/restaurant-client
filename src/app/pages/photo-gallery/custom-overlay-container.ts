import {OverlayContainer} from '@angular/cdk/overlay';

export class AppOverlayContainer extends OverlayContainer {

  _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('app-overlay-container');

    document.querySelector('#content-container').appendChild(container);
    this._containerElement = container;
  }
}

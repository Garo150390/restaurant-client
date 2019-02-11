import { OverlayContainer } from '@angular/cdk/overlay';

export class CdkOverlayContainer extends OverlayContainer {
  /**
   * Set the container element from the outside, e.g. from the corresponding directive
   */
  public setContainerElement(element: HTMLElement): void {
    this._containerElement = element;
  }
  /**
   * Prevent creation of the HTML element
   */
  protected _createContainer(): void {
    return;
  }
}

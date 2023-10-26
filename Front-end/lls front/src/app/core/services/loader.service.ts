import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private renderer: Renderer2;
  private requestsNumber = 0;
  private spinnerNumber = 0;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  startLoader(): void {
    this.requestsNumber++;
    this.renderer.addClass(document.querySelector('.loader-wrapper'), 'show');
  }
  stopLoader(): void {
    this.requestsNumber--;
    if (this.requestsNumber <= 0) {
      this.requestsNumber = 0;
      this.renderer.removeClass(
        document.querySelector('.loader-wrapper'),
        'show'
      );
    }
  }
  startSprinner(): void {
    this.spinnerNumber++;
    this.renderer.addClass(document.querySelector('.lds-ring'), 'show');
  }
  stopSprinner(): void {
    this.spinnerNumber--;
    if (this.spinnerNumber <= 0) {
      this.spinnerNumber = 0;
      this.renderer.removeClass(document.querySelector('.lds-ring'), 'show');
    }
  }
}

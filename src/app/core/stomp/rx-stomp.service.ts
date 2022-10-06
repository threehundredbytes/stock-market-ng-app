import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { rxStompConfig } from './rx-stomp.config';

@Injectable({
  providedIn: 'root'
})
export class RxStompService extends RxStomp {

  public activateWithHeaders(headers: {}) {
    if (!this.active) {
      rxStompConfig.connectHeaders = headers;

      this.configure(rxStompConfig);
      this.activate();
    }
  }

  public configureAndActivate() {
    if (!this.active) {
      this.configure(rxStompConfig);
      this.activate();
    }
  }

}

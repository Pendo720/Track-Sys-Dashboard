import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WSMessageServiceService {

  stompClient: any;
  public msgs = [];
  holder: any;
  constructor() {
    this.initWsConnection();
  }

  initWsConnection() {
    const ws = new SockJS(environment.wsendpoint);
    this.stompClient = Stomp.over(ws);
    this.holder = this;
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  sendMessage(message){
    this.stompClient.send(environment.wsendpoint + '/app/message', {} , message );
  }
}

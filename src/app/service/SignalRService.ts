import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;

  public startConnection = (token:string) => {
    /* console.log(token);
     debugger;*/
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5093/chat',
          {accessTokenFactory: () => token
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection Started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public sendMessage = (user: string, message: string) => {
    // @ts-ignore
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err.message));
  }

  public addReceiveMessageListener = (callback: (user: string, message: string) => void) => {
    // @ts-ignore
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      callback(user, message);
    });
  }
}

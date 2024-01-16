import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SignalRService} from "./service/SignalRService";
import {FormsModule} from "@angular/forms";
import {Authentication} from "./service/authentication";
import {HttpClientModule} from "@angular/common/http";
import {UserModel} from "./model/UserModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    HttpClientModule
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  messages: { sender: string; text: string; }[] = [];
  newMessage = '';
  token:string="";
  user: UserModel = {
    Username: 'kullaniciadi',
    Password: 'kullaniciadi'
  };
  constructor(private signalRService: SignalRService,private authService:Authentication) {
    // @ts-ignore

   // const credentials = { username: 'user', password: 'pass' };

  }

  ngOnInit() {
    this.authService.login(this.user).subscribe(
      data => {
       /* console.log(data);
        debugger;*/
        //this.token=data.token;
        this.signalRService.startConnection(data.token);
      },
      error => {
        console.error('Login failed', error);
      }
    );
    /*console.log(this.token);
    debugger;*/

    this.signalRService.addReceiveMessageListener((user, message) => {
      this.messages.push({ sender: user, text: message });
    });

  }

  sendMessage() {
    this.signalRService.sendMessage('KullanıcıAdı', this.newMessage);
    this.newMessage = ''; // Metin kutusunu temizle
  }
}

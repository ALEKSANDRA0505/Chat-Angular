import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent, UserLoginComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private chatService: ChatService) {}

  /**
   * Проверяет, вошел ли пользователь ранее (по наличию сохраненного имени)
   */
  ngOnInit(): void {
    this.isLoggedIn = this.chatService.hasUsername();
  }

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }
}

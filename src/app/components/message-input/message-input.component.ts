import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {

  messageText: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = ''; 
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      this.sendMessage();
    }
  }
}

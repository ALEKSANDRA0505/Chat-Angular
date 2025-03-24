import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  username: string = '';

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private chatService: ChatService) {}

  onSubmit(): void {
    if (this.username.trim()) {
      this.chatService.setUsername(this.username);
      this.loginSuccess.emit();
    }
  }
}

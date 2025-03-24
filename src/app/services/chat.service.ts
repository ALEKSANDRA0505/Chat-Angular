import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { StorageService } from './storage.service';

/**
 * Основной сервис чата
 * Управляет сообщениями, обеспечивает синхронизацию между вкладками,
 * и обрабатывает операции с пользовательскими данными
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  private username: string | null = null;

  private broadcastChannel: BroadcastChannel;

  private readonly EVENT_TYPES = {
    NEW_MESSAGE: 'new_message'
  };

  constructor(private storageService: StorageService) {
    const savedMessages = this.storageService.getMessages();
    this.messagesSubject.next(savedMessages);

    this.username = this.storageService.getUsername();

    this.broadcastChannel = new BroadcastChannel('chat_channel');
    this.broadcastChannel.onmessage = (event) => {
      if (event.data.type === this.EVENT_TYPES.NEW_MESSAGE) {
        this.addMessageFromBroadcast(event.data.message);
      }
    };
  }

  ngOnDestroy(): void {
    this.broadcastChannel.close();
  }

  getMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(text: string): void {
    if (!text.trim() || !this.username) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      author: this.username,
      timestamp: Date.now()
    };

    const currentMessages = this.messagesSubject.getValue();
    const updatedMessages = [...currentMessages, newMessage];
    this.messagesSubject.next(updatedMessages);

    this.storageService.saveMessages(updatedMessages);

    this.broadcastChannel.postMessage({
      type: this.EVENT_TYPES.NEW_MESSAGE,
      message: newMessage
    });
  }

  private addMessageFromBroadcast(message: Message): void {
    const currentMessages = this.messagesSubject.getValue();
    
    if (!currentMessages.some(m => m.id === message.id)) {
      const updatedMessages = [...currentMessages, message];
      this.messagesSubject.next(updatedMessages);
      this.storageService.saveMessages(updatedMessages);
    }
  }

  setUsername(username: string): void {
    if (username.trim()) {
      this.username = username.trim();
      this.storageService.saveUsername(this.username);
    }
  }

  hasUsername(): boolean {
    return !!this.username;
  }

  getUsername(): string | null {
    return this.username;
  }
}

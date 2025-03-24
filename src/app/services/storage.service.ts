import { Injectable } from '@angular/core';
import { Message } from '../models/message';

/**
 * Сервис для работы с локальным хранилищем (localStorage)
 * Отвечает за сохранение и получение сообщений и имени пользователя
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly MESSAGES_KEY = 'chat_messages';

  private readonly USERNAME_KEY = 'chat_username';

  constructor() { }

  saveMessages(messages: Message[]): void {
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
  }

  getMessages(): Message[] {
    const messages = localStorage.getItem(this.MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  }

  saveUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}

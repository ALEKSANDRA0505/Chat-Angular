/**
 * Интерфейс для сообщений чата
 * Определяет структуру данных каждого сообщения
 */
export interface Message {
  id: string;

  text: string;

  author: string;

  timestamp: number;
}

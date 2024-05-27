export interface NotificationService {
  authenticate(): Promise<void>;
  schedulePost(postContent: string, scheduleDate: any): Promise<void>; // <- Actualizado aquí
}
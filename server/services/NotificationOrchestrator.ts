import { NotificationService } from '../interfaces/NotificationService';
import { LinkedInService } from './LinkedInService';
import { FacebookService } from './FacebookService';
import servicesConfig from '../config/services.json';

export class NotificationOrchestrator {
  private services: NotificationService[] = [];

  constructor() {
    if (servicesConfig.services.linkedin) {
      this.services.push(new LinkedInService());
    }
    if (servicesConfig.services.facebook) {
      this.services.push(new FacebookService());
    }
    // Agrega más servicios según la configuración
  }

  async authenticateAll(): Promise<void> {
    for (const service of this.services) {
      await service.authenticate();
    }
  }

  async schedulePost(postContent: string, scheduleDate: any): Promise<void> {
    for (const service of this.services) {
      await service.schedulePost(postContent, scheduleDate);
    }
  }
}
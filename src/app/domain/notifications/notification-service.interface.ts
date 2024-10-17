// notification-service.ts
export abstract class NotificationService {
  abstract sendPushNotification(
    message: string,
    targetArn: string,
  ): Promise<void>;
}

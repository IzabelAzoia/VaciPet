import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: 'sua-regiao' });

export async function sendPushNotification(
  message: string,
  targetArn: string,
): Promise<void> {
  const command = new PublishCommand({
    Message: message,
    TargetArn: targetArn,
  });

  try {
    const result = await snsClient.send(command);
    console.log('Notificação enviada com sucesso:', result);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

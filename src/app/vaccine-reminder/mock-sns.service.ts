// Corrigindo a exportação da classe e o caminho da importação
import { Injectable } from '@nestjs/common';
import { VaccineReminderEntity } from '../domain/vaccine-reminder/vaccine-reminder.entity';

@Injectable()
export class MockSnsService {
  async publish(message: string, targetArn: string): Promise<void> {
    console.log(`Mock SNS: Mensagem enviada para ${targetArn}: ${message}`);
  }

  async sendReminder(vaccine: VaccineReminderEntity) {
    const message = `Atenção! A vacina ${vaccine.name} está agendada para hoje.`;
    const targetArn = 'ARN_DO_DISPOSITIVO';

    try {
      await this.publish(message, targetArn); // Chama o método publish diretamente
      console.log(`Notificação enviada para a vacina: ${vaccine.name}`);
    } catch (error) {
      console.error(
        `Erro ao enviar notificação para a vacina ${vaccine.name}:`,
        error,
      );
    }
  }
}

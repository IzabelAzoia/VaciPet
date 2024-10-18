import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { VaccineReminderFactory } from '../domain/vaccine-reminder/vaccine-reminder.factory';
import { calculateNextDoseDates } from '../domain/vaccine-reminder/vaccine-reminder.utils';
import { VaccineReminderEntity } from '../domain/vaccine-reminder/vaccine-reminder.entity';
import { PetEntity } from '../domain/pet/pet.entity';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { MockSnsService } from './mock-sns.service';
@Injectable()
export class VaccineReminderService {
  private vaccineRepository: any; // Substitua por um repositório adequado
  private snsService = new MockSnsService();

  @Cron('0 0 * * *') // Executa diariamente à meia-noite
  async handleReminders() {
    const today = new Date().toISOString().slice(0, 10); // Formata para YYYY-MM-DD
    const vaccinesDueToday = await this.vaccineRepository.find({
      where: { nextDoseDate: today },
    });

    vaccinesDueToday.forEach((vaccine: VaccineReminderEntity) => {
      this.sendReminder(vaccine);
    });
  }

  private async sendReminder(vaccine: VaccineReminderEntity) {
    const message = `Atenção! A vacina ${vaccine.name} está agendada para hoje.`;
    const targetArn = 'ARN_DO_DISPOSITIVO';

    try {
      await this.snsService.publish(message, targetArn);
      console.log(`Notificação enviada para a vacina: ${vaccine.name}`);
    } catch (error) {
      console.error(
        `Erro ao enviar notificação para a vacina ${vaccine.name}:`,
        error,
      );
    }
  }

  createReminder(
    name: string,
    doses: number,
    firstDoseDate: Date,
    reminderDate: Date,
    tutor: TutorEntity,
    status: string = 'pending',
    vaccine: VaccineEntity,
    pet: PetEntity,
    intervalBetweenDoses?: number,
  ) {
    const vaccineReminder = VaccineReminderFactory.create(
      reminderDate,
      status,
      name,
      doses,
      firstDoseDate,
      tutor,
      vaccine,
      pet,
      intervalBetweenDoses,
    );

    const nextDoseDates = calculateNextDoseDates(vaccineReminder);

    return { vaccineReminder, nextDoseDates };
  }
}

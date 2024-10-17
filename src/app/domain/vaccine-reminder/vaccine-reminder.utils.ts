import { VaccineReminderEntity } from './vaccine-reminder.entity';

export function calculateNextDoseDates(vaccine: VaccineReminderEntity): Date[] {
  const dates: Date[] = [];
  const currentDoseDate = new Date(vaccine.firstDoseDate);

  for (let i = 1; i < vaccine.doses; i++) {
    if (vaccine.intervalBetweenDoses) {
      currentDoseDate.setDate(
        currentDoseDate.getDate() + vaccine.intervalBetweenDoses,
      );
      dates.push(new Date(currentDoseDate));
    }
  }

  return dates;
}

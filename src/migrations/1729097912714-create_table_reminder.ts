import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableReminder1729097912714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reminders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'reminderDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'pending'",
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'vaccineName',
            type: 'varchar',
          },
          {
            name: 'vaccineDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'applicationStatus',
            type: 'varchar',
          },
          {
            name: 'tutorId',
            type: 'uuid',
          },
          {
            name: 'vaccineId',
            type: 'uuid',
          },
          {
            name: 'petId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_Tutor',
            columnNames: ['tutorId'],
            referencedTableName: 'tutors',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_Vaccine',
            columnNames: ['vaccineId'],
            referencedTableName: 'vaccines',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_Pet',
            columnNames: ['petId'],
            referencedTableName: 'pets',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reminders');
  }
}

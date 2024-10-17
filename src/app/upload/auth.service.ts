import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TutorService } from '../tutor/tutor.service';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { CreateTutorDto } from '../domain/tutor/create-tutor.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tutorService: TutorService,
    private readonly jwtService: JwtService,
  ) {}

  async validateTutor(
    email: string,
    password: string,
  ): Promise<Omit<TutorEntity, 'password'> | null> {
    const tutor = await this.tutorService.findByEmail(email);
    if (tutor && (await bcrypt.compare(password, tutor.password))) {
      const tutorWithoutPassword = { ...tutor } as Omit<
        TutorEntity,
        'password'
      >;
      delete (tutorWithoutPassword as Partial<TutorEntity>).password;
      return tutorWithoutPassword;
    }
    return null;
  }

  async login(tutor: Omit<TutorEntity, 'password'>) {
    const payload = { email: tutor.email, sub: tutor.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerTutor(createTutorDto: CreateTutorDto): Promise<TutorEntity> {
    const { email, password: rawPassword, name, phone } = createTutorDto;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newTutor = await this.tutorService.create({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    return { ...newTutor, password: hashedPassword };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../app/upload/auth.service';
import { CreateTutorDto } from '../../app/domain/tutor/create-tutor.dto';
import { TutorEntity } from '../../app/domain/tutor/tutor.entity';
import { TutorService } from '../../app/tutor/tutor.service';

describe('AuthService', () => {
  let authService: AuthService;
  let tutorService: TutorService;
  let jwtService: JwtService;

  const mockTutorService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: TutorService, useValue: mockTutorService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    tutorService = module.get<TutorService>(TutorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateTutor', () => {
    it('should return a tutor without password if valid', async () => {
      const tutor: TutorEntity = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test Tutor',
        phone: '1234567890',
        reminders: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(tutorService, 'findByEmail').mockResolvedValue(tutor);
      const result = await authService.validateTutor(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual({ ...tutor, password: undefined });
    });

    it('should return null if the password is invalid', async () => {
      const tutor: TutorEntity = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test Tutor',
        phone: '1234567890',
        reminders: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(tutorService, 'findByEmail').mockResolvedValue(tutor);
      const result = await authService.validateTutor(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });

    it('should return null if tutor does not exist', async () => {
      jest.spyOn(tutorService, 'findByEmail').mockResolvedValue(null);
      const result = await authService.validateTutor(
        'nonexistent@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const tutor = { id: '1', email: 'test@example.com' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await authService.login(tutor as TutorEntity);

      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('registerTutor', () => {
    it('should create a new tutor and return it without password', async () => {
      const createTutorDto: CreateTutorDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test Tutor',
        phone: '1234567890',
      };

      const hashedPassword = await bcrypt.hash(createTutorDto.password, 10);
      const newTutor: TutorEntity = {
        id: '1',
        email: createTutorDto.email,
        password: hashedPassword,
        name: createTutorDto.name,
        phone: createTutorDto.phone,
        reminders: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(tutorService, 'create').mockResolvedValue(newTutor);

      const result = await authService.registerTutor(createTutorDto);

      expect(result).toEqual({ ...newTutor, password: undefined });
      expect(tutorService.create).toHaveBeenCalledWith({
        email: createTutorDto.email,
        password: expect.any(String),
        name: createTutorDto.name,
        phone: createTutorDto.phone,
      });
    });
  });
});

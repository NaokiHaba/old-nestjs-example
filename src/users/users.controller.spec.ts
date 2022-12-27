import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let mockRepository: Repository<User>;
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: '1', ...user }),
              ),
          },
        },
      ],
    }).compile();

    mockRepository = module.get<Repository<User>>(getRepositoryToken(User));
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
        email: 'test@example.co.jp',
      };

      controller.create(dto);
      expect(controller.create(dto)).resolves.toEqual({
        id: '1',
        ...dto,
      });

      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});

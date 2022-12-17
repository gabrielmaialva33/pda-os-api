import { Test, TestingModule } from '@nestjs/testing';
import { NestI18nModule } from '@lib/i18n/i18n.module';

import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestI18nModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn((data) => data),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be able to create a user', async () => {
    const user = await controller.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@pda.com.br',
      user_name: 'john',
      password: '123456',
    });

    expect(user).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@pda.com.br',
      user_name: 'john',
      password: '123456',
    });
  });
});

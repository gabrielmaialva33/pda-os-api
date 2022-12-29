import { Test, TestingModule } from '@nestjs/testing';

import { ScheduleController } from '@modules/schedule/controllers/schedule.controller';
import { ScheduleService } from '@modules/schedule/services/schedule.service';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { ScheduleRepository } from '@modules/schedule/repositories/schedule.repository';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockScheduleRepository = createMock<ScheduleRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        {
          provide: ScheduleRepository,
          useValue: mockScheduleRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

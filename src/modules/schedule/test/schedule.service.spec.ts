import { Test, TestingModule } from '@nestjs/testing';

import { ScheduleService } from '@modules/schedule/services/schedule.service';
import { createMock } from '@golevelup/ts-jest';
import { ScheduleRepository } from '@modules/schedule/repositories/schedule.repository';
import { I18nService } from 'nestjs-i18n';

describe('ScheduleService', () => {
  let service: ScheduleService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockScheduleRepository = createMock<ScheduleRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

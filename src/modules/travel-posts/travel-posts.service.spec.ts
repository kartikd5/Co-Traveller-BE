import { Test, TestingModule } from '@nestjs/testing';
import { TravelPostsService } from './travel-posts.service';

describe('TravelPostsService', () => {
  let service: TravelPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPostsService],
    }).compile();

    service = module.get<TravelPostsService>(TravelPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

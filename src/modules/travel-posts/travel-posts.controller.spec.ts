import { Test, TestingModule } from '@nestjs/testing';
import { TravelPostsController } from './travel-posts.controller';

describe('TravelPostsController', () => {
  let controller: TravelPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPostsController],
    }).compile();

    controller = module.get<TravelPostsController>(TravelPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

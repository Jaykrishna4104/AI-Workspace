import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return project information', () => {
      const result = appController.getProjectInfo();

      expect(result).toEqual({
        project: 'AI Workspace',
        version: '1.0.0',
        status: 'Running',
        developer: 'JK',
        message: 'Welcome to AI Workspace API',
      });
    });
  });
});
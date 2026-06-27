import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProjectInfo() {
    return {
      project: 'AI Workspace',
      version: '1.0.0',
      status: 'Running',
      developer: 'JK',
      message: 'Welcome to AI Workspace API',
    };
  }
}
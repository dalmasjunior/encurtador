import * as typeorm from 'typeorm';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import App from '../app';
import EncurtadorController from './encurtador.controller';
import CreateShortUrlDto from './encurtador.dto';

(typeorm as any).getRepository = jest.fn();

const encurtadorController = new EncurtadorController();
const app = new App([encurtadorController]);

describe('The EncurtadorController', () => {
  afterAll(() => mongoose.disconnect());

  describe('POST /encurtador', () => {
    describe('if the url was not passed', () => {
      it('should return an error status equal to 400', () => {
        const urlToShorten = {};
        return request(app.getServer())
          .post(encurtadorController.path)
          .send(urlToShorten)
          .expect(400);
      });
    });

    describe('if the url is passed', () => {
      it('should return a status equal to 201', (done) => {
        const urlToShorten: CreateShortUrlDto = {
          url: 'http://www.google.com'
        };
        request(app.getServer())
          .post(encurtadorController.path)
          .send(urlToShorten)
          .expect(201)
          .end(done);
      });
    });
  });
});

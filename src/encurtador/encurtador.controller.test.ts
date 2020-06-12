import * as typeorm from 'typeorm';
import App from '../app';
import EncurtadorController from './encurtador.controller';
import CreateShortUrlDto from './encurtador.dto';
import * as request from 'supertest';

(typeorm as any).getRepository = jest.fn();

describe('The EncurtadorController', () => {
    describe('POST /encurtador', () => {
        describe('if the url was not passed', () => {
            it('should return an error status equal to 400', () => {
                const urlToShorten = {};
                const encurtadorController = new EncurtadorController();
                const app = new App([encurtadorController]);
                return request(app.getServer())
                    .post(encurtadorController.path)
                    .send(urlToShorten)
                    .expect(400)
            })
        })

        describe('if the url is passed', () => {
            it('should return a status equal to 201 and a property with newUrl', () => {
                const urlToShorten: CreateShortUrlDto = {
                    "url": 'http://www.google.com'
                };
                const encurtadorController = new EncurtadorController();
                const app = new App([encurtadorController]);
                return request(app.getServer())
                    .post(encurtadorController.path)
                    .send(urlToShorten)
                    .expect(201)
            })
        })
    })
})
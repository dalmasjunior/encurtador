import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import IEncurtador from '../interfaces/encurtador.interface';
import encurtadorModel from './encurtador.model';
import HttpException from '../exceptions/HttpException';

import validationMiddleware from '../middleware/validation.middleware';
import CreateShortUrlDto from './encurtador.dto';

class EncurtadorController implements Controller {
  public path = '/encurtador';
  public router = express.Router();
  private encurtador = encurtadorModel;

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post(this.path, validationMiddleware(CreateShortUrlDto), this.encurtarUrl);
    this.router.get('/:code', this.accessCode);
  }

  private encurtarUrl = async (req: express.Request, res: express.Response) => {
    const code = this.genUrlCode();
    const expiration = new Date(this.setExpirationDate(process.env.EXPIRATION_TIME));
    const shortUrl: IEncurtador = { ...req.body, code, expiration };

    const shortenedUrl = new this.encurtador(shortUrl);
    await shortenedUrl.save();

    res.status(201).json({ newurl: `${req.hostname}${process.env.PORT === '8081' ? ':8081' : '' }/${shortUrl.code}` });
  }

  private accessCode = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const code = req.params.code;
    this.encurtador.find({ code }).exec().then((result) => {
      if (result && (new Date(result[0].expiration) > new Date())) {
        res.redirect(result[0].url);
      } else {
        next(new HttpException(404, 'Code not found'));
      }
    });
  }

  private genUrlCode() {
    return (
      Math.random().toString(32).substring(2, 7) +
      Math.random().toString(32).substring(2, 7)
    ).substring(0, (Math.random() * 6) + 5);
  }

  private setExpirationDate(expDays) {
    const exp = new Date();
    return exp.setDate(exp.getDate() + expDays);
  }
}

export default EncurtadorController;

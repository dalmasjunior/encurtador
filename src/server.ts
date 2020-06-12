import 'dotenv/config';
import App from './app';
import EncurtadorController from './encurtador/encurtador.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new EncurtadorController(),
  ]
);

app.listen();

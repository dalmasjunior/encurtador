import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as express from 'express';
import * as mongoose from 'mongoose';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
    
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }
    
    private connectDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_DB,
            MONGO_PATH,
            MONGO_QUERY
        } = process.env;
        
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}${MONGO_DB}${MONGO_QUERY}`,{useNewUrlParser: true, useUnifiedTopology: true});
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(this.loggerMiddleware);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
    
    private initializeControllers(controllers: Controller[]) {
        controllers.forEach( controller=> {
            this.app.use('/', controller.router);
        });
    }

    private loggerMiddleware(req: express.Request, res: express.Response, next) {
        console.log(`${req.method} ${req.path}`);
        next()
    }
}

export default App;
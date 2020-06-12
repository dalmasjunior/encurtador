import * as mongoose from 'mongoose';
import IEncurtador from '../interfaces/encurtador.interface';

const encurtadorSchema = new mongoose.Schema({
    code: String,
    url: String,
    expiration: Date
});

const encurtadorModel = mongoose.model<IEncurtador & mongoose.Document>('Encurtador', encurtadorSchema);

export default encurtadorModel;
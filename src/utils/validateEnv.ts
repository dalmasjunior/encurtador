import { cleanEnv, str } from 'envalid';

export default function validateEnv() {
    cleanEnv(process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_DB: str(),
        MONGO_PATH: str(),
        MONGO_QUERY: str()
    })
};
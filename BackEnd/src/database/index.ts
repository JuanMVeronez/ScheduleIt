require('dotenv').config();
import mongoose from 'mongoose';

let mongoConnection: string;

if (process.env.MONGO_URL) {
  mongoConnection = process.env.MONGO_URL;
} else {
  throw new Error("MONGO URL environment variable is not set")
}

mongoose.connect(mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

export default mongoose;
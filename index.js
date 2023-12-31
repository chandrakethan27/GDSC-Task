import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import Admin from './models/Admin.js';
import { fileURLToPath } from 'url';
import { users} from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 6001;
mongoose
.connect(process.env.URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(()=>{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    // Admin.insertMany(users)
})
.catch((error) => console.log("reason",error.message));

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
}));
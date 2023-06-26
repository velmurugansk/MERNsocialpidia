import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controller/userController.js";
import { createPost } from "./controller/postController.js";
import userRouter from "./routes/userroutes.js";
import userdetailRouter from "./routes/userdetailroutes.js";
import postRouter from "./routes/postroutes.js";
import { verifyToken } from "./middleware/auth.js";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


// Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

// routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", userRouter);
app.use("/user",userdetailRouter);
app.use("/post", postRouter);


const PORT = process.env.PORT || 6000

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    app.listen(PORT, () => console.log(`Sever Running On ${PORT}`));
}).catch((error) => console.log(error));


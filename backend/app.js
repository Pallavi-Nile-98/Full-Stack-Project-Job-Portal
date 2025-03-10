import express from "express";
import{config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import{connection} from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";


const app = express();
config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,

})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",

})

);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Logs all requests
    next();
});

// newsLetterCron()

connection();
app.use(errorMiddleware)

// Debugging: Log available routes
console.log("Available Routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
    }
});


export default app;

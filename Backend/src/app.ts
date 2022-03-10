
import dotenv from "dotenv"; // .env
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-Utils/config";
import errorsHandler from "./02-Middleware/errors-handler";
import ClientError from "./03-Models/client-error";
import vacationsController from "./06-Controllers/vacations-controller";
import followVacationsController from "./06-Controllers/follow-vacations-controller";
import path from "path";
import socketLogic from './05-BLL/socket-logic';
import fileUpload from 'express-fileupload';
import authController from "./06-Controllers/auth-controller";


const expressServer = express();
expressServer.use(fileUpload());

expressServer.use(cors()); // Enable CORS for any website
// expressServer.use(cors({ origin: "http://localhost:3000" })); // Enable CORS for one specific website
// expressServer.use(cors({ origin: ["http://localhost:3000", "http://www.someothersite.com", "https://www.walla.com"] })); // Enable CORS for several specific websites

expressServer.use(express.json());

// Set the folder of index.html:
expressServer.use(express.static(path.join(__dirname, "./07-Frontend")));
expressServer.use("/api/auth", authController);
expressServer.use("/api/vacations/follow", followVacationsController);
expressServer.use("/api/vacations", vacationsController);
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    // const error = new ClientError(404, "Route not found");
    // next(error);

    // Send back index.html on any route-not-found (SPA behavior):
    response.sendFile(path.join(__dirname, "./07-Frontend/index.html"));
});
expressServer.use(errorsHandler);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

socketLogic.initSocketIo(httpServer);


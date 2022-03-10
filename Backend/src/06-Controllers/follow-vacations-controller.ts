import express, { NextFunction, Request, Response } from "express";
import path from "path";
import verifyAdmin from "../02-Middleware/verify-admin";
import verifyToken from "../02-Middleware/verify-token";
import FollowVacationModel from "../03-Models/follow-vacation-model";
import logic from "../05-BLL/follow-vacation-logic";

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const followVacations = await logic.getAllFollowedVacations();
        response.json(followVacations);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const followVacation = await logic.getUserAllFollowedVacation(id);
        response.json(followVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST
router.post("/", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const info = request.body;
        
        
        // request.body doesn't contain files.
        // request.body.image = request.files?.image; // "image" is the parameter name sent from Frontend
        const followVacation = new FollowVacationModel(request.body);
        
        

        const addedFollow = await logic.followVacation(followVacation);
        response.status(201).json(addedFollow);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE
router.delete("/:userId/:vacationId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await logic.deleteFollowedVacation(+userId, +vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
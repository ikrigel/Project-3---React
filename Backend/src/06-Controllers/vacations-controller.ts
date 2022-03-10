import express, { NextFunction, Request, Response } from "express";
import path from "path";
import verifyAdmin from "../02-Middleware/verify-admin";
import VacationModel from "../03-Models/vacation-model";
import logic from "../05-BLL/vacation-logic";

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logic.getAllVacations();
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch(err: any) {
        next(err);
    }
});

// POST
router.post("/",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        // request.body doesn't contain files.
        request.body.image = request.files?.image; // "image" is the parameter name sent from Frontend
        const vacation = new VacationModel(request.body);
        
        
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

// PUT
router.put("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.vacationId = id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updateFullVacation(vacation);
        response.json(updatedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.patch("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
// router.patch("/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.vacationId = id;
        request.body.image = request.files?.image;        
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updatePartialVacation(vacation);
        response.json(updatedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

// DELETE
router.delete("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "Assets", "Images", "vacations", imageName);
        
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
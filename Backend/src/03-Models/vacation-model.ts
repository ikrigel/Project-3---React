import { UploadedFile } from "express-fileupload";
import Joi from "joi";


class VacationModel {
    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public image: UploadedFile; // Frontend uploads an image to Backend
    public fromDate: string;
    public toDate: string;
    public price: number;
    public followers?: number // calculating and sending followers to the front end


    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.fromDate = vacation.fromDate;
        this.toDate = vacation.toDate;
        this.price = vacation.price;
    }

    // Post Validation Schema
    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        description: Joi.string().required().min(2).max(1000),
        destination: Joi.string().required().min(2).max(100),
        imageName: Joi.forbidden(),
        image: Joi.object().required(),
        fromDate: Joi.date().required().greater(Date.now() + 1 * 60 * 60 * 1000),
        toDate: Joi.date().required().greater(Date.now() + 24 * 60 * 60 * 1000 && Joi.ref('fromDate')),
        price: Joi.number().optional().positive().min(0).max(100000)

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        description: Joi.string().required().min(2).max(1000),
        destination: Joi.string().required().min(2).max(100),
        imageName: Joi.forbidden(),
        image: Joi.object().required(),
        fromDate: Joi.date().required().greater(Date.now() + 1 * 60 * 60 * 1000),
        toDate: Joi.date().required().greater(Date.now() + 24 * 60 * 60 * 1000 && Joi.ref('fromDate')),
        price: Joi.number().required().positive().min(0).max(100000)

    });

    // Patch Validation Schema
    private static patchValidationSchema = Joi.object({
        vacationId: Joi.required(),
        description: Joi.string().optional().min(2).max(1000),
        destination: Joi.string().optional().min(2).max(100),
        imageName: Joi.forbidden(),
        image: Joi.object().optional(),
        fromDate: Joi.date().optional().greater(Date.now() + 1 * 60 * 60 * 1000),
        toDate: Joi.date().optional().greater(Date.now() + 24 * 60 * 60 * 1000 && Joi.ref('fromDate')),
        price: Joi.number().optional().positive().min(0).max(100000)

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = VacationModel.postValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate put;
    public validatePut() {
        //Validate:
        const result = VacationModel.putValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate patch;
    public validatePatch() {
        //Validate:
        const result = VacationModel.patchValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

}

export default VacationModel;

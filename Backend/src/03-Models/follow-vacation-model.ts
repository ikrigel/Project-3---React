import Joi from "joi";

class FollowVacationModel {
 
    public userId : number;
    public vacationId: number;
 
    public constructor(followVacation: FollowVacationModel) {
        this.userId = followVacation.userId;
        this.vacationId = followVacation.vacationId;
    }

     // Post Validation Schema
     private static postValidationSchema = Joi.object({
        
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().required().positive().integer()
       

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().required().positive().integer()
       

    });

     // Patch Validation Schema
     private static patchValidationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        vacationId: Joi.number().optional().positive().integer()
       

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = FollowVacationModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors
        // const result = FollowVacationModel.postValidationSchema.validate(this);

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Put;
    public validatePut() {
        //Validate:
        const result = FollowVacationModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Patch;
    public validatePatch() {
        //Validate:
        const result = FollowVacationModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }
 
}

export default FollowVacationModel;
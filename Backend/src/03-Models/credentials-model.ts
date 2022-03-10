import Joi from "joi";

class CredentialsModel {
 
    public username: string;
    public password: string;
 
    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

     // Post Validation Schema
     private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        username:Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(4).max(20)
       

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        username:Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(4).max(20)
       

    });

     // Patch Validation Schema
     private static patchValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        username:Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(4).max(20)
       

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = CredentialsModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors
        // const result = CredentialsModel.postValidationSchema.validate(this);

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Put;
    public validatePut() {
        //Validate:
        const result = CredentialsModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Patch;
    public validatePatch() {
        //Validate:
        const result = CredentialsModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }
 
}

export default CredentialsModel;
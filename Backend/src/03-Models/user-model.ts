import Joi from "joi";
import Role from "./role";
 
class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;


    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    // Post Validation Schema
    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName:Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(20),
        role:Joi.object().optional()

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        firstName:Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(20),
        role:Joi.object().optional()

    });

     // Patch Validation Schema
     private static patchValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        firstName:Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(20),
        role:Joi.object().optional()

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = UserModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors
        // const result = UserModel.postValidationSchema.validate(this);

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Put;
    public validatePut() {
        //Validate:
        const result = UserModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Patch;
    public validatePatch() {
        //Validate:
        const result = UserModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

}
 
export default UserModel;

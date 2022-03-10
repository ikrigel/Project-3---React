import { v4 as uuid } from "uuid";
import safeDelete from "../01-Utils/safe-delete";
import ClientError from "../03-Models/client-error";
import { OkPacket } from "mysql";
import VacationModel from "../03-Models/vacation-model";
import dal from "../04-DAL/dal";
import socketLogic from "./socket-logic";
import moment from "moment";
import config from "../01-Utils/config";
 
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT v.* ,count(f.vacationId) as followers 
                FROM vacations as V
                LEFT join followedvacations as F
                ON V.vacationId=F.vacationId
                GROUP by V.vacationId `;
    const vacations = await dal.execute(sql);
    socketLogic.emitAddFollowedVacation(vacations);
    socketLogic.emitUpdateFollowedVacation(vacations);
    
    return vacations;
}
 
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT v.* ,count(f.vacationId) as followers 
    FROM vacations as V LEFT join followedvacations as F ON V.vacationId=F.vacationId
     where V.vacationId= ${+id} GROUP by V.vacationId;`;
    
    
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) {
        throw new ClientError(404, `vacationId ${vacation.vacationId} not found`);
    }
    return vacation;
}
 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePost();
    if (errors) {
        throw new ClientError(400, errors);
    }

     // 1. Take the original extension (tiff, jpg, jpeg, gif, png, bmp, ....... ): 
     const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf(".")); // ".jpg" / ".png" / ".gif"

     // 2. Create uuid file name including the original extension: 
     vacation.imageName = uuid() + extension;
 
     // 3. Save the image to the disk:
     await vacation.image.mv(config.imagePath+"/vacations/" + vacation.imageName);
 
     // 4. Delete the image from the model so it won't get back to user:
     delete vacation.image;
 

    const sql = `INSERT INTO Vacations(description, destination,imageName, fromDate, toDate, price)
                 VALUES("${vacation.description}", "${vacation.destination}","${vacation.imageName}", "${vacation.fromDate}", "${vacation.toDate}", ${vacation.price})`;
    console.log(sql);
    
    const info: OkPacket = await dal.execute(sql);
    vacation.vacationId = info.insertId;
 
    // Socket.io:
    socketLogic.emitAddVacation(vacation);
 
    return vacation;
}
 
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
    
    
    // 1. Set image name:
    const vacations = await getOneVacation(+vacation.vacationId);
    if (vacations.vacationId === -1) {
        throw new ClientError(404, `vacationId ${vacations.vacationId} not found`);
    }
    vacation.imageName = vacations.imageName;

    // 2. If we have an image to update: 
    if (vacation.image) {

        // 3. Delete prev image from disk:
        safeDelete(config.imagePath+"/vacations/" + vacation.imageName);

        // 4. Take the original extension (tiff, jpg, jpeg, gif, png, bmp, ....... ): 
        const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf(".")); // ".jpg" / ".png" / ".gif"

        // 5. Create uuid file name including the original extension: 
        vacation.imageName = uuid() + extension;

        // 6. Save the image to the disk:
        await vacation.image.mv(config.imagePath+"/vacations/" + vacation.imageName);

        // 7. Delete the image from the model so it won't get back to user:
        delete vacation.image;
    }


    const sql = `UPDATE Vacations SET
    description = "${vacation.description}",
    destination = "${vacation.destination}",
    ImageName = "${vacation.imageName}",
    fromDate = "${moment(vacation?.fromDate).format("YYYY-MM-DDTHH:mm")}",
    toDate = "${moment(vacation?.toDate).format("YYYY-MM-DDTHH:mm")}",
    price = "${vacation.price}"
        WHERE VacationId = "${+vacation.vacationId}"`;
    
    
    const info: OkPacket = await dal.execute(sql);
 
    // Socket.io:
    socketLogic.emitUpdateVacation(vacation);

   

 
    return vacation;
}
 
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
    
    moment(vacation?.fromDate).format("DD-MM-YYYYTHH:mm");
    moment(vacation?.toDate).format("DD-MM-YYYYTHH:mm");
    
   
    // Get existing database vacation:
    const dbVacation = await getOneVacation(vacation.vacationId);
    if (!dbVacation) {
        throw new ClientError(404, `vacationId ${dbVacation.vacationId} not found`);
    }
    
    
    // Update it only with the given values from frontend:
    for (const prop in vacation) {
            
       
        
        if (Boolean(vacation[prop]) !== false) {
                      
            dbVacation[prop] = vacation[prop];
        }
        
    }
    
    

    // Update to database:
    vacation = await updateFullVacation(dbVacation);
 
    // Socket.io:
    socketLogic.emitUpdateVacation(vacation);
    // socketLogic.emitUpdateFollowedVacation(vacation);
 
   

    // Return updated vacation:
    return vacation;
}
 
async function deleteVacation(id: number): Promise<VacationModel> {
    const vacation = await getOneVacation(+id);
    if (vacation.vacationId === -1) {
        throw new ClientError(404, `vacationId ${id} not found`);
    }
    const sql = "DELETE FROM Vacations WHERE VacationId = " + id;
    const info: OkPacket = await dal.execute(sql);
    // 1. Delete prev image from disk:
    safeDelete(config.imagePath+"/vacations/" + vacation.imageName);
 
    
    // Socket.io:
    socketLogic.emitDeleteVacation(id);
    return vacation;
}
 
export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    updatePartialVacation,
    deleteVacation
};

import ClientError from "../03-Models/client-error";
import { OkPacket } from "mysql";
import FollowVacationModel from "../03-Models/follow-vacation-model";
import vacationLogic from "../05-BLL/vacation-logic";
import dal from "../04-DAL/dal";
import socketLogic from "./socket-logic";
import VacationModel from "../03-Models/vacation-model";
 
async function followVacation(followedVacation: FollowVacationModel): Promise<FollowVacationModel[]> {
    let followedVacations;
    followedVacations = await getAllFollowedVacations();
    const followVacation = followedVacations.find(vacation => +vacation.userId === +followedVacation.userId && +vacation.vacationId === +followedVacation.vacationId);
    if (followVacation) { // if the user already follows the vacation
        throw new ClientError(400, "You already follow this vacation");
    };

    const sql = `INSERT INTO followedVacations (userId,vacationId)
    VALUES( ${+followedVacation.userId} , ${+followedVacation.vacationId})`;
    const userFollowedVacations = await dal.execute(sql);
    const info: OkPacket = userFollowedVacations;
    
    userFollowedVacations.userId = followedVacation.userId;
    userFollowedVacations.vacationId = followedVacation.vacationId;
   const vacation:VacationModel =await vacationLogic.getOneVacation(+followedVacation.vacationId);
    
    // Socket.io:
    socketLogic.emitAddFollowedVacation(vacation);
    
    return userFollowedVacations;
}



async function getUserAllFollowedVacation(userId: number): Promise<FollowVacationModel[]> {
   
    
    const sql = `SELECT * FROM followedVacations WHERE userId = ${+userId}`;
    const followedVacations = await dal.execute(sql);
    
    return followedVacations;
}
async function getAllFollowedVacations(): Promise<FollowVacationModel> {
    const sql = 'SELECT * FROM `followedVacations`';
    const followedVacations = await dal.execute(sql);
    
    return followedVacations;
}

async function deleteFollowedVacation(userId:number, vacationId:number): Promise<void> {
    
    const sql = `DELETE FROM followedVacations WHERE userID = ${+userId} and vacationID = ${+vacationId}`
    const info: OkPacket = await dal.execute(sql);
    
   
    const vacation:VacationModel =await vacationLogic.getOneVacation(vacationId);
    

    // Socket.io:
    socketLogic.emitDeleteFollowedVacation(vacation);

    
}
 
export default {
    followVacation,
    getUserAllFollowedVacation,
    getAllFollowedVacations,
    deleteFollowedVacation
};


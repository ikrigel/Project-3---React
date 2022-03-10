import { OkPacket } from "mysql";
import { userInfo } from "os";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import CredentialsModel from "../03-Models/credentials-model";
import Role from "../03-Models/role";
import UserModel from "../03-Models/user-model";
import dal from "../04-DAL/dal";



async function getAllUsers(): Promise<UserModel[]> {
    // const content = await readFile(config.usersFile, "utf-8");
    // const users: UserModel[] = JSON.parse(content);
    const sql = "SELECT * FROM Users";
    const users = await dal.execute(sql);
    return users;
}

async function register(user: UserModel): Promise<string> {

    const errors = user.validatePost();
    if (errors) {
        throw new ClientError(400, errors);
    }

    // Get all users: 
    const users = await getAllUsers();

    // Find given username in the DB and return error if already exist same username:
    const userName = users.find(u => u.username === user.username);
    if (userName) throw new ClientError(403, "Username already exist. Please try a different username.");

    // Create new id:
    // user.id = users[users.length - 1].id + 1;
    user.role = Role.User;

    const sql = `INSERT INTO Users(firstName, lastName, username,password,role)
                 VALUES('${user.firstName}', '${user.lastName}', '${user.username}','${user.password}','${user.role}')`;
    const info: OkPacket = await dal.execute(sql);
    user.id = info.insertId;
    

    // Remove password: 
    delete user.password;

    // Generate new token: 
    const token = jwt.getNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const errors = credentials.validatePost();
    if (errors) {
        throw new ClientError(400, errors);
    }

    // Get all users: 
    const users = await getAllUsers();

    // Find given user: 
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    
    // If incorrect credentials: 
    if (!user) throw new ClientError(401, "Incorrect username or password");

    // Remove password: 
    delete user.password;

    // Generate new token: 
    const token = jwt.getNewToken(user);

    return token;
}

export default {
    register,
    login
};
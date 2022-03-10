
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Typography, TextField, Button, ButtonGroup, FormControlLabel, Checkbox } from "@mui/material";
import { MailOutline, Send, Clear } from "@mui/icons-material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigator = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You are registered");
            navigator("/home");
        }
        catch(err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="Register Box">
			
            <Typography variant="h3" className="Header">
                <AppRegistrationIcon />
                Register
            </Typography>

            <form onSubmit={handleSubmit(submit)}>

                <TextField label="First name" variant="outlined" className="TextBox" {...register("firstName")} />

                <TextField label="lastName" variant="outlined" className="TextBox" type="TextBox" {...register("lastName")}/>

                <TextField label="username" variant="outlined" className="TextBox" type="TextBox" {...register("username")}/>

                <TextField label="password" variant="outlined" className="TextBox" type="password" {...register("password")}  />
               
                   <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary" startIcon={<Send />} type="submit">Register</Button>
                    <Button color="secondary" startIcon={<Clear />} type="reset">Clear</Button>
                        
                </ButtonGroup>

            </form>

        </div>
    );
}

export default Register;


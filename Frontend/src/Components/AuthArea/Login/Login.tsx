import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./Login.css";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { Clear, MailOutline, Send } from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';


function Login(): JSX.Element {

    const navigator = useNavigate();
    const { register, handleSubmit } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("You are now logged in");
            navigator("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">
			<Typography variant="h3" className="Header">
                <PasswordIcon />
                Login
            </Typography>

            <form onSubmit={handleSubmit(submit)}>

                <TextField label="username" variant="outlined" className="LoginBox" type="TextBox" {...register("username")} />

                    <TextField label="Password" variant="outlined" className="LoginBox" type="password" autoComplete="current-password" {...register("password")} />

                    <ButtonGroup variant="contained" fullWidth>
                      <Button color="primary" startIcon={<LockOpenIcon />} type="submit">Login</Button>
                      <Button color="secondary" startIcon={<Clear />} type="reset">Clear</Button>
                    </ButtonGroup>



            </form>

        </div>
    );
}

export default Login;


import { Button, Typography } from "@mui/material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/Store";
import { LockOpenTwoTone, LockTwoTone } from "@mui/icons-material";
import "./AuthMenu.css";

interface AuthMenuState {
  user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {
  private unsubscribeMe: Unsubscribe;

  public componentDidMount() {
    this.setState({ user: authStore.getState().user });

    this.unsubscribeMe = authStore.subscribe(() => {
      const user = authStore.getState().user;
      this.setState({ user });
    });
  }

  public render(): JSX.Element {
    return (
      <div className="AuthMenu">
        {!this.state?.user && (
          <>
            <Typography variant="h5" className="Header">
              <LockTwoTone />
              Hello Guest
            </Typography>
            
            <Button variant="contained" color="primary">
              <LoginIcon />
              <NavLink to="/login">Login</NavLink>
            </Button>
            <span> | </span>
            <Button variant="contained" color="primary">
              <AppRegistrationIcon />
              <NavLink to="/register">Register</NavLink>
            </Button>
          </>
        )}

        {this.state?.user && (
          <>
            <span>
              <Typography variant="h5" className="Header">
                <LockOpenTwoTone />
                Hello{" "}
                {this.state.user.firstName + " " + this.state.user.lastName}
              </Typography>
            </span>
           
            <Button variant="contained" color="primary">
              <LogoutIcon />
              <NavLink to="/logout">Logout</NavLink>
            </Button>
          </>
        )}
      </div>
    );
  }

  public componentWillUnmount(): void {
    this.unsubscribeMe();
  }
}

export default AuthMenu;

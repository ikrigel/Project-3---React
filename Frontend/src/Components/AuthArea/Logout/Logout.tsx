import { useEffect } from "react";
import { useNavigate } from "react-router";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    

    useEffect(() => {
        (async () => {
          try {
              await authService.logout();

                notifyService.success("Logout succeed");
              navigate("/home");

          } catch (err) {
            notifyService.error(err);
          }
        })();
        navigate("/home") }, []);
   
    return null;
}

export default Logout;

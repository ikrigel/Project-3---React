import { Component } from "react";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import Loading from "../../SharedArea/Loading/Loading";
import vacationsService from "../../../Services/VacationsService";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { Unsubscribe } from "redux";
import { vacationsStore } from "../../../Redux/Store";
import followedVacationsService from "../../../Services/FollowedVacationService";
import FollowedVacationModel from "../../../Models/FollowedVacationModel";
import config from "../../../Utils/Config";
import { TextField } from "@mui/material";

interface HomeState {
    vacations: VacationModel[];
    user: UserModel;
    vacationsFollowedByUser: FollowedVacationModel[];
    readyToDisplay: boolean;
    query: string;

}

class Home extends Component<{}, HomeState> {

    private unsubscribeMe: Unsubscribe;

    
    public async componentDidMount() {
        try {
            const user = await authService.getUser();
            switch (user.role) {
                case -1:
                    window.location.replace(config.loginPath);
                    break;
                case 2:
                    window.location.href = "/admin-panel";
                    break;
            
           default:
                this.setState({ user: user });
                const vacations = await vacationsService.getAllVacations();
                this.setState({ vacations: vacations });
                const vacationsFollowedByUser = await followedVacationsService.getUserFollowedVacation(this.state.user.id);
               
                this.setState({ vacationsFollowedByUser: vacationsFollowedByUser });

                const followedByUser: VacationModel[] = this.state?.vacations.filter((el) => {
                    return this.state?.vacationsFollowedByUser.some((f) => {
                        return f.vacationId === el.vacationId
                    });
                });

                followedByUser.forEach(function (element) {
                    element.followedByUser = true;
                });

                

                const notFollowedByUser: VacationModel[] = this.state?.vacations.filter((el) => {
                    return !this.state?.vacationsFollowedByUser.some((f) => {
                        return f.vacationId === el.vacationId
                    });
                });

                notFollowedByUser.forEach(function (element) {
                    element.followedByUser = false;
                });
                


                const allVactions: VacationModel[] = [...followedByUser, ...notFollowedByUser];
                this.setState({ vacations: allVactions });

                

                this.setState({ readyToDisplay: true });
                this.unsubscribeMe = vacationsStore.subscribe(async () => {
                    const vacations = await vacationsService.getAllVacations();
                    this.setState({ vacations });
                });
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    // public componentWillUnmount(): void {
        //     this.unsubscribeMe();
    // }
    
    public query: string = "";

    public render(): JSX.Element {
        
        return (


            <div className="Home">


                    <br />
                    <p >
                    <TextField
                        id="filled-basic"
                        label="חפש חופשה"
                        variant="filled"
                        
                        onChange={(e) => { this.query = e.target.value; this.setState({ query: e.target.value }); }}
                        
                        />
                        </p>
                <br />
                

   

                    <hr />

                {this.state?.vacations === undefined && <Loading />}

                {/* <NavLink to="/vacations/new">New Vacation</NavLink> */}

                {this.state?.readyToDisplay && this.state?.vacations?.filter((post) => {
                                if (this.query === "") {
                                    return post;
                                } else if (
                                    post.description.toLowerCase().includes(this.query.toLowerCase()) ||
                                    post.destination.toLowerCase().includes(this.query.toLowerCase()) ||
                                    post.fromDate.toLowerCase().includes(this.query.toLowerCase()) ||
                                    post.toDate.toLowerCase().includes(this.query.toLowerCase()) ||
                                    post.price.toString().includes(this.query) ||
                                    post.followers.toString().includes(this.query) ||
                                    post.followers.toString().includes(this.query.toLowerCase()) ||
                                    post.vacationId.toString().includes(this.query) ||
                                    post.followers.toString().includes(this.query)
                                ) {
                                    return post;
                                }
                            }).map(v => <VacationCard key={v.vacationId} vacation={v} user={this.state.user} />)}

            </div>
        );
    }
}

export default Home;

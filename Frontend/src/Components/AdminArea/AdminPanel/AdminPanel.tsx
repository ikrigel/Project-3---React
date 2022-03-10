import { Component } from "react";
import "./AdminPanel.css";
import VacationModel from "../../../Models/VacationModel";
import Loading from "../../SharedArea/Loading/Loading";
import { NavLink, Navigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { tableCellClasses, TextField } from "@mui/material";
import config from "../../../Utils/Config";
import { Unsubscribe } from "redux";
import { vacationsStore } from "../../../Redux/Store";
import moment from "moment";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
   
}));


interface AdminPanelState {
    query: string;
    user: UserModel;
    vacations: VacationModel[];
}

class AdminPanel extends Component<{}, AdminPanelState> {





    public constructor(props: {}) {
        super(props);

       
    }
    private unsubscribeMe: Unsubscribe;

    public async componentDidMount() {
        if (!authService.isAdmin()) {
            notifyService.error("You are not logged in as Admin");
            window.location.replace(config.loginPath);

            //    Navigate("login");
        };

        try {
            const vacations = await vacationsService.getAllVacations();
            this.setState({ vacations });

            this.unsubscribeMe = vacationsStore.subscribe(async () => {
                const vacations = await vacationsService.getAllVacations();
                this.setState({ vacations });
            });
        }
        catch (err: any) {

            notifyService.error(err.message);
        }
    }
    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }


    public query: string = "";

    public render(): JSX.Element {


        return (

            
            <div className="AdminPanel">

                <br />

                <TextField
                    id="filled-basic"
                    label="חפש חופשה"
                    variant="standard"
                    onChange={(e) => { this.query = e.target.value; this.setState({ query: e.target.value }); }}

                />
                <br />

                <hr />

                {this.state?.vacations === undefined && <Loading />}

                <Button variant="contained" color="primary">
                    <AddIcon />
                    <NavLink to='/vacations/new'>Add Vacation</NavLink>
                </Button>
                <Button variant="contained" color="primary">
                    <EqualizerIcon />
                    <NavLink to='/reports'>Reports</NavLink>
                </Button>

                {/* {this.state?.vacations?.reverse()?.map(p => <VacationCard key={p.vacationId} vacation={p} />)} */}
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 ,hover:'true'}} aria-label="customized table">
                    {/* <Table aria-label="customized table"> */}
                        <TableHead >
                            <TableRow >
                                <StyledTableCell align="center">#</StyledTableCell>
                                <StyledTableCell align="center">Followers</StyledTableCell>
                                <StyledTableCell align="center">Destination</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">From Date</StyledTableCell>
                                <StyledTableCell align="center">To Date</StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {/* {this.state?.vacations?.reverse()?.map(p => <span key={p.vacationId}>{p.description}  |</span>)} */}
                        {/* <div className="tableRow"> */}
                        <TableBody className="tableRow" >
                            {this.state?.vacations?.filter((post) => {
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
                            }).map( v =>
                                
                                <StyledTableRow  key={v.vacationId} >
                                    <StyledTableCell align="center">{v.vacationId} </StyledTableCell>
                                    <StyledTableCell align="center">{v.followers ? v.followers : 'No followers'} </StyledTableCell>
                                    
                                        <StyledTableCell align="center"><div className="Destination">{v.destination}</div></StyledTableCell>
                                    
                                    
                                        <StyledTableCell align="center" ><div className="Description">{v.description}</div></StyledTableCell>
                                    
                                    <StyledTableCell align="center">{v.price} $</StyledTableCell>
                                    <StyledTableCell align="center">{moment(new Date(v.fromDate).toLocaleString()).format("DD-MM-YYYY,HH:mm A")} </StyledTableCell>
                                    <StyledTableCell align="center">{moment(new Date(v.toDate).toLocaleString()).format("DD-MM-YYYY,HH:mm A")} </StyledTableCell>
                                    <StyledTableCell align="center"> <img src={config.urls.vacationImages + v.imageName} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <NavLink to={`/vacations/update/${v.vacationId}`}>
                                            <EditIcon />
                                        </NavLink>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <button onClick={() => vacationsService.deleteVacation(+v.vacationId)} ><RemoveIcon /></button>
                                    </StyledTableCell>
                                </StyledTableRow >).reverse()}
                            </TableBody>
                            
                    </Table>
                </TableContainer>


            </div>
        );
    }
}

export default AdminPanel;





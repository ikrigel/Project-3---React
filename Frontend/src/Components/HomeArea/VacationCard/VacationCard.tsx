import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import "./VacationCard.css";
import { Switch } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import followedVacationsService from "../../../Services/FollowedVacationService";
import { useState } from "react";
import { Button, Typography, Box, Modal } from "@mui/material";
import moment from "moment";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownShareButton from "../DropdownShareButton/DropdownShareButton";
import notifyService from "../../../Services/NotifyService";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: `80%`,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

interface VacationCardProps {
    vacation: VacationModel;
    user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {


    const [open, setOpen] = useState(false);
    const [followedByUser, setFollowedByUser] = useState<boolean>(props.vacation.followedByUser);
    // const [followedByUser, setFollowedByUser] = useState<boolean>(true);

    function clickMe() {

    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function toggleFollow(): Promise<void> {

        followedByUser ? setFollowedByUser(false) : setFollowedByUser(true);
        try {
            if (followedByUser) {
                await followedVacationsService.deleteFollowedVacation(props.user.id, props.vacation.vacationId);
            }
            else {
                await followedVacationsService.addFollowedVacation(props.user.id, props.vacation.vacationId);
            }

        } catch (err: any) {
            notifyService.error(err.message)
        }
    }


    return (
        <div className="VacationCard Box">
            <div>
               <div className="title">
           

                    <CardHeader 

                        action={
                                <Button onClick={handleOpen}>
                                    <MoreVertIcon />
                                </Button>                      
                        }
                        
                    />
                </div>
                {
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.vacation.followers ? props.vacation.followers + "😍" : props.vacation.followers + "🙋🏼‍♂️"}
                        </Avatar>
                }
                <DropdownShareButton />
                <div className="header">
                    {props.vacation?.destination}
                </div> 
                
                

                <Button onClick={handleOpen}>
                <img src={config.urls.vacationImages + props.vacation?.imageName} alt={props.vacation?.imageName} />

                        
                    </Button>

                      
                   
                   
                   

                    {/* Modal area */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                        {/* <Typography id="modal-modal-description" > */}
                            <h5><button onClick={handleClose}>❌</button></h5>
                            <h2>{props.vacation.destination}</h2>
                            <h5>Price: ${props.vacation.price}</h5>
                            <h5>Followers: {props.vacation.followers}
                            {
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.vacation.followers ? props.vacation.followers + "😍" : props.vacation.followers + "🙋🏼‍♂️"}
                        </Avatar>
                    }
                            </h5>
                            <img src={config.urls.vacationImages + props.vacation?.imageName} alt={props.vacation?.imageName} />
                            <h5>{props.vacation.description}</h5>
                            <h5>{props.vacation.followedByUser}</h5>
                            <h5> <label >From Date:</label>
                                {moment(new Date(props.vacation.fromDate).toLocaleString()).format("DD-MM-YYYY,HH:mm A")}</h5>
                            <h5><label >To Date:</label>
                                {moment(new Date(props.vacation.toDate).toLocaleString()).format("DD-MM-YYYY,HH:mm A")}</h5>
                        </Typography>
                    </Box>
                </Modal>

                <br />
                <div className="Description">
                    <b>{props.vacation.description}</b>
                </div>
                
                <br />
                <b> Price: </b>
                ${props.vacation.price}
                <br />
                <b> Followers: </b>
                {props.vacation.followers ? props.vacation.followers + "🥰" : "No Followers Yet 😢"}
                {/* {vacationsStore.getState().vacations.filter((vacation) => { return vacation.followers === props.vacation.vacationId })} */}
                <br />
                {followedByUser ? "UnCheck To Unfollow" : "Check To Follow"} <Switch  checked={followedByUser} onChange={toggleFollow} />
                {/* <button onClick={clickMe}>Click for Checking</button> */}

            </div>
        </div>
    );
}

export default VacationCard;

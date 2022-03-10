import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import myVacationService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import missingPath from "../../../Assets/Images/PoloVacations16X9.jpg";
import "./UpdateVacation.css";
import notifyService from "../../../Services/NotifyService";
import { Clear, SyncAltTwoTone } from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import authService from "../../../Services/AuthService";
import moment from "moment";
import UpdateIcon from '@mui/icons-material/Update';
import { TextField, Typography,Button, ButtonGroup } from "@mui/material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';


function UpdateVacation(): JSX.Element {
    
    const [vacation, setVacation] = useState<VacationModel>();
    const [minToDate, setMinToDate] = useState<string>();
    const { register, handleSubmit, formState,setValue,setError } = useForm<VacationModel>();
    
    
    const params = useParams();

    useEffect((async () => {
        // on load - set this vacation's values as all inputs default values (except image input)
        try {
            const vacation = await myVacationService.getOneVacation(+params.id);
            setVacation(vacation);
            setValue("description", vacation.description);
            setValue("destination", vacation.destination);
            setValue("price", vacation.price);
            setValue("fromDate", vacation.fromDate);
            setValue("toDate", vacation.toDate);
            const user = await authService.getUser();
            if (user.role !== 2) {
                // this.setState({ redirect: "/login" });
                window.location.replace(config.loginPath);

            } else {
                
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const minDate = tomorrow.toISOString().split("T")[0];
                setMinToDate(minDate); // today + 1 (tomorrow)
            }
        } catch (err:any) {
            alert(err.message)
        }
    }) as any, [vacation]);
    
    
    
    const navigate = useNavigate();

    // minimum from date = today. so that means that is admin wants to edit a vacation which time has past ->
    // he must change the date as well
    const minFromDate = new Date().toISOString().split("T")[0]; // today

    async function submit(vacation: VacationModel) {
        try {
            vacation.vacationId = +params.id;
            await myVacationService.updatePartialVacation(vacation);
            notifyService.success(`Vacation to ${vacation.destination} was updated!`);
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }
    
    function setMinToDateOnChange(args: SyntheticEvent) {
        //Helper function to set minToDate on change of fromDate and toDate
        // get fromDate value, transform it into date-type
        const selectedFromDate = (args.target as HTMLSelectElement).value;

        // if not: transform it into date-type, add 1 day to fromDate, and turn the result back into string
        const selectedDateAsDateType = new Date(selectedFromDate);
        selectedDateAsDateType.setDate(selectedDateAsDateType.getDate() + 1);
        const selectedDateStringType = selectedDateAsDateType.toISOString().split("T")[0];   
        
        // set it as as minimum date on datepicker
        setMinToDate(selectedDateStringType);

        // since there is an existing end date value, check if it's already after new start date
        // if yes: return;
        if (selectedFromDate < vacation.toDate) return;
        // if not: set new default value to toDate
        setValue("toDate", selectedDateStringType);
    }

    // in case admin writes the dates (instead of picking using the picker, which has min date set):
    
    function checkToDate(toDate: string): boolean {
        if (toDate < minToDate) return false;
        if (toDate >= minToDate) return true;
    }

    // custom validation function: checks if fromDate is after/equal to minFromDate 
    function checkFromDate(toDate: string): boolean {
        if (toDate < vacation?.toDate) return true;
        if (toDate >= vacation?.toDate) return false;
    }
    console.log("fromDate");
    console.log("toDate");
    return (
        <div className="UpdateVacation Box">
			

            <Typography variant="h3" className="Header">
          <UpdateIcon />
                 Vacation Update
            </Typography>

            <form onSubmit={handleSubmit(submit)}>
            <SyncAltTwoTone/>
            <span>{formState.errors.destination?.message}</span>
        <TextField label="Destination" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" multiline  {...register("destination", {
            required: { value: true, message: "Missing destination" },
            minLength: { value: 2, message: "destination must be minimum 2 chars" },
            maxLength: { value: 100, message: "destination can't exceed 100 chars" },
          })}
          />
               
                
               <span>{formState.errors.description?.message}</span>
        <TextField label="Description" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" multiline {...register("description", {
            required: { value: true, message: "Missing description" },
            minLength: { value: 2, message: "description must be minimum 2 chars" },
            maxLength: { value: 2000, message: "description can't exceed 2000 chars" },
          })}
          />


                  <span>{formState.errors.price?.message}</span>
                    <TextField label="price" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" type="number"  {...register("price", {
                        required: { value: true, message: "Missing price" },
                        min: { value: 0, message: "Price can't be negative" },
                        max: { value: 100000, message: "Price can't exceed $100000" },
                    })}
                    />

                
                <span>{formState.errors.fromDate?.message}</span>
                <span className="dateSpan">{(moment(vacation?.fromDate).format("DD-MM-YYYY,HH:MM A"))}</span>
                <TextField label="From Date" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" type="datetime-local"
                   min={minFromDate}
                    {...register("fromDate", {
                    required: { value: true, message: "Missing Date" },
                    validate: { value: toDate => checkFromDate(toDate)  === true  || `From date can't be before To date. Please make an initial update to From date and then get back to do an update on From date. The maximal date allow for From date is one day before - ${(moment(vacation?.toDate).format("DD-MM-YYYY,HH:MM A"))} ` },
                    })}
                    onChange={setMinToDateOnChange}
                />
                
               
                    <span>{formState.errors.toDate?.message}</span>
                    <span className="dateSpan">{(moment(vacation?.toDate).format("DD-MM-YYYY,HH:MM A"))}</span>
                <TextField label="To Date" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" type="datetime-local"
                  min={minToDate}
                    {...register("toDate", {
                  required: { value: true, message: "Missing Date" },
                  validate: { value: toDate => checkToDate(toDate) === true  || "To date must be after From date" },
                   })}   
                    />


               
                Current Image:
                <br/>
                <img src={config.urls.vacationImages + vacation?.imageName}
                onError={({ currentTarget }) => {
                if (currentTarget.src !== missingPath ) {
                    currentTarget.src= missingPath;  
                }
                }} />
<span>{formState.errors.image?.message}</span>
        <Button
              variant="contained"
          component="label"
          // fullWidth
          className="TextBox"
            >
          <AddPhotoAlternateIcon />
              Upload File
              <input
                type="file"
            
            {...register("image", {
              required: { value: false, message: "Missing image" },
            })}
                      
              />
            </Button>
                {/* new image is not required */}

                <ButtonGroup variant="contained" fullWidth>
              <Button color="primary" startIcon={<BrowserUpdatedIcon />} type="submit">Update Vacation</Button>
                 <Button color="secondary" startIcon={<Clear />} type="reset">Clear</Button>
        </ButtonGroup>

            </form>
        </div>
    );
}

export default UpdateVacation;


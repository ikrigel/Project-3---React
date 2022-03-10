import { Button, ButtonGroup, Typography,TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddTaskIcon from '@mui/icons-material/AddTask';
import "./AddVacation.css";
import { Clear, LuggageTwoTone } from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function AddVacation(): JSX.Element {
  const navigate = useNavigate();
  const [minToDate, setMinToDate] = useState<string>();
  const minFromDate = new Date().toISOString().split("T")[0];  // today
 


  useEffect((async () => {
      try {
          const user = await authService.getUser();
          if (user.role !== 2) {
              // this.setState({ redirect: "/login" });
              window.location.replace(config.loginPath);

          } else {
            const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
  
          setMinToDate(tomorrow.toISOString().split("T")[0]); // today + 1 (tomorrow)
             

          }
      }
      catch (err: any) {
        alert(err.message);
    }
}) as any, []);
  
  const { register, handleSubmit, formState,setValue } = useForm<VacationModel>();

  async function submit(vacation: VacationModel) {
    try {
      const addedVacation = await vacationsService.addVacation(vacation);
      notifyService.success("Vacation has been added. id: " + addedVacation.vacationId); // In real life - never show ids to the user.
      navigate("/admin-panel");
    } catch (err: any) {
      notifyService.error(err.message);
    }
  }

 

// in case admin writes the dates (instead of picking using the picker, which has min date set):
// custom validation function: checks if toDate is after/equal to minToDate 
// (= fromDate+1, see setMinToDateOnChange)
function checkToDate(toDate: string): boolean {
    if (toDate < minToDate) return false;
    if (toDate >= minToDate) return true;
}

// custom validation function: checks if fromDate is after/equal to minFromDate 
function checkFromDate(fromDate: string, toDate?: string): boolean {
    if (fromDate < minFromDate ) return false;
    if (fromDate >= minFromDate) return true;
}

  return (
    <div className="AddVacation Box">
      
        <form onSubmit={handleSubmit(submit)}>
      <Typography variant="h3" className="Header">
          <FlightTakeoffIcon />
          Add Vacation
       </Typography>
<LuggageTwoTone/>
        <span>{formState.errors.destination?.message}</span>
        <TextField label="Destination" InputLabelProps={{ shrink: true }} variant="outlined" className="TextBox" multiline  {...register("destination", {
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
        <TextField label="From Date" InputLabelProps={{ shrink: true }}  variant="outlined" className="TextBox" type="datetime-local"  {...register("fromDate", {
            required: { value: true, message: "Missing Date" },
            validate: { value: fromDate => checkFromDate(fromDate) === true  || "From date can't be before today" },
         })}
          />
       

        
        <span>{formState.errors.toDate?.message}</span>
        <TextField label="To Date" InputLabelProps={{ shrink: true }} variant="outlined" className="TextBox" type="datetime-local"   {...register("toDate", {
            required: { value: true, message: "Missing Date" },
            validate: { value: toDate => checkToDate(toDate) === true  || "To date must be after from date" },
         })}   
          />
       
       
        
        

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
              required: { value: true, message: "Missing image" },
            })}
                      
          />
         
                {/* <input type="file" accept="image/*" {...register("image")} /> */}
                {/* new image is not required */}
        </Button>
                  

            <ButtonGroup variant="contained" fullWidth>
              <Button color="primary" startIcon={<AddTaskIcon />} type="submit">Add Vacation</Button>
                 <Button color="secondary" startIcon={<Clear />} type="reset">Clear</Button>
        </ButtonGroup>

      </form>
    </div>
  );
}

export default AddVacation;



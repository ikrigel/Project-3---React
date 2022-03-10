import "./ContactUs.css";
import { Typography, TextField, Button, ButtonGroup, FormControlLabel, Checkbox } from "@mui/material";
import { MailOutline, Send, Clear } from "@mui/icons-material";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs Box">

            <Typography variant="h3" className="Header">
                <MailOutline />
                Contact Us
            </Typography>

            <form>

                <TextField label="Name" variant="outlined" className="TextBox" />

                <TextField label="Email" variant="outlined" className="TextBox" type="email" />

                <TextField label="Message" variant="outlined" className="TextBox" />

                <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />

                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary" startIcon={<Send />}>Send</Button>
                    <Button color="secondary" startIcon={<Clear />} type="reset">Clear</Button>
                </ButtonGroup>

            </form>

        </div>
    );
}

export default ContactUs;

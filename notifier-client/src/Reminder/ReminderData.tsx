import React from "react";
import { Button, TextField } from "@mui/material";
import "./Reminder.css";
import axios from "axios";

export const Reminder = () => {
  const saveDetails = async () => {
    const saveBody = {
      cameraName: (document.getElementById("cameraName") as HTMLInputElement)
        .value,
      ipAddress: (document.getElementById("ipAddress") as HTMLInputElement)
        .value,
      expiryDate: "",
    };

    const expiryDate = new Date();
    expiryDate.setDate(
      Number((document.getElementById("Date") as HTMLInputElement).value)
    );
    expiryDate.setMonth(
      Number((document.getElementById("Month") as HTMLInputElement).value) - 1
    );
    expiryDate.setFullYear(
      Number((document.getElementById("Year") as HTMLInputElement).value)
    );

    saveBody["expiryDate"] = expiryDate.toISOString();

    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/createReminder",
      data: saveBody,
    });

    console.log(response.data);
  };

  return (
    <div>
      <div className="form">
        <TextField
          className="Input"
          id="cameraName"
          variant="outlined"
          label="Camera Name"
        />
        <TextField
          className="Input"
          id="ipAddress"
          variant="outlined"
          label="Ip Address"
        />
        <div className="ReminderInput">
          <TextField id="Date" variant="outlined" label="Date" />
          <TextField id="Month" variant="outlined" label="Month" />
          <TextField id="Year" variant="outlined" label="Year" />
        </div>
      </div>
      <Button variant="contained" onClick={saveDetails}>
        Save
      </Button>
    </div>
  );
};

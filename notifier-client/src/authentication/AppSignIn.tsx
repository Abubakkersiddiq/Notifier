import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import "./AppSignIn.css";

export const SignIn = ({ setSignedIn }: any) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const performAuthentication = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const requestUrl = isSignIn
      ? "http://localhost:8000/login"
      : "http://localhost:8000/signup";

    const response = await axios({
      url: requestUrl,
      method: "POST",
      data: {
        username,
        password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (response && response.data) {
      if (response.data.status) {
        setSignedIn(response.data.status);
      }
    }

    console.log(
      (document.getElementById("username") as HTMLInputElement).value
    );
  };

  return (
    <div>
      <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
      <div className="form">
        <TextField
          className="Input"
          id="username"
          label="Username"
          variant="outlined"
        />
        <div className="Input">
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="text"
            onClick={() => setShowPassword(!showPassword)}
            style={{ margin: "10px 0px 0px 0px", textTransform: "none" }}
          >
            Show Password
          </Button>
        </div>
      </div>
      <Button variant="contained" onClick={performAuthentication}>
        {isSignIn ? "Sign In" : "Sign Up"}
      </Button>
      {!isSignIn ? (
        <div>
          Already a User?{" "}
          <Button variant="text" onClick={() => setIsSignIn(true)}>
            Sign In
          </Button>
        </div>
      ) : (
        <div>
          Not a User ?
          <Button variant="text" onClick={() => setIsSignIn(false)}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

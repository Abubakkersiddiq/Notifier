import React, { useState } from "react";
import "./App.css";
import { SignIn } from "./authentication/AppSignIn";
import { Reminder } from "./Reminder/ReminderData";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <h1>Equinor</h1>
      {!authenticated ? (
        <SignIn setSignedIn={() => setAuthenticated(true)} />
      ) : (
        <Reminder />
      )}
    </div>
  );
}

export default App;

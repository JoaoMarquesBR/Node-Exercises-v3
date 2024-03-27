import React, { useState } from "react";
import { AppBar, Toolbar, Card, Button, Typography, CardContent, Autocomplete, TextField } from "@mui/material";
import "../../App.css";

const options = ["I", "LOve", "JavaScript", "COurses", "From", "Joao Marques"];

const FunctionalStateHookComponentLab12 = () => {
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleAddWord = () => {
    setMessage(message ? `${message} ${word}` : word);
    console.log("add "+ word+" and "+ message)
    setWord("");
  };

  const handleClearWord = () => {
    console.log("clear")
    setWord("")
    setMessage("")
  }


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INFO3139-LAB 12
          </Typography>
        </Toolbar>
      </AppBar>
      <Card style={{ width: '250px', margin: '20px' }}>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          The message is:
        </Typography>

        <CardContent>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField placeholder="Pick a word" {...params} label="Pick a word" variant="outlined" />
            )}
            onChange={(event, value) => handleAddWord(value)}
            // onClear={handleClearWord}
            clearOnEscape
          />

          <Typography variant="body1" style={{ marginTop: '20px', color: 'red' }}>
            Message is {`${message}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunctionalStateHookComponentLab12;

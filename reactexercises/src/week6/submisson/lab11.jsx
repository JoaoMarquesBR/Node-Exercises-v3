import React, { useState } from "react";
import { AppBar, Toolbar, Card, TextField, Button, Typography, CardContent } from "@mui/material";
import "../App.css";

const FunctionalStateHookComponentLab11 = () => {
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleAddWord = () => {
    setMessage(message ? `${message} ${word}` : word);
    setWord("");
  };

  const handleClearWord = () => {
    setWord("")
    setMessage("")
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INFO3139-LAB 11
          </Typography>
        </Toolbar>
      </AppBar>
      <Card style={{ margin: '20px' }}>

        <Typography variant="body1" style={{ marginTop: '20px' }}>
          The message is:
        </Typography>

        <Typography variant="body1" style={{ marginTop: '20px' }}>
          {`${message}`}
        </Typography>

        <CardContent>
          <TextField
            label="Enter a word"
            variant="outlined"
            value={word}
            onChange={handleWordChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddWord}
            style={{ marginLeft: '10px' }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearWord}
            style={{ marginLeft: '10px' }}
          >
            Clear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunctionalStateHookComponentLab11;

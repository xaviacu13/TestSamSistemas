import React from "react";
import { Typography, Button } from "@mui/material";

const Home = () => {
  return (
    <>
      <div>
        <Typography variant="h4">Welcome to Sam sistemas</Typography>
        <Typography variant="h6">By Xavier Acuña</Typography>
        <img
          src="https://concepto.de/wp-content/uploads/2018/02/sistemas-de-informacion.jpg"
          alt="sam"
        />
      </div>
      <div>
        <a href="/register">
          <Button variant="contained" size="large">
            Go to Test
          </Button>
        </a>
      </div>
    </>
  );
};

export default Home;

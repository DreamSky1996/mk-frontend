import React from "react";
import Button from "@mui/material/Button";

const NoMatch = () => {
  return (
    <div>
      <h1 style={{ position: "absolute", top: "30%", left: "30%" }}>
        Page not found, please Go back to the home page
      </h1>
      <Button
        variant="contained"
        href="/"
        style={{ position: "absolute", top: "40%", left: "44%" }}
      >
        Home
      </Button>
    </div>
  );
};

export default NoMatch;

import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./buttonBar.css";

const ButtonBar = ({
  homePageCallback,
  nextButtonCallback,
  finish,
  isStep1,
  disableNext,
}) => {
  const skipButton = {
    background: "rgb(53, 160, 238, 10%)",
    color: "#35A0EE",
    textTransform: "none",
    fontWeight: "600",
  };

  const backButton = {
    textTransform: "none",
    color: "#35A0EE",
    fontWeight: "600",
  };

  return (
    <div>
      <Stack spacing={2} direction="row" className="container">
        <Button variant="text" style={backButton} onClick={homePageCallback}>
          <KeyboardBackspaceIcon /> {isStep1? "Back to the homepage": "Back to previous page"}
        </Button>

        <div>
          <Button
           
            variant="contained"
            disableElevation
            style={skipButton}
          >
            Skip for now
          </Button>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={nextButtonCallback}
            disabled={disableNext}
          >
            {finish ? "Finish" : "Next Step"}
            {finish ? "" : <ArrowRightAltIcon />}
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default ButtonBar;

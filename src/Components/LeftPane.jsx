import React from "react";
import "./leftPane.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import logo from "../Assets/Exclamation.png";

const styles = {
  stepper: {
    font: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize:"16px",
    },
  },
  card: {
    main: {
      padding: "30px",
    },
    fontText: {
      marginTop: "20px",
      textAlign: "left",
    },
  },
};

const LeftPane = () => {
  const { id } = useParams();

  const steps = [
    "Contact Details",
    "Investment Plans",
    "Investment Preferences",
  ];

  return (
    <div className="container-main">
      <div className="container-logo">
        <h3 className="header">
          <span style={{ color: "#FFFFFF" }}>UNITED</span>
          <span style={{ color: "#FFFFFF", opacity: 0.5 }}> PROPERTIES</span>
        </h3>
      </div>

      <div>
        <Stepper activeStep={id - 1} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="caption" style={styles.stepper.font}>
                  {step}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="card-container">
        <div className="icon-container">
          {" "}
          <img src={logo} alt="no content" className="card-icon"></img>
        </div>
        <Card className="card-main">
          <CardContent style={styles.card.main}>
            <Typography component="div">
              <Box
                className="box-1"
                sx={{
                  typography: "body2",
                }}
              >
                We care about your time, that's why we created a 3-stage
                onboarding that will not take more than 5 minutes to complete.
              </Box>
              <Box className="box-2">William Mac</Box>
              <div className="box-2-sub">
                <Box
                  className="box-3"
                  sx={{
                    typography: "body2",
                    fontSize: 12,
                  }}
                >
                  CO FOUNDER, INVESTER
                </Box>
                <h2 className="h2">
                  <span style={{ color: "#000000" }}>U</span>
                  <span style={{ color: "#2696E8" }}>P</span>
                </h2>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeftPane;

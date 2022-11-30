import React, { useState } from "react";
import { FormGroup, RadioGroup } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonBar from "../Components/ButtonBar";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../app/store";
import { toStep3Pressed } from "../Pages/UserOnboarding/userOnboardingSlice";

const InvestmentPlans = () => {
  const valueToPercentage = (value) => {
    if (value >= 500000) {
      return 100;
    } else if (value >= 200000) {
      return 80;
    } else if (value >= 100000) {
      return 60;
    } else if (value >= 50000) {
      return 40;
    } else if (value >= 10000) {
      return 20;
    } else {
      return 0;
    }
  };

  const state = useSelector((state) => state.userOnboarding.step2);
  const navigate = useNavigate();
  const [startValue, setStartValue] = useState(state.startValue);
  const [endValue, setEndValue] = useState(state.endValue);
  const [value, setValue] = useState([
    valueToPercentage(state.startValue),
    valueToPercentage(state.edValue),
  ]);
  const [isInvestor, setIsInvestor] = useState(false);

  const marks = [
    {
      value: 0,
      label: "$10000",
    },
    {
      value: 20,
      label: "$50000",
    },
    {
      value: 40,
      label: "$100,000",
    },
    {
      value: 60,
      label: "$200,000",
    },
    {
      value: 80,
      label: "$500,000",
    },
    {
      value: 100,
      label: "$1,000,000",
    },
  ];
  const mainFont = {
    fontFamily: "Montserrat Alternates",
  };
  const containerStyle = {
    paddingLeft: "15%",
    paddingRight: "15%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  };
  const radioGroupStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const investmentForm = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    alignItems: "flex-end",
    flexWrap: "nowrap",
    gap: "2%",
  };

  const radioStyle = {
    borderStyle: "solid",
    borderWidth: "0.8px",
    paddingRight: "20px",
    paddingLeft: "10px",
    borderColor: isInvestor ? "#35A0EE" : "#D5D9DC",
    borderRadius: "5px",
    color: isInvestor ? "#35A0EE" : "#D5D9DC",
  };

  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
    height: 2,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: 10,
      width: 10,
      backgroundColor: "blue",
      borderRadius: "0",

      "&:focus, &:hover, &.Mui-active": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {},
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -6,
      backgroundColor: "unset",
      color: theme.palette.text.primary,
      "&:before": {},
      "& *": {
        background: "transparent",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      backgroundColor: "#bfbfbf",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "#bfbfbf",
      height: 8,
      width: 1,
      "&.MuiSlider-markActive": {
        opacity: 1,
        backgroundColor: "currentColor",
      },
    },
  }));

  const sliderChange = (event, value) => {
    let lowVal = value[0];
    let highVal = value[1];

    lowVal = Math.round(lowVal / 20) * 20;
    highVal = Math.round(highVal / 20) * 20;

    let newVal = [lowVal, highVal];
    setValue(newVal);
    setStartValue(percentageToValue(lowVal));
    setEndValue(percentageToValue(highVal));
  };

  const percentageToValue = (percentValue) => {
    if (percentValue === 100) {
      return 1000000;
    } else if (percentValue === 80) {
      return 500000;
    } else if (percentValue === 60) {
      return 200000;
    } else if (percentValue === 40) {
      return 100000;
    } else if (percentValue === 20) {
      return 50000;
    } else {
      return 10000;
    }
  };

  const calculatePair = (start, end) => {
    let stValue = valueToPercentage(start);
    let edValue = valueToPercentage(end);
    stValue = Math.round(stValue / 20) * 20;
    edValue = Math.round(edValue / 20) * 20;
    setValue([stValue, edValue]);
  };

  const handleStartInput = () => {
    console.log(startValue);
    console.log(endValue);
    if (startValue > endValue) {
      setStartValue(0);
      calculatePair(0, endValue);
    }
    calculatePair(startValue, endValue);
  };

  const handleEndInput = () => {
    console.log(startValue);
    console.log(endValue);
    if (startValue > endValue) {
      setEndValue(1000000);
      calculatePair(startValue, 1000000);
    }
    calculatePair(startValue, endValue);
  };

  const saveState = () => {
    let obj = {
      startValue: startValue,
      endValue: endValue,
      isInvestor: isInvestor,
    };
    store.dispatch(toStep3Pressed({ step2Data: obj }));
  };

  const handleNexButton = () => {
    saveState();
    navigate("/steps/3");
  };

  const handlePrevPageButton = () => {
    saveState();
    navigate("/steps/1");
  };

  return (
    <div style={containerStyle}>
      <div>
        <TopBar step={2} />{" "}
        <h2 align="left" style={mainFont}>
          Investment Plans
        </h2>
        <p align="left" style={{ color: "rgba(8,8,8,40%)" }}>
          Let us know about your investment plans. This will help us get you to
          the right expert who will help you further.
        </p>
        <h4 align="left">How much are you planning to invest in this year?</h4>
        <FormGroup style={investmentForm}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">From</InputLabel>
            <Input
              id="standard-adornment-amount"
              onChange={(event) => setStartValue(event.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onBlur={handleStartInput}
              value={startValue}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">To</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              InputLabelProps={{ shrink: true }}
              onChange={(event) => setEndValue(event.target.value)}
              value={endValue}
              onBlur={handleEndInput}
            />
          </FormControl>
        </FormGroup>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <IOSSlider
            style={{ marginTop: "5%" }}
            aria-label="ios slider"
            value={value}
            marks={marks}
            valueLabelDisplay="on"
            onChange={sliderChange}
          />
        </div>
        <h4 align="left">Are you an accredited investor?</h4>
        <FormControl style={{ display: "flex" }}>
          <RadioGroup
            style={radioGroupStyle}
            onChange={(event, value) => setIsInvestor(value)}
            value={isInvestor}
          >
            <FormControlLabel
              style={radioStyle}
              value={true}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              style={radioStyle}
              value={false}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <ButtonBar
        homePageCallback={handlePrevPageButton}
        nextButtonCallback={handleNexButton}
      />
    </div>
  );
};

export default InvestmentPlans;

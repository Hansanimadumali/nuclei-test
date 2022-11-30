import React, { useEffect, useState } from "react";
import "./contactDetails.css";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FormGroup } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ButtonBar from "../Components/ButtonBar";
import TopBar from "./TopBar";
import {
  validateEmail,
  validateName,
  validateTelephone,
} from "../Services/validations";
import { useNavigate } from "react-router-dom";
import store from "../app/store";
import { toStep2Pressed } from "../Pages/UserOnboarding/userOnboardingSlice";
import { useSelector } from "react-redux";

const textFieldStyles = {
  textField: { marginBottom: "10px" },
  input: {
    fontSize: 30,
  },
};

const ContactDetails = () => {
  const countries = [
    {
      value: "Ukraine",
      label: "Ukraine",
    },
    {
      value: "United States",
      label: "United States",
    },
    {
      value: "Sri Lanka",
      label: "Sri Lanka",
    },
    {
      value: "India",
      label: "India",
    },
  ];

  const state = useSelector((state) => state.userOnboarding.step1);

  const navigate = useNavigate();
  const [fullName, setFullName] = useState(state.fullName);
  const [isFullNameError, setIsFullNameError] = useState(false);
  const [fullNameHelper, setFullNameHelper] = useState(" ");
  const [telephone, setTelephone] = useState(state.telephone);
  const [isTelephoneError, setIstelephoneError] = useState(false);
  const [telephoenHelper, setTelephoneHelper] = useState(" ");
  const [email, setEmail] = useState(state.email);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState(" ");
  const [country, setCountry] = useState("United States");
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    // disable and enable next button on data
    let empty = fullName === "" || telephone === "" || email === "";
    let error = isEmailError || isTelephoneError || isFullNameError;

    if (!empty && !error) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [
    isEmailError,
    isTelephoneError,
    isFullNameError,
    fullName,
    telephone,
    email,
  ]);

  const validateFields = (field) => {
    switch (field) {
      case "fullName": {
        const result = validateName(fullName);
        if (result.error) {
          setIsFullNameError(true);
          setFullNameHelper(result.error.details[0].message);
        } else {
          setIsFullNameError(false);
          setFullNameHelper(" ");
        }
        break;
      }
      case "telephone": {
        const result = validateTelephone(telephone);
        if (result.error) {
          setIstelephoneError(true);
          setTelephoneHelper(result.error.details[0].message);
        } else {
          setIstelephoneError(false);
          setTelephoneHelper(" ");
        }
        break;
      }
      case "email": {
        const result = validateEmail(email);
        if (result.error) {
          setIsEmailError(true);
          setEmailHelper(result.error.details[0].message);
        } else {
          setIsEmailError(false);
          setEmailHelper(" ");
        }
        break;
      }
      default: {
      }
    }
  };

  const handleNexButton = () => {
    let obj = {
      fullName: fullName,
      telephone: telephone,
      email: email,
      country: country,
    };
    store.dispatch(toStep2Pressed({ step1Data: obj }));
    navigate("/steps/2");
  };

  const handleHomePageButton = () => {
    navigate("/steps/1");
  };

  return (
    <div id="container">
      <div>
        <TopBar step={1} />

        <h2 className="text1" align="left">
          Contact details
        </h2>

        <p align="left" className="main-text">
          Welcome to United Properties, we are glad to see you! Let's get
          started by letting us know a little bit about you
        </p>

        <FormGroup id="form">
          <TextField
            error={isFullNameError}
            label="Full name"
            id="form-fullname"
            fullWidth
            size="small"
            variant="standard"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
            helperText={fullNameHelper}
            onBlur={() => validateFields("fullName")}
            inputProps={{ "data-testid": "form-fullname" }}
            InputLabelProps={{
              classes: {
                root: textFieldStyles.input,
              },
            }}
            style={textFieldStyles.textField}
          />
          <TextField
            error={isTelephoneError}
            label="mobile"
            id="form-mobile"
            type="number"
            fullWidth
            variant="standard"
            value={telephone}
            onChange={(event) => {
              setTelephone(event.target.value);
            }}
            helperText={telephoenHelper}
            onBlur={() => validateFields("telephone")}
            inputProps={{ "data-testid": "form-mobile" }}
            style={textFieldStyles.textField}
          />
        </FormGroup>

        <div>
          <TextField
            error={isEmailError}
            label="E-mail Address"
            id="form-email"
            fullWidth
            size="small"
            variant="standard"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            helperText={emailHelper}
            onBlur={() => validateFields("email")}
            inputProps={{
              "data-testid": "form-email",
              classes: {
                input: textFieldStyles.input,
              },
            }}
            InputLabelProps={{
              classes: {
                root: textFieldStyles.input,
              },
            }}
            style={textFieldStyles.textField}
          />
        </div>
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Country"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
            value={country}
            align="left"
            style={textFieldStyles.textField}
            inputProps={{
              classes: {
                input: { align: "left" },
              },
            }}
            InputLabelProps={{
              classes: {
                root: { align: "left" },
              },
            }}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <h4 className="text2" align="left">
            Privacy Policy
          </h4>
          <p align="left" className="main-text">
            We know you care about how your personal information used and
            shared, so we take your privacy seriously.
          </p>
          <a href="www.google.com" id="link">
            <div>Expand Privacy policy</div> <ArrowRightAltIcon />
          </a>
        </div>
      </div>

      <ButtonBar
        homePageCallback={handleHomePageButton}
        nextButtonCallback={handleNexButton}
        disableNext={disableButton}
        isStep1
      />
    </div>
  );
};

export default ContactDetails;

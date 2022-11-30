import React from "react";
import "./topBar.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const TopBar = ({ step }) => {
  return (
    <div className="container">
      <div className="font-steps">STEP {step} OF 3</div>
      <div className="font-text2">
        Lost or have trouble? {"   "}
        <a className="link" href="https://www.w3schools.com">
          Get help <ArrowRightAltIcon />
        </a>
      </div>
    </div>
  );
};

export default TopBar;

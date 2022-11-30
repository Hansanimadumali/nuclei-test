import React, { useState } from "react";
import "./investmentPref.css";
import ButtonBar from "../Components/ButtonBar";
import TopBar from "./TopBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../app/store";
import { finishPressed } from "../Pages/UserOnboarding/userOnboardingSlice";

const InvestmentPref = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => state.userOnboarding.step3);

  const [selectedCards, setSelectedCards] = useState(
    new Set(state.preferences)
  );
  const cardDetails = [
    { key: "1", value: "Single family" },
    { key: "2", value: "Residential multifamily" },
    { key: "3", value: "Commercial Retail" },
    { key: "4", value: "Commercial Industrial" },
    { key: "5", value: "Commercial Hospitality" },
    { key: "6", value: "Commercial Wearhousing" },
    { key: "7", value: "Commercial Office" },
    { key: "8", value: "Other" },
  ];

  const saveState = () => {
    let obj = {
      preferences: Array.from(selectedCards),
    };
    store.dispatch(finishPressed({ step3Data: obj }));
  };

  const handleNexButton = () => {};

  const handleHomePageButton = () => {
    saveState();
    navigate("/steps/2");
  };
  const mainFont = {
    fontFamily: "Montserrat Alternates",
  };
  return (
    <div className="step3-container">
      <div>
        <TopBar step={3} />
        <h2 align="left" style={mainFont}>
          Investment preferences
        </h2>
        <p align="left" style={{ color: "rgba(8,8,8,40%)" }}>
          This will help us figure out what your investment options are so that
          we can show you only possibly intresting for you deals
        </p>
      </div>
      <div>
        <h3 align="left" style={{ marginBottom: "40px" }}>
          What kind of real estate are you interested in?
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {cardDetails.map(({ key, value }) => {
            const selected = selectedCards.has(key);
            return (
              <Card
                className={selected ? "card-selected" : null}
                key={key}
                variant="outlined"
                onClick={() => {
                  if (selected) {
                    const cardList = new Set(selectedCards);
                    cardList.delete(key);
                    setSelectedCards(cardList);
                  } else {
                    const cardList = new Set(selectedCards);
                    cardList.add(key);
                    setSelectedCards(cardList);
                  }
                }}
                sx={() => ({
                  maxWidth: "136px",
                  minWidth: "136px",
                  maxHeight: "148px",
                  "&:hover": {
                    borderColor: "rgb(53, 160, 238)",
                    transform: "translateY(-2px)",
                  },
                  "&:selection": {
                    borderColor: "rgb(53, 160, 238)",
                  },
                })}
              >
                <CardContent id="checkbox">
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <Checkbox checked={selected} />
                  </Typography>
                </CardContent>
                <CardActions className={selected ? "selected" : "unselected"}>
                  {value}
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
      <ButtonBar
        homePageCallback={handleHomePageButton}
        nextButtonCallback={handleNexButton}
        finish={true}
      />
    </div>
  );
};

export default InvestmentPref;

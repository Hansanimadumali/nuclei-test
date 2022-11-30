import { Grid } from "@mui/material";
import React from "react";
import LeftPane from "../../Components/LeftPane";
import { useParams } from "react-router-dom";
import ContactDetails from "../../Components/ContactDetails";
import InvestmentPref from "../../Components/InvestmentPref";
import InvestmentPlans from "../../Components/InvestmentPlans";

const UserOnboarding = () => {
  const { id } = useParams();

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          color={{ background: "#2696E8" }}
          style={{ height: "100vh" }}
        >
          <LeftPane />
        </Grid>
        <Grid item xs={8} md={8} lg={8} color={{ background: "#fffff" }}>
          {id === "1" ? (
            <ContactDetails />
          ) : id === "2" ? (
            <InvestmentPlans />
          ) : id === "3" ? (
            <InvestmentPref />
          ) : (
            <ContactDetails />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserOnboarding;

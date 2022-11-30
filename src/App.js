import logo from "./logo.svg";
import "./App.css";
import UserOnboarding from "./Pages/UserOnboarding/UserOnboarding";
import ErrorPage from "./Pages/ErrorPage";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ContactDetails from "./Components/ContactDetails";
import InvestmentPlans from "./Components/InvestmentPlans";
import InvestmentPref from "./Components/InvestmentPref";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserOnboarding />,
    errorElement: <ErrorPage />,
  },
  {
    path: "steps/:id",
    element: <UserOnboarding/>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

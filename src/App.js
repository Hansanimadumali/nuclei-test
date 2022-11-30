import "./App.css";
import UserOnboarding from "./Pages/UserOnboarding/UserOnboarding";
import ErrorPage from "./Pages/ErrorPage";

import { createBrowserRouter, RouterProvider} from "react-router-dom";

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

import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PersonalDetails from "./components/personalDetails/PersonalDetails";
import Main from "./components/main/Main";
import useToken from "./useToken";
import NavBar from "./components/navigation/Navbar";

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Main setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <h1>Expense Tracker</h1>
      <BrowserRouter>
        <NavBar setToken={setToken} />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/personalDetails">
            <PersonalDetails setToken={setToken} />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </BrowserRouter>
      <div className="registration"></div>
    </div>
  );
};

export default App;

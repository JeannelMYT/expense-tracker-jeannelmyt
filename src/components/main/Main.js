import Login from "../login/Login";
import Registration from "../registration/Registration";
import "./Main.css";

export default function Main(props) {
  return (
    <div className="main">
      <Registration />
      <Login setToken={props.setToken} />
    </div>
  );
}

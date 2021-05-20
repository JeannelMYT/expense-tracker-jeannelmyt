import { useState } from "react";
import FormWrapperCard from "../cards/FormCard";

const Registration = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const usernameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const registered = await registerUser({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    });
    if (registered.statusCode === 400) {
      setErrorMessage(registered.message);
    } else if (!registered.statusCode) {
      setSuccessMessage("Registration Success! Please login!");
    }
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <FormWrapperCard>
      <h1 className="title">Registration</h1>
      <form className="form" onSubmit={submitHandler}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={userInput.username}
            maxlength="12"
            required
            onChange={usernameChangeHandler}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={userInput.email}
            required
            onChange={emailChangeHandler}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={userInput.password}
            minLength="8"
            required
            onChange={passwordChangeHandler}
          />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
      <h4 className="error">{errorMessage}</h4>
      <h4 className="success">{successMessage}</h4>
    </FormWrapperCard>
  );
};

const registerUser = async (credentials) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export default Registration;

import { useState } from "react";
import FormWrapperCard from "../cards/FormCard";

const Registration = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    message: "",
  });

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
  const errorMessageChangeHandler = (message) => {
    setErrorMessage(() => {
      return { message };
    });
  };
  const successMessageChangeHandler = (message) => {
    setSuccessMessage(() => {
      return { message };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    errorMessageChangeHandler("");
    successMessageChangeHandler("");
    const registered = await registerUser({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    });
    if (registered.statusCode === 400) {
      errorMessageChangeHandler(registered.message);
    } else if (!registered.statusCode) {
      successMessageChangeHandler("Registration Success! Please login!");
    }
  };

  return (
    <FormWrapperCard>
      <h1 className="title">Registration</h1>
      <form className="form" onSubmit={submitHandler}>
        <label>
          <p>Username</p>
          <input type="text" required onChange={usernameChangeHandler} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" required onChange={emailChangeHandler} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" required onChange={passwordChangeHandler} />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
      <h4 className="error">{errorMessage.message}</h4>
      <h4 className="success">{successMessage.message}</h4>
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

import { useState, useEffect } from "react";
import FormWrapperCard from "../cards/FormCard";

const ExpenseCU = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    //eslint-disable-next-line
    let mounted = true;
    if (props.isEdit) {
      setUserInput({
        expense: props.expense.expense,
        date: props.expense.date,
        amount: props.expense.amount,
      });
    }
    return () => (mounted = false);
    //eslint-disable-next-line
  }, [props.expense]);

  const [userInput, setUserInput] = useState({
    expense: "",
    date: "",
    amount: "",
  });
  console.log(userInput);

  const expenseChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, expense: event.target.value };
    });
  };
  const dateChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, date: event.target.value };
    });
  };
  const amountChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, amount: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    props.setErrorMessage("");
    props.setSuccessMessage("");
    if (!props.isEdit) {
      const created = await createExpense(token, {
        expense: userInput.expense,
        date: userInput.date,
        amount: userInput.amount,
      });
      if (created.statusCode === 400) {
        props.setErrorMessage(created.message);
      } else if (!created.statusCode) {
        props.setSuccessMessage("Expense created!");
      }
    } else if (props.isEdit) {
      console.log("props " + props.expense.id);
      const updated = await updateExpense(token, {
        id: props.expense.id,
        expense: userInput.expense,
        date: userInput.date,
        amount: userInput.amount,
      });
      if (updated.statusCode === 400) {
        props.setErrorMessage(updated.message);
      } else if (!updated.statusCode) {
        props.setSuccessMessage("Expense Updated!");
      }
      props.setEdit(false);
    }
    setUserInput({
      expense: "",
      date: "",
      amount: "",
    });
    props.setReload(true);
  };

  return (
    <FormWrapperCard>
      <h4 className="title">Create/Update Expense</h4>
      <form className="form" onSubmit={submitHandler}>
        <label>
          <p>Expense</p>
          <input
            type="text"
            value={userInput.expense}
            required
            onChange={expenseChangeHandler}
          />
        </label>
        <label>
          <p>Date</p>
          <input
            type="date"
            value={userInput.date}
            required
            onChange={dateChangeHandler}
          />
        </label>
        <label>
          <p>Amount</p>
          <input
            type="number"
            value={userInput.amount}
            required
            onChange={amountChangeHandler}
          />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </FormWrapperCard>
  );
};

const createExpense = async (token, expense) => {
  return fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      userId: token.userId,
      expense: expense.expense,
      date: expense.date,
      amount: expense.amount,
    }),
  }).then((data) => data.json());
};

const updateExpense = async (token, expense) => {
  console.log("JSON " + JSON.stringify(expense));
  return fetch(
    `${process.env.REACT_APP_API_URL}/expenses/${JSON.stringify(expense.id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        expense: expense.expense,
        date: expense.date,
        amount: expense.amount,
      }),
    }
  ).then((data) => data.json());
};

export default ExpenseCU;

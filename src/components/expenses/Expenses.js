import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "./Expenses.css";
import ExpenseCU from "./ExpenseCU";
const Expenses = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({
    expenseId: "",
    expense: "",
    amount: "",
    date: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reload, setReload] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    let mounted = true;
    setReload(false);
    getAllExpenses(token).then((expenses) => {
      if (mounted) {
        setExpenses(expenses);
      }
    });
    return () => (mounted = false);
    //eslint-disable-next-line
  }, [reload]);

  const editHandler = (item) => {
    setErrorMessage("");
    setSuccessMessage(" ");
    setExpense(item);
    setEdit(false);
    setEdit(true);
  };
  const deleteHandler = async (item) => {
    setErrorMessage("");
    setSuccessMessage("");
    if (window.confirm("Delete this expense?")) {
      const deleted = await deleteExpense(token, item.id);
      if (deleted.statusCode === 400) {
        setErrorMessage("Error deleting message");
      } else if (!deleted.statusCode) {
        setSuccessMessage("Expense deleted!");
        setReload(true);
      }
    }
  };

  const data = useMemo(() => expenses, [expenses]);

  let columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Expense",
        accessor: "expense",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: " ",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => editHandler(row.original)}>Edit</button>
            <button onClick={() => deleteHandler(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="expenses">
      <div className="expenses-left">
        <div className="expenses-messages">
          <h4 className="error">{errorMessage}</h4>
          <h4 className="success">{successMessage}</h4>
        </div>
        <table className="expenses-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="table-header" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="table-data" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="expense-create-update">
        {isEdit}
        <ExpenseCU
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          expense={expense}
          setEdit={setEdit}
          isEdit={isEdit}
          setReload={setReload}
        />
      </div>
    </div>
  );
};

export default Expenses;

const getAllExpenses = (token) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/expenses/getAllExpenses/${token.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  ).then((data) => data.json());
};

const deleteExpense = (token, expenseId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/expenses/${expenseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
  }).then((data) => data.json());
};

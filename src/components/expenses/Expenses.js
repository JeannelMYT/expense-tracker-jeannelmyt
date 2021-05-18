import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "./Expenses.css";
const Expenses = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [expenses, setExpenses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    let mounted = true;
    setReload(true);
    getAllExpenses(token).then((expenses) => {
      if (mounted) {
        setExpenses(expenses);
      }
    });
    return () => (mounted = false);
    //eslint-disable-next-line
  }, [reload]);

  const editHandler = (item) => {
    console.log(item);
  };
  const deleteHandler = (item) => {
    if (window.confirm("Delete this expense?")) {
      deleteExpense(token, item.id);
      setSuccessMessage("Expense deleted!");
      setReload(false);
    }
  };

  const data = useMemo(() => expenses, [expenses]);

  const columns = useMemo(
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
        Header: "head",
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
      <h4 className="success-message">{successMessage}</h4>
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

import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import PoolTableModel from "./PoolTableModel";
import { UserContext } from "../context/UserContext";

const Table = () => {
  const [token] = useContext(UserContext);
  const [poolTables, setPoolTables] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModel, setActiveModel] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModel(true);
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/pooltables/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to delete pool table");
    }

    getPoolTables();
  };

  const getPoolTables = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("/api/pooltables", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the pooltables");
    } else {
      const data = await response.json();
      setPoolTables(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getPoolTables();
  }, []);

  const handleModel = () => {
    setActiveModel(!activeModel);
    getPoolTables();
    setId(null);
  };

  return (
    <>
      <PoolTableModel
        active={activeModel}
        handleModel={handleModel}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <button
        className="button is-fullwidth mb-5 is-primary"
        onClick={() => setActiveModel(true)}
      >
        Create Lead
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && poolTables ? (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Number Of Pool Tables</th>
              <th>Days With Discounted Pool</th>
              <th>Hours</th>
              <th>Rating</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {poolTables.map((poolTable) => (
              <tr key={poolTable.id}>
                <td>{poolTable.location_name}</td>
                <td>{poolTable.num_of_pool_tables}</td>
                <td>{poolTable.discounted_days}</td>
                <td>{poolTable.hours}</td>
                <td>{poolTable.rating}</td>
                <td>{moment(poolTable.date_last_updated).format("MMM Do YY")}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => handleUpdate(poolTable.id)}
                  >
                    Update
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
                    onClick={() => handleDelete(poolTable.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Table;

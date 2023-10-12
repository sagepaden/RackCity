import React, { useEffect, useState } from "react";

const PoolTableModel = ({ active, handleModel, token, id, setErrorMessage }) => {
  const [locationName, setLocationName] = useState("");
  const [numOfPoolTables, setNumOfPoolTables] = useState("");
  const [discountedDays, setDiscountedDays] = useState("");
  const [hours, setHours] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const getPoolTable = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/pooltables/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the pool table");
      } else {
        const data = await response.json();
        setLocationName(data.location_name);
        setNumOfPoolTables(data.num_of_pool_tables);
        setDiscountedDays(data.discounted_days);
        setHours(data.hours);
        setRating(data.rating);
      }
    };

    if (id) {
      getPoolTable();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setLocationName("");
    setNumOfPoolTables("");
    setdiscounted_days("");
    setHours("");
    setRating("");
  };

  const handleCreatePoolTable = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: locationName,
        num_of_pool_tables: numOfPoolTables,
        discounted_days: discountedDays,
        hours: hours,
        rating: rating,
      }),
    };
    const response = await fetch("/api/leads", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating lead");
    } else {
      cleanFormData();
      handleModel();
    }
  };

  const handleUpdatePoolTable = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: locationName,
        num_of_pool_tables: numOfPoolTables,
        discounted_days: discountedDays,
        hours: hours,
        rating: rating,
      }),
    };
    const response = await fetch(`/api/leads/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating lead");
    } else {
      cleanFormData();
      handleModel();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModel}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Update Lead" : "Create Lead"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Location Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Location Name"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Number of Pool Tables</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Number of Pool Tables"
                  value={numOfPoolTables}
                  onChange={(e) => setNumOfPoolTables(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Days With Discounted Pool</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Discounted Days"
                  value={discountedDays}
                  onChange={(e) => setdiscountedDays(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Location Hours</label>
              <div className="control">
                <input
                  type="hours"
                  placeholder="Enter Location's Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Your Rating of The Location</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdatePoolTable}>
              Update Pool Table
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreatePoolTable}>
              Create Pool Table
            </button>
          )}
          <button className="button" onClick={handleModel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PoolTableModel;

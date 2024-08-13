import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function Dashboard({ user }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const response = await API.get("dataAPI", "/data");
      setData(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        {data.map((item) => (
          <li key={item.Id}>{item.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

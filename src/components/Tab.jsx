// import { useContext } from "react";
// import { Welcome } from "./sample/Welcome";
// import { TeamsFxContext } from "./Context";
// import config from "./sample/lib/config";

// const showFunction = Boolean(config.apiName);

// export default function Tab() {
//   const { themeString } = useContext(TeamsFxContext);
//   return (
//     <div
//       className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
//     >
//       <Welcome showFunction={showFunction} />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

const Tab = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://adf-guardians-status-app.azurewebsites.net/api/get-adf-status")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        setError("Failed to load ADF status.");
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
      <h2>ADF Daily Pipeline Status</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>ADF Name</th>
            <th style={th}>Pipeline Name</th>
            <th style={th}>Start Time</th>
            <th style={th}>End Time</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td style={td}>{item.adf_name}</td>
              <td style={td}>{item.pipeline_name}</td>
              <td style={td}>{new Date(item.start_time).toLocaleString()}</td>
              <td style={td}>{new Date(item.end_time).toLocaleString()}</td>
              <td style={{ ...td, color: item.status === "Succeeded" ? "green" : "red" }}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left"
};

const td = {
  border: "1px solid #ccc",
  padding: "8px"
};

export default Tab;
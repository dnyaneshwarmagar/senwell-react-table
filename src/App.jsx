import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    let res = await fetch("https://lead-app-mern.vercel.app/");
    let data = await res.json();
    // console.log("data: ", data);
    let arr = manageData(data);
    // console.log("arr: ", arr);
    setData(arr);
  }
  function manageData(users) {
    // console.log("users: ", users);
    const nameCount = {};
    users.forEach((user) => {
      const name = user.name;
      nameCount[name] = (nameCount[name] || 0) + 1;
    });
    // Convert to array of objects
    return Object.entries(nameCount).map(([name, count]) => ({ name, count }));
  }

  const getRowColor = (count) => {
    if (count > 10) return "green";
    if (count > 2 && count < 10) return "yellow";
    if (count > 0 && count <= 2) return "red";
    return "white";
  };
  return (
    <div>
      <h1>Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Repetition Count</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((entry, index) => (
            <tr
              key={index}
              style={{ backgroundColor: getRowColor(entry.count) }}
            >
              <td>{entry.name}</td>
              <td>{entry.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

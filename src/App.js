import "./App.css";
import List from "./components/List";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [totalPagesAmount, setTotalPagesAmount] = useState(1);
  const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handlerToDownLoadLauncher(4)
      .then((response) => {
        setLaunches(response.data.docs);
        setTotalPagesAmount(response.data.totalPages);
        setCurrentPage(response.data.page);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlerToDownLoadLauncher = (page) => {
    return axios.post("https://api.spacexdata.com/v5/launches/query", {
      query: {},
      options: {
        page,
      },
    });
  };

  const handlerAddLaunchesButton = () => {
    const newPage = currentPage + 1;
    handlerToDownLoadLauncher(newPage).then((response) => {
      setLaunches((prev) => {
        return [...prev, ...response.data.docs];
      });
    });
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <div>
        <label> Name
          <input />
        </label>
        <label>Flight Number
          <input />
        </label>
        <label> Date
          <input />
        </label>
      </div>
      <List launches={launches} />
      <button onClick={handlerAddLaunchesButton}>Add More</button>
    </div>
  );
}

export default App;

import List from "./components/List";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLanches,
  setPage,
  setTotalPage,
} from "./redux/reducers/launches/launchesSlice";

function App() {
  const [name, setName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");

  const page = useSelector((state) => state.launches.page);
  const lanches = useSelector((state) => state.launches.lanches);
  const totalPages = useSelector((state) => state.launches.totalPages);

  const dispatch = useDispatch();

  useEffect(() => {
    handlerToDownLoadLauncher()
      .then((response) => {
        dispatch(addLanches(response.data.docs));
        dispatch(setTotalPage(response.data.totalPages));
        dispatch(setPage(response.data.page));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlerToDownLoadLauncher = (page) => {
    return axios.post("https://api.spacexdata.com/v5/launches/query", {
      " query": {},
      options: {
        page,
        sort: {
          date_utc: "desc",
        },
      },
    });
  };

  const handlerAddLaunchesButton = () => {
    const newPage = page + 1;

    if (newPage > totalPages) {
      return;
    }

    handlerToDownLoadLauncher(newPage).then((response) => {
      dispatch(addLanches(response.data.docs));
      dispatch(setPage(newPage));
    });
  };

  const filtredByName = (lanches) => {
    return lanches.filter((launch) => {
      return launch.name.toLowerCase().includes(name.toLowerCase().trim());
    });
  };

  const filtredByFlightNumber = (lanches) => {
    if (flightNumber === "") {
      return lanches;
    }

    return lanches.filter((launch) => {
      return launch.flight_number === Number(flightNumber);
    });
  };

  const filtredByDate = (launches) => {
    return launches.filter((launch) => {
      const newDate = new Date(launch.date_unix);

      return newDate.toLocaleDateString().includes(date.toLowerCase().trim());
    });
  };
  const launchesFilteredByName = filtredByName(lanches);
  const launchesFilteredByFlightNumber = filtredByFlightNumber(
    launchesFilteredByName
  );
  const launchesFilteredByDate = filtredByDate(launchesFilteredByFlightNumber);


  const handleChangeFIlter = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "flightNumber":
        setFlightNumber(value);
        break;

      case "date":
        setDate(value);
        break;

      default:
        return;
    }
  };
  return (
    <div className="App">
      <div>
        <label>
          Name
          <input
            type="text"
            name="name"
            id="filter-name"
            value={name}
            onChange={handleChangeFIlter}
          />
        </label>
        <label>
          Flight Number
          <input
            type="text"
            name="flightNumber"
            id="filter-flight_number"
            value={flightNumber}
            onChange={handleChangeFIlter}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            name="date"
            id="filter-date"
            value={date}
            onChange={handleChangeFIlter}
          />
        </label>
      </div>
      <List launches={launchesFilteredByDate} />
      <button onClick={handlerAddLaunchesButton}>
        Add More(Pages:{totalPages - page})
      </button>
    </div>
  );
}

export default App;

import "./App.css";
import List from "./components/List";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [totalPagesAmount, setTotalPagesAmount] = useState(1);
  const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name,setName]=useState('');
  const [flightNumber,setFlightNumber]=useState('')

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


  const filtredByName=launches.filter((launch)=>{
    return launch.name.toLowerCase().includes(name.toLowerCase().trim())
  })

const filtredByFlightNumber =launches.filter((launch)=>{
  return launch.flight_number===Number(flightNumber);
})

  return (
    <div className="App">
      <div>
        <label> Name
          <input  value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>Flight Number
          <input value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
        </label>
        <label> Date
          <input />
        </label>
      </div>
      <List launches={launches} byName={filtredByName} byFlight={filtredByFlightNumber}/>
      <button onClick={handlerAddLaunchesButton}>Add More</button>
    </div>
  );
}

export default App;

import "./App.css";
import List from "./components/List";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
const [totalPagesAmount,setTotalPagesAmount]=useState(1);
const [launches,setLaunches]=useState([]);
const [currentPage,setCurrentPage]=useState(1)

  useEffect(()=>{
    handlerToDownLoadLauncher(4)  
    .then((response)=>{
     setLaunches(response.data.docs);
     setTotalPagesAmount(response.data.totalPages)
     setCurrentPage(response.data.page)

          })
          .catch(function (error) {
            console.log(error);
          })
  },[])

  const handlerToDownLoadLauncher=(page)=>{
   return axios.post('https://api.spacexdata.com/v5/launches/query',{
      "query": {},
      "options": {
        page
      }
    })
    
  }
 

  
  return (
    <div className="App">
      <List launches={launches} />
    </div>
  );
}

export default App;

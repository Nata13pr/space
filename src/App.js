import logo from "./logo.svg";
import "./App.css";
import List from "./components/List";
import axios from "axios";

function App() {

  const handlerToDownLoadLauncher=(page)=>{
    axios.post('https://api.spacexdata.com/v5/launches/query',{
      "query": {},
      "options": {
        page
      }
    }).then((response)=>{
console.log(response);
    })
  }
  handlerToDownLoadLauncher(4)
  const launches=['name','age']
  
  return (
    <div className="App">
      <List launches={launches} />
    </div>
  );
}

export default App;

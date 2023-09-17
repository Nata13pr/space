import logo from "./logo.svg";
import "./App.css";
import List from "./components/List";

function App() {


  const launches=['name','age']
  
  return (
    <div className="App">
      <List launches={launches} />
    </div>
  );
}

export default App;

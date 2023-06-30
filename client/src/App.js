import { Routes, Route } from "react-router-dom";
import Main from './Pages/Main/Main';
import Countries from "./Pages/Countries/Countries";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Main/>} />
        <Route exact path='/countries' element={<Countries/>} />
      </Routes>
    </div>
  );
}

export default App;

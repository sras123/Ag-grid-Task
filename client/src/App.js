import './App.css';
import {Routes, Route } from "react-router-dom";
import Main from './Pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;

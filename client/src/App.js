import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateUser from './CreateUser';
import List from "./List";

function App() {

  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/createuser" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

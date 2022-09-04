import React from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [data, setData] = React.useState(null);
  const [APIData, setAPIData] = React.useState([]);
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.url)
  //     })
  //     // .then((data) => setData(data.status));
  // }, []);

  React.useEffect(() => {
    getUsers();

    axios.get('/api')
        .then(response => setData(response.data.message));
       
  }, []);
  
  const getUsers = () => {
    console.log('inside getusers')
    axios.get('/getUsers').then(
        (response)=>
        { 
            console.log(response.data)
            setAPIData(response.data.users);
            
        })
}
  return (
    <div className="App">
      <header className="App-header" style={{height:"200px"}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
      <div>
                 <h2 className="text-center">Users List</h2>
                 
                 <br></br>
                 <div className = "row" >
                        <table className = "table table-striped table-bordered" style={{"margin":"auto"}}>

                            <thead>
                                <tr>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th> Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   APIData.length > 0 && APIData != null &&
                                    APIData.map((data) => {
                                        return (
                                            <tr key={data._id}>
                                                <td>{data.firstName}</td>
                                                <td>{data.lastName}</td>
                                                <td>{data.email}</td>
                                                <td key={data._id}>
                                                    
                                                  <button>Edit</button>
                                                </td>
                                            </tr>
                                         )
                                    } )
                                }
                                
                            </tbody>
                        </table>

                 </div>

            </div>
    </div>
  );
}

export default App;


import React from 'react'
import './App.css';
import axios from "axios";
import { useNavigate  } from 'react-router';

function List () {

    let navigate  = useNavigate ();

    const [data, setData] = React.useState(null);
    const [APIData, setAPIData] = React.useState([]);
  
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
            console.log('Get user api ',response.data)
            setAPIData(response.data.users);
            
        })
    }

    const navigateToCreateUser = () => {
        navigate('/createuser')
    }
    return (
        <>
            <header className="App-header" style={{height:"200px"}}>
                <p>{!data ? "Loading..." : data}</p>
            </header>
            <div>
                 <h2 className="text-center">Users List</h2>
                 <button onClick={ navigateToCreateUser }>Add User</button>
                 <br></br>
                 <div className = "row" >
                    <table style={{"margin":"auto"}}>

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
                                }
                             )
                            
                            }
                            {
                                APIData.length === 0 &&
                               
                                    <tr>
                                        <td>No data found</td>
                                    </tr>
                                
                            }
                            
                        </tbody>
                    </table>
                 </div>
            </div>
        </>
    )
}

export default List;

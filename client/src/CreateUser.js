import React, { useState } from 'react'
import { useNavigate  } from 'react-router';
import axios from 'axios';

function CreateUser () {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    let navigate  = useNavigate ();
   
    const postData = async (e) => {

        e.preventDefault();
        const userObject = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        console.log(userObject);
        axios.post(`/addUser`, userObject)
            .then((res) => {
                console.log(res.data);
                navigate('/');  
            }).catch((error) => {
                console.log(error)
            });          
    }

    const navigateToList = () => {
        navigate('/');
    }

    return (
        <>
     
            <div>
                <br></br>
                   <div>
                        <div className = "row">
                            <div>
                                
                                <h3 className="text-center">Add User</h3>
                                
                                <div className = "card-body">
                                    <form onSubmit={postData}>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" onChange ={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <br></br>
                                        <button type="submit">Save</button>
                                        <button onClick={navigateToList}>Cancel</button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>

        </>
    )
}

export default CreateUser;
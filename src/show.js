import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactSwitch from 'react-switch';


import axios from "axios";

function App() { 
  const [user, setUser] = useState([]);
  const [checked, setChecked] = useState(false);
  const [tableMode, setTableMode] = useState('table table-dark');


  const handleChange = val => {
    setChecked(val);
    if(checked === false){
      setTableMode('table');
    } else {
      setTableMode('table table-dark');
    }
    console.log(checked);
  }

  const updateItem = (id, name, email, msge) =>{
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("msge", msge);
    window.location.href='/update';
  }

  const deleteItem = (item) =>{
    const url = 'http://localhost/deletTest.php';
    let fData = new FormData();
    fData.append('id', item);
    axios.post(url,fData)
    .then(response=>alert(response.data))
    .catch(error=>console.log(error))
    toast.success("Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    window.location.reload(false);
  } 

  const fetchData = () => {
          fetch("http://localhost/selectTest.php")
          .then((response) => {
            console.log(response)
            return response.json()
          })
          .then((data) => setUser(data));
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <main>
      
      <h1>Message List</h1>

      <ToastContainer />

      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />

      

      <table class={tableMode}>
      <thead>
                <tr>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">message</th>
                <th scope="col">actions</th>
              </tr>    
          </thead>
        {user && user.length > 0 && user.map((userObj, index) => (
            <tbody>
            <tr>
              <td style={{fontFamily:'monospace'}}>{userObj.name}</td>
              <td style={{fontFamily:'monospace'}}>{userObj.email}</td>
              <td style={{fontFamily:'monospace'}}>{userObj.msge}</td>
              <td> <Trash size={25} onClick={() => deleteItem(userObj.id)} /> 
              <PencilSquare size={25} style={{marginLeft:20}} onClick={()=>updateItem(userObj.id, userObj.name, 
                userObj.email, userObj.msge)} /> </td>
            </tr>
            </tbody>
          ))}
      </table>
    
    </main>
  );
}

export default App;
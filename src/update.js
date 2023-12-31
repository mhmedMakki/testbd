import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './App.css';

const Update = () => {

  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [msg, setMsg] = useState(localStorage.getItem("msge"));

  const [alertMessage, setAlertMessage] = useState(null);
  const [severity, setSeverity] = useState('');

  const handleSubmit = () => {

    if(name.length === 0 || email.length === 0 || msg.length === 0){
      setAlertMessage("Missing Value");
      setSeverity("warning");
    } else {
    const url = 'http://localhost/updateTest.php';
    let fData = new FormData();
    fData.append('id', localStorage.getItem("id"));
    fData.append('name', name);
    fData.append('email', email);
    fData.append('msg', msg);
    axios.post(url,fData)
    .then(response=>setAlertMessage("Request successful: " + response.data))
    .catch(error=>console.log(error))
    setAlertMessage("sucsessfully");
    setSeverity("success");
    window.location.href='/show';
    }   
   
  };

  return (


    <div className="App-header" style={{backgroundColor:'lightgrey'}}>
                        {
            alertMessage && (
        <Stack sx={{ width: '100%'}} spacing={2}>
          <Alert severity={severity}>{alertMessage}</Alert>
        </Stack>
      )}
        <h3> { localStorage.getItem('id') } </h3>
    <Form style={{margin: 30, width:'50%'}}>

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
     </Form.Group>
     
     <Form.Group>
        <Form.Label>Message</Form.Label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
          name="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
    </Form.Group>

    <Button style={{margin:20, backgroundColor:'green'}} onClick={handleSubmit} variant="primary" type="button"> 
           Update
        </Button>


    </Form>
    </div>
  );
};

export default Update;

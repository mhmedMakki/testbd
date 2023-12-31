import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import '@radix-ui/themes/styles.css';
import {isMobile} from 'react-device-detect';
import ReactSwitch from 'react-switch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Home = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const [checked, setChecked] = useState(false);
  const [backColor, setBackColor] = useState('');
  const [textBackColor, setTextBackColor] = useState('');
  const [fontColor, setFontColor] = useState('');

 const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = val => {
    if(checked === true){
      setChecked(val);
      setTextBackColor('#ffff');
      setBackColor('#ffff');
      setFontColor('black');
    }
    else{
      setChecked(val);
      setTextBackColor('gray');
      setBackColor('black');
      setFontColor('#ffff');
    }
    
    console.log(checked);
  }

  const handleSubmit = () => {

    if(name.length === 0 || email.length === 0 || msg.length === 0){
      toast.warning("Missing Value", {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    } 
    else if (!isValidEmail(email)){
      toast.error("Email Invaled", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else {
    const url = 'http://localhost/insert.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('email', email);
    fData.append('msg', msg);
    axios.post(url,fData)
    .then(response=>response.data)
    .catch(error=>console.log(error))
    toast.success("Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose:5000,
    });

    setName('');
    setEmail('');
    setMsg('');
  }
};


  const renderContent = () => {
    if (isMobile) {

      //this is mobile style 
      
      return(
      
        <div className="App-header" style={{backgroundColor:backColor}}>
    
    <ToastContainer />



<ReactSwitch
        checked={checked}
        onChange={handleChange}
      />


  
  <Form style={{margin: 30, width:'95%'}}>
  
  <Form.Group style={{margin:25}}>
  <Form.Control
  type="text"
  name="name"
  style={{backgroundColor:textBackColor}}
  placeholder="Enter your name..."
  value={name}
  onChange={(e) => setName(e.target.value)}
  />
  </Form.Group>
  
  <Form.Group style={{margin:25}}>
  <Form.Control
  type="email"
  name="email"
  style={{backgroundColor:textBackColor}}
  placeholder="Enter your email..."
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  />
  </Form.Group>
  
  <Form.Group style={{margin:25}}>
  <textarea style={{padding:50, backgroundColor:textBackColor}} class="form-control" id="exampleFormControlTextarea1" rows="3" 
  name="message"
  
  placeholder="Type your message..."
  value={msg}
  onChange={(e) => setMsg(e.target.value)}
  />
  </Form.Group>
  
  <div>
  
  {/* Your form and other components go here */}
  
  <Button style={{margin:10, fontSize:20 ,fontFamily:'serif', width:200, height:50}}  onClick={handleSubmit}>Save</Button>
  </div>
  
  </Form>
  </div>
      ); 
    }

    return(

      <div className="App-header" style={{backgroundColor:backColor}}>
        <ToastContainer />

<ReactSwitch
        checked={checked}
        onChange={handleChange}
      />


<Form style={{margin: 30, width:'50%'}}>

<Form.Group style={{margin:25}}>
<Form.Control
type="text"
name="name"
style={{backgroundColor:textBackColor, color:fontColor}}
placeholder="Enter your name..."
value={name}
onChange={(e) => setName(e.target.value)}
/>
</Form.Group>

<Form.Group style={{margin:25}}>
<Form.Control
type="email"
name="email"
style={{backgroundColor:textBackColor, color:fontColor}}
placeholder="Enter your email..."
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</Form.Group>

<Form.Group style={{margin:25}}>
<textarea style={{padding:50, backgroundColor:textBackColor, color:fontColor}} class="form-control" id="exampleFormControlTextarea1" rows="3" 
name="message"
placeholder="Type your message..."
value={msg}
onChange={(e) => setMsg(e.target.value)}
/>
</Form.Group>

<div>

{/* Your form and other components go here */}

<Button style={{margin:10,  fontFamily:'serif'}}  onClick={handleSubmit}>Save</Button>
</div>

</Form>
</div>

    ); 
  }

  return (
    renderContent()
  );
};

export default Home;

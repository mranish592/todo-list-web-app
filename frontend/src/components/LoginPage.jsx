import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Input } from './ui/input';
import { Button } from './ui/button';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    try {
        const response = await fetch("http://localhost:3000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });
      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        const token = data.token;
        const username = data.username;
        const atIndex = email.indexOf('@');
        const trimmedUsername = atIndex !== -1 ? username.substring(0, atIndex) : "";
        Cookies.set('accessToken', token, { expires: 7 });
        Cookies.set('username', trimmedUsername, { expires: 7 });
        navigate('/todos');
        
    } catch (error) {
        console.error('Error:', error);
        alert("That login did not work, try again with correct credentials")
    }
    // Reset form fields
    setEmail('');
    setPassword('');
  };



  

  return (
    <>
    <div className="m-4">
      <form onSubmit={handleSubmit}>
      <div className="border-2 p-2 rounded-md">
          <h2 className="text-xl font-bold my-1.5">Login</h2>
          <div className="max-w-96 my-2">
            <Input type="text" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="max-w-xl my-2">
          <Input type="password" id="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="my-2">
            <Button type="submit" className="mx-2">Login</Button>
          </div>
        </div>
        </form>
    </div>
    
    </>
    

    
  );


}

export default LoginPage;

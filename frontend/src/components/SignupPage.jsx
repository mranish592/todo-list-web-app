import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
const SERVER_URL = process.env.SERVER_URL; 


function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    try {
        const response = await fetch(`${SERVER_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        if(response.status === 409){
            alert("User already exists witht he given email")
            navigate('/');
        }
      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert("User created successfully. Now Login using your new credentials")
        const data = await response.json();
        console.log(data);
        navigate('/login');
        
    } catch (error) {
        console.error('Error:', error);
        alert("Could not sign up the user")
        navigate('/');
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
          <h2 className="text-xl font-bold my-1.5">Signup</h2>
          <div className="max-w-96 my-2">
            <Input type="text" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="max-w-xl my-2">
          <Input type="password" id="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="my-2">
            <Button type="submit" className="mx-2">Signup</Button>
          </div>
        </div>
        </form>
    </div>
    </>

    
  );
}

export default SignupPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


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
        const response = await fetch("http://localhost:3000/user/signup", {
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
    }
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default SignupPage;

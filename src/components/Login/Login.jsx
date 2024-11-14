import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Adjust the import based on file location
import CssBaseline from '@mui/joy/CssBaseline';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { BASE_URL } from '../../BASE_URL';
import './login.css'

async function handleAuthSubmit(event, isSignup, formData, navigate, setIsSignup, setFormData, login) {
  event.preventDefault();
  
  const url = isSignup ? `${BASE_URL}/users/register` : `${BASE_URL}/users/login`;

  try {
    const response = await axios.post(url, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSignup) {
      console.log('Registration successful!');
      setIsSignup(false);
      setFormData({ fullName: '', email: '', password: '' });
      navigate('/login');
    } else {
      const { accessToken, refreshToken, user: { _id } } = response.data.data;
  console.log(  accessToken, refreshToken)
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('userId', _id);
      
      console.log('User logged in successfully!');
      login(); 
      navigate('/details'); 
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
    console.error('Error:', errorMsg);
    alert(errorMsg);
  }
}

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  
  return (
    <main style={{display:"flex"  , flex:"row" , padding:"20px"}}>
     =
    
      <div className="home__img-container">
        <div className="home__img">
      
        </div>
        <div className="home__description">
          <Typography level="h1" sx={{marginBottom:"5px"}}>
          Helping Businesses Create High-Quality Product Visuals at Scale With AI
          </Typography>
          <Typography level="body-sm">
            Spyne.ai is revolutionizing business automation by providing an easy-to-use platform for building AI-powered workflows. With just a few clicks, you can integrate AI into your processes, making them more efficient, scalable, and intelligent.Spyne’s vision is to disrupt the way businesses create their catalogs, enabling them to sell online faster and with more confidence using smartphones and AI
          </Typography>
        </div>
      </div>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Typography level="h4" component="h1">
          <b>{isSignup ? 'Sign Up' : 'Welcome!'}</b>
        </Typography>
        <Typography level="body-sm">
          {isSignup ? 'Create an account.' : 'Sign in to continue.'}
        </Typography>

        {isSignup && (
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullName"
              type="text"
              placeholder="Harsh Srivastav"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="harsh@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          sx={{ mt: 1 }}
          onClick={(event) =>
            handleAuthSubmit(event, isSignup, formData, navigate, setIsSignup, setFormData, login)
          }
        >
          {isSignup ? 'Sign up' : 'Log in'}
        </Button>

        <Typography
          endDecorator={
            <Link onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </Link>
          }
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
        </Typography>
        
      </Sheet>
    
    </main>
  );
}

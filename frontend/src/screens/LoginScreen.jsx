import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <FormContainer>
      <div className='login-form-wrapper'>
        <div className='login-header'>
          <h1 className='login-title'>Welcome to ByteBazaar</h1>
          <p className='login-subtitle'>Sign in to your account</p>
        </div>
        <Form onSubmit={submitHandler} className='login-form'>
          <Form.Group controlId='email' className='form-group-custom'>
            <Form.Label className='form-label'>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control-custom'
            />
          </Form.Group>
          <Form.Group controlId='password' className='form-group-custom'>
            <Form.Label className='form-label'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control-custom'
            />
          </Form.Group>
          <Button type='submit' className='login-button' disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {isLoading && <Loader />}
        </Form>
        <div className='login-footer'>
          <p className='login-register-text'>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='register-link'>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;

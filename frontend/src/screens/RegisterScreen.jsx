import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };
  return (
    <FormContainer>
      <div className='register-form-wrapper'>
        <div className='register-header'>
          <h1 className='register-title'>Create Account</h1>
          <p className='register-subtitle'>Join us and start shopping with exclusive benefits</p>
        </div>
        <Form onSubmit={submitHandler} className='register-form'>
          <Form.Group controlId='name' className='form-group-custom'>
            <Form.Label className='form-label'>Full Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your fullname'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control-custom'
            />
          </Form.Group>
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
          <Form.Group controlId='confirmPassword' className='form-group-custom'>
            <Form.Label className='form-label'>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='form-control-custom'
            />
          </Form.Group>
          <Button type='submit' className='register-button' disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {isLoading && <Loader />}
        </Form>
        <div className='register-footer'>
          <p className='register-login-text'>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='login-link'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;

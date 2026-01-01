import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { useProfileMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <div className='profile-screen'>
      <Row className='profile-container'>
        <Col md={3} className='profile-col-left'>
          <div className='profile-card'>
            <div className='profile-card-header'>
              <h2 className='profile-title'>Profile Settings</h2>
            </div>
            <Form onSubmit={submitHandler} className='profile-form'>
              <Form.Group controlId='name' className='form-group-custom'>
                <Form.Label className='form-label'>Full Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='form-control-custom'
                />
              </Form.Group>
              <Form.Group controlId='email' className='form-group-custom'>
                <Form.Label className='form-label'>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control-custom'
                />
              </Form.Group>
              <Form.Group controlId='password' className='form-group-custom'>
                <Form.Label className='form-label'>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='form-control-custom'
                />
              </Form.Group>
              <Form.Group controlId='confirmpassword' className='form-group-custom'>
                <Form.Label className='form-label'>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='form-control-custom'
                />
              </Form.Group>
              <Button type='submit' className='profile-update-button' disabled={loadingUpdateProfile}>
                {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Form>
          </div>
        </Col>
        <Col md={9} className='profile-col-right'>
          <div className='orders-card'>
            <div className='orders-card-header'>
              <h2 className='orders-title'>Order History</h2>
              <p className='orders-subtitle'>{orders?.length || 0} orders</p>
            </div>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : orders && orders.length > 0 ? (
              <div className='orders-table-wrapper'>
                <Table striped hover responsive className='orders-table'>
                  <thead>
                    <tr className='table-header'>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Delivery</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className='order-row'>
                        <td className='order-id'>{order._id.substring(0, 8)}...</td>
                        <td className='order-date'>{order.createdAt.substring(0, 10)}</td>
                        <td className='order-price'>${order.totalPrice}</td>
                        <td className='order-status'>
                          {order.isPaid ? (
                            <span className='badge-success'>
                              <FaCheck /> {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className='badge-danger'>
                              <FaTimes /> Pending
                            </span>
                          )}
                        </td>
                        <td className='order-status'>
                          {order.isDelivered ? (
                            <span className='badge-success'>
                              <FaCheck /> {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className='badge-danger'>
                              <FaTimes /> Not Delivered
                            </span>
                          )}
                        </td>
                        <td className='order-action'>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='order-details-btn'>Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className='empty-orders'>
                <p className='empty-orders-text'>No orders yet. Start shopping now!</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;

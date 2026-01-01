import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <div className='admin-screen'>
      <Row className='admin-header align-items-center'>
        <Col>
          <h1 className='admin-title'>Orders Management</h1>
          <p className='admin-subtitle'>Manage all customer orders and track deliveries</p>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='admin-table-card'>
          <Table striped hover responsive className='admin-table'>
            <thead>
              <tr className='table-header-admin'>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className='admin-table-row'>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
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
                  <td>
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
                  <td className='product-actions'>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-edit'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;

import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useCreateProductMutation, useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const deleteHandler = (productid) => {
    console.log(productid);
  };
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className='admin-screen'>
      <Row className='admin-header align-items-center'>
        <Col>
          <h1 className='admin-title'>Products Management</h1>
          <p className='admin-subtitle'>Manage all your products and inventory</p>
        </Col>
        <Col className='text-end'>
          <Button className='btn-create-product' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
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
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className='admin-table-row'>
                  <td className='product-id'>{product._id.substring(0, 8)}...</td>
                  <td className='product-name'>{product.name}</td>
                  <td className='product-price'>${product.price}</td>
                  <td className='product-category'>{product.category}</td>
                  <td className='product-brand'>{product.brand}</td>
                  <td className='product-actions'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-edit'>
                        <FaEdit /> Edit
                      </Button>
                    </LinkContainer>
                    <Button className='btn-delete' onClick={() => deleteHandler(product._id)}>
                      <FaTrash /> Delete
                    </Button>
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

export default ProductListScreen;

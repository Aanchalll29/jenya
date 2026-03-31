import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../feature/productSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';

const CrudPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.products);

  const [form, setForm] = useState({ title: '', price: '', category: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.price) return;
    if (editId) {
      dispatch(updateProduct({ ...form, id: editId }));
      setEditId(null);
    } else {
      dispatch(addProduct(form));
    }
    setForm({ title: '', price: '', category: '' });
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
    });
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">
          Manage Products — Total: {items.length}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/product')}>
          Back to List
        </Button>
      </Box>

     
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          size="small"
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editId ? 'Update' : 'Add'}
        </Button>
        {editId && (
          <Button variant="outlined" onClick={() => {
            setEditId(null);
            setForm({ title: '', price: '', category: '' });
          }}>
            Cancel
          </Button>
        )}
      </Box>

      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEdit(product)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CrudPage;

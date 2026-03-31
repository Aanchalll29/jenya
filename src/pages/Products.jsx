import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Grid, Card, CardContent, Typography, Box, } from "@mui/material";
import { createSessionStorage } from "react-router-dom";

const  Products = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
     <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={2}>
        {items.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography color="text.secondary">
                  ${p.price}
                </Typography>
                <Typography variant="body2">
                  {p.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products
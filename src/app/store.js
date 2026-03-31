import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import todoReducer from "../features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    todos: todoReducer,
  },
});
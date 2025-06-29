import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import { authApi } from "state/authApi";
import { authSlice } from "state/authSlice";
import { apiSpring } from "state/apiSpring";
import springReducer from "state/springSlice";
import { categoryApi } from "state/categoryApi";
import { brandApi } from "state/brandApi";
import { supplierApi } from "state/supplierApi";
import { productApi } from "state/productApi";
import { userApi } from "state/userApi";
import { adminApi } from "state/adminApi";
import { ordersApi } from "state/ordersApi";
import { cartApi } from "state/cartApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    [apiSpring.reducerPath]: apiSpring.reducer,
    spring: springReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    category: categoryApi,
    [brandApi.reducerPath]: brandApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(api.middleware)
      .concat(apiSpring.middleware)
      .concat(categoryApi.middleware)
      .concat(brandApi.middleware)
      .concat(supplierApi.middleware)
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(adminApi.middleware)
      .concat(ordersApi.middleware)
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);

export default store;

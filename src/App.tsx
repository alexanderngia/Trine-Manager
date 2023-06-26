import "./App.scss";

import { menuAdmin } from "data/sidebar";
import React, { lazy } from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "utils/history";
const Authentication = lazy(() => import("components/views/auth"));

const Order = lazy(() => import("components/views/orderList/order"));
const Post = lazy(() => import("components/views/postList/post"));
const Product = lazy(() => import("components/views/productList/product"));

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {React.Children.toArray(
          menuAdmin.map((route) => {
            return <Route path={route.path} element={route?.page} />;
          })
        )}
        <Route path="/" element={<Authentication />} />
        <Route path="/post" element={<Post />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

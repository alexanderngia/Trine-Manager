import "./App.scss";

import { menuAdmin } from "data/sidebar";
import React from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "utils/history";

import Authentication from "components/views/auth";
import Order from "components/views/orderList/order";
import Post from "components/views/postList/post";
import Product from "components/views/productList/product";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {React.Children.toArray(
          menuAdmin.map((route) => {
            return <Route path={route.path} element={route?.page} />;
          })
        )}
        <Route path="/login" element={<Authentication />} />
        <Route path="/post" element={<Post />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

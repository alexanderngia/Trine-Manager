import DashBoard from "components/views/dashboard";
import ProductList from "components/views/productList";
import OrderList from "components/views/orderList";
import CustomerList from "components/views/customerList";
import MemberList from "components/views/memberList";
import PostList from "components/views/postList";
import {
  Dashboard,
  Document,
  Store,
  Contact,
  Cart,
  User,
} from "components/ui/icon";

export const menuAdmin = [
  {
    id: 1,
    title: "Tổng quan",
    path: "/dashboard",
    page: <DashBoard />,
    icon: <Dashboard />,
  },
  {
    id: 2,
    title: "Quản lí bài viết",
    path: "/post-manager",
    page: <PostList />,
    icon: <Document />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 2.1,
        title: "Thêm Bài Viết",
        path: "/post-manager/add-post",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 3,
    title: "Quản lí sản phẩm",
    path: "/product-manager",
    page: <ProductList />,
    icon: <Store />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 3.1,
        title: "Thêm Sản Phẩm",
        path: "/product-manager/add-product",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 4,
    title: "Quản lí đơn hàng",
    path: "/order-manager",
    page: <OrderList />,
    icon: <Cart />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 4.1,
        title: "Thêm Đơn Hàng",
        path: "/order-manager/add-order",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 5,
    title: "Quản lí khách hàng",
    path: "/customer-manager",
    page: <CustomerList />,
    icon: <Contact />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 5.1,
        title: "Thêm Khách Hàng",
        path: "/customer-manager/add-customer",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 6,
    title: "Quản lí thành viên",
    path: "/member-manager",
    page: <MemberList />,
    icon: <User />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,

    subMenu: [
      {
        id: 6.1,
        title: "Thêm Thành Viên",
        path: "/member-manager/add-member",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
];

export const menuSale = [
  {
    id: 1,
    title: "Tổng Quan",
    path: "/dashboard",
    page: <Dashboard />,
    // icon: <SunFill />,
  },
  {
    id: 2,
    title: "Quản Lí Bài Viết",
    path: "/post-manager",
    page: <PostList />,
    icon: <Document />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 2.1,
        title: "Thêm Bài Viết",
        path: "/post-manager/add-post",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 3,
    title: "Quản Lí Sản Phẩm",
    path: "/product-manager",
    page: <ProductList />,
    icon: <Store />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 3.1,
        title: "Thêm Sản Phẩm",
        path: "/product-manager/add-product",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
  {
    id: 4,
    title: "Quản Lí Đơn Hàng",
    path: "/order-manager",
    page: <OrderList />,
    icon: <Cart />,
    rightArr: `<ion-icon name="chevron-forward"></ion-icon>`,
    downArr: `<ion-icon name="chevron-down"></ion-icon>`,
    subMenu: [
      {
        id: 4.1,
        title: "Thêm Đơn Hàng",
        path: "/order-manager/add-order",
        icon: `<ion-icon name="home"/></ion-icon>`,
      },
    ],
  },
];

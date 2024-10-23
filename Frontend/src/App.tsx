import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Nav/Navbar';
import AddProduct from './pages/AddProduct/AddProduct';
import ProductInvoice from './pages/AddProduct/ProductInvoice';

const App = () => {

  const Layout = () => {
    return (
      <div className='h-screen flex flex-col custom-scrollbar'>
        <div className=' h-auto'><Navbar /></div>
        <div className=' bg-[#151514]  flex-1'><Outlet /></div>
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/add-product",
          element: <AddProduct />
        },
      ]
    },
    {
      path: "/product-invoice",
      element: <ProductInvoice />
    }
  
  
  ])
  return <RouterProvider router={router}></RouterProvider>;

}

export default App
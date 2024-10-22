import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Nav/Navbar';
import AddProduct from './pages/AddProduct/AddProduct';

const App = () => {

  const Layout = () => {
    return (
      <div className='h-screen flex flex-col custom-scrollbar'>
        <div className=' h-[12vh]'><Navbar /></div>
        <div className=' card bg-[#151514] h-full'><Outlet /></div>
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
    }])
  return <RouterProvider router={router}></RouterProvider>;

}

export default App
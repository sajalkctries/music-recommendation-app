import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Personalisation from "../../Pages/Personalisation";
import Navbar from "../nav/Navbar";
import Footer from "../Footer/Footer";
import Login from "../login/Login";
import Register from "../login/Register";
import Product from "../../Pages/Product";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Outlet /> 
          <Footer />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <Product/>,
        },
        {
          path: "*",
          element: <Link to={'/'} className="text-blue-900">Not Found</Link>,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/personalisation",
          element: <Personalisation />,
        },
      ],
    },
    { path: "/login", element: <Login/> },
    {path:"/register",element:<Register/>}
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Navbar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";


function App() {

  const currentUser = true;

  const Layout = ()=>{
    return(
      <div>
        <Navbar/>
        <div style={{display:"flex"}}>
          <LeftBar/>
          <Outlet/>
          <RightBar/>
        </div>
      </div>
    )
  };

  //Redirect to registration page if not registered(condition currentUser = false)

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) {
      return <Navigate to="/login"/>;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
         <ProtectedRoute>
          <Layout/>
         </ProtectedRoute>
         ),
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
    <div>
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

import CardDetail from "../components/Product_List/PostForm";
import Login from "../components/Login/Login";
import PrivateRoute from "./routeProtection";
import ApiDocumentation from "../components/documentation/documentation";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Login /> },
  {
    path: "/details",
    element: (
      <PrivateRoute>
        <CardDetail />
      </PrivateRoute>
    ),
  },
  {
    path: "/docs", 
    element: <ApiDocumentation />, 
  },
];

export { routes };

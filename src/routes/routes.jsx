import CardDetail from "../components/Product_List/PostForm";
import Login from "../components/Login/Login";
import PrivateRoute from "./routeProtection";

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
];

export { routes };

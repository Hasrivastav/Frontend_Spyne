import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; 

import { routes } from "./routes/routes.jsx";
import Header from "./components/Header.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <Router> 
      
      <AuthProvider> 
        <div className="App">
        <Toaster />
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
           
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

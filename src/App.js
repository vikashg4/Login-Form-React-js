import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import Alert from "./components/Alert";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Sidenav from "./Sidenav";

 

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Sidenav />} />
            







            





          </Routes>
        </BrowserRouter>
        <Alert />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;

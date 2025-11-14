import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import AccessGate from "./components/AccessGate.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AccessGate>                
    <BrowserRouter>           
      <AuthProvider>          
        <CartProvider>       
          <App />             
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </AccessGate>
  </StrictMode>
);

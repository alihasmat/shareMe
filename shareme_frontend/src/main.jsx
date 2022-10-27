import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <GoogleOAuthProvider clientId="450313062928-bbg8fldtuod56cf76datppu1vqs91l15.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Router>
);

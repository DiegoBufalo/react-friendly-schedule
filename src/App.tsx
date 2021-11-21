import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header";
import { ToastProvider } from "./context/Toast";
import { Routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "./components/Toast";

export default function App() {
  return (
      <BrowserRouter>
        <ToastProvider>
          <Toast />
          <Header />
          <Routes />
        </ToastProvider>
      </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [users, SetUsers] = useState(null);

  useEffect(() => {
    // Şu anda oturum açmış olan kullanıcıyı al
    //home a gönderiyoruz kullanmak için
    onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUsers(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home users={users} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </div>
  );
}

export default App;
// githup a yükleme + live a alma
// videosunu çekip linkedine yüklemek kaldı

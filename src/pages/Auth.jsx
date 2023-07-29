import React, { useState } from "react";
import "../styles/auth.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";

const Auth = () => {
  // bu state kayıt ve giriş verisiini tutuyor
  const [state, setState] = useState(true);

  //inputlardan girilen değerli tutmamızı sağlıyor
  const [authData, setAuthData] = useState({ email: "", password: "" });

  //inputtan girilen değeri state atamamızı sağlıyor
  const onChangeFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  //giriş-kayıt arasında değişiklik yapmamızı sağlayan fonk
  const changeState = () => {
    setState(!state);
  };

  // kayıt ve giriş yapmamızı sağlayan fonk
  const authFunc = async () => {
    if (state) {
      //kayıt
      try {
        //hazır bir fonksiyon
        const data = await createUserWithEmailAndPassword(
          auth, // firebase den auth çağırıyoruz
          authData.email, // inputtan aldığımız mail bilgisi
          authData.password // inputtan aldığımız şifte bilgisi
        );
        const user = data.user; // üstteki fonk sayesinde oluşturduğumuz user ı alıyoruz

        if (user) {
          // user oluştu ise home a git
          window.location = "/home";
        }
      } catch (error) {
        toast.error(error.message);
        // catch sayesinde hatayı yakalıyoruz, toast ile de gösteriyoruz
      }
    } else {
      //giriş
      //yukarıdakine benzer işlemleri giriş için yapıyoruz
      try {
        const data = await signInWithEmailAndPassword(
          auth,
          authData.email,
          authData.password
        );
        const user = data.user;
        if (user) {
          window.location = "/home";
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const token = credential.accessToken;
      const user = data.user;
      if (user) {
        window.location = "/home";
      }
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(credential);
    }
  };

  const rememberPassword = () => {
    if (authData.email) {
      sendPasswordResetEmail(auth, authData.email).then(() => {
        toast.success("Parola sıfırlama maili gönderiliyor");
      });
    } else {
      toast.error("Email adresinizi giriniz");
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p className="auth-container-title">{state ? "KAYIT" : "GIRIS"}</p>{" "}
        {/* state in durumuna göre p nin yazısı değişecek */}
        <input
          name="email"
          value={authData.email}
          // inputta değişiklik olursa onchange fonksiyonunu çalıştır
          onChange={onChangeFunc}
          type="text"
          placeholder="Email Giriniz"
        />
        <input
          name="password"
          value={authData.password}
          // inputta değişiklik olursa onchange fonksiyonunu çalıştır
          onChange={onChangeFunc}
          type="password"
          placeholder="Şifre Giriniz"
        />
        <button onClick={loginWithGoogle} className="auth-google-btn">
          Google ile giriş yap
        </button>
        <p className="auth-change" onClick={changeState}>
          {state ? "Zaten üye misiniz?" : "Hesabınız yok mu?"}
          {/* state in durumuna göre p nin yazısı değişecek */}
        </p>
        <button onClick={authFunc}>{state ? "Kayıt" : "Giriş"}</button>
        {/* state in durumuna göre p nin yazısı değişecek, tıklayınca da authFunc çalışacak */}
        {state ? null : (
          <p className="forgetPassword" onClick={rememberPassword}>
            Şifremi Unuttum
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import "../styles/home.css";
import {
  signOut,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Home = ({ users }) => {
  //şifre ve mail verisi tutmak için state ler
  const [newPassword, setnewPassword] = useState();
  const [newEmail, setnewEmail] = useState();

  //inputtan veri almak için fonksiyonlar
  const takeNewPassword = (p) => {
    setnewPassword(p);
  };
  const takeNewEmail = (e) => {
    setnewEmail(e);
  };

  //çıkış fonksiyonu
  const logoutFunc = async () => {
    await signOut(auth);
    toast.success("Çıkış yapılıyor");
    // toast görünsün diye settimeout koydum
    setTimeout(() => {
      window.location = "/";
    }, 3000);
  };

  // aktif kullanıcının şifresini, inputtan aldığımız mail ile değiştiriyoruz
  const changePasswordFunc = async () => {
    try {
      const user = auth.currentUser;
      if (newPassword) {
        updatePassword(user, newPassword).then(() => {
          toast.success("Şifre değiştirildi");
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // aktif kullanıcının mailini, inputtan aldığımız mail ile değiştiriyoruz
  const changeEmailFunc = async () => {
    try {
      updateEmail(auth.currentUser, newEmail).then(() => {
        toast.success("Email güncelleniyor");
      });
    } catch (error) {
      toast.error(error);
    }
  };

  //hesap silme
  const deleteUserFunc = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        toast.success("Hesabınız siliniyor");

        // toast görünsün diye settimeout koydum
        setTimeout(() => {
          window.location = "/";
        }, 3000);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="home">
      <div className="navbar">
        <h1>FIREBASE</h1>{" "}
        <p className="logout" onClick={logoutFunc}>
          Logout
        </p>
      </div>

      <p className="user">Hoşgeldiniz {users?.email}</p>

      <div className="changeInfo">
        <input
          type="text"
          placeholder="Yeni şifre"
          onChange={(e) => takeNewPassword(e.target.value)}
        />
        <button onClick={changePasswordFunc}>Şifre değiştir</button>
      </div>
      <div className="changeInfo">
        <input
          type="text"
          placeholder="Yeni email"
          onChange={(e) => takeNewEmail(e.target.value)}
        />
        <button onClick={changeEmailFunc}>Email değiştir</button>
      </div>
      <button id="deleteUser" onClick={deleteUserFunc}>
        Hesabımı sil
      </button>
    </div>
  );
};

export default Home;

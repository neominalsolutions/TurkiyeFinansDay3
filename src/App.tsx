import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ClassComponentSample from "./ClassComponentSample";
import ReactFunctionSample from "./ReactFunctionSample";
import List from "./UseCallBackSample/List";
import UseMemoDemo from "./UseMemoSample/UseMemoDemo";
import User from "./User";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Users from "./pages/Users";

function App() {
  const [hidden, setHidden] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [theme, setTheme] = useState<string>("light"); // child ile alakası olmayan parenta ait bir state

  // Böyle bir performans hatasına düşüyorsak parent componente 2 farklı state olması lazım ve child componentten bağımsız olan state değişimi child component de rendering'e sebebiyet vermesi lazım

  const getItems2 = () => {
    return [number + 1, number + 2, number + 3, number + 4, number + 5];
  };

  // fonsiyonu useCallback referansı ile gönderdik.
  // number değişiminde fonksiyon sadece değer döndürür.
  const getItems = useCallback(() => {
    return [number + 1, number + 2, number + 3, number + 4, number + 5];
  }, [number]); // number da bir değişim varsa getItems props tetikleniyor

  return (
    // <>
    //   <button onClick={() => setHidden(!hidden)}>Göster Gizle</button>
    //   {!hidden && <ClassComponentSample title="class sample" />}

    //   {!hidden && <ReactFunctionSample title="function sample" />}
    // </>

    // useCallback Sample
    // <>
    //   <button onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
    //     Change Theme
    //   </button>
    //   <button onClick={() => setNumber(number + 1)}>Set Number</button>
    //   {/* 1.örnek için getItems2 function kullandık. Usecallback ile sarmadık */}
    //   {/* <List getItems={getItems2} /> */}

    //   {/* number değişimi olmadığından props değişimi olmuyor bu durumda render da olmuyor */}
    //   {/* ikinci örnekte getItems function sadece useCallbak ile sarmalandı  */}
    //   <List getItems={getItems} />
    // </>

    // UseMemo Sample
    <>
      {/* <UseMemoDemo /> */}

      {/*HttpClient İşlemleri  */}
      {/* <User /> */}

      {/* a hreften farklı a href global yönlendirme sağlar. */}
      {/* dış kaynak yönlendirilmesinde evet href kullanabilirsiniz */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="about" element={<About />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="users" element={<Users />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

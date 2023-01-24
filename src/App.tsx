import React, { lazy, Suspense, useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ClassComponentSample from "./ClassComponentSample";
import ReactFunctionSample from "./ReactFunctionSample";
import List from "./UseCallBackSample/List";
import UseMemoDemo from "./UseMemoSample/UseMemoDemo";
import User from "./User";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
// import About from "./pages/About";
// import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import UserDetail from "./pages/UserDetail";
import RejectUsers from "./pages/RejectUsers";
// import Users from "./pages/Users";

// Çalışma zamanında kod yüklemesi yapan bir yöntem (code splitting) diyoruz.

const Home = lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Users = React.lazy(() => import("./pages/Users"));

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
        <Suspense fallback={<>Loading ... </>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="about" element={<About />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="home" element={<Home />}></Route>
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="users" element={<Users />}>
                <Route path="rejected" element={<RejectUsers />}></Route>
              </Route>
              {/* Dinamik Route tanımı */}
              <Route
                path="user-detail/:id/:name"
                element={<UserDetail />}
              ></Route>
              {/* querystring ile sayfalar arası bilgi taşımak istersek bu durumda aşağıdaki gibi 2.bir route oluştururuz. */}
              <Route path="user-detail" element={<UserDetail />}></Route>
            </Route>
            <Route path="*" element={<>Sayfa Bulunamadı</>}></Route>
            {/* eşleşen route yoksa bunu tüm route işlmelerinin sonuna koyalım */}
            {/* <Route path="admin/users" element={<Users />}></Route> */}
            {/* 404 Notfound sayfası için kullandık */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

// crm/invoices (nested route kavramı ile iç içe route prefix yazmadan link oluşturabiliriz)
// admin/users
// hr/persons

// Not: Uygulama Routing işlemi yaparken App.ts dosyası üzerinden yüklendiği için eğer direkt olarak import referansı verirsek bütün componentler biz ilgili sayfaya gitmesek dahi doma giriyorlar. buda kötü bir performas oluyor. Uygulama gereksiz yere ilk açılışta yükleme yapıyor. İlk açılış hızımız etkilenir.
// Bundan kurtulmak için react tarafında lazy dediğimiz bir yükleme tipi var (Lazy Load Pages) bu yöntem ile sadece ilgili linke gittiğimizde js dosyası network'de yer kaplıyor. Böylelikle uygulamadaki componentleri bölme yöntemi kullanarak performas sağlıyoruz. (Code Splitting yöntemi)

// Yukarıdaki gibi performans amaçlı olarak React.Suspense ile tüm componentlerimizi sarmalıyarak hata durumu fallback hangi template çalışacağımızı belirtebiliriz.

export default App;

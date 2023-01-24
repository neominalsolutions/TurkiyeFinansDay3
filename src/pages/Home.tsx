import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// reac-router-dom v6 deki useNavigate ile v5 deki useHistory ile aynı

type Props = {};

export default function Home({}: Props) {
  // typescript dosyası içerisinde redirect yönlendirme yapmamız gereken durumlara için var
  const navigate = useNavigate(); // navigate yönlendirme func
  const location = useLocation(); // browser histroyde lokasyon bilgisi almak için kullanılan hook

  useEffect(() => {
    console.log("location", location);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        Yönlendir
      </button>
      <button
        onClick={() => {
          navigate(-1); // browser history üzerinde işlem yapar.
        }}
      >
        Go Back
      </button>
      <button
        onClick={() => {
          navigate(1);
        }}
      >
        Go Forward
      </button>
    </div>
  );
}

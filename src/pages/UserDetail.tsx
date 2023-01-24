import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

type Props = {};

export default function UserDetail({}: Props) {
  // bu component içerisinde dışarıdan route parametres gelicek.
  // bu dinamik parametreleri yakalamak için useParams hook kullanırız.

  const [user, setuser] = useState<any>({});

  const param = useParams(); // react-router-domdan gelen bir hook

  const [queryParams] = useSearchParams(); // querystring hook

  useEffect(() => {
    console.log("param", param);
    // param dinamik değerlerine göre api call işlemi yapılıp sayfanın renderı alınır.

    if (param.id != undefined) {
      const abortController = new AbortController();

      axios
        .get(`https://jsonplaceholder.typicode.com/users/${param.id}`, {
          signal: abortController.signal,
        })
        .then((response) => {
          console.log("response", response);
          setuser(response.data);
        });

      return () => {
        // axios get fetch işlemindeki signal değerini unmanagement resource değerini kaynak tüketimini kaldırık.
        abortController.abort();
      };
    } else {
      const id = queryParams.get("id");
      const name = queryParams.get("name");

      console.log("id", id, "name", name);
    }
  }, [param.id, queryParams]);

  return (
    <div>
      <>User Detail Page</>
      {user.email} {user.name}
    </div>
  );
}

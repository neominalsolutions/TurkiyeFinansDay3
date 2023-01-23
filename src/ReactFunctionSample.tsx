import React, { useEffect, useState } from "react";

type Props = { title: string };

type State = {
  count?: number;
  number?: number;
};

export default function ReactFunctionSample({ title }: Props) {
  const [state, setState] = useState<State>({ count: 0, number: 0 });

  useEffect(() => {
    console.log("no deps");
  }); // herhangi bir dependecy bağlı değil bu durumda hem init hemde state change işlemlerinde çalışır. hangi state olduğu önemli değil.
  // eğer bunu kullanırsak her bir state değişiminde bu kod içindeki blok tekrar tekrar işlem yapıp performansı olumsuz yönde etkiler.

  // api call da kullanılabilir.
  useEffect(() => {
    console.log("func init or state");

    return () => {
      console.log("func destroy");
    };
  }, []); // deps kısmı boş bırakıldığında doma girerken render olurken component 1 sefere mahsus çalışır, herhangi bir state değişiminden etkilenmiyor.state değişiminde tekrar tetiklenmiyor. once call

  // useEffect(() => {
  //   console.log("func state-change");
  // }, [state]); // deps kısmına state değişkenleri yazarsa bu durumda state değişkenlerinde bir değişim olduğunda useEffect tetiklenir.

  const onChange = () => {
    setState({ ...state, number: 1 }); // count state de değişmez number değeri 1 olarak state yansır. spread operatörü ile yaptık
  };

  // default function arrow function
  function onChange2() {}

  return (
    <div>
      <p>FromProps: {title}</p>
      <button onClick={onChange}>Set State</button>
    </div>
  );
}

import { time, timeEnd } from "console";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type Props = {};

export default function UseMemoDemo({}: Props) {
  // bir componentte 2 farklı durumda render ortaya çıkıyorsa yine memorized çalışmak render performansına etki edicek.

  const [number, setNumber] = useState<number>(0); // input verilen bir değeri set eder
  const [inc, setInc] = useState<number>(0); // +1

  useEffect(() => {
    console.log("inc", inc, "number", number);
    console.time("numberstart");

    return () => {
      // clean  up
      // component dom'u terk edince && if ? ternary ile yada routing change, yada iş bitince
      console.log("iş bitti temizle");
      console.timeEnd("numberstart");
    };
  }, [number, inc]);

  // 5!

  // use memo kullanmayınca setInc state değişikliğinde bile burası defalarca çalıp render süresini olumsuz etkiliyor.
  const factorialFunc = (n: number): number => {
    console.log("faktoriyel");
    return n <= 1 ? 1 : n * factorialFunc(n - 1);
  };

  // usecallback yöntemi
  // const factorialFunc2 = useCallback(() => factorialFunc(number), [number]);

  const calculation = useMemo(() => factorialFunc(number), [number]);

  // const calculation = factorialFunc(number);
  // yani elemizdeki değişken memorized olmasını sağlıyor sadece number değişince calculation değeri virtual doma yansır ama onun dışında memorized olur in-memory değer değişene kadar çalışır

  const onInputChange = (event: any) => {
    console.log("event", event.target.value);
    setNumber(Number(event.target.value));
  };

  return (
    <div>
      <input onChange={onInputChange} placeholder="faktoriel numarası"></input>
      <p>Faktoriel Sayısı {calculation}</p>
      <button onClick={() => setInc(inc + 1)}>Set Inc</button>
    </div>
  );
}

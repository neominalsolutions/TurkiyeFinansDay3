import React, { useEffect, useState } from "react";

type Props = { getItems: any };

export default function List({ getItems }: Props) {
  // not:getItems değeri değişmez iken useEffect parent componentin state değiştiğinden dolayı etkilenip kendisi değiyor. Buda istenmeyen bir rendering sürecine sebep veriyor. Buda performansımızı olumsuz etkiliyor.
  useEffect(() => {
    console.log("rendering...");
  }, [getItems]); // getItems sabitken useEffect methodu parent daki theme değişiminden etkileniyor

  return (
    // <div>
    //   {getItems.map((item: number) => {
    //     return <div key={item}>{item} item</div>;
    //   })}
    // </div>
    <div>
      {getItems().map((item: number) => {
        return <div key={item}>{item} item</div>;
      })}
    </div>
  );
}

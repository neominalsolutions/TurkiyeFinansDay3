import React, { memo, useEffect, useState } from "react";

type Props = { getItems: any };

function List({ getItems }: Props) {
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

// getItems da bir değişiklik olmadığı sürece bu component tekrar render alınmayacak.
// output cache uygulanmış oldu.
// header, footer gibi static içerikler veya deps değişimi nadir olan durumlarda tercih edilir. mesela e-ticaret sitesindeki kategorilerin bukunduğu component.
export default memo(List);

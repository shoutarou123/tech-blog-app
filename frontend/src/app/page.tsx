"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    console.log('useEffectが実行されました');
    fetch("http://localhost:3000/hello")
    .then((res) => {
      console.log("レスポンスオブジェクト",res);
       return res.json();
    })
    .then((data) => {
      console.log("バース後のデータ", data);
      return setMessage(data.message)
    })
    .catch((err) => {
      console.log(err);
      return setMessage("error");
    });
  },[]);

  return (
    <>
    <div className="bg-base-100 min-h-screen">
      <ul>
        <li><a>{message}</a></li>
        <li>{message}</li>
        <li>{message}</li>
        <li>{message}</li>
      </ul>
      <button className="btn btn-primary">ダミーボタン</button>
    </div>
    </>
  );
}

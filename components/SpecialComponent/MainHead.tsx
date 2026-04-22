import Head from "next/head";
import React from "react";

const MainHead = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Wilfried Houinlindjonon — Frontend developer and UI/UX designer based in Abidjan, Côte d'Ivoire. Building exceptional websites and mobile applications." />
      <meta property="og:title" content="Wilfried Houinlindjonon — Developer & Designer" />
      <meta property="og:description" content="Frontend developer and UI/UX designer specializing in React, Next.js, and modern web experiences." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Wilfried Houinlindjonon — Developer & Designer" />
      <meta name="twitter:description" content="Frontend developer and UI/UX designer specializing in React, Next.js, and modern web experiences." />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <title>Wilfried Houinlindjonon — Developer & Designer</title>
    </Head>
  );
};

export default MainHead;

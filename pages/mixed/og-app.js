import React from "react";
import Head from "next/head";
import Footer from "@/components/footer/Footer";
import ArticleLinkInput from "@/components/forms/Mixed/ArticleLinkInput";

const OgMainContent = () => {
  return (
    <>
      <Head>
        <title>OpenAI - Live Weather</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <div className="row g-4">
          <ArticleLinkInput />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default OgMainContent;

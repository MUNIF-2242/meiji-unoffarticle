import OpenAILoginContent from "@/components/login/OpenAILoginContent";
import Head from "next/head";
import React from "react";

const openAILogin = () => {
  return (
    <>
      <Head>
        <title>OpenAI - Athlete Chatbot</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/favicon.png" />
      </Head>
      <OpenAILoginContent />
    </>
  );
};

export default openAILogin;

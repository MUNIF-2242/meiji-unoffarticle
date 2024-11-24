import React from "react";
import ResetPasswordContent from "../components/login/ResetPasswordContent";
import Head from "next/head";

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>Digiboard - Reset Password</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <ResetPasswordContent />
    </>
  );
};

export default ResetPassword;

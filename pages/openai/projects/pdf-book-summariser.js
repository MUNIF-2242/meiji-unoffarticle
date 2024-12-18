import React from "react";
import Footer from "../../../components/footer/Footer";
import Head from "next/head";
import PDFFIleInputSection from "@/components/forms/openai/PDFFIleInputSection";

const PdfBookSummariserMainContent = () => {
  return (
    <>
      <Head>
        <title>Projects - Pdf Summariser</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <PDFFIleInputSection />

        <Footer />
      </div>
    </>
  );
};

export default PdfBookSummariserMainContent;

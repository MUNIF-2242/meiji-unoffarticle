import React from "react";
import Footer from "../components/footer/Footer";
import FlipAnimations from "../components/animation/FlipAnimations";
import FadeAnimations from "../components/animation/FadeAnimations";
import ZoomAnimations from "../components/animation/ZoomAnimations";
import Head from "next/head";
import DashboardBreadcrumb2 from "@/components/breadcrumb/DashboardBreadcrumb2";

const AnimationMainContent = () => {
  return (
    <>
      <Head>
        <title>Digiboard - Animation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <DashboardBreadcrumb2 title={"Animation"} />
        <div className="row">
          <FadeAnimations />
          <FlipAnimations />
          <ZoomAnimations />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AnimationMainContent;
import React from "react";
import Footer from "../components/footer/Footer";
import NestedSortableList from "../components/sortable-list/NestedSortableList";
import NestedSortableHandle from "../components/sortable-list/NestedSortableHandle";
import NestableFolder from "../components/sortable-list/NestableFolder";
import NestableTeam from "../components/sortable-list/NestableTeam";
import Head from "next/head";
import DashboardBreadcrumb2 from "@/components/breadcrumb/DashboardBreadcrumb2";

const NestableListMainContent = () => {
  return (
    <>
      <Head>
        <title>Digiboard - Nestable List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <DashboardBreadcrumb2 title={"Nestable List"} />
        <div className="row">
          <NestedSortableList />
          <NestedSortableHandle />
          <NestableFolder />
          <NestableTeam />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NestableListMainContent;

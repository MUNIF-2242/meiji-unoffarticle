import React from "react";
import Footer from "../components/footer/Footer";
import DefaultTableSection from "../components/tables/DefaultTableSection";
import StripeRowTableSection from "../components/tables/StripeRowTableSection";
import StripeColumnTableSection from "../components/tables/StripeColumnTableSection";
import ColorTableSection from "../components/tables/ColorTableSection";
import HoverableTableSection from "../components/tables/HoverableTableSection";
import BorderedTableSection from "../components/tables/BorderedTableSection";
import BorderColorTableSection from "../components/tables/BorderColorTableSection";
import BorderlessTableSection from "../components/tables/BorderlessTableSection";
import DefaultDataTableSection from "../components/tables/DefaultDataTableSection";
import ScrollDataTableSection from "../components/tables/ScrollDataTableSection";
import CustomizedDataTableSection from "../components/tables/CustomizedDataTableSection";
import Head from "next/head";
import DashboardBreadcrumb2 from "@/components/breadcrumb/DashboardBreadcrumb2";
const TableMainContent = () => {
  return (
    <>
      <Head>
        <title>Digiboard - Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <DashboardBreadcrumb2 title={"Tables"} />
        <div className="row">
          <div className="col-12">
            <div className="panel">
              <div className="panel-header">
                <h5>Basic Tables</h5>
              </div>
              <div className="panel-body">
                <div className="row g-3">
                  <DefaultTableSection />
                  <StripeRowTableSection />
                  <StripeColumnTableSection />
                  <ColorTableSection />
                  <HoverableTableSection />
                  <BorderedTableSection />
                  <BorderColorTableSection />
                  <BorderlessTableSection />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="panel">
              <div className="panel-header">
                <h5>Data Tables</h5>
              </div>
              <div className="panel-body">
                <div className="row g-3">
                  <DefaultDataTableSection />
                  <ScrollDataTableSection />
                  <CustomizedDataTableSection />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TableMainContent;

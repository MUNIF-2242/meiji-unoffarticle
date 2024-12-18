import React from "react";
import Footer from "../components/footer/Footer";
import AttendanceHeader from "../components/header/AttendanceHeader";
import AttendanceTableFilter from "../components/filter/AttendanceTableFilter";
import AttendanceTable from "../components/tables/AttendanceTable";
import Head from "next/head";

const AttendanceMainContent = () => {
  return (
    <>
      <Head>
        <title>Digiboard - Attendance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <div className="row">
          <div className="col-12">
            <div className="panel">
              <AttendanceHeader />
              <div className="panel-body">
                <AttendanceTableFilter />
                <AttendanceTable />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AttendanceMainContent;

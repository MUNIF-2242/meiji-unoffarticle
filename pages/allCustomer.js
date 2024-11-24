import React from "react";
import Footer from "../components/footer/Footer";
import AllCustomerHeader from "../components/header/AllCustomerHeader";
import HeaderBtn from "../components/header/HeaderBtn";
import AllCustomerTableFilter from "../components/filter/AllCustomerTableFilter";
import AllCustomerTable from "../components/tables/AllCustomerTable";
import Head from "next/head";

const AllCustomer = () => {
  return (
    <>
      <Head>
        <title>Digiboard - All Customer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <div className="row">
          <div className="col-12">
            <div className="panel">
              <AllCustomerHeader />
              <div className="panel-body">
                <HeaderBtn />
                <AllCustomerTableFilter />
                <AllCustomerTable />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AllCustomer;
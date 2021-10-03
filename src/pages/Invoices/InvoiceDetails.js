import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoicePage from ".";
import headerimg from "../../assets/img/base-dashboard-logo-black.png";
import API from "../../helpers/api";

const InvoiceDetails = ({props}) => {
  const id = props.match.params.id;
  const [invoice, setInvoice] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const hideAlert = () => setShowAlert(false);

  const getInvoice=async()=>{
    setLoading(true);
    try {
      const res = await API.get(`/api/invoice/${id}`);
      console.log("Invoice ===>", res);
      setInvoice(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching invoice", error);
    }
  }

  useEffect(()=>{
    getInvoice()
  }, [id])

  const user = JSON.parse(localStorage.getItem("user")).user;
  return (
    <InvoicePage>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <span className="col-4 row" title="Go back">
                <Link to={`/admin/${user._id}/invoices`}>
                  <i className="fa fa-arrow-left"></i>
                </Link>
                <h4 className="ml-3 mb-sm-0 font-size-16">Invoice {invoice.invoiceNo}</h4>
              </span>
            </div>
          </div>
        </div>
        <div className="row invoice-form">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="col-lg-12">
                  <div className="row justify-content-between">
                    <div className="col-lg-5 text-align-left">
                      <img
                        src={headerimg}
                        alt="headerimg"
                        className="headerimg"
                      />
                    </div>
                    <div className="col-lg-7 text-align-right invoice-address">
                      <p>Plot no. 42-44,</p>
                      <p className="text-capitalize">Spring Road Bugolobi,</p>
                      <p>P.O.Box 7376, Kampala.</p>
                      <p>Phone: [256] 41 4339 000, [256] 31 2339 000</p>
                      <p>Fax: [256] 41 4348 832,</p>
                      <p>Email: ucc@ucc.co ug</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row justify-content-between">
                    <div className="col-lg-4 text-align-left invoice-bill-to">
                      <h2 className="text-uppercase font-size-14 font-weight-600">
                        sail global
                      </h2>
                      <p className="text-capitalize">
                        Plot 26 Golf Course Road
                      </p>
                      <p>P.O.Box 6111, Kampala</p>
                      <p>Bill-to-Customer No. {invoice.customerNo}</p>
                    </div>
                    <span className="text-uppercase font-weight-600">
                      Tax Invoice
                    </span>
                    <div className="col-lg-4 table table-responsive invoice-table">
                      <table className="table-striped table-bordered">
                        <tbody>
                          <tr>
                            <td>Invoice No.</td>
                            <td>{invoice.invoiceNo}</td>
                          </tr>
                          <tr>
                            <td>Vat Registration No.</td>
                            <td>{invoice.vatNo}</td>
                          </tr>
                          <tr>
                            <td>TIN No.</td>
                            <td>{invoice.tinNo}</td>
                          </tr>
                          <tr>
                            <td>Customer No.</td>
                            <td>{invoice.customerNo}</td>
                          </tr>
                          <tr>
                            <td>Terms</td>
                            <td>{invoice.paymentTerms}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-3 invoice-dates">
                        <span>
                          <p className="text-capitalize">Posting Date:</p>
                          <span>{invoice.timeStamp}</span>
                        </span>
                        <span>
                          <p className="text-capitalize">Next Bill date:</p>
                          <span>{invoice.nextBillDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="table-responsive">
                    <table className="table table-nowrap table-bordered">
                      <thead className="bg-info text-light">
                        <tr>
                          <td>Date</td>
                          <td>Particulars</td>
                          <td>Units</td>
                          <td>Rate</td>
                          <td>Amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{invoice.timeStamp}</td>
                          <td>{invoice.item}</td>
                          <td>{invoice.quantity}</td>
                          <td>{invoice.vatNo}</td>
                          <td>{invoice.currency} {invoice.subtotal}</td>
                        </tr>
                        <div className="table-lower-section text-align-right">
                          <tr>
                            <td className="text-uppercase">Sub total</td>
                            <td>{invoice.subtotal}</td>
                          </tr>
                          <tr>
                            <td className="text-uppercase">VAT</td>
                            <td>{invoice.vat}</td>
                          </tr>
                          <tr>
                            <td className="text-uppercase">Total</td>
                            <td>{invoice.total}</td>
                          </tr>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-12 mt-5 invoice-authority">
                  <div className="row justify-content-around">
                    <div className="col-lg-4 col-sm-4">
                      <span className="row">
                        <h4>Checked By:</h4>
                        <p>{invoice.checkedBy}</p>
                      </span>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                      <span className="row">
                        <h4>Authorised By:</h4>
                        <p>{invoice.authorisedBy}</p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-3 invoice-terms">
                  <h2 className="text-uppercase font-weight-600">
                    terms of payment:
                  </h2>
                  <div>
                    <h3 className="text-uppercase font-weight-600">
                      A. Licences/fees
                    </h3>
                    <ul>
                      <li>
                        {" "}
                        Payment is due on the date of commencement of the
                        Licence Period.
                      </li>
                      <li>
                        {" "}
                        Non-payment of fees may lead to automatic cancellation
                        of Licence/Withdrawal of frequencies.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-uppercase font-weight-600">B. Rent</h3>
                    <ul>
                      <li> Rent is payable quarterly and in advance.</li>
                      <li>
                        {" "}
                        Non-payment of rentmay lead to eviction and recovery of
                        rent by other measures.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoicePage>
  );
};

export default InvoiceDetails;
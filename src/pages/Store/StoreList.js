import React, { useState, useEffect } from "react";
import API from "../../helpers/api";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import Modal from "../../components/Modal";

import LoadSpinner from "../../components/Handlers/Loadspinner";

import Store from ".";

const StoreList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [add, setAdd] = useState();
  const [update, setUpdate] = useState();
  const [uId, setUid] = useState();
  const [dId, setDid] = useState();
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const hideAlert = () => setShowAlert(false);

  const openAdd = () => setAdd(true);
  const closeAdd = () => setAdd(false);

  const openUpdate = (e, _id) => {
    if (e) {
      setUid(_id);
      setUpdate(true);
    }
  };
  const closeUpdate = () => setUpdate(false);

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/store");
      console.log("Store Items Backend ===>", res);
      setItems(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Store>
      <Modal show={add} close={closeAdd} title="Add Store Item">
        <AddItem close={closeAdd} items={getItems} />
      </Modal>
      <Modal show={update} close={closeUpdate} title="Update Store Item">
        <UpdateItem
          close={closeUpdate}
          items={getItems}
          id={uId}
          show={update}
        />
      </Modal>
      <div className="container-fluid">
        <div className="col-sm-12 col-lg-12">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">The Store</h4>
                <div className="col-3">
                  <div className="text-sm-end" style={{ textAlign: "right" }}>
                    <button
                      onClick={openAdd}
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light me-2"
                    >
                      <i className="fa fa-plus-circle me-1"></i> Add Store Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between visual-card">
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>
                      <h2 className="text-info font-size-70">53</h2>
                      <span className="text-muted font-size-14 text-uppercase ml-2">
                        Uniforms
                      </span>
                    </span>
                    <hr className="bg-secondary mt-3" />
                    <div className="table-responsive">
                      <table className="table table-borderless store-table">
                        <tbody className="font-size-12">
                          <tr>
                            <td>Shirts</td>
                            <td>53</td>
                          </tr>
                          <tr>
                            <td>Trousers</td>
                            <td>53</td>
                          </tr>
                          <tr>
                            <td>Skirts</td>
                            <td>53</td>
                          </tr>
                          <tr>
                            <td>Boots</td>
                            <td>33</td>
                          </tr>
                          <tr>
                            <td>Socks</td>
                            <td>150</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>
                      <h2 className="text-danger font-size-70">240</h2>
                      <span className="text-muted font-size-14 text-uppercase ml-3">
                        Accessories
                      </span>
                    </span>
                    <hr className="bg-secondary mt-3" />
                    <div className="table-responsive">
                      <table className="table table-borderless store-table">
                        <tbody className="font-size-12">
                          <tr>
                            <td>Torches</td>
                            <td>158</td>
                          </tr>
                          <tr>
                            <td>Masks</td>
                            <td>240</td>
                          </tr>
                          <tr>
                            <td>Gloves</td>
                            <td>53</td>
                          </tr>
                          <tr>
                            <td>Rain coats</td>
                            <td>33</td>
                          </tr>
                          <tr>
                            <td>water bottles</td>
                            <td>240</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>
                      <h2 className="text-secondary font-size-70">60</h2>
                      <span className="text-muted font-size-14 text-uppercase ml-3 ">
                        Vehicles
                      </span>
                    </span>
                    <hr className="bg-secondary mt-3" />
                    <div className="table-responsive">
                      <table className="table table-borderless store-table">
                        <tbody className="font-size-12">
                          <tr>
                            <td>Pickups</td>
                            <td>10</td>
                          </tr>
                          <tr>
                            <td>Bikes</td>
                            <td>24</td>
                          </tr>
                          <tr>
                            <td>SUV</td>
                            <td>3</td>
                          </tr>
                          <tr>
                            <td>Vans</td>
                            <td>33</td>
                          </tr>
                          <tr>
                            <td>Buses</td>
                            <td>2</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>
                      <h2 className="text-warning font-size-70">10</h2>
                      <span className="text-muted font-size-14 text-uppercase ">
                        Mobile Phones
                      </span>
                    </span>
                    <hr className="bg-secondary mt-3" />
                    <div className="table-responsive">
                      <table className="table table-borderless store-table">
                        <tbody className="font-size-12">
                          <tr>
                            <td>Torches</td>
                            <td>158</td>
                          </tr>
                          <tr>
                            <td>Masks</td>
                            <td>240</td>
                          </tr>
                          <tr>
                            <td>Gloves</td>
                            <td>53</td>
                          </tr>
                          <tr>
                            <td>Rain coats</td>
                            <td>33</td>
                          </tr>
                          <tr>
                            <td>water bottles</td>
                            <td>240</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-5">
            <table className="table align-middle table-nowrap table-check table-bordered table-striped">
              {loading && <LoadSpinner />}
              <thead className="table-dark">
                <tr className="tr-head">
                  <th style={{ width: "20px" }} className="align-middle">
                    <div className="form-check font-size-16">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="checkAll"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="checkAll"
                      ></label>
                    </div>
                  </th>
                  <th className="align-middle"> Category</th>
                  <th className="align-middle"> Item</th>
                  <th className="align-middle"> Quantity</th>
                  <th className="align-middle"> Used</th>
                  <th className="align-middle"> Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item) => (
                    <tr key={item._id} className="tr-body">
                      <td>
                        <div className="form-check font-size-16">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="orderidcheck01"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="orderidcheck01"
                          ></label>
                        </div>
                      </td>
                      <td>{item.category}</td>
                      <td>
                        <span
                          className="td-hover"
                          // onClick={() => getProfile(item._id)}
                        >
                          {item.itemName}
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.used}</td>
                      <td>
                        <div className="row ml-2">
                          <span
                            title="Update details"
                            style={{
                              marginRight: "20px",
                              color: "green",
                            }}
                            onClick={(e) => openUpdate(e, item._id)}
                          >
                            <i className="fas fa-edit action" />
                          </span>
                          <span style={{ color: "red" }} title="Delete Client">
                            <i className="far fa-trash-alt action" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Store>
  );
};

export default StoreList;

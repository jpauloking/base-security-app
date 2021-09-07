import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../helpers/api";
import Guards from "./index";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadHandler from "../../components/Handlers/LoadHandler";
import LoadSpinner from "../../components/Handlers/Loadspinner";

const UpdateGuard = (props) => {
  const id = props.match.params.id
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [isAssigned, setisAssigned] = useState(false);
  const role = useState('guard');
  const [guns, setGuns] = useState([])
  const [gun, setGun] = useState([])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const hideAlert = () => setShowAlert(false);

  const getGuard = async (id) => {
    setLoading(true);
    try {
      const res = await API.get(`/api/guard/${id}`);
      console.log("Guard Backend ===>", res);
      setFName(res.data.guard.fname)
      setLName(res.data.guard.lname)
      setEmail(res.data.guard.email)
      setPhone(res.data.guard.phone)
      setSex(res.data.guard.sex)
      setStatus(res.data.guard.maritalStatus)
      setPassword(res.data.guard.password)
      setLoading(false);
    } 
    catch (error) {
      setLoading(false);
      console.log("Error fetching guard", error);
    }
  };

  const history= useHistory();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const newData = {
      fname: fName,
      lname: lName,
      sex,
      email,
      phone: parseInt(phone),
      role,
      maritalStatus: status,
      password
    }
    setLoading(true);

    try{
    const res = await API.patch(`/api/guard/${props.match.params.id}`, newData)
    setLoading(false);
    setSuccess(true);
    setShowAlert(true);
    setTimeout(()=>{
      history.push("/guards");
    }, 2000)
    console.log('Guard updated successfully', res)
    }
    catch(err){
      setLoading(false);
        setError(true);
        setShowAlert(true);
        console.log('Failed to update guard details', err)
    }
  }

  const getGuns = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/gun");
      console.log("Guns Backend ===>", res);
      setGuns(res.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    getGuard(id);
    getGuns()
  },[id])

  return (
    <Guards>
      {showAlert && success && (
        <SweetAlert
          success
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          title="Details Updated"
          timeout={3000}
        />
      )}
      {showAlert && error && (
        <SweetAlert
          danger
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          title="There was an error. Please try again!"
          timeout={3000}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <span className="col-4 row" title="Go back">
                <Link to="/guards">
                  <i className="fa fa-arrow-left"></i>
                </Link>
                <h4 className="ml-3 mb-sm-0 font-size-16">Update Guard Details</h4>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Basic Information</h4>
                <p className="card-title-desc">Fill all information below</p>
                <form onSubmit={handleSubmit}>
                <div className="row guard">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                        required/>
                      </div>
                      <div className="mb-3">
                        <label>
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                        required/>
                      </div>
                      <div className="mb-3">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        required/>
                      </div>
                      <div className="mb-3">
                        <label>
                          Assigned Gun
                        </label>
                        <select
                        className="form-control select2 select2-hidden-accessible"
                        value={isAssigned}
                        onChange={(e) => setisAssigned(e.target.value)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label>
                          Gun Type
                        </label>
                        <select
                        className="form-control select2 select2-hidden-accessible"
                        value={gun}
                        onChange={(e) => setGun(e.target.value)}>
                        {guns.length > 0 ? (
                          guns.map((gun) => <option key={gun._id} value={gun._id}>{gun.name}</option>)
                            ) : (
                          <LoadSpinner />
                        )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="mb-3">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          maxLength="10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        required/>
                      </div>
                      <div className="mb-3">
                        <label>
                          Sex
                        </label>
                        <select
                        className="form-control select2 select2-hidden-accessible"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}>
                        <option>Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label>
                          Marital Status
                        </label>
                        <select
                        className="form-control select2 select2-hidden-accessible"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option>Marital Status</option>
                        <option value="Single" selected>Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {loading ? <LoadHandler /> : 'Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div style={{ height: "50px" }}></div>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-3">Guard Profile Image</h4>
                <form
                  action="/"
                  method="post"
                  className="dropzone dz-clickable"
                >
                  <div
                    className="dz-message needsclick mt-3"
                    style={{ textAlign: "center" }}
                  >
                    <div className="mb-3 ">
                      <i className="display-4 text-muted font-size-25 fas fa-upload"></i>
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guards>
  );
};

export default UpdateGuard;

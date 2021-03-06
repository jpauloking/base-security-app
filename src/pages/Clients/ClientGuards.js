/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Handlers/Loadspinner";
import API from "../../helpers/api";

const ClientGuards = ({ clientId }) => {
  const [deployed, setDeployed] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")).user;
  const [loading, setLoading] = useState(false);

  const id = clientId;

  const getDeployment = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/deployment/client/${id}`);
      console.log("Deployment ===>", res);
      setDeployed(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching deployed", error);
    }
  };

  useEffect(() => {
    getDeployment();
  }, [clientId]);

  console.log("Backend Stuff ====>", deployed);
  return (
    <div class="row staff-grid-row">
      {deployed.length > 0 ? (
        deployed.map((deploy) => (
          <div class="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
            <div class="profile-widget">
              <div class="profile-img">
                <Link to={`/admin/${user._id}/guards/profile/${deploy.guard._id}`} class="avatar">
                  <img src="/assets/images/avatar.jpg" alt="" />
                </Link>
              </div>
              <h4 class="user-name m-t-10 mb-0">
                <Link to={`/admin/${user._id}/guards/profile/${deploy.guard._id}`}>
                  {deploy.guard.firstname} {deploy.guard.lastname}
                </Link>
              </h4>
              <div class="small text-muted">{deploy.postsite}</div>
            </div>
          </div>
        ))
      ) : (
        <tr>
          <span className="text-muted font-size-15 text-align-center text-capitalize">
            No deployed guards yet!
          </span>
        </tr>
      )}
    </div>
  );
};

export default ClientGuards;

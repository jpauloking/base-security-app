import React from "react";
import logo from '../../assets/img/plainlogo.png'

const index = ({ children, title, show, close }) => {
  const showHideClassName = show
    ? "modal fade show display-block"
    : "modal display-none";
  return (
    <>
      <div className={showHideClassName}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <img src={logo} alt="base"
              style={{height:'50px', margin:'3px'}}/>
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={close}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

import { useState, useEffect } from "react";

const CustomModal = ({ show, onClose, title, children, modalSize }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = show ? 'hidden' : 'auto';
  }, [show])

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {show ? (
        <div
          className={`signup_modal modal fade show bd-example-${
            modalSize ? modalSize : "modal-md"
          } commmon-modal req_visit apply_now contact_us report`}
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div
            className={`modal-dialog modal-dialog-centered ${
              modalSize ? modalSize : "modal-md"
            }`}
          >
            <div className="modal-content">
              <div className="modal-header bgc-thm">
                <h3 className="text-white" id="staticBackdropLabel">
                  {title}
                </h3>
                <button
                  type="button"
                  className="btn-close text-white"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body container pb20">
                <div className="row justify-content-center">
                  <div className="col-lg-12">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ): <></>}
    </>
  );
};

export default CustomModal;
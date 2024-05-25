import React, { useState, useEffect } from "react";
import CustomModal from "./Modal";
import { Form, Formik } from 'formik';
import axios from "axios";
import { toast } from "react-toastify";

const DoctorList = () => {
  const [openTypeModal, setTypeOpenModal] = useState(false);
  const [openSlotbookingModal, setOpenSlotbookingModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [patientType, setPatientType] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/doctors/`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the doctor details!', error);
      });
  }, []);

  const clearStates = () => {
    setSelectedIndex("");
    setSelectedSlot(null);
  };

  const fetchSlots = (doctorId, type) => {
    const endpoint = type === "InitialConsult"
      ? `http://localhost:8000/api/availability/${doctorId}/?consultation_type=InitialConsult`
      : `http://localhost:8000/api/availability/${doctorId}/?consultation_type=Followup`;

    axios.get(endpoint)
      .then(response => {
        setSlots(response.data);
        setOpenSlotbookingModal(true);
      })
      .catch(error => {
        console.error('There was an error fetching the slots!', error);
      });
  };

  const handleSlotClick = (slot, index) => {
    if (slot.availability) {
      if (selectedSlot === slot) {
        setSelectedSlot(null);
        setSelectedIndex("");
      } else {
        setSelectedSlot(slot);
        setSelectedIndex(index);
        setSelectedStartTime(slot.slot_start);
        setSelectedEndTime(slot.slot_end);
        setSelectedSlotTime(slot.slot_time);
      }
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      handleSlotModalClose();
      setOpenInfoModal(true);
    }
  };

  const handleModalClose = () => {
    setTypeOpenModal(false);
  };

  const handleSlotModalClose = () => {
    setOpenSlotbookingModal(false);
    clearStates();
  };

  const handleInfoModalClose = () => {
    setOpenInfoModal(false);
  };

  const handleTypeSelection = (type) => {
    setPatientType(type);
    handleModalClose();
    fetchSlots(selectedDoctor, type);
  };

  return (
    <>
      <div className="container">
        <div className="my-5">
          <h1 className="font_colour">Appointment Booking System</h1>
        </div>
        <div className="row g-2">
          {doctors.map((doctor, index) => (
            <div className="col-md-3" key={index}>
              <div className="card p-2 py-3 text-center">
                <h5 className="mb-0">{doctor.name}</h5>
                <small>{doctor.specialization}</small>
                <small>Time: {doctor.availabilty_start_time} to {doctor.availabilty_end_time}</small>
                <div
                  className="mt-4 apointment"
                  onClick={() => {
                    setSelectedDoctor(doctor.id);
                    setTypeOpenModal(true);
                  }}
                >
                  <button className="btn btn-thm text-uppercase">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Type Modal */}
      <CustomModal
        title={"Select Appointment Type"}
        show={openTypeModal}
        onClose={handleModalClose}
        modalSize="modal-md size-full"
      >
        <div className="text-center my-2">
          <div>
            <button
              className="btn btn-thmblue mx-2 mb-3"
              onClick={() => handleTypeSelection("InitialConsult")}
            >
              Initial Consult
            </button>
          </div>
          <button
            className="btn btn-thmblue mx-2"
            onClick={() => handleTypeSelection("Followup")}
          >
            Follow-up Consult
          </button>
        </div>
      </CustomModal>

      {/* Slot Selection Modal */}
      <CustomModal
        title={"Select Appointment Slot"}
        show={openSlotbookingModal}
        onClose={handleSlotModalClose}
        modalSize="modal-xl size-full"
      >
        <div className="slot-booking-container">
          <div className="slots-list d-flex justify-content-center">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={`slot ${selectedIndex === index ? "selected" : ""} ${!slot.availability ? "disabled" : ""}`}
                onClick={() => handleSlotClick(slot, index)}
              >
                {slot.slot_start} - {slot.slot_end}
              </div>
            ))}
          </div>
          <button
            className="confirm-button"
            onClick={handleConfirmBooking}
            disabled={!selectedSlot}
          >
            Confirm Booking
          </button>
        </div>
      </CustomModal>

      {/* Patient Detail Modal */}
      <CustomModal
        title={"Personal Information"}
        show={openInfoModal}
        onClose={handleInfoModalClose}
        modalSize="modal-md size-full"
      >
        <div className="my_dashboard_review">
          <div className="row mb20">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone_number: "",
              }}
              enableReinitialize={true}
              onSubmit={async (values) => {
                let data = {
                  doctor: selectedDoctor,
                  slot_date: new Date().toISOString().slice(0, 10),
                  slot_time: selectedSlotTime,
                  appointment_type: patientType,
                  patient: {
                    ...values
                  }
                };
                axios.post(`http://localhost:8000/api/book_appointment/`, data)
                  .then(response => {
                    handleInfoModalClose();
                    toast.success(`Successfully booked appointment for ${response.data.patient.name} at ${response.data.first_slot_time}!`, { autoClose: 5000 });
                  })
                  .catch(error => {
                    console.error('There was an error booking the appointment!', error);
                  });
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="row p-3">
                    <div className="form-outline col flex-fill mb-2">
                      <label className="form-label" htmlFor="name">
                        Patient Name
                        <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={handleChange}
                        value={values?.name}
                        required
                      />
                    </div>
                    <div className="form-outline col flex-fill mb-2">
                      <label className="form-label" htmlFor="email">
                        Email
                        <span className="error">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        onChange={handleChange}
                        value={values?.email}
                        required
                      />
                    </div>
                    <div className="form-outline col flex-fill mb-3">
                      <label className="form-label" htmlFor="phone_number">
                        Phone Number
                        <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        className="form-control"
                        id="phone_number"
                        onChange={handleChange}
                        value={values?.phone_number}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <input
                        type="submit"
                        name="submit"
                        value="Submit"
                        className="btn btn-thmgreen"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default DoctorList;

import React, { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applicationData, setApplicationData] = useState({
    service: "",
    applicantDetails: {
      fullName: "",
      citizenshipNumber: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      municipality: "",
      wardNumber: "",
      tole: "",
    },
    documents: {},
    voucher: null,
  });

  const updateService = (service) => {
    setApplicationData((prev) => ({
      ...prev,
      service,
    }));
  };

  const updateApplicantDetails = (details) => {
    setApplicationData((prev) => ({
      ...prev,
      applicantDetails: details,
    }));
  };

  const updateDocuments = (documents) => {
    setApplicationData((prev) => ({
      ...prev,
      documents,
    }));
  };

  const updateVoucher = (voucher) => {
    setApplicationData((prev) => ({
      ...prev,
      voucher,
    }));
  };

  const clearApplication = () => {
    setApplicationData({
      service: "",
      applicantDetails: {
        fullName: "",
        citizenshipNumber: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        province: "",
        district: "",
        municipality: "",
        wardNumber: "",
        tole: "",
      },
      documents: {},
      voucher: null,
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationData,
        updateService,
        updateApplicantDetails,
        updateDocuments,
        updateVoucher,
        clearApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplication must be used within an ApplicationProvider"
    );
  }

  return context;
}
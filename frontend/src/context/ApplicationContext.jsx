import React, { createContext, useContext, useEffect, useState } from "react";

const ApplicationContext = createContext();

const emptyApplication = {
  service: "",
  fee: 0,
  paymentRequired: false,
  requiredDocuments: [],

  applicantDetails: {
    fullName: "",
    citizenshipNumber: "",
    dateOfBirth: "",
    phone: "",
    email: "",
  },

  address: {
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    tole: "",
  },

  // Keyed by document id -> File
  documents: {},

  // { required, amount, voucher: File | null }
  payment: {
    required: false,
    amount: 0,
    voucher: null,
  },
};

const STORAGE_KEY = "sifarish_application_draft";

export function ApplicationProvider({ children }) {
  const [applicationData, setApplicationData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          ...emptyApplication,
          ...parsed,
          applicantDetails: {
            ...emptyApplication.applicantDetails,
            ...parsed.applicantDetails,
          },
          address: {
            ...emptyApplication.address,
            ...parsed.address,
          },
          payment: {
            ...emptyApplication.payment,
            ...parsed.payment,
            // File cannot be restored from localStorage
            voucher: null,
          },
          // File objects cannot be restored from localStorage
          documents: {},
        };
      }
    } catch (error) {
      console.error("Failed to load application draft:", error);
    }

    return emptyApplication;
  });

  // Save application data to localStorage
  useEffect(() => {
    try {
      const dataToSave = {
        ...applicationData,

        // Do not try to save File objects
        documents: {},

        payment: {
          ...applicationData.payment,
          voucher: null,
        },
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dataToSave)
      );
    } catch (error) {
      console.error("Failed to save application draft:", error);
    }
  }, [applicationData]);

  // Called when a service is selected
  const updateService = ({
    service,
    fee,
    paymentRequired,
    requiredDocuments,
  }) => {
    setApplicationData((prev) => ({
      ...prev,

      service,
      fee: fee ?? 0,
      paymentRequired: !!paymentRequired,
      requiredDocuments: requiredDocuments || [],

      payment: {
        ...prev.payment,
        required: !!paymentRequired,
        amount: fee ?? 0,
      },
    }));
  };

  // Update applicant information
  const updateApplicantDetails = (details) => {
    setApplicationData((prev) => ({
      ...prev,

      applicantDetails: {
        ...prev.applicantDetails,
        ...details,
      },
    }));
  };

  // Update address
  const updateAddress = (address) => {
    setApplicationData((prev) => ({
      ...prev,

      address: {
        ...prev.address,
        ...address,
      },
    }));
  };

  // Update uploaded documents
  const updateDocuments = (documents) => {
    setApplicationData((prev) => ({
      ...prev,

      documents,
    }));
  };

  // Update payment information
  const updatePayment = (payment) => {
    setApplicationData((prev) => ({
      ...prev,

      payment: {
        ...prev.payment,
        ...payment,
      },
    }));
  };

  // Clear everything after successful submission
  const clearApplication = () => {
    setApplicationData(emptyApplication);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationData,
        updateService,
        updateApplicantDetails,
        updateAddress,
        updateDocuments,
        updatePayment,
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
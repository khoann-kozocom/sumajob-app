import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const initAlertModalData = {
  open: false,
  element: null,
  title: "",
  description: "",
  confirmButton: "OK",
  cancelButton: "Cancel",
  cancelFunc: () => {},
  confirmFunc: () => {},
};

const AlertContext = createContext({
  open: false,
  alertData: initAlertModalData,
  showAlert: () => {},
  closeAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export default function AlertContextProvider({ children }) {
  // alert
  const [alertData, setAlertData] = useState(initAlertModalData);
  const { open } = alertData;

  const values = useMemo(
    () => ({
      open,
      alertData,
      showAlert: (data) =>
        setAlertData({ ...initAlertModalData, ...data, open: true }),
      closeAlert: () => setAlertData(initAlertModalData),
    }),
    [open]
  );

  return (
    <AlertContext.Provider value={values}>{children}</AlertContext.Provider>
  );
}

AlertContextProvider.propTypes = {
  children: PropTypes.element,
};

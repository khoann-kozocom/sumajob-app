import Types from "prop-types";
import React, { createContext, useContext, useMemo, useState } from "react";

const LoadingContext = createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const valueLoading = useMemo(
    () => ({
      loading,
      showLoading: () => setLoading(true),
      hideLoading: () => setLoading(false),
    }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={valueLoading}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: Types.node,
};

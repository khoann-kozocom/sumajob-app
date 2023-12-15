import React, { createContext, useContext, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { Context } from "./context";
import PropTypes from "prop-types";

const BottomModalContext = createContext();

export const useBottomModal = () => useContext(BottomModalContext);

export const BottomModalProvider = ({ children }) => {
  const { height } = useContext(Context);
  const [bottomModal, setBottomModal] = useState({
    children: null,
  });

  const startTranslateY = height + 100;
  const scrollYOfBottomModal = useSharedValue(0);

  const translateY = useSharedValue(startTranslateY);
  const opacity = useSharedValue(0);
  const zIndex = useSharedValue(0);

  const closeBottomModal = () => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(startTranslateY, {
      duration: 300,
    });
    setTimeout(() => {
      zIndex.value = -1;
      scrollYOfBottomModal.value = 0;
      setBottomModal({
        children: null,
      });
    }, 300);
  };

  const openBottomModal = (data) => {
    setBottomModal((prev) => ({
      ...prev,
      ...data,
    }));
    zIndex.value = 10;
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withTiming(0, { duration: 300 });
  };

  const value = {
    bottomModal,
    translateY,
    opacity,
    zIndex,
    openBottomModal,
    closeBottomModal,
    startTranslateY,

    scrollYOfBottomModal,
  };

  return (
    <BottomModalContext.Provider value={value}>
      {children}
    </BottomModalContext.Provider>
  );
};

BottomModalProvider.propTypes = {
  children: PropTypes.element,
};

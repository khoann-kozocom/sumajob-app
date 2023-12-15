import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { HEADER_HEIGHT } from "./common";
import { useSharedValue } from "react-native-reanimated";
import { getStorage } from "../utils/storage";
import { ACCESS_TOKEN_KEY } from "../config/storageKeys";
import { authorization } from "../api/authorization";
import { getSumajobStaffDetail } from "../services/sumajob_staff";
import { QUERY_KEY } from "../config/queryKeys";
import { useQuery } from "react-query";
import { getBusinesses, getConditions } from "../services/conditions";

const { height, width } = Dimensions.get("screen");
export const Context = createContext();
export const useGlobalContext = () => useContext(Context);
export default function ContextProvider({ children }) {
  const [notificationToken, setNotificationToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [staffDetail, setStaffDetail] = useState("");
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);

  const [initialStartRouteName, setInitialStartRouteName] = useState("Login");
  const headerHeight = useSharedValue(HEADER_HEIGHT);
  const headerOpacity = useSharedValue(1);
  const headerTranslateY = useSharedValue(0);

  // call api
  useQuery({
    queryFn: () => getSumajobStaffDetail(),
    queryKey: QUERY_KEY.SUMAJOB_STAFF,
    enabled: Boolean(accessToken),
    onSuccess: (res) => {
      if (res?.success) {
        setStaffDetail(res);
      }
    },
  });

  useQuery({
    queryFn: () => getBusinesses(),
    queryKey: QUERY_KEY.BUSINESSES,
    onSuccess: (res) => {
      if (res?.success) {
        // setCareerArr(data);
        // const filterCareers = data.filter((career) =>
        //   formatCareersIds.includes(career.id)
        // );
        // setCareers(filterCareers);
      }
    },
  });

  useQuery({
    queryFn: () => getConditions(),
    queryKey: QUERY_KEY.CONDITIONS,
    onSuccess: (res) => {
      if (res?.success) {
        // const { data } = res.data;
        // setFeatureArr(data);
        // const filterFeatures = data.filter((condition) =>
        //   formatConditionIds.includes(condition.id)
        // );
        // setFeatures(filterFeatures);
      }
    },
  });

  // authorization
  useEffect(() => {
    getStorage(ACCESS_TOKEN_KEY).then((token) => {
      if (token) {
        authorization(token);
        setAccessToken(token);
      }
    });
  }, []);
  const statusBarHeight = useMemo(() => {
    return Platform.OS === "android" ? StatusBar.currentHeight : 20; // Default status bar height for iOS
  }, []);

  const value = {
    height,
    width,
    notificationToken,
    setNotificationToken,
    initialStartRouteName,
    setInitialStartRouteName,

    accessToken,
    setAccessToken,

    headerHeight,
    headerOpacity,
    headerTranslateY,

    staffDetail,

    setNumberOfNotifications,
    numberOfNotifications,
    statusBarHeight,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.element,
};

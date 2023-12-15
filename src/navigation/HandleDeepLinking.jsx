import React from "react";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useNavigation } from "@react-navigation/native";

const HandleDeepLinking = () => {
  const navigation = useNavigation();
  const handleLink = async (link) => {
    const url = link.url;
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    navigation.navigate("JobDetail", { job: params });
  };

  React.useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleLink);
    return () => unsubscribe;
  });

  return null;
};

export default HandleDeepLinking;

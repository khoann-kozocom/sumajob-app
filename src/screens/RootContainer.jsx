import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../utils/navigation";
import { LogBox, StyleSheet, View } from "react-native";
import Start from "./Start";
import Login from "./Login";
import Loading from "../components/Loader";
import { useLoading } from "../components/LoadingContext";
import { SCREEN_NAME } from "../config/screenName";
import MessageDetail from "./MessageDetail";
import NewsDetail from "./NewsDetail";
import AlertModal from "../components/Modal/AlertModal";
import { useAlert } from "../contants/AlertContext";
import JobDetail from "./JobDetail";
import FlashMessage from "react-native-flash-message";
import HandleDeepLinking from "../navigation/HandleDeepLinking";
import { PRIMARY_DARK_BLUE } from "../config/css/color";
import linking from "../config/linking";
import Myno from "./Myno";
const Stack = createStackNavigator();
LogBox.ignoreLogs(["Setting a timer", "Failed prop type"]);

export const RootContainer = () => {
  const { loading } = useLoading();
  const { alertData } = useAlert();
  const { START, LOGIN, NEWS_DETAIL, MESSAGE_DETAIL, JOB_DETAIL, MYNO } =
    SCREEN_NAME;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 100,
    },
  });

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <AlertModal alertData={alertData} />
      <FlashMessage position="top" />
      {/* <--- here as the last component */}
      <NavigationContainer ref={navigationRef} linking={linking}>
        <HandleDeepLinking />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarColor: PRIMARY_DARK_BLUE,
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: PRIMARY_DARK_BLUE },
          }}
        >
          <Stack.Screen name={START} component={Start} />
          <Stack.Screen name={MESSAGE_DETAIL} component={MessageDetail} />
          <Stack.Screen name={NEWS_DETAIL} component={NewsDetail} />
          <Stack.Screen name={JOB_DETAIL} component={JobDetail} />
          <Stack.Screen name={MYNO} component={Myno} />

          <Stack.Screen name={LOGIN} component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

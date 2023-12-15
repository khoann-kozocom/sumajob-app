import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Context } from "../../contants/context";
import Messages from "./Messages";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import News from "./News";

const Tab = createMaterialTopTabNavigator();

const Notifications = () => {
  const { width } = useContext(Context);

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      width,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      height: "100%",
      width: width - 20,
    },
    tabBarStyle: {
      marginTop: 10,
      width: "95%",
      marginLeft: "2.5%",
      paddingVertical: 0,
      // height: 40,
    },
    tabBarLabelStyle: {
      color: "#fff",
      fontSize: 16,
    },
    tabBarIndicatorContainerStyle: {
      backgroundColor: "#ccc",
      borderColor: "#fff",
    },
    tabBarIndicatorStyle: {
      backgroundColor: PRIMARY_LIGHT_BLUE,
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          }}
          ta
        >
          <Tab.Screen
            options={{
              tabBarLabel: "メッセージ",
            }}
            name="Messages"
            component={Messages}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "ニュース",
            }}
            name="News"
            component={News}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Notifications;

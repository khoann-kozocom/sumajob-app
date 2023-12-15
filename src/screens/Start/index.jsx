import React, { useContext } from "react";
import Home from "../Home";
import Wishlist from "../Wishlist";
import Jobs from "../Jobs";
import Notifications from "../Notifications";
import Settings from "../Settings";
import { SearchFooterIcon } from "../../svgs/SearchFooterIcon";
import { WishListIcon } from "../../svgs/WistListIcon";
import { JobIcon } from "../../svgs/JobIcon";
import { MailIcon } from "../../svgs/MailIcon";
import { AccountIcon } from "../../svgs/AccountIcon";
import PropTypes from "prop-types";

import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { PRIMARY_DARK_BLUE, PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import Header from "../../components/Layout/Header";
import { BOTTOM_TABS, SCREEN_NAME } from "../../config/screenName";
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
// import { usePushNotifications } from "../../utils/notificationConfig";
import { Context } from "../../contants/context";
import BottomModal from "../../components/Modal/BottomModal";
import { useBottomModal } from "../../contants/BottomModalContext";

const Tab = createBottomTabNavigator();

const Start = ({ navigation }) => {
  // usePushNotifications();
  const { numberOfNotifications } = useContext(Context);

  const { bottomModal } = useBottomModal();
  const { children, name } = bottomModal;
  const { HOME, WISHLIST, JOBS, NOTIFICATIONS, SETTINGS } = SCREEN_NAME;
  const tabs = [
    // {
    //   name: LOGIN,
    //   component: Login,
    //   icon: (color) => <SearchFooterIcon color={color} />,
    //   title: "Login",
    // },
    {
      name: HOME,
      component: Home,
      icon: (color) => <SearchFooterIcon color={color} />,
      title: "検索",
    },
    {
      name: WISHLIST,
      component: Wishlist,
      icon: (color) => <WishListIcon color={color} />,
      title: "キープリスト",
    },
    {
      name: JOBS,
      component: Jobs,
      icon: (color) => <JobIcon color={color} />,
      title: "お仕事管理",
    },
    {
      name: NOTIFICATIONS,
      component: Notifications,
      icon: (color) => <MailIcon color={color} />,
      title: "メッセージ",
    },
    {
      name: SETTINGS,
      component: Settings,
      icon: (color) => <AccountIcon color={color} />,
      title: "マイページ",
    },
    // {
    //   name: NEWS_DETAIL,
    //   component: NewsDetail,
    //   icon: () => null,
    //   title: "",
    // },
    // {
    //   name: MESSAGE_DETAIL,
    //   component: MessageDetail,
    //   icon: () => null,
    //   title: "",
    // },
  ];
  const styles = StyleSheet.create({
    tabBarLabelStyle: {
      fontSize: 10,
      marginHorizontal: 0,
      marginVertical: 0,
      paddingBottom: 0,
      marginBottom: 3,
      color: "#fff",
    },
    tabBarIconStyle: {
      marginTop: 4,
    },
  });

  // useEffect(() => {
  //   if (expoPushToken) {
  //     setNotificationToken(expoPushToken.data);
  //   }
  // }, [expoPushToken]);

  return (
    <>
      <Header navigation={navigation} />
      <BottomModal name={name}>{children}</BottomModal>
      <Tab.Navigator
        screenOptions={{
          initialRouteName: "Home",
          headerShown: false,
          unmountOnBlur: true,
          tabBarActiveTintColor: "#FFF",
          tabBarActiveBackgroundColor: PRIMARY_LIGHT_BLUE,
          tabBarStyle: {
            backgroundColor: PRIMARY_DARK_BLUE,
          },

          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
        }}
        tabBar={(props) => (
          <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            layout={Layout.duration(100)}
          >
            <BottomTabBar {...props} />
          </Animated.View>
        )}
      >
        {tabs.map(({ name, component, icon, title }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              tabBarIcon: ({ color }) => icon(color),
              tabBarLabel: title,
              tabBarItemStyle: {
                display: BOTTOM_TABS.includes(name) ? "flex" : "none",
              },
              tabBarBadge:
                name !== SCREEN_NAME.NOTIFICATIONS || !numberOfNotifications
                  ? null
                  : numberOfNotifications,
              tabBarBadgeStyle: {
                top: 2,
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

Start.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default Start;

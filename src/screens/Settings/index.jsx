import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_ORANGE } from "../../config/css/color";
import { setStorage } from "../../utils/storage";
import { navigate } from "../../utils/navigation";
import { ACCESS_TOKEN_KEY } from "../../config/storageKeys";
import { Context } from "../../contants/context";
import { useAlert } from "../../contants/AlertContext";
import { SCREEN_NAME } from "../../config/screenName";
import { FormButton } from "../../components/Form";
const Settings = () => {
  const { accessToken } = useContext(Context);
  const { showAlert } = useAlert();
  const logout = () => {
    setStorage(ACCESS_TOKEN_KEY, "").then(() => {
      navigate(SCREEN_NAME.LOGIN);
    });
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "#ccc",
      flex: 1,
      justifyContent: "center",
    },

    buttonBlock: {
      marginTop: 40,
      height: 50,
    },
  });

  useEffect(() => {
    if (!accessToken) {
      showAlert({
        element: (
          <>
            <Text>この機能を使用する場合は</Text>
            <Text>会員登録もしくはログインが必要です。</Text>
          </>
        ),
        cancelFunc: () => navigate(SCREEN_NAME.HOME),
        confirmFunc: () => navigate(SCREEN_NAME.LOGIN),
      });
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(SCREEN_NAME.MYNO)}>
        <Text>マイナンバー提出</Text>
      </TouchableOpacity>
      {accessToken && (
        <View style={styles.buttonBlock}>
          <FormButton
            text="ログイン"
            backgroundColor={PRIMARY_ORANGE}
            onPress={logout}
          />
        </View>
      )}
    </View>
  );
};

export default Settings;

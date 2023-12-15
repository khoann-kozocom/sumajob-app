import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Context } from "../../contants/context";
import { authLogin } from "../../services/auth";
import { getStorage, setStorage } from "../../utils/storage";
import { ACCESS_TOKEN_KEY } from "../../config/storageKeys";
import { useLoading } from "../../components/LoadingContext";
import { PRIMARY_ORANGE } from "../../config/css/color";
import PropTypes from "prop-types";
import { authorization } from "../../api/authorization";
import { FormButton, FormInput } from "../../components/Form";

const Login = ({ navigation }) => {
  const { width, setAccessToken } = useContext(Context);
  const { showLoading, hideLoading } = useLoading();
  const [formValues, setFormValues] = useState({
    username: "100000033",
    password: "kozo7878",
  });
  const { username, password } = formValues;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "#ccc",
      flex: 1,
      justifyContent: "center",
    },
    wrapper: {
      backgroundColor: "#fff",
      width: width - 20,
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 40,
      borderRadius: 10,
      gap: 12,
    },
    buttonBlock: {
      marginTop: 20,
      height: 50,
    },
  });

  const onChangeText = (text, name) => {
    setFormValues((prev) => ({ ...prev, [name]: text }));
  };

  const navigateToStart = () => {
    navigation.navigate("Home");
  };
  const onSubmit = async () => {
    showLoading();
    Keyboard.dismiss();
    const authRes = await authLogin(formValues);
    const accessToken = authRes?.data?.access_token;
    if (accessToken) {
      authorization(accessToken);
      setStorage(ACCESS_TOKEN_KEY, accessToken).then(() => {
        hideLoading();
        setAccessToken(accessToken);
        navigateToStart();
      });
    }
  };
  useEffect(() => {
    getStorage(ACCESS_TOKEN_KEY).then((accessToken) => {
      if (accessToken) {
        navigateToStart();
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <FormInput
            onChangeText={(text) => onChangeText(text, "username")}
            name="username"
            value={username}
            label="登録番号または電話番号（例：090-1234-5678）"
          />
          <FormInput
            onChangeText={(text) => onChangeText(text, "password")}
            value={password}
            name="password"
            label="パスワード"
            secureTextEntry
          />
          <View style={styles.buttonBlock}>
            <FormButton
              text="ログイン"
              backgroundColor={PRIMARY_ORANGE}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
Login.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default Login;

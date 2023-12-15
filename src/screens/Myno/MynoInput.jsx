import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormInput } from "../../components/Form";
import PropTypes from "prop-types";

const MynoInput = ({ onChangeMyno = () => {}, value = "" }) => {
  const styles = StyleSheet.create({
    decs: { justifyContent: "center", alignItems: "center", marginBottom: 10 },
    title: { fontWeight: "bold", fontSize: 18, marginTop: 10, marginBottom: 5 },
    text: { fontSize: 18 },
  });
  return (
    <View>
      <View style={styles.decs}>
        <Text style={styles.title}>個人番号（マイナンバー）の入力</Text>
        <Text style={styles.text}>※入力内容に相違がないかご確認ください</Text>
      </View>
      <FormInput value={value} onChangeText={onChangeMyno} />
    </View>
  );
};
MynoInput.propTypes = {
  onChangeMyno: PropTypes.func,
  value: PropTypes.string,
};

export default MynoInput;

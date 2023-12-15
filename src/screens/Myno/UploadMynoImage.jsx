import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { Context } from "../../contants/context";
import ImageBox from "./ImageBox";

const UploadMynoImage = ({ openCam, onChangeMyno = () => {}, value = "" }) => {
  const { width } = useContext(Context);
  // const [isOpenCamera, setIsOpenCamera] = useState(false);

  const styles = StyleSheet.create({
    decs: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderColor: "rgba(0,0,0,0.2)",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop: 10,
      marginBottom: 5,
      textAlign: "center",
    },
    text: { fontSize: 18 },
  });
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.decs}>
        <Text style={styles.title}>番号確認書類（いずれか一点）</Text>
        <Text style={styles.text}>
          マイナンバーカード（裏表）・マイナンバー通知カード・住民票
        </Text>
      </View>
      <Text style={styles.title}>フロント</Text>
      <ImageBox handleTouchCameraButton={openCam} />
      <Text style={styles.title}>裏側</Text>
      <ImageBox
        style={{ marginBottom: 10 }}
        handleTouchCameraButton={openCam}
      />
    </ScrollView>
  );
};
UploadMynoImage.propTypes = {
  onChangeMyno: PropTypes.func,
  value: PropTypes.string,
  openCam: PropTypes.func,
};

export default UploadMynoImage;

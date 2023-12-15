import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MynoStart = () => {
  const styles = StyleSheet.create({
    title: { fontWeight: "bold", fontSize: 18, marginTop: 10, marginBottom: 5 },
    text: { fontSize: 18 },
  });
  return (
    <View>
      <Text style={styles.text}>
        平成28年より番号法が施行に伴い、以下に記載する利用目的のため、個人番号（マイナンバー）の提出が必要になります
      </Text>
      <Text style={styles.text}>
        利用目的を確認いただき、個人番号（マイナンバー）の提出をお願いします。
      </Text>
      <Text style={styles.title}>利用目的</Text>
      <Text style={styles.text}>・給与所得、退職所得の源泉徴収票作成事務</Text>
      <Text style={styles.text}>・雇用保険に関する届出等事務</Text>
      <Text style={styles.text}>・健康保険、厚生年金保険届出、申請事務</Text>
    </View>
  );
};

export default MynoStart;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIMARY_GRAY } from "../../../config/css/color";
import PropTypes from "prop-types";
import { Card } from "react-native-paper";
import CheckBoxCustom from "../../../components/Animated/CheckBoxCustom";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useQueryClient } from "react-query";
import LoaderSpinner from "../../../components/LoaderSpinner";
import { useBottomModal } from "../../../contants/BottomModalContext";
import ResetButton from "../components/ResetButton";
import ButtonCustom from "../../../components/Form/ButtonCustom";
import { shadowStyle } from "../../../config/css/shadow";
import { setSelectedListFunc } from "./helper";

const ListDetail = ({
  selectedData = [],
  handleReset = () => {},
  handleBack = () => {},
  title,
  handleOnChange,
  queryKey,
}) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState(selectedData);

  const resetFunc = () => {
    setSelectedList([]);
    handleReset();
  };
  const onChangeCheckBox = (id, name) => {
    setSelectedListFunc({ id, name }, selectedList, setSelectedList);
    handleOnChange({ id, name }, selectedList);
  };

  const queryData = queryClient.getQueryData(queryKey);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (queryData?.success) {
        setData(queryData.data.data);
      }
    }, 300);
    return () => clearTimeout(timeOut);
  }, []);
  const { scrollYOfBottomModal } = useBottomModal();
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: "#fff",
      width: "100%",
      height: "100%",
      zIndex: 30,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderColor: PRIMARY_GRAY,
    },
    title: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    titleText: {
      fontWeight: "500",
      fontSize: 18,
    },
    backButton: {
      padding: 10,
    },
    buttons: {
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: 8,
      width: "100%",
      paddingHorizontal: 5,
      // ...shadowStyle,
      shadowOffset: { width: 0, height: -3 },
    },
    btn: {
      width: "50%",
      paddingHorizontal: 5,
    },
    listWrapper: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
    },
    list: {
      width: "100%",
    },
    item: {
      paddingHorizontal: 10,
      width: "100%",
    },
    card: {
      marginVertical: 5,
      borderRadius: 3,
      paddingVertical: 0,
      overflow: "hidden",
    },

    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: "#fff",
    },
  });

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollYOfBottomModal.value = event.contentOffset.y;
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.title}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <ResetButton
          style={{ paddingHorizontal: 10 }}
          fontSize={16}
          color="#777777"
          onPress={resetFunc}
        />
      </View>

      <View style={styles.listWrapper}>
        {!data.length ? (
          <LoaderSpinner />
        ) : (
          <Animated.ScrollView
            onPress={handleScroll}
            style={styles.list}
            scrollEventThrottle={16}
          >
            {data?.map(({ id, name }) => (
              <View key={id} style={styles.item}>
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <Text>{name}</Text>
                    <CheckBoxCustom
                      checked={Boolean(
                        selectedList.find((item) => item.id === id)
                      )}
                      onChange={() => onChangeCheckBox(id, name)}
                    />
                  </Card.Content>
                </Card>
              </View>
            ))}
          </Animated.ScrollView>
        )}
      </View>

      <View style={styles.buttons}>
        <View style={styles.btn}>
          <ButtonCustom
            style={{
              backgroundColor: "#F7F8F9",
            }}
            title="キャンセル"
            color="#333"
            icon={<AntDesign name="arrowleft" size={24} color="black" />}
            onPress={handleBack}
          />
        </View>
      </View>
    </View>
  );
};
ListDetail.propTypes = {
  handleReset: PropTypes.func,
  handleBack: PropTypes.func,
  selectedData: PropTypes.arrayOf(Object),
  title: PropTypes.string,
  handleOnChange: PropTypes.func,
  queryKey: PropTypes.string,
};

export default ListDetail;

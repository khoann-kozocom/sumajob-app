import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PRIMARY_LIGHT_BLUE } from "../../../config/css/color";
import { Context } from "../../../contants/context";
import RightModal from "../../../components/Modal/RightModal";
import { QUERY_KEY } from "../../../config/queryKeys";

import PropTypes from "prop-types";
import SelectedCard from "./SelectedCard";
import Animated from "react-native-reanimated";
import SelectAdvanceSearch from "./SelectAdvanceSearch";
import { INIT_ADVANCE_SEARCH_VALUES } from "../../../contants/common";
import { useBottomModal } from "../../../contants/BottomModalContext";
import ResetButton from "../components/ResetButton";
import ButtonCustom from "../../../components/Form/ButtonCustom";
import CloseIcon from "../../../components/Icons/CloseIcon";
import SearchIcon from "../../../components/Icons/SearchIcon";
import { setSelectedListFunc } from "./helper";
import { shadowStyle } from "../../../config/css/shadow";
import SliderCustom from "../../../components/Animated/SliderCustom";

const FIELDS = {
  BUSINESSES: "職種",
  CONDITIONS: "仕事の特徴",
  PRICE: "時給",
};
const title = "雇用形態・こだわり";

const AdvanceSearch = ({ searchValues, handleSetAdvanceSearchValues }) => {
  const { height, width } = useContext(Context);
  const { closeBottomModal } = useBottomModal();

  const [rightComponent, setRightComponent] = useState(null);
  const [openRightComponent, setOpenRightComponent] = useState(false);

  const {
    businesses: mstBusinesses,
    conditions: jobConditions,
    min_price: minPrice,
    max_price: maxPrice,
  } = searchValues;

  const [selectedBusinesses, setSelectedBusinesses] = useState(mstBusinesses);
  const [selectedConditions, setSelectedConditions] = useState(jobConditions);
  const [price, setPrice] = useState({
    min_price: minPrice,
    max_price: maxPrice,
  });

  const deleteBusiness = (deleteId) => {
    setSelectedBusinesses((prev) =>
      prev.filter((item) => item.id !== deleteId)
    );
  };
  const deleteCondition = (deleteId) => {
    setSelectedConditions((prev) =>
      prev.filter((item) => item.id !== deleteId)
    );
  };

  const closeRightComponent = () => {
    setOpenRightComponent(false);
    setTimeout(() => {
      setRightComponent(null);
    }, 300);
  };
  const handleOnRightComponent = (component) => {
    setOpenRightComponent(true);
    setRightComponent(component);
  };
  const handleOnChangeBusinesses = (activeBusiness, prevSelectedList) => {
    setSelectedListFunc(
      activeBusiness,
      prevSelectedList,
      setSelectedBusinesses
    );
  };
  const handleOnChangeConditions = (activeCondition, prevSelectedList) => {
    setSelectedListFunc(
      activeCondition,
      prevSelectedList,
      setSelectedConditions
    );
  };

  const styles = StyleSheet.create({
    wrapper: {
      // paddingHorizontal: 10,
      height: height - 186,
      width: "100%",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    buttons: {
      backgroundColor: "#fff",

      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: 8,
      paddingHorizontal: 5,
      // ...shadowStyle,
      shadowOffset: { width: 0, height: -3 },
      width: "100%",
    },
    btn: {
      width: "50%",
      paddingHorizontal: 5,
    },
    formWrapper: {
      borderBottomWidth: 0.5,
      paddingVertical: 10,
    },
    form: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 18,
    },
    selectedList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    slider: {
      width: "100%",
      paddingHorizontal: 30,
      marginTop: 10,
    },
  });

  // functions of buttons
  const handleReset = () => {
    setSelectedBusinesses(INIT_ADVANCE_SEARCH_VALUES.businesses);
    setSelectedConditions(INIT_ADVANCE_SEARCH_VALUES.conditions);
    setPrice({
      min_price: INIT_ADVANCE_SEARCH_VALUES.min_price,
      max_price: INIT_ADVANCE_SEARCH_VALUES.max_price,
    });
  };

  const handleResetBusinesses = () => {
    setSelectedBusinesses(INIT_ADVANCE_SEARCH_VALUES.businesses);
  };
  const handleResetConditions = () => {
    setSelectedConditions(INIT_ADVANCE_SEARCH_VALUES.conditions);
  };

  const handleApply = () => {
    const formValues = {
      businesses: selectedBusinesses,
      conditions: selectedConditions,
      ...price,
    };
    // getQuickSearchHeight();
    handleSetAdvanceSearchValues(formValues);
    closeBottomModal();
  };
  const handleOnChangePrice = (minValue, maxValue) => {
    setPrice((prev) => ({
      ...prev,
      min_price: minValue,
      max_price: maxValue,
    }));
  };
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1, zIndex: 1, paddingHorizontal: 10 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <ResetButton fontSize={16} color="#777777" onPress={handleReset} />
        </View>
        <Animated.ScrollView>
          <View style={styles.formWrapper}>
            <View style={styles.form}>
              <Text style={styles.title}>{FIELDS.PRICE}</Text>
            </View>
            <View style={styles.slider}>
              <SliderCustom
                sliderWidth={width - 80}
                min={800}
                max={3000}
                increment={100}
                onChange={handleOnChangePrice}
                defaultValues={{ min: minPrice, max: maxPrice }}
              />
              {/* <Slider
                min={PRICE_DEFAULT.MIN}
                max={PRICE_DEFAULT.MAX}
                values={[price.min_price, price.max_price]}
                increment={100}
                markerColor={PRIMARY_LIGHT_BLUE}
                labelStyle={styles.labelStyle}
                labelTextStyle={styles.labelTextStyle}
                trackStyle={styles.trackStyle}
                selectedTrackStyle={styles.selectedTrackStyle}
                onChange={onSliderChange}
                hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
              /> */}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <SelectAdvanceSearch
              handleOnRightComponent={handleOnRightComponent}
              handleAccept={closeRightComponent}
              handleBack={closeRightComponent}
              selectedData={selectedBusinesses}
              queryKey={QUERY_KEY.BUSINESSES}
              title={FIELDS.BUSINESSES}
              handleOnChange={handleOnChangeBusinesses}
              handleReset={handleResetBusinesses}
            />
            <View style={styles.selectedList}>
              {selectedBusinesses.map(({ id, name }) => (
                <SelectedCard
                  key={id}
                  name={name}
                  deleteFn={() => deleteBusiness(id)}
                />
              ))}
            </View>
          </View>
          <View style={styles.formWrapper}>
            <SelectAdvanceSearch
              handleOnRightComponent={handleOnRightComponent}
              handleAccept={closeRightComponent}
              handleBack={closeRightComponent}
              selectedData={selectedConditions}
              queryKey={QUERY_KEY.CONDITIONS}
              title={FIELDS.CONDITIONS}
              handleOnChange={handleOnChangeConditions}
              handleReset={handleResetConditions}
            />
            <View style={styles.selectedList}>
              {selectedConditions.map(({ id, name }) => (
                <SelectedCard
                  key={id}
                  id={id}
                  name={name}
                  deleteFn={() => deleteCondition(id)}
                />
              ))}
            </View>
          </View>
        </Animated.ScrollView>
      </View>

      <View style={styles.buttons}>
        <View style={styles.btn}>
          <ButtonCustom
            style={{
              backgroundColor: "#F7F8F9",
            }}
            title="キャンセル"
            color="#333"
            icon={<CloseIcon color="#333" />}
            onPress={closeBottomModal}
          />
        </View>
        <View style={styles.btn}>
          <ButtonCustom
            style={{
              backgroundColor: PRIMARY_LIGHT_BLUE,
            }}
            title="検索"
            color="#fff"
            icon={<SearchIcon color="#fff" />}
            onPress={handleApply}
          />
        </View>
      </View>
      <RightModal onClose={closeRightComponent} open={openRightComponent}>
        {rightComponent}
      </RightModal>
    </View>
  );
};

AdvanceSearch.propTypes = {
  searchValues: PropTypes.objectOf(Object),
  handleSetAdvanceSearchValues: PropTypes.func,
};

export default AdvanceSearch;

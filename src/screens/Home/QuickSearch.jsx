import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddressIcon, CalendarIcon, FeatureIcon, SearchIcon } from "../../svgs";
import {
  // FormButton,
  FormDatePicker,
  FormInput,
  FormSelect,
} from "../../components/Form";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../../config/queryKeys";
import { getPrefs } from "../../services/mst";
import moment from "moment";
import { DATE_FORMAT, paramsDefault, RANGE_DATE_DEFAULT } from "../../config";
import PropTypes from "prop-types";
import { PRICE_DEFAULT } from "../../contants/common";
import { Card } from "react-native-paper";
import { PRIMARY_DARK_BLUE, PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import ResetButton from "./components/ResetButton";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { shadowStyle } from "../../config/css/shadow";
import ButtonCustom from "../../components/Form/ButtonCustom";
import MapIcon from "../../components/Icons/MapIcon";
import SearchExpoIcon from "../../components/Icons/SearchIcon";
import { useGlobalContext } from "../../contants/context";

const QuickSearch = ({
  // handleShowSearch,
  openModal,
  onSubmit,
  advanceSearchValues,
  quickSearchRef,
  searchFilterTranslateY,
  searchFilterZIndex,
}) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: paramsDefault,
  });
  const { accessToken } = useGlobalContext();
  // const { showQuickSearch, setShowQuickSearch } = handleShowSearch;
  const [cityOptions, setCityOptions] = useState([]);
  const {
    businesses,
    conditions,
    min_price: minPrice,
    max_price: maxPrice,
  } = advanceSearchValues;
  const { refetch, data: prefs } = useQuery({
    queryKey: [QUERY_KEY.PREFS, accessToken],
    queryFn: () => getPrefs(),
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, [accessToken]);

  const prefOptions = prefs?.prefs || [];

  const maxDate = moment()
    .add(RANGE_DATE_DEFAULT - 1, "d")
    .format(DATE_FORMAT);
  const watchEndDate = watch("end_date");

  const filterInputValues = useMemo(() => {
    if (
      !businesses.length &&
      !conditions.length &&
      minPrice === PRICE_DEFAULT.MIN &&
      maxPrice === PRICE_DEFAULT.MAX
    ) {
      return <Text style={{ color: "#999" }}>特徴、こだわり</Text>;
    }
    const result = (
      <>
        {businesses.length ? (
          <View style={styles.filter}>
            {businesses.map(({ name, id }) => (
              <View key={id} style={styles.filterItem}>
                <Text style={styles.filterItemText}>{name}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {conditions.length ? (
          <View style={styles.filter}>
            {conditions.map(({ name, id }) => (
              <View key={id} style={styles.filterItem}>
                <Text style={styles.filterItemText}>{name}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {(minPrice !== PRICE_DEFAULT.MIN || maxPrice !== PRICE_DEFAULT.MAX) && (
          <View style={styles.filter}>
            <View style={styles.filterItem}>
              <Text
                style={styles.filterItemText}
              >{`(${minPrice} - ${maxPrice})`}</Text>
            </View>
          </View>
        )}
      </>
    );
    return result;
  }, [businesses, conditions, minPrice, maxPrice]);

  const handleChange = (name, value, onChange) => {
    if (name === "start_date") {
      const compareDate = moment(watchEndDate).isSameOrAfter(moment(value));
      if (!compareDate) {
        setValue("start_date", value);
        setValue("end_date", value);
      }
    }
    if (name === "pref_id") {
      const pref = prefOptions.find((prefTemp) => {
        return prefTemp.id === value;
      });
      setCityOptions(pref?.cities);
      setValue("city_id", "");
    }
    onChange(value);
  };
  const filterAreaStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: 12,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#fff",
      transform: [{ translateY: searchFilterTranslateY.value }],
      zIndex: searchFilterZIndex.value,
      // ...shadowStyle,
    };
  }, [searchFilterTranslateY.value, searchFilterZIndex.value]);

  const handleReset = () => {};

  return (
    <Animated.View style={filterAreaStyle} ref={quickSearchRef}>
      <Animated.View style={styles.container}>
        <AddressIcon />
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="pref_id"
            render={({ field: { onChange, value } }) => (
              <FormSelect
                value={value}
                onChange={(val) => handleChange("pref_id", val, onChange)}
                options={prefOptions}
                placeholder="都道府県"
              />
            )}
          />
          <Controller
            control={control}
            name="city_id"
            render={({ field: { onChange, value } }) => (
              <FormSelect
                value={value}
                onChange={(val) => handleChange("city_id", val, onChange)}
                options={cityOptions}
                placeholder="市区町村"
                disabled={!cityOptions?.length}
              />
            )}
          />
        </View>
      </Animated.View>
      <View style={styles.container}>
        <CalendarIcon />
        <View style={{ ...styles.container, marginHorizontal: 0, flex: 1 }}>
          <Controller
            control={control}
            name="start_date"
            render={({ field: { onChange, value } }) => (
              <FormDatePicker
                value={new Date(value)}
                onChange={(date) => handleChange("start_date", date, onChange)}
                maximumDate={maxDate}
                minimumDate={moment().format(DATE_FORMAT)}
              />
            )}
          />
          <Controller
            control={control}
            name="end_date"
            render={({ field: { onChange, value } }) => (
              <FormDatePicker
                value={new Date(value)}
                onChange={(date) => handleChange("end_date", date, onChange)}
                maximumDate={maxDate}
                minimumDate={moment(new Date(watch("start_date"))).format(
                  DATE_FORMAT
                )}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FeatureIcon />
        <View style={{ flex: 1 }}>
          <Card style={styles.card}>
            <ScrollView nestedScrollEnabled>
              <Pressable style={{ flex: 1 }} onPress={openModal}>
                <Card.Content style={styles.cardContent}>
                  {filterInputValues}
                </Card.Content>
              </Pressable>
            </ScrollView>
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <SearchIcon />
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                onChangeText={onChange}
                value={value}
                placeholder="フリーワード"
              />
            )}
            name="freeword"
          />
        </View>
      </View>
      <View
        style={{ ...styles.container, marginTop: 15, paddingHorizontal: 5 }}
      >
        <View style={{ width: "50%" }}>
          <ButtonCustom
            style={{
              backgroundColor: PRIMARY_DARK_BLUE,
            }}
            title="MAPで見る"
            color="#fff"
            icon={<MapIcon color="#fff" />}
          />
        </View>
        <View style={{ width: "50%" }}>
          <ButtonCustom
            style={{
              backgroundColor: PRIMARY_LIGHT_BLUE,
            }}
            title="検索"
            color="#fff"
            icon={<SearchExpoIcon color="#fff" />}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <View style={styles.resetButton}>
        <ResetButton fontSize={16} color="#777777" onPress={handleReset} />
      </View>
    </Animated.View>
  );
  // ) : (
  //   <Pressable
  //     style={styles.iconTextBlock}
  //     onPress={() => setShowQuickSearch(true)}
  //   >
  //     <View style={{ flex: 1 }}>
  //       <FormInput editable={false} />
  //     </View>
  //     <SearchIcon />
  //   </Pressable>
  // );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 0,
    overflow: "hidden",
    maxHeight: 150,
    minHeight: 40,
    backgroundColor: "#fff",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    gap: 7,
  },
  resetButton: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  filter: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  filterItem: {
    backgroundColor: "#F3F6FA",
    padding: 5,
    borderRadius: 4,
  },
  filterItemText: {
    fontSize: 12,
  },
});

QuickSearch.propTypes = {
  handleShowSearch: PropTypes.objectOf(Object),
  onSubmit: PropTypes.func,
  openModal: PropTypes.func,
  advanceSearchValues: PropTypes.objectOf(Object),
  quickSearchRef: PropTypes.func,
  searchFilterTranslateY: PropTypes.objectOf(Object),
  searchFilterZIndex: PropTypes.objectOf(Object),
};

export default QuickSearch;

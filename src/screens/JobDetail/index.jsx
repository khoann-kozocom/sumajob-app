import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import {
  AddressIcon,
  CalendarIcon,
  CurrencyIcon,
  FeatureIcon,
  JobDescriptionIcon,
  TimeIcon,
  TrainStationIcon,
} from "../../svgs";
import React from "react";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import PropTypes from "prop-types";
import { getJobOfferDetail } from "../../services/jobs";
import { QUERY_KEY } from "../../config/queryKeys";
import { FormButton } from "../../components/Form";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import { addToAndroidCal } from "../../helpers/addToAndroidCal";
import { useQuery } from "react-query";
import IconTextBlock from "../../components/common/IconTextBlock";
import LoaderSpinner from "../../components/LoaderSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";

const JobDetail = ({ navigation, route }) => {
  const {
    id: orderId,
    working_day: workingDay,
    shift_pattern_id: shiftPatternId,
  } = route.params.job;

  const {
    isLoading,
    error,
    data: jobData,
  } = useQuery({
    queryFn: () =>
      getJobOfferDetail(orderId, shiftPatternId, { date: workingDay }),
    queryKey: [QUERY_KEY.JOB_DETAIL, orderId],
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const job = jobData?.data?.data;

  const handleApply = async () => {
    const shareUrl = await generateLink();

    addToAndroidCal(
      job?.note12,
      new Date(job?.order_dates.working_day),
      new Date(job?.order_dates.working_day),
      job?.address1,
      shareUrl
    );
  };

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `${process.env.DEEP_LINKING}/app?id=${orderId}&working_day=${workingDay}&shift_pattern_id=${shiftPatternId}`,
          domainUriPrefix: process.env.DEEP_LINKING,
          android: {
            packageName: "com.sumajobapp",
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      return link;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleBack = () => {
    navigation.navigate("Start");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={{ uri: job?.image_url }}
          resizeMode="cover"
          style={styles.imageBlock}
        />
        <View style={styles.container}>
          <Text style={styles.textBold}>{job?.note12}</Text>
          <Divider style={{ marginVertical: 8 }} />
          <View>
            <Text style={styles.textBold}>仕事内容</Text>
            <Text>{job?.note11}</Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.textBold}>仕事詳細</Text>
            <IconTextBlock
              icon={<JobDescriptionIcon />}
              text={job?.name1 || ""}
            />
            <IconTextBlock icon={<AddressIcon />} text={job?.address1 || ""} />
            <IconTextBlock
              icon={<TrainStationIcon />}
              text={`${job?.nearest_station || ""}${
                job?.spot_aggregate_time || ""
              } ${job?.spot_aggregate_position || ""}`}
            />
            <IconTextBlock
              icon={<CalendarIcon />}
              text={`${job?.working_day1}~${job?.working_day2}`}
            />
            <IconTextBlock
              icon={<TimeIcon />}
              text={`${job?.opening_time}~${job?.closing_time}`}
            />
            <IconTextBlock
              icon={<CurrencyIcon />}
              text={job?.supply_basics_unit_price}
            />
            <IconTextBlock icon={<FeatureIcon />} text={job?.belongings} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerBlock}>
        <FormButton
          backgroundColor="#d9d9d9"
          text="戻る"
          onPress={handleBack}
        />
        <FormButton
          backgroundColor={PRIMARY_LIGHT_BLUE}
          text="応募する"
          onPress={handleApply}
        />
      </View>
    </View>
  );
};

JobDetail.propTypes = {
  navigation: PropTypes.objectOf(Object),
  route: PropTypes.objectOf(Object),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 16,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 20,
  },
  textBold: {
    fontWeight: "bold",
    color: "black",
  },
  imageBlock: {
    width: "100%",
    height: 150,
    flex: 1,
  },
  footerBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default JobDetail;

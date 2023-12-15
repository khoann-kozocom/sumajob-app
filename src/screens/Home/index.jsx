import React, { useState } from "react";
import QuickSearch from "./QuickSearch";
import { useMutation } from "react-query";
import { QUERY_KEY } from "../../config/queryKeys";
import { FIRST_PAGE, paramsDefault } from "../../config";
import { getOfferWithoutLogin } from "../../services/jobs";
import Jobs from "./Jobs";
import AdvanceSearch from "./AdvanceSearch";
import { INIT_ADVANCE_SEARCH_VALUES } from "../../contants/common";
import { useBottomModal } from "../../contants/BottomModalContext";
import { Dialog, PaperProvider, Portal } from "react-native-paper";
import { FormButton } from "../../components/Form";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useGlobalContext } from "../../contants/context";
import HomeBanner from "./HomeBanner";
import SearchBar from "./SearchBar";
import LoaderSpinner from "../../components/LoaderSpinner";
import PropTypes from "prop-types";
let stopFetchMore = true;

const Home = ({ navigation }) => {
  const { height, width } = useGlobalContext();

  const bannerHeight = width * 0.25;
  const startScrollY = useSharedValue(0);

  const [page, setPage] = useState(FIRST_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [params, setParams] = useState(paramsDefault);
  const [jobs, setJobs] = useState();
  // const [showQuickSearch, setShowQuickSearch] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const quickSearchRef = useAnimatedRef();

  const searchFilterTranslateY = useSharedValue(bannerHeight);
  const bannerTranslateY = useSharedValue(0);

  const searchFilterZIndex = useSharedValue(3);

  const hideDialog = () => setVisible(false);
  const { openBottomModal } = useBottomModal();

  const [advanceSearchValues, setAdvanceSearchValues] = useState(
    INIT_ADVANCE_SEARCH_VALUES
  );
  const {
    businesses,
    conditions,
    min_price: minPrice,
    max_price: maxPrice,
  } = advanceSearchValues;
  const handleSetAdvanceSearchValues = (formData) => {
    setAdvanceSearchValues((prev) => ({ ...prev, ...formData }));
  };

  const openModal = () => {
    openBottomModal({
      children: (
        <AdvanceSearch
          searchValues={advanceSearchValues}
          handleSetAdvanceSearchValues={handleSetAdvanceSearchValues}
        />
      ),
    });
  };

  const { mutateAsync, isLoading } = useMutation(getOfferWithoutLogin, {
    queryKey: [QUERY_KEY.JOBS],
    onSuccess: (res, req) => {
      setLoadingMore(false);
      if (!res.success) {
        setVisible(true);
        setError(res.error_messages.pref_id);
      }
      if (res?.success) {
        const { data, meta } = res.data;
        if (!meta?.next_page) {
          stopFetchMore = true;
        } else {
          stopFetchMore = false;
          setPage(meta?.next_page);
        }
        setJobs((prev) => {
          let formatData = req.page === FIRST_PAGE ? data : [...prev, ...data];
          return formatData;
        });
        // setShowQuickSearch(false);
      }
    },
  });

  const handleOnEndReached = async () => {
    if (!stopFetchMore && !loadingMore) {
      setLoadingMore(true);
      await mutateAsync({ ...params, page });
    }
  };

  const hideFilterArea = () => {
    searchFilterTranslateY.value = withTiming(-height * 0.6, { duration: 400 });
    searchFilterZIndex.value = withDelay(
      400,
      withTiming(-1, { duration: 400 })
    );
  };

  const onSubmit = async (data) => {
    hideFilterArea();
    bannerTranslateY.value = withTiming(0, {
      duration: 200,
    });
    const getIds = (array) => {
      return array.map((item) => item.id);
    };
    const extraData = {
      mst_business_id: getIds(businesses),
      job_condition_id: getIds(conditions),
      min_price: minPrice,
      max_price: maxPrice,
    };
    setJobs(null);
    setLoadingMore(true);
    setParams({ ...data, ...extraData, page: FIRST_PAGE });
    await mutateAsync({ ...data, ...extraData, page: FIRST_PAGE });
  };

  const handleScroll = useAnimatedScrollHandler({
    onEndDrag: (event) => {
      const { contentOffset, velocity } = event;
      if (contentOffset.y > startScrollY.value + 20) {
        if (velocity.y < -0.05) {
          bannerTranslateY.value = withTiming(-bannerHeight, {
            duration: 200,
          });
        }
      }
      if (contentOffset.y < startScrollY.value - 20) {
        if (velocity.y > 0.05) {
          bannerTranslateY.value = withTiming(0, {
            duration: 200,
          });
        }
      }
    },
    onBeginDrag: (event) => {
      const { contentOffset } = event;
      startScrollY.value = contentOffset.y;
      searchFilterTranslateY.value = withTiming(-height * 0.6, {
        duration: 400,
      });
      searchFilterZIndex.value = withDelay(
        400,
        withTiming(-1, { duration: 400 })
      );
    },
  });

  const openFilterArea = () => {
    searchFilterZIndex.value = 6;
    searchFilterTranslateY.value = withDelay(
      50,
      withTiming(bannerHeight + bannerTranslateY.value, { duration: 400 })
    );
  };

  const bannerStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: "100%",
      top: 0,
      height: bannerHeight,
      zIndex: 7,
      transform: [{ translateY: bannerTranslateY.value }],
    };
  }, [bannerTranslateY.value]);
  const searchBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bannerTranslateY.value }],
      position: "absolute",
      width: "100%",
      top: bannerHeight,
      zIndex: 3,
    };
  }, [bannerTranslateY.value]);
  const jobListStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      paddingTop: bannerHeight + bannerTranslateY.value + 45,
      zIndex: 2,
    };
  }, [bannerTranslateY.value]);

  const onPress = (item) => {
    const job = {
      id: item.id,
      working_day: item.working_day,
      shift_pattern_id: item.shift_pattern_id,
    };
    navigation.navigate("JobDetail", { job });
  };

  return (
    <>
      <PaperProvider>
        <Animated.View style={bannerStyle}>
          <HomeBanner bannerHeight={bannerHeight} />
        </Animated.View>
        <Animated.View style={searchBarStyle}>
          <SearchBar openFilterArea={openFilterArea} />
        </Animated.View>

        <QuickSearch
          quickSearchRef={quickSearchRef}
          // handleShowSearch={{
          //   showQuickSearch,
          //   setShowQuickSearch,
          // }}
          openModal={openModal}
          onSubmit={onSubmit}
          advanceSearchValues={advanceSearchValues}
          searchFilterTranslateY={searchFilterTranslateY}
          searchFilterZIndex={searchFilterZIndex}
        />
        <Animated.View style={jobListStyle}>
          {jobs ? (
            <Jobs
              data={jobs}
              onEndReached={handleOnEndReached}
              extraData={page}
              loadingMore={loadingMore}
              // ListHeaderComponent={renderHeader()}
              onScroll={handleScroll}
              stopFetchMore={stopFetchMore}
              onPress={onPress}
            />
          ) : isLoading ? (
            <LoaderSpinner />
          ) : null}
        </Animated.View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Icon icon="close-circle-outline" color="red" size={70} />
            <Dialog.Title style={{ textAlign: "center", fontSize: 18 }}>
              {error}
            </Dialog.Title>
            <Dialog.Actions>
              <FormButton
                backgroundColor={PRIMARY_LIGHT_BLUE}
                text="OK"
                onPress={hideDialog}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default Home;

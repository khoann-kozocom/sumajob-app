import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEY } from "../../../config/queryKeys";
import { useLoading } from "../../../components/LoadingContext";
import { NUMBER_OF_MESSAGES_IN_A_PAGE } from "../../../contants/common";
import ListOfNotifications from "../ListOfNotifications";
import { getDataNews } from "../../../services/news";
import { SCREEN_NAME } from "../../../config/screenName";
let stopFetchMore = false;
const START_PAGE = 1;

const News = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [page, setPage] = useState(START_PAGE);
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const { refetch } = useQuery({
    queryFn: () => getDataNews(START_PAGE),
    queryKey: QUERY_KEY.NEWS,
    onSuccess: (res) => {
      if (res?.success) {
        setData(res.data.data);
        setIsRefresh(false);
        setPage(START_PAGE);
        stopFetchMore = false;
      }
      hideLoading();
    },
  });
  const { mutateAsync: getDataNewsMutate } = useMutation(getDataNews, {
    onSuccess: (res) => {
      if (res?.success) {
        const { data: resData } = res.data;
        setPage(page + 1);
        setData((prev) => prev.concat(resData));
        if (resData.length < NUMBER_OF_MESSAGES_IN_A_PAGE) {
          stopFetchMore = true;
        }
      }
    },
  });

  const handleOnEndReached = async () => {
    if (!stopFetchMore) {
      setLoadingMore(true);
      await getDataNewsMutate(page + 1);
      setLoadingMore(false);
    }
  };

  const onRefresh = () => {
    if (!isRefresh) {
      setIsRefresh(true);
      refetch();
    }
  };

  const handleScrollAnimated = () => {};
  useEffect(() => {
    showLoading();
  }, []);

  const styles = StyleSheet.create({
    container: {
      borderColor: "rgba(0, 0, 0, 0.2 )",
      borderWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <ListOfNotifications
        onScroll={handleScrollAnimated}
        data={data}
        onEndReached={handleOnEndReached}
        extraData={page}
        loadingMore={loadingMore}
        detailScreen={SCREEN_NAME.NEWS_DETAIL}
        onRefresh={onRefresh}
        isRefresh={isRefresh}
      />
    </View>
  );
};

export default News;

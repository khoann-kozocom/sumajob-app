import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEY } from "../../../config/queryKeys";
import { getDataMessages } from "../../../services/message";
import { useLoading } from "../../../components/LoadingContext";
import { NUMBER_OF_MESSAGES_IN_A_PAGE } from "../../../contants/common";
import ListOfNotifications from "../ListOfNotifications";
import { SCREEN_NAME } from "../../../config/screenName";
let stopFetchMore = false;
const START_PAGE = 1;

const Messages = () => {
  const [loadingMore, setLoadingMore] = useState(false);

  const { showLoading, hideLoading } = useLoading();
  const [page, setPage] = useState(START_PAGE);
  const [data, setData] = useState([]);

  const [isRefresh, setIsRefresh] = useState(false);

  const { refetch } = useQuery({
    queryFn: () => getDataMessages(START_PAGE),
    queryKey: QUERY_KEY.MESSAGES,
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
  const { mutateAsync: getDataMessagesMutate } = useMutation(getDataMessages, {
    onSuccess: (res) => {
      if (res?.success) {
        const { data: resData } = res.data;
        setPage(page + 1);
        setData((prev) => prev.concat(resData));
        setLoadingMore(false);

        if (resData.length < NUMBER_OF_MESSAGES_IN_A_PAGE) {
          stopFetchMore = true;
        }
      }
    },
  });

  const handleOnEndReached = async () => {
    if (!stopFetchMore && !loadingMore) {
      setLoadingMore(true);
      await getDataMessagesMutate(page + 1);
    }
  };

  const onRefresh = () => {
    if (!isRefresh) {
      setIsRefresh(true);
      refetch();
    }
  };

  useEffect(() => {
    showLoading();
  }, []);

  const styles = StyleSheet.create({
    container: {
      borderColor: "rgba(0, 0, 0, 0.2 )",
      borderWidth: 1,
    },
  });

  return data.length ? (
    <View style={styles.container}>
      <ListOfNotifications
        data={data}
        onEndReached={handleOnEndReached}
        extraData={page}
        loadingMore={loadingMore}
        detailScreen={SCREEN_NAME.MESSAGE_DETAIL}
        onRefresh={onRefresh}
        isRefresh={isRefresh}
      />
    </View>
  ) : null;
};

export default Messages;

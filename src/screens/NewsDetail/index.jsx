import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../../config/queryKeys";
import NotificationDetail from "../../components/NotificationDetail";
import { getNewsDetail } from "../../services/news";

const NewsDetail = () => {
  const { params } = useRoute();
  const [detailData, setDetailData] = useState();

  useQuery({
    queryFn: () => getNewsDetail(params?.id),
    queryKey: QUERY_KEY.NEWS_DETAIL,
    enabled: Boolean(params?.id),
    onSuccess: (res) => {
      if (res?.success) {
        setDetailData(res);
      }
    },
  });
  return <NotificationDetail detailData={detailData} title="News detail" />;
};
NewsDetail.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default NewsDetail;

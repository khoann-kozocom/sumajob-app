import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getMessageDetail } from "../../services/message";
import { QUERY_KEY } from "../../config/queryKeys";
import NotificationDetail from "../../components/NotificationDetail";
import { Context } from "../../contants/context";

const MessageDetail = () => {
  const { accessToken } = useContext(Context);
  const { params } = useRoute();
  const [detailData, setDetailData] = useState();

  const { refetch } = useQuery({
    queryFn: () => getMessageDetail(params?.id),
    queryKey: QUERY_KEY.MESSAGE_DETAIL,
    enabled: false,
    onSuccess: (res) => {
      if (res?.success) {
        setDetailData(res);
      }
    },
  });
  useEffect(() => {
    if (Boolean(params?.id) && Boolean(accessToken)) {
      refetch();
    }
  }, [accessToken, params?.id]);
  return <NotificationDetail detailData={detailData} title="Message detail" />;
};
MessageDetail.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default MessageDetail;

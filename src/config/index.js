import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";

export const RANGE_DATE_DEFAULT = 14;

export const FIRST_PAGE = 1;

export const dayDefault = moment()
  .add(1, "days")
  .format(DATE_FORMAT.toUpperCase());

export const paramsDefault = {
  pref_id: "",
  city_id: "",
  start_date: dayDefault,
  end_date: dayDefault,
  mst_business_id: [],
  job_condition_id: [],
  freeword: "",
};

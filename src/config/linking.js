const config = {
  screens: {
    Start: {
      path: "start",
    },
    JobDetail: {
      path: "detail",
    },
  },
};

const linking = {
  prefixes: ["sumajob://app"],
  config,
};

export default linking;

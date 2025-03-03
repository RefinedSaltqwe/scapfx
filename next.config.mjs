// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async headers() {
    return [
      {
        source: "/api/auth/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
};

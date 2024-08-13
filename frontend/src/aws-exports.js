const awsconfig = {
  Auth: {
    identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
    region: "XX-XXXX-X",
    userPoolId: "XX-XXXX-X_abcd1234",
    userPoolWebClientId: "abcd1234abcd1234abcd1234",
  },
  API: {
    endpoints: [
      {
        name: "dataAPI",
        endpoint: "https://your-api-url.execute-api.region.amazonaws.com/prod",
      },
    ],
  },
};

export default awsconfig;

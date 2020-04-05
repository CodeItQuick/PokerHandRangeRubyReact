module.exports = api => {
  api.cache.forever();
  return {
    presets: ["@babel/preset-env", "@babel/preset-react", ["react-app"]],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread"
    ]
  };
};

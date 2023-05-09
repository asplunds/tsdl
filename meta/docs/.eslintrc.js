module.exports = {
  extends: ["next", "plugin:react/recommended"],
  env: {
    browser: true,
  },
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

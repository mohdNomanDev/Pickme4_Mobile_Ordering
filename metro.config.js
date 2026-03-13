// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If you're using axios, it sometimes tries to pull in node-specific modules.
// This helps ensure it uses the browser-compatible versions.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'form-data': require.resolve('form-data'),
};

module.exports = config;

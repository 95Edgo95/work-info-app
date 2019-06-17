module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
        },
        'custom-media-queries': true,
      },
    },
  },
};

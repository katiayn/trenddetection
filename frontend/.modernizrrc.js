module.exports = exports = {
  minify: true,
  options: [
    'setClasses'
  ],
  'feature-detects': [
    'touchevents',
    'test/css/flexbox',
    'test/es6/promises',
    'test/serviceworker'
  ]
};

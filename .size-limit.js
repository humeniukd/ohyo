module.exports = [
  {
    path: [
      'build/static/js/*.js',
      '!build/static/js/locale-*.js',
      '!build/static/js/intl-*.js',
    ],
    limit: '700 KB',
  },
]

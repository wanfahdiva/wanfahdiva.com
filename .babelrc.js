module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [
    ['babel-plugin-twin', { debug: false }],
    'babel-plugin-macros',
    [
      '@emotion',
      {
        sourceMap: false,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
}

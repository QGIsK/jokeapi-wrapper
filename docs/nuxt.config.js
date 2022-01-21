import theme from '@nuxt/content-theme-docs';

export default theme({
  head: {
    script: [
      {
        async: true,
        defer: true,
        'data-website-id': '57842630-bdb1-4942-ba30-8515b7864afe',
        src: 'https://media.demiann.dev/umami.js',
      },
    ],
  },
  docs: {
    primaryColor: '#E24F55',
  },
});

import theme from '@nuxt/content-theme-docs';

export default theme({
  head: {
    script: [
      {
        async: true,
        defer: true,
        'data-domain': 'jokewrapper.docs.demiann.dev',
        src: 'https://analytics.demiann.dev/js/plausible.js',
      },
    ],
  },
  docs: {
    primaryColor: '#E24F55',
  },
});

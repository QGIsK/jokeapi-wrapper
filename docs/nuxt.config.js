import theme from '@nuxt/content-theme-docs';

export default theme({
  head: {
    script: [
      {
        async: true,
        defer: true,
        'data-website': 'jokewrapper.docs.demiann.dev',
        src: 'https://media.demiann.dev/js/script.js',
      },
    ],
  },
  docs: {
    primaryColor: '#E24F55',
  },
});

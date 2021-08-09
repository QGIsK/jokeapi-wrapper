const JokeAPI = require('./');
const JokeClient = new JokeAPI();

const get = async () => {
  const joke = await JokeClient.getJoke({ categories: ['dark', 'coding'], lang: 'en', safemode: true });
  const langcode = await JokeClient.langcode({ format: 'text', language: 'english' });

  const info = await JokeClient.info({ format: 'text', lang: 'en' });

  console.log(joke, langcode, info);
};

get();

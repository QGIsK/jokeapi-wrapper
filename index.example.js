const JokeAPI = require('.');
const JokeClient = new JokeAPI();

const get = async () => {
  const joke = await JokeClient.getJoke();
  console.log(joke);

  const info = await JokeClient.info({ lang: 'en' });
  console.log(info);

  const categories = await JokeClient.categories();
  console.log(categories);

  const langcode = await JokeClient.langcode({ language: 'eng' });
  console.log(langcode);

  const languages = await JokeClient.langcode();
  console.log(languages);

  const flags = await JokeClient.flags();
  console.log(flags);

  const formats = await JokeClient.formats();
  console.log(formats);

  const ping = await JokeClient.ping();
  console.log(ping);

  const endpoints = await JokeClient.endpoints();
  console.log(endpoints);
};

get();

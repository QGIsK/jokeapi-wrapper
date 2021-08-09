const JokeAPI = require('.');

const JokeClient = new JokeAPI({ safemode: true, blacklistflags: ['nsfw', 'explicit'] });
const get = async () => {
  // Methods
  const joke = await JokeClient.getJoke({ safemode: false, categories: 'coding,dark', idRange: '10-15' });
  console.log(joke);

  const info = await JokeClient.info({ lang: 'en' });
  console.log(info);

  const categories = await JokeClient.categories();
  console.log(categories);

  const langcode = await JokeClient.langcode({ language: 'eng' });
  console.log(langcode);

  const languages = await JokeClient.languages();
  console.log(languages);

  const flags = await JokeClient.flags();
  console.log(flags);

  const formats = await JokeClient.formats();
  console.log(formats);

  const ping = await JokeClient.ping();
  console.log(ping);

  const endpoints = await JokeClient.endpoints();
  console.log(endpoints);

  const submitSingle = await JokeClient.submit({
    'dry-run': true,
    formatVersion: 3,
    category: 'Misc',
    type: 'single',
    joke: 'testing',
    flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
    lang: 'en',
  });
  console.log(submitSingle);

  const submitDouble = await JokeClient.submit({
    'dry-run': true,
    formatVersion: 3,
    category: 'misc',
    type: 'twopart',
    setup: 'Setup',
    delivery: 'Delivering',
    flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
    lang: 'en',
  });

  console.log(submitDouble);

  // Access Constants
  console.log(JokeAPI.BASE);
};

get();

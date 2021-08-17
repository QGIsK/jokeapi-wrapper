const test = require('ava');

const JokeAPI = require('.');
const Util = require('./src/helpers/util');

test('Has safemode', async (t) => {
  const JokeClient = new JokeAPI({ 'safe-mode': true });

  const params = JokeClient._options;
  const url = await JokeClient._buildUrl('joke', params);

  t.true(url.includes('safe-mode'));
});

test('Doesnt have safemode', async (t) => {
  const JokeClient = new JokeAPI({ 'safe-mode': false });
  const params = JokeClient._options;
  const url = await JokeClient._buildUrl('joke', params);

  t.true(!url.includes('safe-mode'));
});

test('Has dry run', async (t) => {
  const JokeClient = new JokeAPI();
  const url = await JokeClient._buildUrl('submit', undefined, true);

  t.true(url.includes('dry-run'));
});

test('Doesnt have dry run', async (t) => {
  const JokeClient = new JokeAPI();
  const url = await JokeClient._buildUrl('submit', undefined, false);

  t.true(!url.includes('dry-run'));
});

test('Gets joke in any category', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke();

  t.true(!joke.error);
});

test('Gets joke with safemode', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke({ 'safe-mode': true });

  t.true(!joke.error);
  t.true(joke.safe);
});

test('Gets joke in coding category', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke({ categories: 'programming' });

  t.true(!joke.error);
  t.is(joke.category.toLowerCase(), 'programming');
});

test('Gets information', async (t) => {
  const JokeClient = new JokeAPI();
  const info = await JokeClient.info();

  t.true(!info.error);
});

test('Gets categories', async (t) => {
  const JokeClient = new JokeAPI();
  const categories = await JokeClient.categories();

  t.true(!categories.error);
  t.assert(categories.categories.length > 0);
  t.assert(categories.categoryAliases.length > 0);
});

test('Gets english langcode', async (t) => {
  const JokeClient = new JokeAPI();
  const langcode = await JokeClient.langcode({ language: 'english' });

  t.true(!langcode.error);
  t.is(langcode.code, 'en');
});

test('Fails if theres no langcode provided', async (t) => {
  const JokeClient = new JokeAPI();
  const langcode = await JokeClient.langcode({ language: '' });

  t.true(langcode.error);
});

test('Gets all languages', async (t) => {
  const JokeClient = new JokeAPI();
  const languages = await JokeClient.languages();

  t.true(!languages.error);

  t.assert(languages.jokeLanguages.length > 0);
  t.assert(languages.systemLanguages.length > 0);
  t.assert(languages.jokeLanguages.length > 0);
});

test('Gets all flags', async (t) => {
  const JokeClient = new JokeAPI();
  const flags = await JokeClient.flags();

  t.true(!flags.error);
  t.assert(flags.flags.length > 0);
});

test('Gets all formats', async (t) => {
  const JokeClient = new JokeAPI();
  const formats = await JokeClient.formats();

  t.true(!formats.error);
  t.assert(formats.formats.length > 0);
});

test('Gets ping', async (t) => {
  const JokeClient = new JokeAPI();
  const ping = await JokeClient.ping();

  t.true(!ping.error);
  t.is(ping.ping, 'Pong!');
});

test('Gets endpoints', async (t) => {
  const JokeClient = new JokeAPI();
  const endpoints = await JokeClient.endpoints();

  t.true(!endpoints.error);
  t.assert(endpoints.length > 0);
});

test('Submits single joke as dry run', async (t) => {
  const JokeClient = new JokeAPI();

  const singleJoke = await JokeClient.submit({
    'dry-run': true,
    formatVersion: 3,
    category: 'Misc',
    type: 'single',
    joke: 'testing',
    flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
    lang: 'en',
  });

  t.true(!singleJoke.error);
  t.is(singleJoke.message, 'Dry Run complete! No errors were found.');
});

test('Submits twopart joke as dry run', async (t) => {
  const JokeClient = new JokeAPI();

  const doubleJoke = await JokeClient.submit({
    'dry-run': true,
    formatVersion: 3,
    category: 'misc',
    type: 'twopart',
    setup: 'Setup',
    delivery: 'Delivering',
    flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
    lang: 'en',
  });

  t.true(!doubleJoke.error);
  t.is(doubleJoke.message, 'Dry Run complete! No errors were found.');
});

test('parseArray returns string seperated by commas when given array', async (t) => {
  const testArray = ['coding', 'dark'];

  const parsedArray = await Util.parseArray(testArray);

  t.is(parsedArray, 'coding,dark');
});

test('parseArray returns string when given string', async (t) => {
  const testString = 'coding,dark';

  const parsedString = await Util.parseArray(testString);

  t.is(parsedString, testString);
});

test('parsedParams returns nothing when nothing is given', async (t) => {
  const { parsedParams } = Util.parseParams({}, {});

  t.assert(Object.keys(parsedParams).length === 0);
});

test('parsedParams returns safemode', async (t) => {
  const params = { 'safe-mode': true };
  const options = {};

  const { parsedParams } = await Util.parseParams(params, options);

  t.assert(parsedParams['safe-mode']);
});

test('parsedParams returns nothing when safemode false', async (t) => {
  const params = { 'safe-mode': false };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(!parsedParams['safe-mode']);
});

test('parsedParams returns safemode when overwritten by params', async (t) => {
  const params = { 'safe-mode': true };
  const options = { 'safe-mode': false };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams['safe-mode']);
});

test('parsedParams returns nothing when safemode overwritten by params', async (t) => {
  const params = { 'safe-mode': false };
  const options = { 'safe-mode': true };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(!parsedParams['safe-mode']);
});

test('parsedParams returns format ', async (t) => {
  const params = { format: 'xml' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.format);
  t.is(parsedParams.format, 'xml');
});

test('parsedParams returns nothing when format overwritten by params', async (t) => {
  const params = { format: 'json' };
  const options = { format: 'xml' };

  const { parsedParams } = Util.parseParams(params, options);

  //   Json is default so format is nothing
  t.assert(!parsedParams.format);
});

test('parsedParams returns options blacklist ', async (t) => {
  const params = {};
  const options = { blacklistFlags: 'nsfw' };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.blacklistFlags);
  t.is(parsedParams.blacklistFlags, options.blacklistFlags);
});

test('parsedParams returns params blacklist when options is overwritten', async (t) => {
  const params = { blacklistFlags: 'nsfw' };
  const options = { blacklistFlags: 'nsfw,explicit' };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.blacklistFlags);
  t.is(parsedParams.blacklistFlags, params.blacklistFlags);
});

test('parsedParams returns params lang', async (t) => {
  const params = { lang: 'en' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.lang);
  t.is(parsedParams.lang, params.lang);
});

test('parsedParams returns params lang when options is overwritten', async (t) => {
  const params = { lang: 'en' };
  const options = { lang: 'de' };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.lang);
  t.is(parsedParams.lang, params.lang);
});

test('parsedParams returns options lang', async (t) => {
  const params = {};
  const options = { lang: 'de' };

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.lang);
  t.is(parsedParams.lang, options.lang);
});

test('parsedParams returns type', async (t) => {
  const params = { type: 'single' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  t.assert(parsedParams.type);
  t.is(parsedParams.type, params.type);
});

test('Wildcard returns parsed categories when given array', async (t) => {
  const params = { categories: ['coding', 'dark'] };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  t.assert(wildcard);
  t.is(wildcard, `/${params.categories.join(',')}`);
});

test('Wildcard returns parsed categories when given string', async (t) => {
  const params = { categories: 'coding,dark' };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  t.assert(wildcard);
  t.is(wildcard, `/${params.categories}`);
});

test('Wildcard returns correct language', async (t) => {
  const params = { language: 'en' };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  t.assert(wildcard);
  t.is(wildcard, `/${params.language}`);
});

test('Encode correctly', async (t) => {
  const JokeClient = new JokeAPI();

  const string = `dark|programming*dev*`;
  const shouldReturn = `dark%7Cprogramming*dev*`;

  const output = await JokeClient._percentEncoder(string);

  t.is(output, shouldReturn);
});

test('Clear joke function', async (t) => {
  const JokeClient = new JokeAPI();

  const { error, jokeCache } = await JokeClient.clearData();

  t.true(!error);
  t.includes(jokeCache.message, 'Successfully cleared');
});

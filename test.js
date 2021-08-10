const test = require('ava');

const JokeAPI = require('.');
const Util = require('./src/helpers/util');

test('Has safemode', async (t) => {
  const JokeClient = new JokeAPI({ 'safe-mode': true });
  const params = JokeClient._options;
  const url = await JokeClient._buildUrl('joke', params);

  if (!url.includes('safe-mode')) t.fail();

  t.pass();
});

test('Doesnt have safemode', async (t) => {
  const JokeClient = new JokeAPI({ 'safe-mode': false });
  const params = JokeClient._options;
  const url = await JokeClient._buildUrl('joke', params);

  if (url.includes('safe-mode')) t.fail();

  t.pass();
});

test('Has dry run', async (t) => {
  const JokeClient = new JokeAPI();
  const url = await JokeClient._buildUrl('submit', undefined, true);

  if (!url.includes('dry-run')) t.fail();

  t.pass();
});

test('Doesnt have dry run', async (t) => {
  const JokeClient = new JokeAPI();
  const url = await JokeClient._buildUrl('submit', undefined, false);

  if (url.includes('dry-run')) t.fail();

  t.pass();
});

test('Gets joke in any category', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke();

  if (joke.error) t.fail();

  t.pass();
});

test('Gets joke with safemode', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke({ 'safe-mode': true });

  if (joke.error) t.fail();
  if (!joke.safe) t.fail();

  t.pass();
});

test('Gets joke in coding category', async (t) => {
  const JokeClient = new JokeAPI();
  const joke = await JokeClient.getJoke({ categories: 'programming' });

  if (joke.error) t.fail();
  if (joke.category.toLowerCase() !== 'programming') t.fail();

  t.pass();
});

test('Gets information', async (t) => {
  const JokeClient = new JokeAPI();
  const info = await JokeClient.info();

  if (info.error) t.fail();

  t.pass();
});

test('Gets categories', async (t) => {
  const JokeClient = new JokeAPI();
  const categories = await JokeClient.categories();

  if (categories.error) t.fail();
  if (categories.categories.length < 0) t.fail();
  if (categories.categoryAliases.length < 0) t.fail();

  t.pass();
});

test('Gets english langcode', async (t) => {
  const JokeClient = new JokeAPI();
  const langcode = await JokeClient.langcode({ language: 'english' });

  if (langcode.error) t.fail();
  if (langcode.code !== 'en') t.fail();

  t.pass();
});

test('Fails if theres no langcode provided', async (t) => {
  const JokeClient = new JokeAPI();
  const langcode = await JokeClient.langcode({ language: '' });

  if (!langcode.error) t.fail();

  t.pass();
});

test('Gets all languages', async (t) => {
  const JokeClient = new JokeAPI();
  const languages = await JokeClient.languages();

  if (languages.error) t.fail();
  if (!languages.defaultLanguage) t.fail();
  if (!languages.jokeLanguages && languages.jokeLanguages.length < 0) t.fail();
  if (!languages.systemLanguages && languages.systemLanguages.length < 0) t.fail();

  t.pass();
});

test('Gets all flags', async (t) => {
  const JokeClient = new JokeAPI();
  const flags = await JokeClient.flags();

  if (flags.error) t.fail();
  if (!flags.flags) t.fail();

  t.pass();
});

test('Gets all formats', async (t) => {
  const JokeClient = new JokeAPI();
  const formats = await JokeClient.formats();

  if (formats.error) t.fail();
  if (!formats.formats && formats.formats.length < 0) t.fail();

  t.pass();
});

test('Gets ping', async (t) => {
  const JokeClient = new JokeAPI();
  const ping = await JokeClient.ping();

  if (ping.error) t.fail();
  if (ping.ping !== 'Pong!') t.fail();

  t.pass();
});

test('Gets endpoints', async (t) => {
  const JokeClient = new JokeAPI();
  const endpoints = await JokeClient.endpoints();

  if (endpoints.error) t.fail();
  if (endpoints.length < 0) t.fail();

  t.pass();
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

  if (singleJoke.message !== 'Dry Run complete! No errors were found.') t.fail();
  if (singleJoke.error) t.fail();

  t.pass();
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

  if (doubleJoke.message !== 'Dry Run complete! No errors were found.') t.fail();
  if (doubleJoke.error) t.fail();

  t.pass();
});

test('parseArray returns string seperated by commas when given array', async (t) => {
  const testArray = ['coding', 'dark'];

  const parsedArray = await Util.parseArray(testArray);

  if (parsedArray !== 'coding,dark') t.fail();

  t.pass();
});

test('parseArray returns string when given string', async (t) => {
  const testString = 'coding,dark';

  const parsedString = await Util.parseArray(testString);

  if (parsedString !== testString) t.fail();

  t.pass();
});

test('parsedParams returns nothing when nothing is given', async (t) => {
  const { parsedParams } = Util.parseParams({}, {});

  if (Object.keys(parsedParams).length > 0) t.fail();

  t.pass();
});

test('parsedParams returns safemode', async (t) => {
  const params = { 'safe-mode': true };
  const options = {};

  const { parsedParams } = await Util.parseParams(params, options);

  if (!parsedParams['safe-mode']) t.fail();

  t.pass();
});

test('parsedParams returns nothing when safemode false', async (t) => {
  const params = { 'safe-mode': false };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  if (parsedParams['safe-mode']) t.fail();

  t.pass();
});

test('parsedParams returns safemode when overwritten by params', async (t) => {
  const params = { 'safe-mode': true };
  const options = { 'safe-mode': false };

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams['safe-mode']) t.fail();

  t.pass();
});

test('parsedParams returns nothing when safemode overwritten by params', async (t) => {
  const params = { 'safe-mode': false };
  const options = { 'safe-mode': true };

  const { parsedParams } = Util.parseParams(params, options);

  if (parsedParams['safe-mode']) t.fail();

  t.pass();
});

test('parsedParams returns format ', async (t) => {
  const params = { format: 'xml' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.format) t.fail();
  if (parsedParams.format !== 'xml') t.fail();

  t.pass();
});

test('parsedParams returns nothing when format overwritten by params', async (t) => {
  const params = { format: 'json' };
  const options = { format: 'xml' };

  const { parsedParams } = Util.parseParams(params, options);

  //   Json is default so format is nothing
  if (parsedParams.format) t.fail();

  t.pass();
});

test('parsedParams returns options blacklist ', async (t) => {
  const params = {};
  const options = { blacklistFlags: 'nsfw' };

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.blacklistFlags) t.fail();
  if (parsedParams.blacklistFlags !== options.blacklistFlags) t.fail();

  t.pass();
});

test('parsedParams returns params blacklist when options is overwritten', async (t) => {
  const params = { blacklistFlags: 'nsfw' };
  const options = { blacklistFlags: 'nsfw,explicit' };

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.blacklistFlags) t.fail();
  if (parsedParams.blacklistFlags !== params.blacklistFlags) t.fail();

  t.pass();
});

test('parsedParams returns params lang', async (t) => {
  const params = { lang: 'en' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.lang) t.fail();
  if (parsedParams.lang !== params.lang) t.fail();

  t.pass();
});

test('parsedParams returns params lang when options is overwritten', async (t) => {
  const params = { lang: 'en' };
  const options = { lang: 'de' };

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.lang) t.fail();
  if (parsedParams.lang !== params.lang) t.fail();

  t.pass();
});

test('parsedParams returns options lang', async (t) => {
  const params = {};
  const options = { lang: 'de' };

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.lang) t.fail();
  if (parsedParams.lang !== options.lang) t.fail();

  t.pass();
});

test('parsedParams returns type', async (t) => {
  const params = { type: 'single' };
  const options = {};

  const { parsedParams } = Util.parseParams(params, options);

  if (!parsedParams.type) t.fail();
  if (parsedParams.type !== params.type) t.fail();

  t.pass();
});

test('Wildcard returns parsed categories when given array', async (t) => {
  const params = { categories: ['coding', 'dark'] };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  if (!wildcard) t.fail();
  if (wildcard !== `/${params.categories.join(',')}`) t.fail();

  t.pass();
});

test('Wildcard returns parsed categories when given string', async (t) => {
  const params = { categories: 'coding,dark' };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  if (!wildcard) t.fail();
  if (wildcard !== `/${params.categories}`) t.fail();

  t.pass();
});

test('Wildcard returns correct language', async (t) => {
  const params = { language: 'en' };
  const options = {};

  const { wildcard } = Util.parseParams(params, options);

  if (!wildcard) t.fail();
  if (wildcard !== `/${params.language}`) t.fail();

  t.pass();
});

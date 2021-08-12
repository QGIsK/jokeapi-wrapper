/**
 * @description The base url for the Joke API
 */
const BASE = 'https://v2.jokeapi.dev';

/**
 * @description The host of the Joke API
 */
const HOST = 'https://jokeapi.dev';

/**
 * @description The current version for the JokeAPI API
 */
const API_VERSION = '2';

/**
 * @description The current categories avaliable
 */
const CATEGORIES = [
  'any',
  'misc',
  'programming',
  'dark',
  'pun',
  'spooky',
  'christmas',
  'miscellaneous',
  'coding',
  'development',
  'halloween',
];

/**
 * @description The current blacklist flags avaliable
 */
const BLACKLIST_FLAGS = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];

/**
 * @description The current formats avaliable
 */
const FORMAT = ['json', 'xml', 'yaml', 'txt'];

/**
 * @description The current joke outputs avaliable
 */
const TYPE = ['single', 'twopart'];

/**
 * @description Current max amount of jokes
 */
const AMOUNT_MAX = 10;

export default { BASE, HOST, API_VERSION, CATEGORIES, BLACKLIST_FLAGS, FORMAT, TYPE, AMOUNT_MAX };

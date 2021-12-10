/**
 * @kind constant
 * @description The base url for the Joke API
 */
const BASE = 'https://v2.jokeapi.dev';

/**
 * @kind constant
 * @description The host of the Joke API
 */
const HOST = 'https://jokeapi.dev';

/**
 * @kind constant
 * @description The current version for the JokeAPI API
 */
const API_VERSION = '2';

/**
 * @kind constant
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
 * @kind constant
 * @description The current blacklist flags avaliable
 */
const BLACKLIST_FLAGS = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];

/**
 * @kind constant
 * @description The current formats avaliable
 */
const FORMAT = ['json', 'xml', 'yaml', 'txt'];

/**
 * @kind constant
 * @description The current joke outputs avaliable
 */
const TYPE = ['single', 'twopart'];

/**
 * @kind constant
 * @description Current max amount of jokes
 */
const AMOUNT_MAX = 10;

export default { BASE, HOST, API_VERSION, CATEGORIES, BLACKLIST_FLAGS, FORMAT, TYPE, AMOUNT_MAX };

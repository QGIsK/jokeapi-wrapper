const fetch = require('isomorphic-unfetch');

const Constants = require('./helpers/constants');
const Util = require('./helpers/util');

/**
 * @class JokeAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js wrapper for the Joke API with only one dependency. For more information, visit: https://jokeapi.dev/
 * @example
 *     const JokeAPI = require('jokeapi-wrapper');
 *     const JokeAPIClient = new JokeAPi();
 * @public
 * @version 1.1.0
 * @license MIT
 */
class JokeAPI {
  /**
   * @param {Object} options
   * @param {String} options.apiKey OPTIONAL:: Authorization key
   * @param {Boolean} options.safemode Turn on safemode DEFAULT:: off
   * @param {String} options.format Change global format DEFAULT:: JSON
   * @param {String|array} options.blacklistFlags Globally blacklist certain flags, Check JokeClient.BLACKLIST_FLAGS or https://jokeapi.dev/ for flag names
   * @param {String} options.lang Globally change language DEFAULT:: en
   */
  constructor(options = {}) {
    this._options = options;
  }

  /**
   * @description This endpoint is the one you want to call to get a joke.
   * @function getJoke()
   * @param {String|array} params.categories
   * @param {String} params.format
   * @param {String|array} params.blacklistFlags
   * @param {String} params.lang
   * @param {String} params.idRange i.e. 10-25
   * @param {String} params.contains
   * @param {String} params.type
   * @param {Number} params.amount i.e. 5 MAX:: 10
   * @returns {Object}
   */
  getJoke(params = {}) {
    // eslint-disable-next-line no-param-reassign
    if (!params.categories) params.categories = 'any';

    const url = this._buildUrl('joke', params);
    return this._request(url);
  }

  /**
   * @description This endpoint provides a lot of information about JokeAPI and its jokes
   * @function info()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  info(params = {}) {
    const url = this._buildUrl('info', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available joke categories,
   * all available category aliases and a 13-character UNIX timestamp.
   * @function categories()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  categories(params = {}) {
    const url = this._buildUrl('categories', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns the ISO 639-1 language code of a provided language.
   * It is searched with a fuzzy search, so you just have to provide the approximate language name.
   * The resulting language code is to be used in fetching and submitting jokes in different languages.
   * @function langcode()
   * @param {String} params.format
   * @param {String} params.language
   * @returns {Object}
   */
  langcode(params = {}) {
    if (!params.language) return { error: true, message: 'You need to supply a language' };

    const url = this._buildUrl('langcode', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns lists of supported languages in jokes and supported languages in system messages (error messages).
   * Also, it returns a list of possible ISO 639-1 language codes you can use to submit a joke or add a translation.
   * @function languages()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  languages(params = {}) {
    const url = this._buildUrl('languages', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available blacklist flags and a 13-character UNIX timestamp.
   * @function flags()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  flags(params = {}) {
    const url = this._buildUrl('flags', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available response formats and a 13-character UNIX timestamp.
   * @function formats()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  formats(params = {}) {
    const url = this._buildUrl('formats', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a parameter named "ping" that contains the word "Pong!"
   * and a 13-character UNIX timestamp. It is intended for external uptime monitoring
   * @function ping()
   * @param {String} params.format
   * @param {String} params.lang
   * @returns {Object}
   */
  ping(params = {}) {
    const url = this._buildUrl('ping', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   * @function endpoints()
   * @param {String} params.format
   * @returns {Object}
   */
  endpoints(params = {}) {
    const url = this._buildUrl('endpoints', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   * @function endpoints()
   * @param {Number} params.formatVersion
   * @param {String} params.category
   * @param {String} params.type
   * @param {String} params.joke
   * @param {Object} params.flags
   * @param {Boolean} params.flags.nsfw
   * @param {Boolean} params.flags.religious
   * @param {Boolean} params.flags.political
   * @param {Boolean} params.flags.racist
   * @param {Boolean} params.flags.sexist
   * @param {Boolean} params.flags.explicit
   * @param {String} params.lang
   * @returns {Object}
   */
  submit(params = {}) {
    const url = this._buildUrl('submit', undefined, params['dry-run']);
    // Remove dry run from body
    delete params['dry-run'];
    return this._request(url, { body: JSON.stringify(params), method: 'POST' });
  }

  clearData() {
    const url = this._buildUrl('cleardata');
    return this._request(url, { method: 'POST' });
  }

  /**
   * @description This is a helper function to encode special characters
   * @function endpoints()
   * @param {String} String
   */
  _percentEncoder(String) {
    if (!String) return { error: true, message: 'You need to supply a String to encode' };
    return String.replace('|', '%7C');
  }

  /**
   * @description Builds the url.
   * @function _buildUrl()
   * @param {String} endpoint
   * @param {String|array} params.categories
   * @param {String} params.format
   * @param {String|array} params.blacklistFlags
   * @param {String} params.lang
   * @param {Number} params.idRange
   * @param {String} params.contains
   * @param {String} params.type
   * @param {Number} params.amount
   * @param {String} params.lang
   * @param {String} method
   * @returns {String}
   */
  _buildUrl(endpoint, params, testRun) {
    if (testRun) return `${Constants.BASE}/${endpoint}?dry-run`;

    if (params) {
      const { parsedParams, wildcard } = Util.parseParams(params, this._options);
      const url = wildcard ? `${Constants.BASE}/${endpoint}${wildcard}` : `${Constants.BASE}/${endpoint}`;

      return this._buildQuery(url, parsedParams);
    }

    return `${Constants.BASE}/${endpoint}`;
  }

  /**
   * @description Formats Object into http query
   * @function _buildQuery()
   * @param {String} url
   * @param {String|array} params.categories
   * @param {String} params.format
   * @param {String|array} params.blacklistFlags
   * @param {String} params.lang
   * @param {Number} params.idRange
   * @param {String} params.contains
   * @param {String} params.type
   * @param {Number} params.amount
   * @param {String} params.lang
   * @returns {String}
   */
  _buildQuery(url, query) {
    const parsedQuery = Object.entries(query)
      .map((pair) => {
        // On some queries there is no value i.e. safemode; so we just use the key name
        return pair[0] === pair[1] ? pair[0] : pair.map(encodeURIComponent).join('=');
      })
      .join('&');

    return parsedQuery ? `${url}?${parsedQuery}` : url;
  }

  /**
   * @description Sends request to api then returns output in requested format
   * @function _request()
   * @param {String} url
   * @param {Object} options
   * @param {String} options.method
   * @returns {Object}
   */
  async _request(url, options) {
    const headers = {
      Authorization: `Bearer ${this._options.apiKey}`,
      'Content-Type': 'application/json',
    };

    const res = await fetch(url, { ...options, headers });

    const formattedUrl = new URL(url);
    const urlSearchParams = new URLSearchParams(formattedUrl.search);
    const format = urlSearchParams.get('format');

    if (format) return res.text();

    return res.json();
  }
}

JokeAPI.BASE = Constants.BASE;
JokeAPI.HOST = Constants.HOST;
JokeAPI.API_VERSION = Constants.API_VERSION;
JokeAPI.CATEGORIES = Constants.CATEGORIES;
JokeAPI.BLACKLIST_FLAGS = Constants.BLACKLIST_FLAGS;
JokeAPI.FORMAT = Constants.FORMAT;
JokeAPI.TYPE = Constants.TYPE;
JokeAPI.AMOUNT_MAX = Constants.AMOUNT_MAX;

module.exports = JokeAPI;

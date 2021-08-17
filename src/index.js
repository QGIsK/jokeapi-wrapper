import fetch from 'isomorphic-unfetch';

import Constants from './helpers/constants';
import Util from './helpers/util';

/**
 * @class JokeAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js wrapper for the Joke API with only one dependency. For more information, visit: https://jokeapi.dev/
 * @example
 *     const JokeAPI = require('jokeapi-wrapper');
 *     const JokeAPIClient = new JokeAPi();
 * @public
 * @version 1.0.8
 * @license MIT
 */
module.exports.default = class JokeAPI {
  /**
   * @param {object} options
   * @param {string} options.apiKey OPTIONAL:: Authorization key
   * @param {boolean} options.safemode Turn on safemode DEFAULT:: off
   * @param {string} options.format Change global format DEFAULT:: JSON
   * @param {string|array} options.blacklistFlags Globally blacklist certain flags, Check JokeClient.BLACKLIST_FLAGS or https://jokeapi.dev/ for flag names
   * @param {string} options.lang Globally change language DEFAULT:: en
   */
  constructor(options = {}) {
    this._options = options;
  }

  /**
   * @description This endpoint is the one you want to call to get a joke.
   * @function getJoke()
   * @param {string|array} params.categories
   * @param {string} params.format
   * @param {string|array} params.blacklistFlags
   * @param {string} params.lang
   * @param {string} params.idRange i.e. 10-25
   * @param {string} params.contains
   * @param {string} params.type
   * @param {number} params.amount i.e. 5 MAX:: 10
   * @returns {ReturnObject}
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
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  info(params = {}) {
    const url = this._buildUrl('info', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available joke categories,
   * all available category aliases and a 13-character UNIX timestamp.
   * @function categories()
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
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
   * @param {string} params.format
   * @param {string} params.language
   * @returns {ReturnObject}
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
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  languages(params = {}) {
    const url = this._buildUrl('languages', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available blacklist flags and a 13-character UNIX timestamp.
   * @function flags()
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  flags(params = {}) {
    const url = this._buildUrl('flags', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available response formats and a 13-character UNIX timestamp.
   * @function formats()
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  formats(params = {}) {
    const url = this._buildUrl('formats', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a parameter named "ping" that contains the word "Pong!"
   * and a 13-character UNIX timestamp. It is intended for external uptime monitoring
   * @function ping()
   * @param {string} params.format
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  ping(params = {}) {
    const url = this._buildUrl('ping', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   * @function endpoints()
   * @param {string} params.format
   * @returns {ReturnObject}
   */
  endpoints(params = {}) {
    const url = this._buildUrl('endpoints', params);
    return this._request(url);
  }

  /**
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   * @function endpoints()
   * @param {number} params.formatVersion
   * @param {string} params.category
   * @param {string} params.type
   * @param {string} params.joke
   * @param {object} params.flags
   * @param {boolean} params.flags.nsfw
   * @param {boolean} params.flags.religious
   * @param {boolean} params.flags.political
   * @param {boolean} params.flags.racist
   * @param {boolean} params.flags.sexist
   * @param {boolean} params.flags.explicit
   * @param {lang} params.lang
   * @returns {ReturnObject}
   */
  submit(params = {}) {
    const url = this._buildUrl('submit', undefined, params['dry-run']);
    // Remove dry run from body
    delete params['dry-run'];
    return this._request(url, { body: JSON.stringify(params), method: 'POST' });
  }

  /**
   * @description Builds the url.
   * @function _buildUrl()
   * @param {string} endpoint
   * @param {string|array} params.categories
   * @param {string} params.format
   * @param {string|array} params.blacklistFlags
   * @param {string} params.lang
   * @param {number} params.idRange
   * @param {string} params.contains
   * @param {string} params.type
   * @param {number} params.amount
   * @param {string} params.lang
   * @param {string} method
   * @returns {string}
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
   * @description Formats object into http query
   * @function _buildQuery()
   * @param {string} url
   * @param {string|array} params.categories
   * @param {string} params.format
   * @param {string|array} params.blacklistFlags
   * @param {string} params.lang
   * @param {number} params.idRange
   * @param {string} params.contains
   * @param {string} params.type
   * @param {number} params.amount
   * @param {string} params.lang
   * @returns {string}
   */
  _buildQuery(url, query) {
    const parsedQuery = Object.entries(query)
      .map((pair) => {
        // On some queries there is no value i.e. safemode; so we jsut use the key name
        return pair[0] === pair[1] ? pair[0] : pair.map(encodeURIComponent).join('=');
      })
      .join('&');

    return parsedQuery ? `${url}?${parsedQuery}` : url;
  }

  /**
   * @description Sends request to api then returns output in requested format
   * @function _request()
   * @param {string} url
   * @param {object} options
   * @param {string} options.method
   * @returns {object}
   */
  async _request(url, options) {
    const headers = {
      Authorization: this._options.apiKey,
      'Content-Type': 'application/json',
    };

    const res = await fetch(url, { ...options, headers });

    const formattedUrl = new URL(url);
    const urlSearchParams = new URLSearchParams(formattedUrl.search);
    const format = urlSearchParams.get('format');

    if (format) return res.text();

    return res.json();
  }
};

JokeAPI.BASE = Constants.BASE;
JokeAPI.HOST = Constants.HOST;
JokeAPI.API_VERSION = Constants.API_VERSION;
JokeAPI.CATEGORIES = Constants.CATEGORIES;
JokeAPI.BLACKLIST_FLAGS = Constants.BLACKLIST_FLAGS;
JokeAPI.FORMAT = Constants.FORMAT;
JokeAPI.TYPE = Constants.TYPE;
JokeAPI.AMOUNT_MAX = Constants.AMOUNT_MAX;

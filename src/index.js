const fetch = require('node-fetch');

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
 * @version 1.0.0
 * @license MIT
 */
class JokeAPI {
  /**
   * @param {string} apiKey OPTIONAL:: Authorization key
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * @description This endpoint is the one you want to call to get a joke.
   * @function getJoke()
   * @param {string|array} params.categories
   * @param {string} params.format
   * @param {string|array} params.blacklistFlags
   * @param {string} params.lang
   * @param {number} params.idRange
   * @param {string} params.contains
   * @param {string} params.type
   * @param {number} params.amount
   * @returns {ReturnObject}
   */
  getJoke(params = {}) {
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
   * @param {string} params.lang
   * @returns {ReturnObject}
   */
  langcode(params = {}) {
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
   * @param {number} params.
   * @param {string} params.lang
   * @returns {string}
   */
  _buildUrl(endpoint, params) {
    const wildcard = params.langCode ? params.langCode : Util.parseArray(params.categories, 'any');

    const obj = Util.parseParams(params);
    const url = `${Constants.BASE}/${endpoint}/${wildcard}`;

    return obj ? this._buildQuery(url, obj) : url;
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
   * @param {number} params.
   * @param {string} params.lang
   * @returns {string}
   */
  _buildQuery(url, query) {
    const parsedQuery = Object.entries(query)
      .map((pair) => pair.map(encodeURIComponent).join('='))
      .join('&');

    return parsedQuery ? `${url}?${parsedQuery}` : url;
  }

  /**
   * @description Sends request to api then returns output in requested format
   * @function _request()
   * @param {string} url
   * @param {string} options.method
   * @returns {object}
   */
  async _request(url, options) {
    const headers = this.apiKey ? { Authorization: this.apiKey } : {};
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

module.exports = exports = JokeAPI;

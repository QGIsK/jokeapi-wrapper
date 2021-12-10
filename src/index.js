/**
 * @typedef {import('../types').Options} Options
 * @typedef {import('../types').RequestOptions} RequestOptions
 * @typedef {import('../types/params').BaseParams} Params
 * @typedef {import('../types/params').JokeParams} JokeParams
 * @typedef {import('../types/params').SubmitJokeParams} SubmitJokeParams
 * @typedef {import('../types/params').LangCodeParams} LangCodeParams
 * @typedef {import('../types/params').ExtendedParams} ExtendedParams
 */

import fetch from 'isomorphic-unfetch';

import Constants from './helpers/constants.js';
import Util from './helpers/util.js';

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
class JokeAPI {
  /**
   * @param {Options} options
   */
  constructor(options = {}) {
    this._options = options;
  }

  /**
   * @function getJoke
   * @description Returns a joke in supplied categories or any
   *
   * @param {JokeParams} params
   *
   * @return {Promise<Object>}
   */
  getJoke(params = {}) {
    // eslint-disable-next-line no-param-reassign
    if (!params.categories) params.categories = 'any';

    const url = this._buildUrl('joke', params);
    return this._request(url);
  }

  /**
   * @function info
   * @description This endpoint provides a lot of information about JokeAPI and its jokes
   *
   * @param {Params} params
   *
   * @return {Object}
   */
  info(params = {}) {
    const url = this._buildUrl('info', params);
    return this._request(url);
  }

  /**
   * @function categories
   * @description This endpoint returns a list / an array of all available joke categories,
   * all available category aliases and a 13-character UNIX timestamp.
   * @param {Params} params
   *
   * @return {Object}
   */
  categories(params = {}) {
    const url = this._buildUrl('categories', params);
    return this._request(url);
  }

  /**
   * @function langcode
   * @description This endpoint returns the ISO 639-1 language code of a provided language.
   * It is searched with a fuzzy search, so you just have to provide the approximate language name.
   * The resulting language code is to be used in fetching and submitting jokes in different languages.
   * 
   * @param {LangCodeParams} params

   * @return {Object}
   */
  langcode(params) {
    if (!params.language) return { error: true, message: 'You need to supply a language' };

    const url = this._buildUrl('langcode', params);
    return this._request(url);
  }

  /**
   * @function languages
   * @description This endpoint returns lists of supported languages in jokes and supported languages in system messages (error messages).
   * Also, it returns a list of possible ISO 639-1 language codes you can use to submit a joke or add a translation.
   *
   * @param {Params} params
   *
   * @return {Object}
   */
  languages(params = {}) {
    const url = this._buildUrl('languages', params);
    return this._request(url);
  }

  /**
   * @function flags
   * @description This endpoint returns a list / an array of all available blacklist flags and a 13-character UNIX timestamp.
   *
   * @param {Params} params
   *
   * @return {Object}
   */
  flags(params = {}) {
    const url = this._buildUrl('flags', params);
    return this._request(url);
  }

  /**
   * @function formats
   * @description This endpoint returns a list / an array of all available response formats and a 13-character UNIX timestamp.
   * 
   * @param {Params} params

   * @return {Object}
   */
  formats(params = {}) {
    const url = this._buildUrl('formats', params);
    return this._request(url);
  }

  /**
   * @function ping
   * @description This endpoint returns a parameter named "ping" that contains the word "Pong!"
   * and a 13-character UNIX timestamp. It is intended for external uptime monitoring
   * 
   * @param {Params} params

   * @return {Object}
   */
  ping(params = {}) {
    const url = this._buildUrl('ping', params);
    return this._request(url);
  }

  /**
   * @function endpoints
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   * 
   * @param {Params} params

   * @return {Object}
   */
  endpoints(params = {}) {
    const url = this._buildUrl('endpoints', params);
    return this._request(url);
  }

  /**
   * @function endpoints
   * @description This endpoint returns a list / an array of all available endpoints, their usage (method, url and supported parameters) and a short description each.
   *
   * @param {SubmitJokeParams} params
   *
   * @return {Object}
   */
  submit(params) {
    const url = this._buildUrl('submit', undefined, params['dry-run']);

    // Remove dry run from body
    delete params['dry-run'];
    return this._request(url, { body: JSON.stringify(params), method: 'POST' });
  }

  /**
   * @function _buildUrl
   * @description Builds the url.
   *
   * @param {string} endpoint
   * @param {ExtendedParams} params
   * @param {Boolean } [testRun]
   *
   * @return {string}
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
   * @function _buildQuery
   * @description Formats object into http query
   *
   * @param {string} url
   * @param {ExtendedParams} query
   *
   * @return {string}
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
   * @function _request
   * @description Sends request to api then returns output in requested format
   *
   * @param {string} url
   * @param {RequestOptions} [options]
   *
   * @return {Promise<any>}
   */
  async _request(url, options) {
    const headers = {
      Authorization: this._options.apiKey,
      'Content-Type': 'application/json',
    };

    const res = await fetch(url, { ...options, headers });

    // @ts-ignore TODO :: Fix this
    const formattedUrl = new URL(url);

    // @ts-ignore TODO :: Fix this
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

export default JokeAPI;

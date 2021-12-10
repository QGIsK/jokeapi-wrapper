/**
 * @typedef {import('../../types').Options} Options
 * @typedef {import('../../types/params').ExtendedParams} ExtendedParams
 * @typedef {import('../../types/params').JokeParams} JokeParams
 * @typedef {import('../../types/params').SubmitJokeParams} SubmitJokeParams
 * @typedef {import('../../types/params').LangCodeParams} LangCodeParams
 */

/**
 * @param {string | any[]} data
 * @return {string}
 */
const parseArray = (data) => {
  return Array.isArray(data) ? data.join(',') : data;
};

/**
 * @param {ExtendedParams} params
 * @param {Options} options
 *
 * @return {{parsedParams: ExtendedParams, wildcard: string}}
 */
const parseParams = (params, options) => {
  /** @type {ExtendedParams} */
  const parsedParams = {};
  let wildcard;

  // @ts-ignore ignore all code paths must return value
  if (!params || !options) return;
  Object.assign(parsedParams, params);

  // Either in params or options
  if ('safe-mode' in options) parsedParams['safe-mode'] = 'safe-mode';
  if ('safe-mode' in params) {
    if (params['safe-mode']) parsedParams['safe-mode'] = 'safe-mode';
    else delete parsedParams['safe-mode'];
  }

  if ('format' in options) parsedParams.format = options.format;
  if ('format' in params) {
    if (params.format === 'json') delete parsedParams.format;
    else parsedParams.format = params.format;
  }

  if ('blacklistFlags' in params || 'blacklistFlags' in options)
    parsedParams.blacklistFlags = params.blacklistFlags
      ? parseArray(params.blacklistFlags)
      : parseArray(options.blacklistFlags);

  if ('lang' in params || 'lang' in options) parsedParams.lang = params.lang ? params.lang : options.lang;

  // Just in params
  if ('type' in params) parsedParams.type = parseArray(params.type);

  // set wildcard
  if ('categories' in params) {
    wildcard = `/${parseArray(params.categories)}`;
    delete parsedParams.categories;
  }
  if ('language' in params) {
    wildcard = `/${params.language}`;
    delete parsedParams.language;
  }

  return { parsedParams, wildcard };
};
export default { parseArray, parseParams };

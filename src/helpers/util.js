/**
 * @param {string|Array} data
 * @returns {string}
 */
const parseArray = (data) => {
  return Array.isArray(data) ? data.join(',') : data;
};

/**
 * @param {Object} params
 * @param {Object} options
 * @returns {Object}
 */
const parseParams = (params, options) => {
  const parsedParams = {};
  let wildcard;

  if (!params || !options) return;
  Object.assign(parsedParams, params);

  // Either in params or options
  if ('safe-mode' in options) parsedParams['safe-mode'] = 'safe-mode';
  if ('safe-mode' in params)
    params['safe-mode'] ? (parsedParams['safe-mode'] = 'safe-mode') : delete parsedParams['safe-mode'];

  if ('format' in options) parsedParams.format = options.format;
  if ('format' in params) params.format === 'json' ? delete parsedParams.format : (parsedParams.format = params.format);

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

module.exports = { parseArray, parseParams };

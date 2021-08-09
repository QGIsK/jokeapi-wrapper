/**
 * @param {string|array} data
 * @param {string} fallback
 * @returns {string}
 */
const parseArray = (data) => {
  return typeof data === Array ? data.split(',') : data;
};

/**
 * @param {object} params
 * @param {object} options
 * @returns {object}
 */
const parseParams = (params, options) => {
  const parsedParams = params;
  let wildcard;

  // Either in params or options

  if ('safemode' in options) parsedParams.safemode = 'safemode';
  if ('safemode' in params) parsedParams.safemode ? delete parsedParams.safemode : (parsedParams.safemode = params.safemode);

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

  if ('dry-run' in options) parsedParams['dry-run'] = 'dry-run';

  return { parsedParams, wildcard };
};

module.exports = { parseArray, parseParams };

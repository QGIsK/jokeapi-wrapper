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
  const obj = {};

  // Either in params or options
  if ('safemode' in options) obj.safemode = 'safemode';
  if ('safemode' in params) obj.safemode ? delete obj.safemode : params.safemode;

  if ('format' in options) obj.format = options.format;
  if ('format' in params) params.format === 'json' ? delete obj.format : params.format;

  if ('blacklistFlags' in params || 'blacklistFlags' in options)
    obj.blacklistFlags = params.blacklistFlags ? parseArray(params.blacklistFlags) : parseArray(options.blacklistFlags);

  if ('lang' in params || 'lang' in options) obj.lang = params.lang ? params.lang : options.lang;

  // Just in params
  if ('idRange' in params) obj.idRange = params.idRange;
  if ('contains' in params) obj.contains = params.contains;
  if ('type' in params) obj.type = parseArray(params.type);
  if ('amount' in params) obj.amount = params.amount;
  if ('language' in params) obj.language = params.language;

  return obj;
};

module.exports = { parseArray, parseParams };

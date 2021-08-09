/**
 * @param {string|array} data
 * @param {string} fallback
 * @returns {string}
 */
const parseArray = (data) => {
  const parsedData = data ?? (data.length > 0 ? data.split(',') : data.categories);
  return parsedData ?? parsedData.toLowerCase();
};

/**
 * @param {object} params
 * @returns {object}
 */
const parseParams = (params) => {
  if (!params) return;

  const obj = {};

  if ('safemode' in params) obj.safemode = 'safemode';
  if ('format' in params) obj.format = params.format;
  if ('blacklistFlags' in params) obj.blacklistFlags = parseArray(params.blacklistFlags);
  if ('lang' in params) obj.lang = params.lang;
  if ('idRange' in params) obj.idRange = params.idRange;
  if ('contains' in params) obj.contains = params.contains;
  if ('type' in params) obj.type = parseArray(params.type);
  if ('amount' in params) obj.amount = params.amount;
  if ('lang' in params) obj.lang = params.lang;

  return obj;
};

module.exports = { parseArray, parseParams };

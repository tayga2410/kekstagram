addValidator('word-pattern', (value, pattern) => {
  const words = segmentWords(value);
  const regexp = new RegExp(`^${pattern}$`, 'i');

  return words.every((it) => regexp.test(it));
});

addValidator('unique-words', (value) => {
  const words = segmentWords(value.toLowerCase());
  const wordSet = new Set(words);

  return words.length === wordSet.size;
});

addValidator('max-words', (value, limit) => {
  const words = segmentWords(value);
  const maxLength = Number(limit);

  return words.length <= maxLength;
});

addValidator('word-maxlength', (value, limit) => {
  const words = segmentWords(value);
  const maxLength = Number(limit);

  return words.every((it) => it.length <= maxLength);
});

/**
 * @param {string} name
 * @param {(...args: Array<string>) => boolean} validator
 */
function addValidator(name, validator) {
  // @ts-ignore
  Pristine.addValidator(name, validator, null, 1, true);
}

/**
 * @param {string} value
 * @returns {Array<string>}
 */
function segmentWords(value) {
  return value.split(' ').filter(Boolean);
}

import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru'] });

export function applyTypograf(text) {
  if (!text) return text;
  return tp.execute(text);
}
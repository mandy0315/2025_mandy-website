export const firstWordToUpper = (words: string) => {
  if (words.length < 1) return words;
  return words.charAt(0).toUpperCase() + words.slice(1);
};

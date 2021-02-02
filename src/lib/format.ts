export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const avatarText = (text: string) => {
  const word = text
    .split(/\s/)
    .reduce(
      (response: string, word: string) => (response += word.slice(0, 1)),
      '',
    );

  return word.length === 1 ? word.slice(0, 1) : word.slice(0, 2);
};

export function formatNumberAndAddCurrency(
  number: number,
  currencySymbol: string
): string {
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedNumber} ${currencySymbol}`;
}

export const truncateTitle = (title: string): string => {
  const words = title.split(" ");
  if (words.length > 5) {
    return words.slice(0, 5).join(" ") + "...";
  }
  return title;
};

export function truncateTextAfterWords(text: string, numWords: number) {
  const words = text.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + "...";
  }
  return text;
}

export const replaceUrl = (url: string) => {
  if (!url) return "";
  return url.replace("http://api:8002", "https://baby-back.ru/");
};

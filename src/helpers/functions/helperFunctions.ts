export function formatNumberAndAddCurrency(number: number | string, currencySymbol: string): string {
    const numericValue = typeof number === 'string' ? parseFloat(number) : number;

    if (!isNaN(numericValue)) {
        const formattedNumber = numericValue.toFixed(2).replace(/\.00$/, '');
        const formattedNumberWithSpaces = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return `${formattedNumberWithSpaces} ${currencySymbol}`;
    } else {
        return 'Invalid number';
    }
}

export const truncateTitle = (title: string): string => {
    const words = title.split(' ');
    if (words.length > 5) {
        return words.slice(0, 5).join(' ') + '...';
    }
    return title;
};

export function truncateTextAfterWords(text: string, numWords: number): string {
    const htmlText = new DOMParser().parseFromString(text, 'text/html');
    const textContent = htmlText.body.textContent || '';
    const words = textContent.split(' ');

    if (words.length > numWords) {
        return words.slice(0, numWords).join(' ') + '...';
    }
    return textContent;
}

export function stripHtmlTags(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}


export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };
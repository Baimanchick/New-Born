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

export function truncateTextAfterWords(text : string, numWords : number) {
    const words = text.split(' ');
    if (words.length > numWords) {
        return words.slice(0, numWords).join(' ') + '...';
    }
    return text;
}

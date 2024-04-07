export function formatNumberAndAddCurrency(number: number, currencySymbol: string): string {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedNumber} ${currencySymbol}`;
}

export const truncateTitle = (title: string): string => {
    const words = title.split(' ');
    if (words.length > 5) {
        return words.slice(0, 5).join(' ') + '...';
    }
    return title;
};

export const abbreviateTitle = (title: string, wordsCount: number): string => {
    const words = title.split(' ');
    return words.slice(0, wordsCount).join(' ');
};
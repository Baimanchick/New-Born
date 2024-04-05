export function formatNumberAndAddCurrency(number: number, currencySymbol: string): string {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedNumber} ${currencySymbol}`;
}

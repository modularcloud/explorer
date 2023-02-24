export const isHeight = (term: string) => !!term.match(/^[0-9]{1,13}$/);
export const isHash = (term: string) => !!term.match(/^(0x)?[a-zA-Z0-9]{64}$/);
export const isAddress = (term: string) => !!term.match(/^\w{42}$/)
export const isValidSolAddress = (term: string) => !!(term.length >= 44);

export function isSearchable(term: string): boolean {
    return isHeight(term) || isHash(term) || isAddress(term) || isValidSolAddress(term);
}

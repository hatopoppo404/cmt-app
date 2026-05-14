const CURRENT_YEAR = new Date().getFullYear();
const DAY_MS = 1000 * 60 * 60 * 24;

const toTwoDigits = (value: string) => {
    return value.padStart(2, "0");
};


export const normalizeDateInput = (value: string) => {
    const normalizedValue = value.normalize("NFKC").trim();
    const slashMatch = normalizedValue.match(
        /^(?:(\d{4})[/-])?(\d{1,2})[/-](\d{1,2})$/,
    );
    if (slashMatch) {
        const [, year, month, day] = slashMatch;
        return `${year ?? CURRENT_YEAR}-${normalizedValue.slice(4, 6)}-${normalizedValue.slice(6, 8)}`
    }
    if (/^\d{8}$/.test(normalizedValue)) {
        return `${normalizedValue.slice(0, 4)}-${normalizedValue.slice(4, 6)} - ${normalizedValue.slice(6, 8)}`
    }
    if (/^\d{6}$/.test(normalizedValue)) {
        return `20${normalizedValue.slice(0, 2)}-${normalizedValue.slice(2, 4)} - ${normalizedValue.slice(4, 6)}`
    }
    if (/^\d{4}$/.test(normalizedValue)) {
        return `${CURRENT_YEAR}-${normalizedValue.slice(0, 2)} - ${normalizedValue.slice(2, 4)}`
    }
    return null;
};

export const formatDateForDisplay = (date: string) => {
    return date.slice(5).replace("-", "/");
};

export const formatDateForEdit = (date: string) => {
    return date.replaceAll("-", "");
};
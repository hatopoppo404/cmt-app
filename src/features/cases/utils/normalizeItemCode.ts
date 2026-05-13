export const normalizeItemCode = (
    value: string,
) => {
    return value
        .normalize("NFKC")
        .toUpperCase()
        .replace(/\s/g, "");
};
export const normalizeQuentity = (
    value: string,
) => {
    const normalizedValue = value
        .normalize("NFKC")
        .replace(/\s/g, "");
    const numberValue = Number(normalizedValue);

    if (Number.isNaN(numberValue)) return null;

    return numberValue;
};
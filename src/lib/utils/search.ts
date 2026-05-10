import type { Case } from "@/types/case";

const normalizeText = (value: string) => {
  return value.toLowerCase().normalize("NFKC").replace(/\s/g, "");
};

const isMonthDayText = (value: string) => {
  const normalizedValue = value.normalize("NFKC").trim();

  return (
    /^\d{1,2}[/-]\d{1,2}$/.test(normalizedValue) ||
    /^\d{4}$/.test(normalizedValue) ||
    /^\d{6}$/.test(normalizedValue) ||
    /^\d{8}$/.test(normalizedValue)
  );
};

const createMonthDayKey = (value: string) => {
  const normalizedValue = value.normalize("NFKC").trim();

  const slashMatch = normalizedValue.match(
    /^(?:\d{4}[/-])?(\d{1,2})[/-](\d{1,2})$/,
  );

  if (slashMatch) {
    const [, month, day] = slashMatch;

    return `${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  if (/^\d{4}$/.test(normalizedValue)) {
    const month = normalizedValue.slice(0, 2);
    const day = normalizedValue.slice(2, 4);

    return `${month}-${day}`;
  }

  if (/^\d{6}$/.test(normalizedValue)) {
    const month = normalizedValue.slice(2, 4);
    const day = normalizedValue.slice(4, 6);

    return `${month}-${day}`;
  }

  if (/^\d{8}$/.test(normalizedValue)) {
    const month = normalizedValue.slice(4, 6);
    const day = normalizedValue.slice(6, 8);

    return `${month}-${day}`;
  }

  return null;
};

const createCaseDateKeys = (caseItem: Case) => {
  return [
    createMonthDayKey(caseItem.dueDate),
    createMonthDayKey(caseItem.replyDate),
    createMonthDayKey(caseItem.deadline),
  ].filter((dateKey): dateKey is string => dateKey !== null);
};

const createCaseSearchText = (caseItem: Case) => {
  return normalizeText(
    [
      caseItem.id,
      caseItem.itemName,
      caseItem.itemCode,
      caseItem.orderCode,
      caseItem.warehouse,
      caseItem.cause,
      caseItem.note,
      caseItem.quantity.toString(),
      caseItem.delayDays.toString(),
      caseItem.dueDate,
      caseItem.replyDate,
      caseItem.deadline,
    ].join(" "),
  );
};

export const doesCaseMatchSearch = (caseItem: Case, searchText: string) => {
  const normalizedSearchText = normalizeText(searchText);

  if (normalizedSearchText === "") {
    return true;
  }

  const textMatched = createCaseSearchText(caseItem).includes(normalizedSearchText);

  if (!isMonthDayText(searchText)) {
    return textMatched;
  }

  const searchDateKey = createMonthDayKey(searchText);

  if (searchDateKey === null) {
    return textMatched;
  }

  const dateMatched = createCaseDateKeys(caseItem).includes(searchDateKey);

  return textMatched || dateMatched;
};

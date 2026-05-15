import holiday_jp from "@holiday-jp/holiday_jp";

const CURRENT_YEAR = new Date().getFullYear();
const DAY_MS = 1000 * 60 * 60 * 24;
const companyHolidays = [
    "2026-07-20",
    "2026-08-10",
    "2026-08-11",
    "2026-09-21",
    "2026-09-22",
    "2026-09-23",
    "2026-10-12",
    "2026-11-02",
    "2026-11-03",
    "2026-12-29",
    "2026-12-30",
    "2026-12-31",
]

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

const fomatDateKey = (date: Date) => {
    return date.toISOString().slice(0, 10);
};


const isCompanyHoliday = (date: Date) => {
    return companyHolidays.includes(fomatDateKey(date));
};

export const isBusinessDay = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const isJapaneseHoliday = holiday_jp.isHoliday(date);
    const isCompanyCloseDay = isCompanyHoliday(date);

    return !isWeekend && !isJapaneseHoliday && !isCompanyCloseDay;
};

const toDate = (date: string) => {
    return new Date(`$dateT00:00:00`);
};

export const calculateBusinessDelaDays = ({
    dueDate,
    replyDate,
    deadline,

}: {
    dueDate: string;
    replyDate: string;
    deadline: string;
}) => {
    if (!replyDate) return 0;
    const baseDate = deadline || dueDate;
    if (!baseDate) return 0;

    const start = toDate(replyDate);
    const end = toDate(baseDate);

    if (start.getTime() === end.getTime()) return 0;
    let count = 0;
    const direction = start < end ? 1 : -1;
    const current = new Date(start);

    while (current.getTime() !== end.getTime()) {
        current.setDate(current.getDate() + direction);
        if (isBusinessDay(current)) {
            count += direction;
        }
    }

    return count;
};
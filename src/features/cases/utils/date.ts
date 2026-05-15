import holiday_jp from "@holiday-jp/holiday_jp";

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

// 最新年を取得
const getCurrentYear = () => new Date().getFullYear();

// 1桁を0を追加して2桁に変換
const toTwoDigits = (value: string) => value.padStart(2, "0");

// 存在する日付かどうかチェック
const isValidDateParts = (year: string, month: string, day: string) => {
    const date = new Date(`${year}-${month}-${day}T00:00:00`);

    return (
        !Number.isNaN(date.getTime()) &&
        date.getFullYear() === Number(year) &&
        date.getMonth() + 1 === Number(month) &&
        date.getDate() === Number(day)
    );
};

// 保存用：文字列を保存用形式yyyy-mm-ddに変換
export const normalizeDateInput = (value: string) => {
    const normalizedValue = value.normalize("NFKC").replace(/\s+/g, "");

    let year = "";
    let month = "";
    let day = "";

    const separatedMatch = normalizedValue.match(
        /^(?:(\d{4})[/-])?(\d{1,2})[/-](\d{1,2})$/,
    );

    if (separatedMatch) {
        year = separatedMatch[1] ?? String(getCurrentYear());
        month = toTwoDigits(separatedMatch[2]);
        day = toTwoDigits(separatedMatch[3]);
    } else if (/^\d{8}$/.test(normalizedValue)) {
        year = normalizedValue.slice(0, 4);
        month = normalizedValue.slice(4, 6);
        day = normalizedValue.slice(6, 8);
    } else if (/^\d{6}$/.test(normalizedValue)) {
        year = `20${normalizedValue.slice(0, 2)}`;
        month = normalizedValue.slice(2, 4);
        day = normalizedValue.slice(4, 6);
    } else if (/^\d{4}$/.test(normalizedValue)) {
        year = String(getCurrentYear());
        month = normalizedValue.slice(0, 2);
        day = normalizedValue.slice(2, 4);
    } else {
        return null;
    }

    if (!isValidDateParts(year, month, day)) {
        return null;
    }

    return `${year}-${month}-${day}`;
};
// 表示用：yyyy-mm-ddをmm/ddに変換
export const formatDateForDisplay = (date: string) => {
    if (!date) return "";
    return date.slice(5).replace("-", "/");
};

// 編集用：yyyy-mm-ddをyyyymmddに変換
export const formatDateForEdit = (date: string) => {
    if (!date) return "";
    return date.replaceAll("-", "");
};

// 保存用：日付型をyyyy-mm-ddに変換
const fomatDateKey = (date: Date) => {
    return date.toISOString().slice(0, 10);
};

// 会社規定休日チェック
const isCompanyHoliday = (date: Date) => {
    return companyHolidays.includes(fomatDateKey(date));
};
// 営業日チェック
export const isBusinessDay = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const isJapaneseHoliday = holiday_jp.isHoliday(date);
    const isCompanyCloseDay = isCompanyHoliday(date);

    return !isWeekend && !isJapaneseHoliday && !isCompanyCloseDay;
};

const toDate = (date: string) => {
    if (!date) return null;
    const [year, month, day,] = date.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (Number.isNaN(parsedDate.getTime())) return null;
    return parsedDate;
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
    if (!replyDate) return -99999;
    const baseDate = deadline || dueDate;
    if (!baseDate) return -99999;

    const start = toDate(replyDate);
    const end = toDate(baseDate);
    console.log("start", start);
    console.log("end", end);


    if (start === null || end === null) return -99999;

    if (start.getTime() === end.getTime()) return -99999;
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
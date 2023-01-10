import dayjs from 'dayjs';

function formatDateHour(time: string) {
    const date = dayjs().format('YYYY-MM-DD ');
    const dateTimeFormat = new Date(`${date} ${time}`);

    return dayjs(dateTimeFormat);
}

function validateTime(time: string) {
    return dayjs(formatDateHour(time)).isValid();
}

function compareEndTimeIsAfter(startTime: string, endTime: string) {
    return formatDateHour(endTime).isAfter(formatDateHour(startTime));
}

function getDayOfWeek(date: string) {
    return dayjs(date).day();
}

function formatDate(date: Date, format: string) {
    return dayjs(date).format(format);
}

function dateToString(date: Date) {
    return dayjs(date).format('YYYY-MM-DD').toString();
}

function toDate(date: Date) {
    return dayjs(date).toDate();
}

export { 
    validateTime, 
    formatDateHour, 
    compareEndTimeIsAfter, 
    getDayOfWeek,
    formatDate,
    dateToString,
    toDate,
}

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

export { validateTime, formatDateHour, compareEndTimeIsAfter }

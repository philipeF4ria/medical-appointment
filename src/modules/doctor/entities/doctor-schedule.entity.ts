import { compareEndTimeIsAfter, validateTime } from '../../../utils/date';

import { CustomError } from '../../../errors/custom.error';
import { generateUUID } from '../../../utils/generateUUID';

type Schedules = {
    id?: string;
    startAt: string;
    endAt: string;
    dayOfWeek: number;
}

type DoctorScheduleProps = {
    doctorId: string;
    schedules: Schedules[];
}

class DoctorSchedule {
    readonly doctorId: string;
    readonly schedules: Schedules[];

    private constructor(props: DoctorScheduleProps) {
        if (!props.schedules) {
            throw new CustomError('Invalid schedules', 400);
        }
    
        validateDuplicateSchedule(props.schedules);
        validateTimes(props.schedules);

        this.doctorId = props.doctorId;
        this.schedules = createSchedules(props.schedules);
    }

    static create(props: DoctorScheduleProps) {
        const doctorSchedule = new DoctorSchedule(props);

        return doctorSchedule;
    }
}

function validateDuplicateSchedule(schedules: Schedules[]) {
    const hasUniqueValue = new Set(schedules.map(value => value.dayOfWeek));

    if (hasUniqueValue.size < schedules.length) {
        throw new CustomError('Duplicate day of week', 400);
    }
}

function validateTimes(schedules: Schedules[]) {
    schedules.forEach(schedule => {
        if (!validateTime(schedule.startAt)) {
            throw new CustomError('Invalid startAt')
        }

        if (!validateTime(schedule.endAt)) {
            throw new CustomError('Invalid endAt')
        }

        if (!compareEndTimeIsAfter(schedule.startAt, schedule.endAt)) {
            throw new CustomError('End time cannot be earlier than start time');
        }
    })
}

function createSchedules(schedules: Schedules[]) {
    return schedules.map(schedule => {
        return {
            ...schedule,
            id: generateUUID(),
        }
    })
}

export { DoctorSchedule }

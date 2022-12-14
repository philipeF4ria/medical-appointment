import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { Doctor, DoctorInfo, DoctorSchedule as DoctorSchedulePrisma } from '@prisma/client';
import { generateUUID } from '../../../utils/generateUUID';

type DoctorScheduleWeek = {
    startAt: string;
    endAt: string;
    dayOfWeek: number;
    doctorId: string;
    doctor: {
        doctorInfo: {
            duration: number,
        },
    };
}

class DoctorScheduleMapper {
    static entityToPrisma(data: DoctorSchedule): DoctorSchedulePrisma[] {
        const doctorSchedulePrisma: DoctorSchedulePrisma[] = [];

        data.schedules.forEach(schedule => {
            doctorSchedulePrisma.push({
                day_of_week: schedule.dayOfWeek,
                start_at: schedule.startAt,
                end_at: schedule.endAt,
                doctor_id: data.doctorId,
                id: schedule.id ?? generateUUID(),
            });
        });

        return doctorSchedulePrisma;
    }

    static prismaToEntity(
        data: DoctorSchedulePrisma & 
        { doctor: Doctor & { doctorInfo: DoctorInfo | null } }
    ): DoctorScheduleWeek {
        return {
            doctorId: data.doctor_id,
            startAt: data.start_at,
            endAt: data.end_at,
            dayOfWeek: data.day_of_week,
            doctor: {
                doctorInfo: {
                    duration: data.doctor.doctorInfo?.duration || 0,
                },
            },
        }
    }
}

export { DoctorScheduleWeek, DoctorScheduleMapper }

type CreateDoctorScheduleRequest = {
    startAt: string;
    endAt: string;
    dayOfWeek: number;
}

class CreateDoctorScheduleUseCase {
    async execute(data: CreateDoctorScheduleRequest) {
        
    }
}

export { CreateDoctorScheduleUseCase }

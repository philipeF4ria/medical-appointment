import { CustomError } from '../../../../errors/custom.error';
import { formatDate, getDayOfWeek } from '../../../../utils/date';

import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository';
import { IAppointmentRepository } from '../../repositories/appointment.repository';

type FreeScheduleRequest = {
  doctorId: string;
  date: string;
}

class FreeSchedulesUseCase {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
  ){}

  async execute(data: FreeScheduleRequest) {
    if (!data.doctorId) {
      throw new CustomError('Doctor is required', 400);
    }

    if (!data.date) {
      throw new CustomError('You need to select a date', 400);
    }

    const dayOfWeek = getDayOfWeek(data.date);

    const doctorSchedule = await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
      data.doctorId, 
      dayOfWeek
    );
    
    if (!doctorSchedule) {
      throw new CustomError('Doctor does not attend that day', 400);
    }

    // const formattedDate = formatDate(data.date, 'YYYY-MM-DD');

    const result = await this.appointmentRepository.findAllSchedulesByDoctorAndDate(
      data.doctorId, 
      data.date
    );

    return result;
  }
}

export { FreeSchedulesUseCase }

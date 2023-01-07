import { Request, Response } from 'express';

import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository';
import { IAppointmentRepository } from '../../repositories/appointment.repository';
import { FreeSchedulesUseCase } from './free-schedules.usecase';

class FreeSchedulesController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
  ){}

  async handle(request: Request, response: Response) {
    const data = request.body;
    
    const freeSchedulesUseCase = new FreeSchedulesUseCase(
      this.doctorScheduleRepository, 
      this.appointmentRepository
    );

    try {
      const result = await freeSchedulesUseCase.execute(data);

      return response.json(result);
      
    } catch(error: any) {
      return response.status(error.statusCode ?? 500).json({
        error: error.message,
      });
    }
  }
}

export { FreeSchedulesController }

import { Request, Response } from 'express';

import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository';
import { IDoctorRepository } from '../../../doctor/repositories/doctor.repository';
import { IPatientRepository } from '../../../patient/repositories/patient.repository';
import { IAppointmentRepository } from '../../repositories/appointment.repository';
import { IMailProvider } from '../../../../infra/providers/mail/mail.provider';

import { CreateAppointmentUseCase } from './create-appointment.usecase';

class CreateAppointmentController {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider,
  ){}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const userId = request.userId;

    try {
      const createAppointmentUseCase = new CreateAppointmentUseCase(
        this.patientRepository,
        this.doctorRepository,
        this.doctorScheduleRepository,
        this.appointmentRepository,
        this.mailProvider,
      );
  
      await createAppointmentUseCase.execute(data, userId);
  
      return response.sendStatus(201)
    } catch(error: any) {
      return response.status(error.statusCode || 400).json({
        error: error.message
      });
    }
  }
}

export { CreateAppointmentController }

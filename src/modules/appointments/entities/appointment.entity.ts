import { generateUUID } from '../../../utils/generateUUID';

type Props = {
  patientId: string;
  doctorId: string;
  date: Date;
}

class Appointment {
  readonly id: string;
  readonly patientId: string;
  readonly doctorId: string;
  readonly date: Date;
  readonly note?: string;
  readonly isFinished?: boolean;

  private constructor(props: Props){
    this.id = generateUUID();
    this.patientId = props.patientId;
    this.doctorId = props.doctorId;
    this.date = props.date;
  }

  static create(data: Props) {
    const appointment = new Appointment(data);

    return appointment;
  }
}

export { Appointment }

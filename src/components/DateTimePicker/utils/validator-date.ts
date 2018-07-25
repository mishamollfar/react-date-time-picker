export class ValidatorDate {
  public selectedHour = 0;
  public selectedDate = '';

  constructor(selectedDate: string, selectedHour: number) {
    this.selectedDate = selectedDate;
    this.selectedHour = selectedHour;
  }
  get dateNow(): Date {
    return new Date();
  }

  get verifyEqualDate() {
    return new Date(this.selectedDate).getDate() === this.dateNow.getDate();
  }

  get verifyEqualHours() {
    return new Date(this.selectedDate).getMonth() === this.dateNow.getMonth();
  }

  get verifyEqualYear() {
    return new Date(this.selectedDate).getFullYear() === this.dateNow.getFullYear();
  }

  public disableTime(times: { time: number; period: string }) {
    const notNowDate = this.verifyEqualDate && this.verifyEqualHours && this.verifyEqualYear;

    if (times.period === 'hour') {
      return notNowDate && times.time < this.dateNow.getHours();
    } else {
      return notNowDate && this.selectedHour === this.dateNow.getHours() && times.time < this.dateNow.getMinutes();
    }
  }
}

export class CalendarModel {
  #currentDate

  constructor() {
    this.todaysDate = new Date()
    this.currentDate = this.todaysDate.getDate()
  }

  getCurrentMonth() {
    return { month: this.todaysDate.getMonth(), year: this.todaysDate.getFullYear() }
  }

  getDaysInMonth() {
    const { month, year } = this.getCurrentMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  getColorForDay(date) {
    import { getColorForDate } from "visual-schedule"
    return getColorForDate(date)
  }

}
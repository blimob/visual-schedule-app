import { getColorForDate } from '../node_modules/visual-schedule/src/weekdayColors.js'

export class CalendarModel {
  #currentDate

  constructor() {
    this.#currentDate = new Date()
  }

  getCurrentMonth() {
    return { 
      month: this.#currentDate.getMonth(), 
      year: this.#currentDate.getFullYear() 
    }
  }

  getDaysInMonth() {
    
  }

  getColorForDay(date) {
    return getColorForDate(date)
  }

  getToNextMonth() {
    const month = this.#currentDate.getMonth()
  }

  getToPreviousMonth() {
    const month = this.#currentDate.getMonth()
  }

  getMonthsName(month) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[month]
  }

}
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
    const { month, year } = this.getCurrentMonth()
    const getDaysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let day = 1; day <= getDaysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    return days
    
  }

  getColorForDay(date) {
    return getColorForDate(date)
  }

  getToNextMonth() {
    this.#currentDate.setMonth(this.#currentDate.getMonth() + 1)
  }

  getToPreviousMonth() {
    this.#currentDate.setMonth(this.#currentDate.getMonth() - 1)
  }

  getMonthsName(month = this.#currentDate.getMonth()) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[month]
  }
}
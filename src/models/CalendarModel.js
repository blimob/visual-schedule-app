import { getColorForDate } from '../../lib/visual-schedule/src/WeekdayColors.js'

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
    const numberOfDays= new Date(year, month + 1, 0).getDate()
    const days = []
    for (let day = 1; day <= numberOfDays; day++) {
      days.push(new Date(year, month, day))
    }
    return days
    
  }

  getColorForDay(date) {
    return getColorForDate(date)
  }

  goToNextMonth() {
    this.#currentDate.setMonth(this.#currentDate.getMonth() + 1)
  }

  goToPreviousMonth() {
    this.#currentDate.setMonth(this.#currentDate.getMonth() - 1)
  }

  getMonthName(month = this.#currentDate.getMonth()) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[month]
  }
}
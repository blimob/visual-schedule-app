export class CalendarController {
  #scheduleManager
  #calendarModel
  #monthView

  constructor(scheduleManager, calendarModel, monthView) {
    this.#scheduleManager = scheduleManager
    this.#calendarModel = calendarModel
    this.#monthView = monthView
  }

  initialize() {
    this.#setupEventListeners()
    this.showMonthView()
  }

  showMonthView() {
    const { month, year } = this.#calendarModel.getCurrentMonth()
    const monthName = this.#calendarModel.getMonthName()
    const days = this.#calendarModel.getDaysInMonth()
    
    const daysData = days.map(date => ({
      date: date,
      color: this.#calendarModel.getColorForDay(date),
      activities: this.#scheduleManager.getActivitiesForDate(date)
    }))
    
    const monthData = {
      month: monthName,
      year: year,
      firstDayOfWeek: this.#getFirstDayOfWeekMonday(days[0]),
      days: daysData
    }
    
    this.#monthView.render(monthData)
  }

  #getFirstDayOfWeekMonday(date) {  // ← Privat METOD (med parenteser)
    let day = date.getDay()
    return day === 0 ? 6 : day - 1
  }

  #setupEventListeners() {
    const nextBtn = document.getElementById('next-month')
    const prevBtn = document.getElementById('prev-month')
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNextMonth())
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.handlePreviousMonth())
    }
  }

  handleNextMonth() {
    this.#calendarModel.goToNextMonth()
    this.showMonthView()
  }

  handlePreviousMonth() {
    this.#calendarModel.goToPreviousMonth()
    this.showMonthView()
  }
}
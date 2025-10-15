import { ActivityFormView } from '../Views/ActivityFormView.js'

export class CalendarController {
  #scheduleManager
  #calendarModel
  #monthView
  #activityFormView

  constructor(scheduleManager, calendarModel, monthView) {
    this.#scheduleManager = scheduleManager
    this.#calendarModel = calendarModel
    this.#monthView = monthView
    this.#activityFormView = new ActivityFormView()
  }

  initialize() {
    this.#setupEventListeners()
    this.#setupActivityForm()
    this.showMonthView()
  }

  #setupActivityForm() {
    this.#activityFormView.onSubmit((formData) => {
      this.#scheduleManager.addActivityToDate(
        formData.date,
        formData.name,
        formData.startTime,
        formData.endTime,
        formData.icon
      )
      this.showMonthView() 
      
    })
  }

  showMonthView() {
    const { month, year } = this.#calendarModel.getCurrentMonth()
    const monthName = this.#calendarModel.getMonthName()
    const days = this.#calendarModel.getDaysInMonth()
    
    // Uppdatera titel (mellan knapparna)
    const titleElement = document.getElementById('current-month-title')
    if (titleElement) {
      titleElement.textContent = `${monthName} ${year}`
    }
    
    // Bygg data för varje dag
    const daysData = days.map(date => ({
      date: date,
      color: this.#calendarModel.getColorForDay(date),
      activities: this.#scheduleManager.getActivitiesForDate(date)
    }))
    
    // Skapa monthData
    const monthData = {
      month: monthName,
      year: year,
      firstDayOfWeek: this.#getFirstDayOfWeekMonday(days[0]),
      days: daysData
    }
    
    // Rendera kalendern
    this.#monthView.render(monthData)
  }

  #getFirstDayOfWeekMonday(date) {
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
    
    const calendarContainer = document.getElementById('calendar-container')
    calendarContainer.addEventListener('dayclick', (e) => {
      this.#activityFormView.show(e.detail.date)
    })
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
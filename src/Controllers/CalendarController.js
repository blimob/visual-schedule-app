export class CalendarController {
  #scheduleManager
  #calendarModel
  #monthView
  #activityController  // ← Delegerar till denna

  constructor(scheduleManager, calendarModel, monthView) {
    this.#scheduleManager = scheduleManager
    this.#calendarModel = calendarModel
    this.#monthView = monthView
    this.#activityController = new ActivityController(scheduleManager, this)
  }

  initialize() {
    this.#setupEventListeners()
    this.showMonthView()
  }

  #setupEventListeners() {
    // Bara navigering
    const nextBtn = document.getElementById('next-month')
    const prevBtn = document.getElementById('prev-month')
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNextMonth())
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.handlePreviousMonth())
    }
    
    // Delegera aktivitets-events
    const calendarContainer = document.getElementById('calendar-container')
    
    calendarContainer.addEventListener('dayclick', (e) => {
      this.#activityController.handleDayClick(e.detail.date)
    })
    
    calendarContainer.addEventListener('deleteactivity', (e) => {
      this.#activityController.handleDelete(e.detail.activity, e.detail.date)
    })
  }

  showMonthView() {
    // Samma som tidigare
  }

  handleNextMonth() {
    this.#calendarModel.goToNextMonth()
    this.showMonthView()
  }

  handlePreviousMonth() {
    this.#calendarModel.goToPreviousMonth()
    this.showMonthView()
  }

  // Public method för ActivityController att anropa
  refreshView() {
    this.showMonthView()
  }
}
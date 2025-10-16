import { ActivityFormView } from '../Views/ActivityFormView.js'

export class ActivityController {
  #scheduleManager
  #calendarController
  #activityFormView

  constructor(scheduleManager, calendarController) {
    this.#scheduleManager = scheduleManager
    this.#calendarController = calendarController
    this.#activityFormView = new ActivityFormView()
    this.#setupFormListeners()
  }

  #setupFormListeners() {
    this.#activityFormView.onSubmit((formData) => {
      this.#handleAddActivity(formData)
    })
  }

  #handleAddActivity(formData) {
    if (formData.repeat) {
      // Lägg till på alla dagar med samma veckodag i aktuell månad
      this.#addRepeatingActivity(formData)
    } else {
      // Lägg bara till på vald dag
      this.#scheduleManager.addActivityToDate(
        formData.date,
        formData.name,
        formData.startTime,
        formData.endTime,
        formData.icon
      )
    }
    
    this.#calendarController.refreshView()
  }

  #addRepeatingActivity(formData) {
    const targetWeekday = formData.date.getDay()
    const currentMonth = formData.date.getMonth()
    const currentYear = formData.date.getFullYear()
    
    // Hitta antal dagar i månaden
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    
    // Lägg till aktivitet på alla dagar med samma veckodag
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      
      if (date.getDay() === targetWeekday) {
        this.#scheduleManager.addActivityToDate(
          date,
          formData.name,
          formData.startTime,
          formData.endTime,
          formData.icon
        )
      }
    }
  }

  handleDayClick(date) {
    this.#activityFormView.show(date)
  }

  handleDelete(activity) {
    const confirmed = confirm(`Delete activity "${activity.name}"?`)
    
    if (confirmed) {
      this.#scheduleManager.removeActivity(activity)
      this.#calendarController.refreshView()
    }
  }
}
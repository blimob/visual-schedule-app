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
    this.#scheduleManager.addActivityToDate(
      formData.date,
      formData.name,
      formData.startTime,
      formData.endTime,
      formData.icon
    )
    this.#calendarController.refreshView()
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
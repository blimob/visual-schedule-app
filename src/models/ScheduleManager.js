import { Child } from '/node_modules/visual-schedule/src/Child.js'
import { Activity } from '/node_modules/visual-schedule/src/Activity.js'
import { DaySchedule } from '/node_modules/visual-schedule/src/DaySchedule.js'

export class ScheduleManager {
  #currentChild
  #daySchedules

  constructor() {
    this.#currentChild = new Child('Leon', 3)
    this.#daySchedules = new Map()

  }
  createChild(name, age) {
    this.#currentChild = new Child(name, age)
    return this.#currentChild
  }

  getCurrentChild() {
    return this.#currentChild
  }

  newActivity(name, startTime, endTime, icon) {
    const activity = new Activity(name, startTime, endTime, icon)
    if (icon) {
      activity.setIcon(icon)
    }
    return activity
  }

  addActivityToDate(date, name, startTime, endTime, icon) {
    const activity = this.newActivity(name, startTime, endTime, icon)

    this.#currentChild.addActivity(activity)

    const dateKey = date.toISOString().split('T')[0]
    if (!this.#daySchedules.has(dateKey)) {
      const daySchedule = new DaySchedule(date)
      daySchedule.addChild(this.#currentChild)
      this.#daySchedules.set(dateKey, daySchedule)
    }
    return activity
  }

  getActivitiesForDate(date) {
    return this.#currentChild.getActivitiesSorted()
  }

  getActivitiesForMonth(year, month) {
    return this.#currentChild.getActivitiesSorted()
  }

  removeActivity(activity) {
    return this.#currentChild.removeActivity(activity)
  }
}
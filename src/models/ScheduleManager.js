import { Child } from '/node_modules/visual-schedule/src/Child.js'
import { Activity } from '/node_modules/visual-schedule/src/Activity.js'

export class ScheduleManager {
  #currentChild
  #activitiesByDate

  constructor() {
    this.#currentChild = new Child('Leon', 3)
    this.#activitiesByDate = new Map()
  }

  addActivityToDate(date, name, startTime, endTime, icon) {
    const activity = this.newActivity(name, startTime, endTime, icon)
    
    const dateKey = this.#getDateKey(date)
    
    if (!this.#activitiesByDate.has(dateKey)) {
      this.#activitiesByDate.set(dateKey, [])
    }
    
    this.#activitiesByDate.get(dateKey).push(activity)
    
    return activity
  }

  getActivitiesForDate(date) {
    const dateKey = this.#getDateKey(date)
    return this.#activitiesByDate.get(dateKey) || []
  }

  getActivitiesForMonth(year, month) {
    const allActivities = []
    
    for (let [dateKey, activities] of this.#activitiesByDate) {
      const date = new Date(dateKey)
      if (date.getFullYear() === year && date.getMonth() === month) {
        allActivities.push(...activities)
      }
    }
    
    return allActivities
  }

  removeActivity(activity) {
    for (let [dateKey, activities] of this.#activitiesByDate) {
      const index = activities.indexOf(activity)
      if (index > -1) {
        activities.splice(index, 1)
        return true
      }
    }
    return false
  }

  #getDateKey(date) {
    return date.toISOString().split('T')[0]
  }

  createChild(name, age) {
    this.#currentChild = new Child(name, age)
    return this.#currentChild
  }

  getCurrentChild() {
    return this.#currentChild
  }

  newActivity(name, startTime, endTime, icon) {
    const activity = new Activity(name, startTime, endTime)
    if (icon) {
      activity.setIcon(icon)
    }
    return activity
  }
}
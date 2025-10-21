import { Child } from '../../lib/visual-schedule/src/Child.js'
import { Activity } from '../../lib/visual-schedule/src/Activity.js'
import { StorageService } from '../services/StorageService.js'

export class ScheduleManager {
  #currentChild
  #activitiesByDate
  #storageService

  constructor() {
    this.#currentChild = new Child('Leon', 3)
    this.#activitiesByDate = new Map()
    this.#storageService = new StorageService('visual-schedule-activities')
    this.#loadActivities()
  }

  addActivityToDate(date, name, startTime, endTime, icon) {
    const activity = this.newActivity(name, startTime, endTime, icon)
    
    const dateKey = this.#getDateKey(date)
    
    if (!this.#activitiesByDate.has(dateKey)) {
      this.#activitiesByDate.set(dateKey, [])
    }
    
    this.#activitiesByDate.get(dateKey).push(activity)
    this.#saveActivities()
    
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
      const index = activities.findIndex(a => 
        a.name === activity.name && 
        a.startTime === activity.startTime &&
        a.endTime === activity.endTime
      )
      
      if (index > -1) {
        activities.splice(index, 1)
        this.#saveActivities()
        return true
      }
    }
    return false
  }

  clearAllData() {
    this.#activitiesByDate.clear()
    this.#storageService.clear()
  }

  #saveActivities() {
    const data = this.#serializeActivities()
    this.#storageService.save(data)
  }

  #loadActivities() {
    const data = this.#storageService.load()
    
    if (data) {
      this.#deserializeActivities(data)
    }
  }

  #serializeActivities() {
    const data = {}
    
    for (let [dateKey, activities] of this.#activitiesByDate) {
      data[dateKey] = activities.map(activity => ({
        name: activity.name,
        startTime: activity.startTime,
        endTime: activity.endTime,
        icon: activity.visual?.icon || ''
      }))
    }
    
    return data
  }

  #deserializeActivities(data) {
    for (let [dateKey, activities] of Object.entries(data)) {
      const activitiesArray = activities.map(actData => {
        return this.newActivity(
          actData.name,
          actData.startTime,
          actData.endTime,
          actData.icon
        )
      })
      
      this.#activitiesByDate.set(dateKey, activitiesArray)
    }
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
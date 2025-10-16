import { Child } from '/node_modules/visual-schedule/src/Child.js'
import { Activity } from '/node_modules/visual-schedule/src/Activity.js'

export class ScheduleManager {
  #currentChild
  #activitiesByDate
  #storageKey = 'visual-schedule-activities'

  constructor() {
    this.#currentChild = new Child('Leon', 3)
    this.#activitiesByDate = new Map()
    this.#loadFromStorage()
  }

  addActivityToDate(date, name, startTime, endTime, icon) {
    const activity = this.newActivity(name, startTime, endTime, icon)
    
    const dateKey = this.#getDateKey(date)
    
    if (!this.#activitiesByDate.has(dateKey)) {
      this.#activitiesByDate.set(dateKey, [])
    }
    
    this.#activitiesByDate.get(dateKey).push(activity)
    this.#saveToStorage()
    
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
        this.#saveToStorage()
        return true
      }
    }
    return false
  }

  #saveToStorage() {
    try {
      // Konvertera Map till JSON-vänlig struktur
      const data = {}
      
      for (let [dateKey, activities] of this.#activitiesByDate) {
        data[dateKey] = activities.map(activity => ({
          name: activity.name,
          startTime: activity.startTime,
          endTime: activity.endTime,
          icon: activity.visual?.icon || ''
        }))
      }
      
      localStorage.setItem(this.#storageKey, JSON.stringify(data))
      console.log('✅ Data saved to localStorage')
    } catch (error) {
      console.error('❌ Failed to save to localStorage:', error)
    }
  }

  #loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.#storageKey)
      
      if (!stored) {
        console.log('ℹ️ No stored data found')
        return
      }
      
      const data = JSON.parse(stored)
      
      // Återskapa aktiviteter
      for (let [dateKey, activities] of Object.entries(data)) {
        const activitiesArray = activities.map(actData => {
          const activity = this.newActivity(
            actData.name,
            actData.startTime,
            actData.endTime,
            actData.icon
          )
          return activity
        })
        
        this.#activitiesByDate.set(dateKey, activitiesArray)
      }
      
      console.log('✅ Data loaded from localStorage')
    } catch (error) {
      console.error('❌ Failed to load from localStorage:', error)
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

  clearAllData() {
    this.#activitiesByDate.clear()
    localStorage.removeItem(this.#storageKey)
    console.log('🗑️ All data cleared')
  }
}
import { ScheduleManager } from '../src/models/ScheduleManager.js'

describe('ScheduleManager', () => {
  let scheduleManager

  beforeEach(() => {
    scheduleManager = new ScheduleManager()
  })

  test('should create a new child', () => {
    const child = scheduleManager.createChild('Alice', 5)
    expect(child).toBeTruthy()
    expect(child.name).toBe('Alice')
    expect(child.age).toBe(5)
  })

  test('should get the current child', () => {
    const currentChild = scheduleManager.getCurrentChild()
    expect(currentChild).toBeTruthy()
    expect(currentChild.name).toBe('Leon') // Default child
  })

  test('should add activity to a specific date', () => {
    const date = new Date(2024, 5, 15) // 15th June 2024
    const activity = scheduleManager.addActivityToDate(date, 'Drawing', '10:00', '11:00', '🎨')

    expect(activity).toBeTruthy()
    expect(activity.name).toBe('Drawing')
    expect(activity.startTime).toBe('10:00')
    expect(activity.endTime).toBe('11:00')
    expect(activity.visual.icon).toBe('🎨')  // ← Fixat
  })

  test('should retrieve activities for a specific date', () => {
    const date = new Date(2024, 5, 15)
    scheduleManager.addActivityToDate(date, 'Drawing', '10:00', '11:00', '🎨')
    scheduleManager.addActivityToDate(date, 'Singing', '11:30', '12:00', '🎤')

    const activities = scheduleManager.getActivitiesForDate(date)
    expect(activities.length).toBe(2)
    expect(activities[0].name).toBe('Drawing')   // Sorterat efter tid
    expect(activities[1].name).toBe('Singing')
  })
})
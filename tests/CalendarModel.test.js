import { CalendarModel } from '../src/models/CalendarModel.js'

describe('CalendarModel', () => {
  let calendarModel

  beforeEach(() => {
    calendarModel = new CalendarModel()
  })

  test('should create with current date', () => {
    const { month, year } = calendarModel.getCurrentMonth()
    expect(typeof month).toBe('number')
    expect(typeof year).toBe('number')
  })

  test('should get correct month name', () => {
    const monthName = calendarModel.getMonthName()
    expect(monthName).toBeTruthy()
    expect(typeof monthName).toBe('string')
  })

  test('should get all days in current month', () => {
    const days = calendarModel.getDaysInMonth()
    expect(Array.isArray(days)).toBe(true)
    expect(days.length).toBeGreaterThan(27)  // Minst 28 dagar
    expect(days.length).toBeLessThan(32)     // Max 31 dagar
  })

  test('should get color for a specific day', () => {
    const days = calendarModel.getDaysInMonth()
    const firstDay = days[0]
    const color = calendarModel.getColorForDay(firstDay)
    
    expect(color).toBeTruthy()
    expect(color).toMatch(/^#[0-9A-F]{6}$/i)  // Hex färgkod
  })

  test('should navigate to next month', () => {
    const beforeMonth = calendarModel.getCurrentMonth().month
    calendarModel.goToNextMonth()
    const afterMonth = calendarModel.getCurrentMonth().month
    
    expect(afterMonth).not.toBe(beforeMonth)
  })

  test('should navigate to previous month', () => {
    const beforeMonth = calendarModel.getCurrentMonth().month
    calendarModel.goToPreviousMonth()
    const afterMonth = calendarModel.getCurrentMonth().month
    
    expect(afterMonth).not.toBe(beforeMonth)
  })
})
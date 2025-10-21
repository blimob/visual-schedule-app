# Reflection: Clean Code Analysis

* **Author:** Blinera Moberg
* **Course:** 1DV610
* **Date:** October 2025
* **Project:** Visual schedule app

---

## Introduction

This reflection examines how the author’s principles from Clean Code (Chapters 2–11) have influenced the development of my Visual Schedule application. Each chapter is critically evaluated with concrete examples drawn from my codebase, as will become evident throughout the analysis.

---

## Chapter 2: Meaningful names

Throughout this development process, I have consistently followed Chapter 2's principle of meaningful names. I avoided abbreviations in my class names, choosing descriptive nouns like `ScheduleManager`, `CalendarController`, and `StorageService` that clearly reveal their intent. My method names use verbs that describe actions, such as `addActivityToDate()` and `getActivitiesForDate()`, making their purpose immediately clear. Variables like `dateKey` and `activitiesByDate` are both searchable and pronounceable, facilitating team communication and code navigation. 

**Example from ScheduleManager.js**
```Javascript
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
```

---

## Chapter 3: Functions

My functions follow the "do one thing" principle effectively. Methods like handleNextMonth() and `handlePreviousMonth()` are small, focused, and at the same level of abstraction. I maintained low parameter counts (1-3 parameters) and used descriptive names that reveal intent. The refactored MonthView class demonstrates this excellently - the original `#renderDays()` was over 60 lines handling multiple responsibilities, but was broken down into focused methods like `#createDayCell()`, `#createActivityItem()`, and `#createDeleteButton()`, each doing one thing well. Helper methods like `#dispatchCustomEvent()` eliminate code duplication following the DRY principle.

**Example form CalendarController.js**
```Javascript
#createActivityItem(activity, date) {
  const item = document.createElement('li')
  item.className = 'activity-item'

  const icon = activity.visual?.icon || ''
  const text = document.createElement('span')
  text.textContent = `${icon} ${activity.name}`
  item.appendChild(text)

  const deleteBtn = this.#createDeleteButton(activity, date)
  item.appendChild(deleteBtn)

  return item
}

#dispatchCustomEvent(name, detail) {
  const event = new CustomEvent(name, { detail, bubbles: true })
  this.#container.dispatchEvent(event)
}
```

---

## Chapter 4: Comments

I have followed the principle that "code should be self-documenting" by using meaningful names and small functions that eliminate the need for most comments. Method names like `#createDeleteButton()`, `#addActivities()`and `getActivitiesForDate()`are descriptive enough that they explain their purpose without additionaal documentation. Where coomments did exist att de begining they were initially in Swedish which violated consistency standards and have then been translated to English. Good comments explain why rather than what in Clean Code. My code achieves this to a certain degree through clean naming. 

Example
```javascript
#createActivityItem(activity) {
  const activityItem = document.createElement('li')
  activityItem.className = 'activity-item'
  
  const activityText = this.#createActivityText(activity)
  const deleteBtn = this.#createDeleteButton(activity)
  
  activityItem.appendChild(activityText)
  activityItem.appendChild(deleteBtn)
  
  return activityItem
}
````

---

## Chapter 5: Formatting

I maintained consistent formatting with proper indentation (2 spaces), vertical spacing between methods, and logical grouping of related concepts. Classes are organized with fields first, constructor second, public methods, then private methods - following the "newspaper metaphor". My files are reasonably sized (under 150 lines), making them easy to comprehend. The refactored MonthView.js uses section comments (`// HEADER`, `// DAYS`, `// ACTIVITIES`) to group related methods, which improves navigation. One remaining improvement area: some inline styles `(cell.style.backgroundColor)` should be moved to CSS for complete separation of concerns.


Example
```javascript
export class MonthView {
  #container

  constructor(container) {
    this.#container = container
  }

  render(monthData) {
    this.#container.innerHTML = ''
    this.#renderWeekdayHeaders()
    this.#renderDays(monthData)
  }

  // HEADER
  #renderWeekdayHeaders() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const row = document.createElement('div')
    row.className = 'weekdays-row'

    weekdays.forEach(day => row.appendChild(this.#createWeekdayHeader(day)))
    this.#container.appendChild(row)
  }
}
```

---

## Chapter 6: Objects and Data Structures

I used JavaScript’s private fields (#) to hide all internal state and expose behavior only through public methods. This follows the Law of Demeter, as classes like StorageService and ScheduleManager conceal their internal structure behind clean interfaces. My classes act as true objects with behavior, not just data containers with getters and setters. For example, ScheduleManager employs a `Map` for `#activitiesByDate`, showing careful choice of data structures. StorageService abstracts localStorage through methods like `save()`, `load()`, and `clear()`, making it easy to swap storage mechanisms. Overall, this approach emphasizes encapsulation, abstraction, and well-designed object behavior.

Example
```Javascript
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

  getActivitiesForDate(date) {
    const dateKey = this.#getDateKey(date)
    return this.#activitiesByDate.get(dateKey) || []
  }
}
```

## Chapter 7: Error handling

My error handling in StorageService is robust, using try-catch blocks and returning meaningful boolean or null values for expected failures instead of throwing exceptions. Error messages are centralized in `constants/messages.js` following the DRY principle, ensuring consistency throughout the application. Returning `null` from `StorageService.load()` when no data exists is intentional and semantically appropriate. While `ActivityFormView` currently uses basic `alert()` for validation errors, this is not ideal for production. The system gracefully handles corrupt localStorage data by clearing it and logging warnings, ensuring stability and resilience.

Example
```Javascript
load() {
  try {
    const stored = localStorage.getItem(this.#storageKey)
    
    if (!stored) {
      console.log(STORAGE_MESSAGES.NO_DATA_FOUND)
      return null
    }
    
    const data = JSON.parse(stored)
    console.log(STORAGE_MESSAGES.LOAD_SUCCESS)
    return data
  } catch (error) {
    console.error(`${STORAGE_MESSAGES.LOAD_FAILED}: ${error.message}`)
    console.warn(STORAGE_MESSAGES.CORRUPT_DATA)
    this.clear()
    return null
  }
}
```
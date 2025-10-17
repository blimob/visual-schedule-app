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

My functions follow the "do one thing" principle effectively. Methods like `handleNextMonth()` and `handlePreviousMonth()` are small, focused, and at the same level of abstraction. I maintained low parameter counts (1-3 parameters) and used descriptive names that reveal intent. Private methods (using #) help organize code and maintain single levels of abstraction. However, some methods could be improved - `showMonthView()` performs multiple tasks at different abstraction levels (data transformation, DOM manipulation, and rendering coordination), violating the single responsibility principle at the function level. According to Clean Code, this method should be split into smaller functions like `#updateTitle()` and `#buildMonthData()` to maintain consistent abstraction levels.

**Example form CalendarController.js**
```Javascript
handleNextMonth() {
  this.#calendarModel.goToNextMonth()
  this.showMonthView()
}

handlePreviousMonth() {
  this.#calendarModel.goToPreviousMonth()
  this.showMonthView()
}

refreshView() {
  this.showMonthView()
}
```

---

## Chapter 4: Comments

I have followed the principle that "code should be self-documenting" by using meaningful names and small functions that eliminate the need for most comments. Method names like `#createDeleteButton()`, `#addActivities()`and `getActivitiesForDate()`are descriptive enough that they explain their purpose without additionaal documentation.

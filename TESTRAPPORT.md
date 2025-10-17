# Test report - Visual Schedule App

* **Date:** October 16, 2025
* **Tester:** [Blinera Moberg]
* **Version:** 1.0.0

---

## Test environment
* **Browser:** Chrome/Safari
* **OS:** macOS
* **Screen size:** Desktop, tablet and mobile

---

## Test cases

### 1. Calendar display
| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-01 | Display current month | 1. Open app | Calendar shows current month with correct color coding | ✅ |
| TC-02 | Weekdays display | 1. Check weekday headers | Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday display in correct order | ✅ |
|TC-03 | First day placement | 1. Check day 1 | Day 1 is in correct weekday column | ✅ |
| TC-04 | Color coding | 1. Check day colors | Each weekday has unique color | ✅ |

---

### 2. Navigation

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-05 | Next month | 1. Click "Next →" | Calendar shows next month | ✅ |
| TC-06 | Previous month | 1. Click "← Previous" | Calendar shows previous month | ✅ |
| TC-07 | Month title updates | 1. Change month | Title shows correct month and year | ✅ |
| TC-08 | Year transition forward | 1. Go from Dec → Jan | Year increased by 1 | ✅ |
| TC-09 | Year transition backward | 1. Go from Jan → Dec | Year decreases by 1 | ✅ |

---

### 3. Add activity

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-10 | Open form | 1. Click on a day | Model open with empty form | ✅ |
| TC-11 | Emoji picker visible | 1. Open form | Emoji picker is visible and clickable | ✅ |
| TC-12 | Select emoji | 1. Click on emoji | Selected emoji appears in display field | ✅ |
| TC-13 | Save activity | 1. Fill name, times, emoji< br> 2. click "Save" |  Activity appears in selected day | ✅ |
| TC-14 | Save full day activity | 1. Fill name, 2. click "All day event" 3. "Save" | Activity appears in selected day | ✅ |
| TC-15 | Repeat weekly activity | 1. Fill name, time 2. click "Repeat weekly" | Activity appears in selected days | ✅ |
| TC-16 | Modal closes | 1. Save activity | Modal closes automatically | ✅ |
| TC- 17 | Cancel | 1. Open form< br> 2. Click "Cancel" | Modal closes without saving | ✅ |
| TC-18 | Closes with X | 1. Open form< br> 2. Click "x" | Modal closes without saving | ✅ |
| TC-19 | Multiple activities same day | 1. Add 2+ activitites on same day | All activities display in the day | ✅ |

---

### 4. Delete activity

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-20 | Delete button visible | 1. Check activity | Red "x" button visible next to activity | ✅ |
| TC-21 | Delete activity | 1. Click "x" 2. Confirm | Activity disappears from day | ✅ |
| TC-22 | Cancel deletion | 1. Click "x" 2. Cancel | Activity remains | ✅ |

---

### 5. LocalStorage / Persistence

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-23 | Save data | 1. Add activity 2. Check Console | "✅ Data saved" appears | ✅ |
| TC-24 | Load data | 1. Reload page | Activities persist | ✅ |
| TC-25 | Data after navigation | 1. Add activity 2. Change month 3. Go back | Activity persists | ✅ |
| TC-26 | Multiple activities persist | 1. Add 3+ activities 2. Reload | All activities persists | ✅ |

---

### 6. Responsiveness

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-27 | Desktop | 1. Open in large window | Calendar looks good, all readable | ✅ |
| TC-28 | Tablet | 1. Resize window | Calendar adapts, text readable | ✅ |
| TC-29 | No emoji selected | 1. Add activity without emoji | Activity saves anyway | ✅ |

---

### 7. Edge cases

| Test ID | Test case | Steps | Expected result | Status |
|---------|-----------|-------|-----------------|--------|
| TC-30 | Empty activity | 1. Open form 2. Save without filling | Form validates, Shows error message | ✅ |
| TC-31 | Long activity name | 1. Type 50+ characters | Text wraps/ellipsis, stays within cell | ✅ |
| TC-32 | No emoji selected | 1. Add activity without emoji | Activity saves anyway (without icon) | ✅ |

---

## Summary

* **Total test cases:** 32
* **Passed (✅):** 32
* **Failed (❌):** 0
* **Not tested (⬜):** 0

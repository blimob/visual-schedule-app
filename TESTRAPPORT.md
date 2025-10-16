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

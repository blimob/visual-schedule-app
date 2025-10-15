export class ActivityFormView {
  #modal
  #form
  #onSubmitCallback

  constructor() {
    this.#modal = document.getElementById('activity-modal')
    this.#form = document.getElementById('activity-form')
    this.#setupEventListeners()
  }

  show(date) {
    this.#form.dataset.date = date.toISOString()
    
    this.#modal.classList.remove('hidden')
  }

  hide() {
    this.#modal.classList.add('hidden')
    this.#form.reset()

    const emojiDisplay = document.getElementById('selected-emoji-display')
    emojiDisplay.textContent = ''
  }

  onSubmit(callback) {
    this.#onSubmitCallback = callback
  }

  #setupEventListeners() {
    const emojiPicker = this.#modal.querySelector('emoji-picker')
    const iconInput = document.getElementById('activity-icon')
    const emojiDisplay = document.getElementById('selected-emoji-display')
    
    emojiPicker.addEventListener('emoji-click', (event) => {
      const emoji = event.detail.unicode
      iconInput.value = emoji
      emojiDisplay.textContent = emoji
    })
    
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const formData = {
        date: new Date(this.#form.dataset.date),
        name: document.getElementById('activity-name').value,
        startTime: document.getElementById('activity-start').value,
        endTime: document.getElementById('activity-end').value,
        icon: document.getElementById('activity-icon').value
      }
      
      if (this.#onSubmitCallback) {
        this.#onSubmitCallback(formData)
      }
      
      this.hide()
    })
    
    const cancelBtn = this.#modal.querySelector('.btn-cancel')
    cancelBtn.addEventListener('click', () => {
      this.hide()
    })
    
    const closeBtn = this.#modal.querySelector('.close-btn')
    closeBtn.addEventListener('click', () => {
      this.hide()
    })
    
    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) {
        this.hide()
      }
    })
  }
}
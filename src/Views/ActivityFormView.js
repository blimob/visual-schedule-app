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
  }

  onSubmit(callback) {
    this.#onSubmitCallback = callback
  }

  #setupEventListeners() {

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

    const cancelButton = this.#modal.querySelector('.btn-cancel')
    cancelButton.addEventListener('click', () => {
      this.hide()
    })

    const closeBotton = this.#modal.querySelector('.close-btn')
    closeBotton.addEventListener('click', () => {
      this.hide()
    })

    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) {
        this.hide()
      }
    })
  }
}
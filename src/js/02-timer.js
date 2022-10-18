import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  selectDate: document.querySelector('input#datetime-picker'),
};

let selectedDate = null;
refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert('Please choose a date in the future');
      return;
    }
    selectedDate = selectedDates[0];
    refs.startBtn.removeAttribute('disabled');
  },
};

const timer = {
  intervalId: null,
  startTimer() {
    refs.startBtn.setAttribute('disabled', '');
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const timeComponents = convertMs(deltaTime);
      this.updateCurrentValues(timeComponents);
      if (deltaTime < 1000) {
        this.stopTimer();
      }
    }, 1000);
  },
  updateCurrentValues({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  },
  stopTimer() {
    clearInterval(this.intervalId);
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', timer.startTimer.bind(timer));

flatpickr(refs.selectDate, options);

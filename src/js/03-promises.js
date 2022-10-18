import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onInput);
let delay = null;
let amount = null;
let step = null;

function onInput(event) {
  delay = Number(refs.delay.value);
  amount = Number(refs.amount.value);
  step = Number(refs.step.value);
  console.log(delay);
  console.log(amount);
  console.log(step);
}

function onSubmit(event) {
  event.preventDefault();
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }
}

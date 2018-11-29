
import * as Rx from 'rxjs';
import { Observable, Observer, interval } from 'rxjs';

const demoObservable = new Rx.Observable(observer => {
  setInterval(() => {
      observer.next('value');
      // observer.complete(); // with this 'complete' will log only one 'value'
    }, 1000);
  });
// const subscription = demoObservable.subscribe(console.log); // value

setTimeout(() => {
  // subscription.unsubscribe();
}, 5000);

// === SUBJECT ===
const subject = new Rx.Subject();

subject.subscribe({
  next: v => console.log('ObserverA: ' + v)
});
subject.subscribe({
  next: v => console.log('ObserverB: ' + v)
});

// subject.next(1);
// subject.next(2);

// Creating observables from values
const obs = Rx.of(5, 'hello', [1, 'doe'], { id: 23 }, true);
// obs.subscribe(console.log);

// Creating Observables from stream of values
const obsStream = Observable.create(function(observer: Observer<string>) {
  observer.next('Hello');
  observer.next('How are you?');
});

// obsStream.subscribe(console.log);

// Observable from DOM Events
const button = document.querySelector('button');


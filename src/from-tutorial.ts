// FROM:  https://dev.to/sagar/reactive-programming-in-javascript-with-rxjs-4jom

import { 
  Observable,
  Observer,
  interval,
  from,
  timer,
  of,
  Subject,
  fromEvent 
} from 'rxjs';
import { map, tap, filter, debounceTime, throttleTime, bufferTime } from 'rxjs/operators';

const demoObservable = new Observable(observer => {
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
const subject = new Subject();

subject.subscribe({
  next: v => console.log('ObserverA: ' + v)
});
subject.subscribe({
  next: v => console.log('ObserverB: ' + v)
});

// subject.next(1);
// subject.next(2);

// Creating observables from values
const obs = of(5, 'hello', [1, 'doe'], { id: 23 }, true);
// obs.subscribe(console.log);

// Creating Observables from stream of values
const obsStream = Observable.create(function(observer: Observer<string>) {
  observer.next('Hello');
  observer.next('How are you?');
});

// obsStream.subscribe(console.log);

// Observable from DOM Events
const button = document.querySelector('button');
const observable = fromEvent(button, 'click');
// observable.subscribe(console.log); // MouseEvent 

// Observable from Promise
const promise = new Promise((resolve) => {
    resolve('value from promise');
  });

const obsPro = from(promise);
// obsPro.subscribe(console.log);

// Obs from Timer method:
const time = timer(3000);
// time.subscribe(() => console.log('timeout!'));

// Obs from Interval:
const inter = interval(3000);
// inter.subscribe((tick) => console.log(`${tick} tick`));

// MAP operator: 
const maper = of(2, 4, 6, 8);
// maper.pipe(map(x => x * 2)).subscribe(console.log);

// Tap (old Do) Operator: 
// https://www.learnrxjs.io/operators/utility/do.html
 // tap operator used for debugging purpose:
const dogs = of("Buddy", "Charlie", "Cooper", "Rocky");
const filtered = dogs.pipe(
  tap(dog => console.log(dog, '1')),
  filter(dog => dog === 'Cooper'),
  tap(dog => console.log(dog, '2'))
);
// 'tap' does not transform values
// filtered.subscribe(dog => console.log(dog, '3'));
// dogs.subscribe(console.log);

// === Debounce and Throttle ===
const input = document.querySelector('input');
const obser = fromEvent(input, 'keyup');
// Debounce - Wait X time, then give me the last value.
obser.pipe(debounceTime(3000)).subscribe(e => console.log(e, 'debounce'));
// Throttle - Give me the first value, then wait X time.
obser.pipe(throttleTime(1000)).subscribe(e => console.log(e, 'throttle'));

// bufferTime
// Collects values from the past as an array, and emits those arrays periodically in time.
const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferTime(1000));
// buffered.subscribe(console.log);

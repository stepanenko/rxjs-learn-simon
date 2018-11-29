
// Example from https://netbasal.com/understanding-mergemap-and-switchmap-in-rxjs-13cf9c57c885

import { Observable, interval, fromEvent } from 'rxjs';
import { mergeAll, switchMap, mergeMap, map, take } from 'rxjs/operators';

const button = document.querySelector('button');
// Rx.fromEvent(button, 'click').subscribe(event => {
//   Rx.interval(1000).subscribe(num => console.log(num)); // will infinitely log 1, 2, 3, 4, 5...
// });

const click$ = fromEvent(button, 'click');
const interval$ = interval(1000);

// === mergeAll ===
// const clickToInterval$ = click$.pipe(
//   map(event => interval$),
//   mergeAll()
// );

// doing the same with two 'subscribe's
// clickToInterval$.subscribe(int$ => {
//   int$.subscribe(console.log);
// });

// === mergeMap ===
// const clickToInterval$ = click$.pipe(
//   mergeMap(event => interval$.pipe(take(3)))
// );

// === switchMap ===
const clickToInterval$ = click$.pipe(
  switchMap(event => interval$)
);

clickToInterval$.subscribe(console.log);

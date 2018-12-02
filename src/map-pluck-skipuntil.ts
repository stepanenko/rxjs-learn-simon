import { Observable, from, Subject } from 'rxjs';
import { map, pluck, skipUntil } from 'rxjs/operators'

// === map ===
const obs: Observable<any> = Observable.create((observer: any) => {
  observer.next('Hey guys!')
});
obs.pipe(map((value) => value.toUpperCase())).subscribe(
  data => addItem(data)
);

// === pluck ===
const obs2: Observable<any> = from([
  { name: 'Sergio', age: 32 },
  { name: 'Roger', age: 55 },
  { name: 'Tony', age: 46 }
]);
obs2.pipe(pluck('name')).subscribe(data => addItem(data));

// === skipUntil ===
const obs3: Observable<any> = Observable.create((data: any) => {
  let i = 1;
  setInterval(() => {
    data.next(i++)
  }, 1000)
});

const obs4 = new Subject();
setTimeout(() => {
  obs4.next('value of obs4')
}, 5000);

const skip = obs3.pipe(skipUntil(obs4)).subscribe(data => addItem(data)); // 5, 6, 7, 8, 9, 10

setTimeout(() => {
  skip.unsubscribe();
}, 10000);

function addItem(val: any) {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

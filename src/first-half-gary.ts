import { Observable, Subscription, fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

// const observable = Observable.create(function subscribe(observer: any) {
const observable: Observable<any> = Observable.create((observer: any) => {
  try {
    observer.next('Hey guys!');
    observer.next('How are you?');
    setInterval(() => {
      observer.next('I am good');
    }, 2000)
  } catch(err) {
    observer.error('Error: ', err);
  }
}).pipe(share());

const observer: Subscription = observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem('completed')
);

setTimeout(() => {
  const observer2 = observable.subscribe(
    (x: any) => addItem('Subscriber 2: ' + x)
  )
}, 1000);

// Obs From Event:
const ob = fromEvent(document, 'mousemove');

setTimeout(() => {
  ob.subscribe(
    e => addItem(e)
  );
}, 3000);

function addItem(val: any) {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

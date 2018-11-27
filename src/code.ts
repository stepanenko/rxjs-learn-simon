
import * as Rx from 'rxjs';

console.log(Rx);

const demoObservable = new Rx.Observable(observer => {
  setInterval(() => {
      observer.next('value');
      observer.complete();
    });
  });
  demoObservable.subscribe(console.log); // value
  
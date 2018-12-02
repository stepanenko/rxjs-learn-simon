import { Observable, merge } from 'rxjs';

const observable: Observable<any> = Observable.create((observer: any) => {
  observer.next('Hey guys!')
});

const observable2 = Observable.create((observer: any) => {
  observer.next('How is it going?')
});

const two = merge(observable, observable2);
two.subscribe(x => addItem(x));

function addItem(val: any) {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

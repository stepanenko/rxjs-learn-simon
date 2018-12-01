import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject('First'); // it requires initial argument

subject.subscribe(data => {
  addItem('Observer 1: ' + data);
});

subject.next('The first thing');
subject.next('...Observer 2 is about to sunscribe...');

const obs2 = subject.subscribe(data => {
  addItem('Observer 2: ' + data)
});

subject.next('The second thing');
subject.next('The third thing');

obs2.unsubscribe();

subject.next('The final thing');

function addItem(val: any) {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

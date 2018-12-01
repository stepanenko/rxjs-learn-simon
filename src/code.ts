import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject(30, 500); // 2 last next() will be logged

function addItem(val: any) {
  const node = document.createElement('li');
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

var container = [];
var element = {
    text: 'Hey There',
    author: 'Self'
};

container.push(element);

var element = {
    text: 'Hey There1',
    author: 'Self1'
};

container.push(element);

container[0].text="This Was Changed";

console.log(container);
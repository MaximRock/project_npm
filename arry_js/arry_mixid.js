// Объявление массива
let arr = new Array();
let arr = [];

let arr_mixed = [форд, яблока, 123. иванов, true]

// Получить элемент
alert ( arr_mixed[0]  ); // форд

// Заменить элемент
arr_mixed[1]

// Общее число элементов массива
alert( arr_mixed.length );

// Вывести массив целиком
alert( arr_mixed );

// Получение последних элементов при помощи «at»
alert( arr_mixed[arr_mixed.length-1] );

// Методы pop/push, shift/unshift

// Методы, работающие с концом массива
// pop
// Удаляет последний элемент из массива и возвращает его
alert( arr_mixed.pop() );

// push
// Добавляет элемент в конец массива
arr_mixed.push("Груша");

// Методы, работающие с началом массива
// unshift
arr_mixed.unshift('Яблоко');d

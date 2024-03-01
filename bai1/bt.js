let arr = [1, 2, 5, 6];

// 1. Tạo một mảng mới chứa các số lớn hơn 5 từ mảng ban đầu
let arrNew = arr.filter((item) => item > 5);
console.log(arrNew);

// 2. Sử dụng arrow function và reduce để tính tổng các phần tử trong mảng.
let sumArr = arr.reduce((previoustValue, currentValue) => previoustValue + currentValue);
console.log(sumArr)

// 3. Kiểm tra 1 mảng có chứa số 5 hay không nếu có trả về 5 không thì trả về "không tìm thấy".
let arr1 = [];
arr.forEach((item) => {
    if (item === 5) {
        arr1.push(item);
    }
})
if (arr1.length > 0) {
    console.log(arr1);
} else {
    console.log("không tìm thấy")
}
// arr.includes(5);

// 4. Kiểm tra 1 mảng tất cả các phần tử trong mảng đó có lớn hơn 0 hay không?.
let arr2 = [];
arr.forEach((item) => {
    if (item > 0) {
        arr2.push(item);
    }
});
if (arr2.length > 0) {
    console.log("Mảng có phần tử bé hơn 0");
} else {
    console.log("tất cả các phần tử trong mảng đó có lớn hơn 0");
}
// arr.every((element) => element > 0)

// 5. Tìm phần tử đầu tiên trong mảng lớn hơn 3.
let number = arr.filter((item) => item > 3);
console.log(number[0]);

// 6. Sử dụng destructuring với rest parameter để trích xuất phần tử đầu tiên vào biến "first" và các
// phần tử còn lại vào một mảng mới "rest".
let [a, ...b] = arr;
const rest = b;
let first = a;
console.log(first, rest);

// 7. Sử dụng destructuring để trích xuất các giá trị "name" và "age" từ một mảng chứa các đối tượng "person".
let arr3 = [{name: 'a', age: 18}, {name: 'b', age: 19}];
let name1 = [];
let age1 = [];
arr3.forEach((item) => {
    let {name, age} = item;
    name1.push(name);
    age1.push(age);
})
console.log(name1, age1);

// 8. Sử dụng Rest parameter và Spread operator để tạo một hàm nhận vào danh sách các số và trả về tổng của chúng.
let sum = (...number) => {
    return number.reduce((previousValue, currentValue) => previousValue + currentValue);
}
let tong = sum(...arr);
console.log(tong);

// 9. Sử dụng Rest parameter để nhận vào một danh sách tên và trả về chuỗi định dạng
// "Welcome, [tên1], [tên2], [tên3], ..." cho tất cả các tên.
let text = (...name2) => {
    console.log("Welcome, " + name2.join(", "));
}
const arrName = ['a', 'b', 'c'];
text(...arrName);

// 10. Tạo một đối tượng "book" với thuộc tính "title", "author" và "pages" bằng cách sử dụng Enhanced object literals.
// Đối tượng "book" cũng có phương thức "displayInfo" để in ra thông tin về sách.
const book = {
    title: 'sách',
    author: 'Nguyễn Văn A',
    pages: 3,

    displayInfo() {
        console.log('Title: ' + `${this.title}`);
        console.log('Author: ' + `${this.author}`);
        console.log('Pages: ' + `${this.pages}`);
    }
}
book.displayInfo();

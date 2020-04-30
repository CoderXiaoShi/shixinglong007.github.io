/*
    new 的执行过程
        创建空对象 {}
        函数的 this 指向空对象
        {} 对象的 constructor 指向被 new 的函数，此时这个函数就是类的构造函数
        设置 {} 的 __proto__ 属性指向构造函数的 prototype 属性
        将新对象的引用指向 等号左边的 变量
*/
// 第一种
var F = function(name, color) {
    this.name = name
}
F.prototype.syHai = function() {
    console.log(this.name)
}
// 第二种
let c = {
    name: '钢蛋儿 2'
}
var b = Object.create(c)
// console.log(b.name)
// 第三种类的定义方法
/*

var Animal = {
    createNwe: function() {
        var animal = {}
        animal.sleep = function() {
            console.log(this.name + '在睡觉')
        }
        return animal
    }
}

var Cat = {
    color: '黑白条纹', // 静态变量
    createNwe: function() {
        var cat = Animal.createNwe() // 继承
        cat.name = '钢蛋儿'
        var sound = 'mon' // 私有变量
        cat.makeSound = function() {
            console.log(this.name, sound, Cat.color)
        }
        return cat
    }
}

*/

// var cat1 = Cat.createNwe()
// cat1.makeSound()
// cat1.sleep()

// 第四重
class Cat {
    constructor (name) {
        this.name = name
    }
    syHai = () => {
        console.log(this.name)
    }
}

console.log(
    new Cat('钢蛋儿').syHai()
)

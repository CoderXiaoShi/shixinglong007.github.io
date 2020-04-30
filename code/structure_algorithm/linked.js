/*
    链表分类
        单向链表
        双向链表
        单向循环列表
        双向循环链表

单链表反转

链表中环的检测

两个有序的链表合并

删除链表倒数第 n 个结点

求链表的中间结点

*/

class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

const reversLinkedList = function(list) {
    let currentNode = list.next
    let root = new Node('root')
    while(currentNode) {
        let next = currentNode.next
        currentNode.next = root.next
        root.next = currentNode
        currentNode = next
    }
    list = root.next
    return list
}

class LinkedList {
    constructor() {
        this.head = new Node('head')
    }
    getLength () {
        let currentNode = this.head
        let i = -1
        while(currentNode) {
            currentNode = currentNode.next
            i++
        }
        return i
    }
    // 尾部添加
    append(newElement) {
        const newNode = new Node(newElement)
        let currentNode = this.head
        while (currentNode.next) {
            currentNode = currentNode.next
        }
        currentNode.next = newNode
    }
    // 前面添加，某个前面添加
    insert(first, sencond) {
        if (sencond !== undefined) {
            // 找到 第一个
            // 创建新节点
            // 新节点接上第一个的 next
            // 第一个的 next 接上新节点
            let newNode = new Node(sencond)
            let firstNode = this.findPrev(first)
            newNode.next = firstNode.next
            firstNode.next = newNode
        } else {
            let newNode = new Node(first)
            newNode.next = this.head.next
            this.head.next = newNode
        }
    }
    // 某个的前一个
    findPrev(item) {
        let currentNode = this.head
        while(currentNode && currentNode.next) {
            if (currentNode.next.element === item) {
                return currentNode
            }
            currentNode = currentNode.next
        }
        return -1
    }
    // 根据节点内容(value)查找
    findByValue (value) {
        let currentNode = this.head.next;
        while (currentNode !== null && currentNode.element !== value) {
            currentNode = currentNode.next;
        }
        return currentNode === null ? -1 : currentNode;
    }
    // 根据下表查
    findByIndex (index) {
        let currentNode = this.head.next
        let i = 0;
        while (currentNode !== null && currentNode.next) {
            if (i === parseInt(index)) {
                return currentNode
            }
            currentNode = currentNode.next
            i++
        }
    }
    // 删除下标
    delByIndex (index) {
        // 找到前一个，用前一个的
        // 前一个的.next = 前一个的.next.next
        let currentNode = this.head
        let i = 0
        while(currentNode !== null && currentNode.next) {
            if (i === index) {
                currentNode.next = currentNode.next.next
            }
            currentNode = currentNode.next
            i++
        }
    }
    // 删除最后一个
    delTail() {
        let currentNode = this.head
        let lastCurrentNode = null
        while (currentNode && currentNode.next) {
            currentNode = currentNode.next
            if (currentNode.next != null) {
                lastCurrentNode = currentNode
            }
        }
        lastCurrentNode.next = null
    }
    display (list) {
        let currentNode = null
        if (list) {
            currentNode = list
        } else {
            currentNode = this.head.next
        }
        let str = ''
        while (currentNode !== null) {
            str += currentNode.element + ', '
            currentNode = currentNode.next
        }
        console.log(str)
    }
    revers () {
        let root = new Node('root')
        let currentNode = this.head.next
        while (currentNode) {
            let next = currentNode.next
            currentNode.next = root.next
            root.next = currentNode
            currentNode = next
        }
        this.head = root
    }
    findModileNode () {
        let fast = this.head
        let slow = this.head
        while(fast.next && fast.next.next) {
            fast = fast.next.next
            slow = slow.next
        }
        return slow
    }
    isPalindrome() {
        // 先找到中间的位置
        // 第一次遍历到中间
        // 翻转, 第二次在遍历到中间
        let fast = this.head.next
        let slow = this.head.next
        let str1 = ''
        let str2 = ''
        while(slow.next) {
            // 快指针走完
            if (!fast ||!fast.next) {
                // 区分偶数奇数
                // 拿到剩余的部分链表
                    // 如果是奇数, 从下一个开始
                    // 如果是偶数, 就从当前开始
                // 合并为字符串
                let surplusNode = null
                if (!fast) {
                    console.log('偶数')
                    surplusNode = slow
                } else {
                    console.log('奇数')
                    surplusNode = slow.next
                }
                while(surplusNode) {
                    str2 = surplusNode.element + ',' + str2
                    surplusNode = surplusNode.next
                }
                break;
            } else {
                fast = fast.next.next
                str1 += slow.element + ','
            }
            slow = slow.next
        }
        console.log(str1, str2);
        console.log(str1 === str2 ? '是回文' : '不是');
    }
}
// Test
const llist = new LinkedList();
// llist.append('1')
// llist.append('2')
// llist.append('3')
// llist.append('4')
// llist.append('5')
let str = '1234554321'
// let str = '123454321'
for (let s of str) {
    llist.append(s)
}
llist.isPalindrome()
// console.log(
//     llist.findModileNode()
// )
// 根据 内容查找
// console.log(
//     llist.findByValue('3')
// )
// 根据下表查找
// console.log(llist.findByIndex(2))
// 删除某个
// llist.delByIndex(4)
// // 尾部删除
// llist.delTail()
// 顶部插入
// llist.insert('000')
// // 某个前面插入
// llist.insert('2', '111')
// console.log(
//     llist.findPrev('5')
// )
console.log('------------')
llist.display()

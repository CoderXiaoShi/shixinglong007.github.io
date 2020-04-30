class Node {
    constructor(element) {
        this.element = element
        this.next = null
        this.prev = null
    }
}

class LinkenList {
    constructor() {
        this.head = new Node('head')
    }
    append(element) {
        let newNode = new Node(element)
        let currentNode = this.head
        while (currentNode && currentNode.next) {
            currentNode = currentNode.next
        }
        currentNode.next = newNode
        // newNode.prev = currentNode
    }
    getIndex(index) {
        let currentNode = this.head
        let i = 0
        while (currentNode && currentNode.next) {
            currentNode = currentNode.next
            i++
            if (i === index) {
                return currentNode
            }
        }
    }
    display() {
        let currentNode = this.head
        let s = ''
        while (currentNode) {
            s += currentNode.element + ','
            currentNode = currentNode.next
        }
        console.log(s);
    }
}
let llist = new LinkenList();
llist.append('1')
llist.append('2')
llist.append('3')
llist.append('4')
llist.append('5')

console.log(
    llist.getIndex(4)
)

llist.display()

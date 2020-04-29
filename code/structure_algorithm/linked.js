const Node = function(n) {
    this.item = n
    this.next = null;
}

const LinkedList = function() {
    this.head = new Node('1')
    this.head.next = this.head
    this.fast = null
    this.slow = null
}





let s = '123454321';



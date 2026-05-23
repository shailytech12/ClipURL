class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;

        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity = 100) {
        this.capacity = capacity;

        this.cache = new Map();

        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    insert(node) {
        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.cache.has(key)) {
            return null;
        }

        const node = this.cache.get(key);

        this.remove(node);
        this.insert(node);

        return node.value;
    }

    set(key, value) {

        if (this.cache.has(key)) {
            this.remove(this.cache.get(key));
        }

        const newNode = new Node(key, value);

        this.insert(newNode);

        this.cache.set(key, newNode);

        if (this.cache.size > this.capacity) {

            const lru = this.tail.prev;

            this.remove(lru);

            this.cache.delete(lru.key);
        }
    }
}

module.exports = new LRUCache();
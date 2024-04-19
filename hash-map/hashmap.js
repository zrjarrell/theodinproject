class HashMap {
    constructor() {
        this.buckets = []
        this.numBuckets = 16;
        for (let i = 0; i < this.numBuckets; i++) {
            this.buckets.push(null)
        }
        this.length = 0;
        this.load = 0;
        this.loadfactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode)  + key.charCodeAt(i);
            hashCode = hashCode % this.numBuckets;
        }
        return hashCode;
    }

    set(key, value) {
        let hash = this.hash(key);
        if (this.has(key)) {
            let index = this.buckets[hash].find(key);
            this.buckets[hash].at(index).value = value;
        } else if (this.buckets[hash] !== null) {
            this.buckets[hash].append(key, value);
            this.length += 1;
        } else {
            if (this.load / this.numBuckets >= this.loadfactor) {
                this.grow()
            }
            this.length += 1;
            this.load += 1;
            this.buckets[hash] = new LinkedList(key, value);
        }
    }

    grow() {
        let oldBuckets = this.buckets;
        this.buckets = [];
        this.load = 0;
        this.length = 0;
        this.numBuckets = this.numBuckets * 2;
        for (let i = 0; i < this.numBuckets; i++) {
            this.buckets.push(null)
        }
        for (let i = 0; i < oldBuckets.length; i++) {
            if (oldBuckets[i] !== null) {
                let current = oldBuckets[i].head;
                while (current != null) {
                    this.set(current.key, current.value)
                    current = current.next
                }
            }
        }
    }

    get(key) {
        let hash = this.hash(key);
        if (this.has(key)) {
            let index = this.buckets[hash].find(key);
            return this.buckets[hash].at(index).value;
        } else {
            return null;
        }
    }

    has(key) {
        let hash = this.hash(key);
        if (this.buckets[hash] === null) {
            return false;
        } else {
            return this.buckets[hash].contains(key);
        }
    }

    remove(key) {
        let hash = this.hash(key);
        if (this.has(key)) {
            if (this.buckets[hash].size == 1) {
                this.buckets[hash] = null;
            } else {
                let index = this.buckets[hash].find(key);
                this.buckets[hash].removeAt(index);
            }
            this.length -= 1;
            return true
        } else {
            return false
        }
    }

    clear() {
        this.buckets = [null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null]
        this.length = 0;
        this.numBuckets =16;
        this.load = 0;
    }

    keys() {
        let allKeys = [];
        for (let i = 0; i < this.numBuckets; i++) {
            if (this.buckets[i] !== null) {
                let current = this.buckets[i].head;
                while (current != null) {
                    allKeys.push(current.key);
                    current = current.next;
                }
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];
        for (let i = 0; i < this.numBuckets; i++) {
            if (this.buckets[i] !== null) {
                let current = this.buckets[i].head;
                while (current != null) {
                    allValues.push(current.value);
                    current = current.next;
                }
            }
        }
        return allValues;
    }

    entries() {
        let allEntries = [];
        for (let i = 0; i < this.numBuckets; i++) {
            if (this.buckets[i] !== null) {
                let current = this.buckets[i].head;
                while (current != null) {
                    allEntries.push([current.key, current.value]);
                    current = current.next;
                }
            }
        }
        return allEntries;
    }
}

class LinkedList {
    constructor(key, value) {
        this.head = new Node(key, value);
        this.tail = this.head;
        this.size = 1;
    }

    append(key, value) {
        this.tail.next = new Node(key, value);
        this.tail = this.tail.next;
        this.size += 1;
    }

    contains(key) {
        let current = this.head;
        while (current != null) {
            if (current.key == key) {
                return true
            }
            current = current.next
        }
        return false
    }

    find(key) {
        let current = this.head;
        let currentIndex = 0;
        while (current != null) {
            if (current.key == key) {
                return currentIndex
            }
            current = current.next;
            currentIndex += 1
        }
        return null
    }

    at(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current
    }

    removeAt(index) {
        if (index == 0) {
            this.head = this.head.next
        } else {
            this.at(index-1).next = this.at(index).next
        }
        this.size -= 1
    }
}

class Node {
    constructor(key = null, value = null, next = null) {
        this.key = key
        this.value = value;
        this.next = next;
    }

    updateNext(next) {
        this.next = next
    }
}
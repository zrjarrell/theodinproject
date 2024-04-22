class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        array = Array.from(new Set(array))
        array.sort(function(a, b){return a-b});
        this.root = this.buildTree(array)
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null
        }
        let middle = Math.floor((start + end) / 2);
        const rootNode = new Node(array[middle]);
        rootNode.left = this.buildTree(array, start, middle-1);
        rootNode.right = this.buildTree(array, middle+1, end);
        return rootNode
    }
    
    insert(value) {
        let currentRoot = this.root;
        while (true) {
            if (value == currentRoot.data) {
                console.log("Item already in tree.")
                return
            } else {
                if (value > currentRoot.data) {
                    if (currentRoot.right === null) {
                        currentRoot.right = new Node(value);
                        return
                    }
                    currentRoot = currentRoot.right;
                } else if (value < currentRoot.data) {
                    if (currentRoot.left === null) {
                        currentRoot.left = new Node(value);
                        return
                    }
                    currentRoot = currentRoot.left;
                }
            }
        }
    }

    deleteItem(value) {
        let currentRoot = this.root;
        let previousRoot = null;
        let turnTaken = "right"
        while (true) {
            if (currentRoot === null) {
                break
            } else if (value == currentRoot.data) {
                if (currentRoot.left === null) {
                    if (previousRoot === null) {
                        this.root = currentRoot.right
                    } else {
                        previousRoot[turnTaken] = currentRoot.right;
                    }
                    break
                } else if (currentRoot.right === null) {
                    if (previousRoot === null) {
                        this.root = currentRoot.left
                    } else {
                        previousRoot[turnTaken] = currentRoot.left;
                    }
                    console.log("case2")
                    break
                } else {
                    let replacement = currentRoot.left;
                    while (replacement.right !== null) {
                        replacement = replacement.right
                    }
                    this.deleteItem(replacement.data)
                    replacement.left = currentRoot.left;
                    replacement.right = currentRoot.right;
                    if (previousRoot === null) {
                        this.root = replacement
                    } else {
                        previousRoot[turnTaken] = replacement
                    }
                    break
                }
            } else if (value > currentRoot.data) {
                previousRoot = currentRoot;
                currentRoot = currentRoot.right;
                turnTaken = "right"
            } else if (value < currentRoot.data) {
                previousRoot = currentRoot;
                currentRoot = currentRoot.left;
                turnTaken = "left"
            }
        }
    }

    find(value) {
        let currentNode = this.root;
        while (true) {
            if (currentNode === null) {
                console.log("Item not found.")
                return
            } else if (currentNode.data == value) {
                return currentNode
            } else if (value > currentNode.data) {
                currentNode = currentNode.right
            } else if (value < currentNode.data) {
                currentNode = currentNode.left
            }
        }
    }

    levelOrder(callback=(value) => {return value}) {
        let queue = []
        let sequence = []
        queue.push(this.root)
        while (queue.length > 0) {
            if (queue[0].left !== null) {
                queue.push(queue[0].left)
            }
            if (queue[0].right !== null) {
                queue.push(queue[0].right)
            }
            sequence.push(callback(queue[0].data))
            queue.shift()
        }
        return sequence
    }

    inOrder(callback=(value) => {return value}, node=this.root) {
        if (node === null) {
            return []
        }
        let result = []
        result = result.concat(this.inOrder(callback, node.left))
        result.push(callback(node.data))
        result = result.concat(this.inOrder(callback, node.right))
        return result
    }

    preOrder(callback=(value) => {return value}, node=this.root) {
        if (node === null) {
            return []
        }
        let result = []
        result.push(callback(node.data))
        result = result.concat(this.preOrder(callback, node.left))
        result = result.concat(this.preOrder(callback, node.right))
        return result
    }

    postOrder(callback=(value) => {return value}, node=this.root) {
        if (node === null) {
            return []
        }
        let result = []
        result = result.concat(this.postOrder(callback, node.left))
        result = result.concat(this.postOrder(callback, node.right))
        result.push(callback(node.data))
        return result
    }

    height(node) {
        let leftHeight = 0;
        let rightHeight = 0;
        if (node.left !== null) {
            leftHeight = this.height(node.left) + 1
        }
        if (node.right !== null) {
            rightHeight = this.height(node.right) + 1
        }
        return Math.max(leftHeight, rightHeight)
    }

    depth(node) {
        let currentNode = this.root;
        let depthCounter = 0;
        while (true) {
            if (currentNode === null) {
                console.log("Node not present.")
            } else if (currentNode == node) {
                return depthCounter
            } else if (node.data < currentNode.data) {
                currentNode = currentNode.left
                depthCounter += 1
            } else if (node.data > currentNode.data) {
                currentNode = currentNode.right
                depthCounter += 1
            }
        }
    }

    isBalanced(node = this.root) {
        let balanced = true
        if (node.left === null || node.right === null) {
            if (this.height(node) > 1) {
                return false
            } else {
                return true
            }
        }
        let absDifference = Math.abs(this.height(node.left) - this.height(node.right))
        if (absDifference > 1) {
            balanced = false
        }
        if (!balanced) {
            return balanced
        }
        balanced = balanced && this.isBalanced(node.left) && this.isBalanced(node.right)
        return balanced
    }

    rebalance() {
        if (this.isBalanced()) {
            return
        } else {
            let treeArray = this.inOrder()
            let balancedTree = new Tree(treeArray)
            this.root = balancedTree.root
        }
    }
}


//below is requested tests of function
function getRandArray(n, maximum) {
    let randArray = []
    for (let i = 0; i < n; i++) {
        randArray.push(Math.ceil(Math.random() * maximum))
    }
    return randArray
}

let foo = new Tree(getRandArray(20, 99))

foo.isBalanced()

function printEach(method, array) {
    console.log(method)
    for (item in array) {
        console.log(array[item])
    }
}

printEach("level", foo.levelOrder())
printEach("preorder", foo.preOrder())
printEach("postorder", foo.postOrder())
printEach("inorder", foo.inOrder())

foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))
foo.insert(Math.ceil(Math.random() * 1000))

foo.isBalanced()
foo.rebalance()
foo.isBalanced()

printEach("level", foo.levelOrder())
printEach("preorder", foo.preOrder())
printEach("postorder", foo.postOrder())
printEach("inorder", foo.inOrder())

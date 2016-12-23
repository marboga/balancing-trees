function AVLNode(val) {
    this.value = val;
    this.height = 0;

    //***Lazy-Loaded Variables***/
    //
    //this.parent
    //this.left
    //this.right
}

function AVL() {
    this.root = null;
}

AVL.prototype.Insert = function(val) {
    var newNode = new AVLNode(val);
    if(!this.root) {
        this.root = newNode;
        return this; 
    }
    var current = this.root;
    while(current) {
        if(current.value > val) {
            if(!current.left) {
                current.left = newNode;
                newNode.parent = current
                if(!current.right) {
                    current.height += 1;
                    this.Balance(current, true);
                }
                return this;
            }
            current = current.left;
        } else {
            if(!current.right) {
                current.right = newNode;
                newNode.parent = current;
                if(!current.left) {
                    current.height += 1;
                    this.Balance(current);
                }
                return this;
            }
            current = current.right;
        }
    }
}

AVL.prototype.ForceInsert = function(val) {
    var newNode = new AVLNode(val);
    if(!this.root) {
        this.root = newNode;
        return this; 
    }
    var current = this.root;
    while(current) {
        if(current.value > val) {
            if(!current.left) {
                current.left = newNode;
                newNode.parent = current;
                if(!current.right) {
                    current.height += 1;
                }
                return this;
            }
            current = current.left;
        } else {
            if(!current.right) {
                current.right = newNode;
                if(!current.left) {
                    current.height += 1;
                }
                return this;
            }
            current = current.right;
        }
    }
}

AVL.prototype.Balance = function(node, childIsLeft) {
    while(node.parent) {
        var curParent = node.parent;
        //If not updating the parent height, stop
        if(curParent.height === node.height) {

            //Find direction of current node
            if(node === curParent.right) {
                //If Uncle has a lower height than current (causing an imbalance on increment)
                var checkVal = 0
                if(curParent.left) {
                    checkVal = curParent.left.height + 1;
                }
                if(checkVal < node.height) {
                    //Rebalance
                    //Need to think about if the parent is the root too
                    if(childIsLeft) {
                        return this.rightLeftRotate(node, (!curParent.parent));
                    }
                    return this.leftRotate(node, (!curParent.parent));
                }
                childIsLeft = false;
            } else {
                //If Uncle has a lower height than current (causing an imbalance on increment)
                var checkVal = 0
                if(curParent.right) {
                    checkVal = curParent.right.height + 1;
                }
                if(checkVal < node.height) {
                    if(!childIsLeft) {
                        return this.leftRightRotate(node, (!curParent.parent));
                    }
                    return this.rightRotate(node, (!curParent.parent));
                }
                childIsLeft = true;
            }
            curParent.height += 1;
            node = curParent;
        } else {
            return;
        }
    }
}

AVL.prototype.leftRotate = function(node, parentIsRoot) {
    var parent = node.parent;
    parent.right = null;
    if(node.left) {
        parent.right = node.left;
        node.left.parent = parent;
    }
    //Adjust heights
    node.height = parent.height;
    parent.height -= 1;
    
    //Adjust node pointers
    node.left = parent;
    if(parentIsRoot) {
        this.root = node;
        node.parent = null;
    } else {
        node.parent = parent.parent;
        if(parent === parent.parent.left) {
            parent.parent.left = node;
        } else {
            parent.parent.right = node;
        }
    }
    //Adjsut Parent Pointer
    parent.parent = node;
}

AVL.prototype.rightRotate = function(node, parentIsRoot) {
    var parent = node.parent;
    parent.left = null;
    if(node.right) {
        parent.left = node.right;
        node.right.parent = parent;
    }
    //Adjust heights
    node.height = parent.height;
    parent.height -= 1;
    
    //Adjust node pointers
    node.right = parent;
    if(parentIsRoot) {
        this.root = node;
        node.parent = null;
    } else {
        node.parent = parent.parent;
        if(parent === parent.parent.left) {
            parent.parent.left = node;
        } else {
            parent.parent.right = node;
        }
    }
    //Adjsut Parent Pointer
    parent.parent = node;
}

AVL.prototype.leftRightRotate = function(node, parentIsRoot) {
    this.leftRotate(node.right, false);
    this.rightRotate(node.right, parentIsRoot);
}

AVL.prototype.rightLeftRotate = function(node, parentIsRoot) {
    this.rightRotate(node.left, false);
    this.leftRotate(node.left, parentIsRoot);
}

///////////////////////TESTING////////////////////////
// var testTree = new AVL();
// console.log(testTree.isBalanced());
// testTree.Insert(7);
// testTree.Insert(10);
// testTree.Insert(11);
// console.log(testTree.isBalanced());

// AVL.prototype.isBalanced = function() {
//     if(!this.root) {
//         return true;
//     }
//     return isBalanced(this.root);
// }

// function isBalanced(node) {
//     if(!node) {
//         return true;
//     }
//     var leftHeight = Height(node.left);
//     var rightHeight = Height(node.right);
//     if(Math.abs(leftHeight - rightHeight) > 1) {
//         return false;
//     }
//     return (isBalanced(node.left) && isBalanced(node.right));
// }

// function Height(node) {
//     if(!node) {
//         return 0;
//     }
//     return 1 + Height(node.left) + Height(node.right);
// }

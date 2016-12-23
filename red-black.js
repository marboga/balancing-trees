//This is a Red-Black Tree implementation
//Red black rules:
//1. 		The root node is black
//2. 		newly created nodes are Red
//2.5 	null nodes are black
//3. 		if a node is red and its parent is red and its uncle is red, recolor parent, uncle, & grandparent
//4.		if a node is red and its parent is red and its uncle is black or null, then rotate. if parent is gp's right, rotate left, else right

function RBTree () {
	this.root = null;
}

function RBNode (val) {
	this.val = val
	this.isRed = true;
	this.parent = null;
	this.left = null;
	this.right = null;
}

function print(node) {
	if (!node) {
		return;
	}
	print(node.left);
	console.log(node.val);
	print(node.right);
}


RBTree.prototype.insert = function (value) {
	console.log('inserting', value);
	var newNode = new RBNode(value);
	if (!this.root) { //we have an empty tree so we can insert at the root
		this.root = newNode;
		this.root.isRed = false;
	} else { //if this.root exists, find
		var curr = this.root;
		while (curr){
			if (value < curr.val) {
				if (curr.left) {
					curr = curr.left
				} else {
					//left is null, so insert
					curr.left = newNode;
					newNode.parent = curr;
					this.checkColors(newNode);
					return this;
				}
			} else { //value is greater than current, so go right
				if (curr.right) {
					curr = curr.right
				} else {
					//right is null, so insert
					curr.right = newNode;
					newNode.parent = curr;
					this.checkColors(newNode);
					return this;
				}
			} // we should have inserted by now
		}
	}
	return this;
};

RBTree.prototype.checkColors = function(node) {
	if (!node.parent) {
		//node is root
		node.isRed = false;
		return;
	} else if (!node.parent.isRed) {
		//parent is black, everything is ok
		return;
	} else {
		//parent is red, keep checking
		var gp = node.parent.parent;
		if (gp.right === node.parent) {
			//parent is right child of grandparent, check uncle
			if (!gp.left || !gp.left.isRed) {
				//uncle is black, we need to rotate left
				if (node.parent.left === node) {
					//if this is the case we also need to rotate right
					this.rotateRight(node);
				}
				return this.rotateLeft(node.parent);
			} else {
				//uncle is red, we need to recolor & recurse
				console.log('recolor');
				return recolor(gp);
			}
		} else {
			// uncle is gp's right
			if (!gp.right || !gp.right.isRed) {
				//uncle is black, we need to rotate right
				if (node.parent.right == node) {
					this.rotateLeft(node)
				}
				return this.rotateRight(node.parent);
			} else {
				//uncle is red, we need to recolor & recurse
				console.log('recolor');
				return recolor(gp);
			}
		}
	}
}

function recolor(node) {
	// console.log(node);
	if (!node) {
		console.log('breaking out of recolor');
		return;
	}
	node.right.isRed = !node.right.isRed;
	node.left.isRed = !node.left.isRed;
	node.isRed = !node.isRed;
	console.log("\n recoloring \n node-> ", node, "\nparent->" ,node.parent);
	if (node.isRed && node.parent && node.parent.isRed) {
		console.log('going up!');
		return recolor(node.parent);
	}
	console.log('where are we');
	return;
}

RBTree.prototype.rotateRight = function(node) {
	console.log('rotating right');
	var parent = node.parent;
	if (!parent.parent) {
		this.root = node;
	}
	parent.left = node.right;
	node.right = parent;
	if (parent.left){
		parent.left.parent = parent;
	}
	node.parent = parent.parent;
	console.log('head is', this.root.val);
}

RBTree.prototype.rotateLeft = function(node) {
	console.log('rotating left');
	var parent = node.parent;
	if (!parent.parent) {
		this.root = node;
	}
	parent.right = node.left;
	node.left = parent;
	if (parent.right){
		parent.right.parent = parent;
	}
	node.parent = parent.parent;
	console.log('head is', this.root.val);
}

RBTree.prototype.traverse = function() {
	print(this.root);
}

var t = new RBTree();
t.insert(4).insert(60).insert(90).insert(400).insert(30).insert(45).insert(20).traverse()
console.log(t.root);

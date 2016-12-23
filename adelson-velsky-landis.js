class AVLTree {
	constructor() {
		this.root = null;
	}

	treeSize() {
		console.log("tree size ======", size(this.root));
		return this;
	}

	insert(val) {
		var node = new AVLNode(val);
		if (!this.root) {
			this.root = node;
			return this;
		}
		var currNode = this.root;
		while (currNode) {
		 if ( val >= currNode.val) {
			 if (currNode.right) {
				 currNode = currNode.right
			 } else {
				 currNode.right = node;
				 node.parent = currNode;
				 if (!currNode.left) {
					 currNode.height += 1;
					 currNode.evaluateBalance()
				 }
				return this;
			 }
			} else {
				if (currNode.left) {
 				 currNode = currNode.left
 			 } else {
 				 currNode.left = node;
				 node.parent = currNode;
				 if (!currNode.right) {
					 currNode.height += 1;
					 currNode.evaluateBalance()
				 }
				return this;
 			 }
			}
		}
	}
}


class AVLNode {
	constructor (val) {
		this.val = val;
		this.height = 0;
		this.left = null;
		this.right = null;
		this.parent = null;
	}
}

function height(node){
	if (!node) { return 0 }
	var myHeight = Math.max( height(node.left), height(node.right) ) + 1
	if (myHeight) {
		node.height = myHeight;
	}
	console.log(myHeight);
	return myHeight;
}

function size(node) {
	if (!node) { return 0 }
	return size(node.left) + 1 + size(node.right)
}

AVLNode.prototype.evaluateBalance = function(){
	var left = height(this.left);
	var right = height(this.right);
	this.height = Math.max(left, right)
	if (right - left > 1) {
		//right is heavier
		var rl = height(this.right.left);
		var rr = height(this.right.left);
		if (rl > rr) {
			this.right.rotateRight();
		}
		this.rotateLeft();
	}
	else if (right - left < -1) {
		//left is heavier
		var lr = height(this.left.right);
		var ll = height(this.left.left);
		if (lr > ll) {
			this.left.rotateLeft();
		}
		this.rotateRight();
	}
	else if (this.parent){
		this.parent.evaluateBalance();
	}
}

AVLNode.prototype.rotateLeft = function() {

}

AVLNode.prototype.rotateRight = function() {

}

tree = new AVLTree()

tree.insert(34).insert(16).insert(300).insert(44).insert(45).insert(49)
tree.treeSize()
console.log(tree.root);

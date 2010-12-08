
function MazeBox() {
	this._top = false;
	this._right = false;
	this._bottom = false;
	this._left = false;
	this.initialize = function(mustHaveTop, mustHaveRight, mustHaveBottom, mustHaveLeft) {
		this._top = (mustHaveTop ? true : this.randomBoolean());
		this._right = (mustHaveRight ? true : this.randomBoolean());
		this._bottom = (mustHaveBottom ? true : this.randomBoolean());
		this._left = (mustHaveLeft ? true : this.randomBoolean());
	};

	this.randomBoolean = function() {
		return (Math.random() > 0.5); 
	};

	this.drawBox = function(context, currentX, currentY, boxSizeX, boxSizeY) {
		if (this._top) {
			context.moveTo(currentX, currentY);
			context.lineTo(currentX + boxSizeX - 1, currentY);
		}
		if (this._right) {
			context.moveTo(currentX + boxSizeX - 1, currentY);
			context.lineTo(currentX + boxSizeX - 1, currentY + boxSizeY - 1);
		}
		if (this._bottom) {
			context.moveTo(currentX, currentY + boxSizeY - 1);
			context.lineTo(currentX + boxSizeX - 1, currentY + boxSizeY - 1);
		}
		if (this._left) {
			context.moveTo(currentX, currentY);
			context.lineTo(currentX, currentY + boxSizeY - 1);
		}
	};
	this.hasTop = function() {
		return this._top;
	};
	this.hasRight = function() {
		return this._right;
	};
	this.hasBottom = function() {
		return this._bottom;
	};
	this.hasLeft = function() {
		return this._left;
	};

}


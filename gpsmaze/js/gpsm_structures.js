
/**
 * Structure that represents one cell in a maze.
 */
function MazeCell() {
	// Properties
	this._top = false;
	this._right = false;
	this._bottom = false;
	this._left = false;

	/**
	 * Set up a maze cell
	 */
	this.initialize = function(setTop, setLeft, mustHaveRight, mustHaveBottom) {
		this._top = setTop;
		this._left = setLeft;
		this._right = (mustHaveRight ? true : this.pseudoRandomBoolean());
		this._bottom = (mustHaveBottom ? true : this.pseudoRandomBoolean());
		
		// always leave a hole
		if (this._top && this._right && this._bottom && this._left) {
			if (mustHaveBottom) {
				// Cannot change bottom, but can change top
				this._top = false;
			} else {
				// Bottom not required, so do not include it
				this._bottom = false;
			}
		}
	};

	/**
	 * Random function for maze cell creation
	 */
	this.pseudoRandomBoolean = function() {
		// Actually skew randomness to make the maze not too tight
		return (Math.random() > 0.7); 
	};

	/**
	 * Draw cell object onto a canvas context at a certain location
	 */
	this.drawBox = function(context, currentX, currentY, boxSizeX, boxSizeY) {
		if (this._top) {
			context.moveTo(currentX, currentY);
			context.lineTo(currentX + boxSizeX, currentY);
		}
		if (this._right) {
			context.moveTo(currentX + boxSizeX, currentY);
			context.lineTo(currentX + boxSizeX, currentY + boxSizeY);
		}
		if (this._bottom) {
			context.moveTo(currentX, currentY + boxSizeY);
			context.lineTo(currentX + boxSizeX, currentY + boxSizeY);
		}
		if (this._left) {
			context.moveTo(currentX, currentY);
			context.lineTo(currentX, currentY + boxSizeY);
		}
	};
	
	/**
	 * Boolean accessor methods
	 */
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


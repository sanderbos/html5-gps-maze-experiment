
/**
 * Class that represents the maze game.
 */
function MazeGame() {

    // Must be variable so drawCanvas event function can use it
    var _object;

    // Properties
    this._canvas;
    this._context;
    this._window;
    this._width;
    this._height;
    
    this._mazeWidth = 15;
    this._mazeHeight = 15;
    this._boxSizeX = 40;
    this._boxSizeY = 40;
    this._maze;

    /**
     * Set up maze game
     */
    this.initialize = function (canvasElement, window) {
        _object = this;

        this._canvas = canvasElement;
        this._window = window;
        if (this._canvas && this._canvas.getContext) {
        	this._context = this._canvas.getContext('2d');
        	this._width = this._canvas.width;
        	this._height = this._canvas.height;
            //setInterval(this.drawCanvasEvent, 3000);
            this.logMessage('initialized with width ' + this._width);
            this.initializeMaze();
            this.drawCanvas();
            return true;
        } else {
            return false;
        }
    };
    
    /**
     * Set up the _maze structure
     */
    this.initializeMaze = function() {
    	// Determine correct maze size and cell sizes
    	// Basis is 15 cell width:
    	this._mazeWidth = 15;
    	// So that means width of individual cell of:
    	this._boxSizeX = Math.floor((this._width - 20) / this._mazeWidth);
    	// Keep cells square
    	this._boxSizeY = this._boxSizeX;
    	// Fill out height in cells too
    	this._mazeHeight = Math.floor((this._height - 20)/ this._boxSizeY);
    	
    	// initialize maze array (x, y)
    	this._maze = new Array(this._mazeWidth);
        for (var index = 0; index < this._maze.length; index++) {
        	this._maze[index] = new Array(this._mazeHeight);
        }
        // Put 'random' cells into the maze
        for (var xindex = 0; xindex < this._mazeWidth; xindex++) {
            for (var yindex = 0; yindex < this._mazeHeight; yindex++) {
            	var mazeCell = new MazeCell();
            	var setTop = (yindex == 0) || (this._maze[xindex][yindex - 1].hasBottom());
            	var setLeft = (xindex == 0) || (this._maze[xindex - 1][yindex].hasRight());
            	var mustHaveRight = (xindex == (this._mazeWidth - 1));
            	var mustHaveBottom = (yindex == (this._mazeHeight - 1));
            	mazeCell.initialize(setTop, setLeft, mustHaveRight, mustHaveBottom);
            	this._maze[xindex][yindex] = mazeCell;
            }
        }
        // TODO: Traverse all paths to exit, ensure there is a long enough path and no paths are shorter
    };

    /**
     * drawCanvas, as called from event function (fix reference to 'this')
     */
    this.drawCanvasEvent = function() {
    	_object.drawCanvas();
    };

    /**
     * Clear and redraw maze canvas (meant to be used within game loop)
     */
    this.drawCanvas = function() {
    	// Note: Do not use this here, called from event handler
    	this.logMessage('drawCanvas');

    	// General context settings used every time
    	this._context.strokeStyle = 'white';
    	this._context.fillStyle = 'white';
    	this._context.textBaseline = 'top'; 

    	// Redraw entire canvas, so clear entire sheet
    	this._context.fillStyle = 'black';
    	this._context.fillRect(0, 0, this._width, this._height);
    	this._context.fillStyle = 'white';
    	// Draw a white line around canvas
    	this._context.strokeRect(0, 0, this._width, this._height);
    	
    	this._context.font = 'bold 16px sans-serif';
    	this._context.textAlign = 'center';
    	this._context.fillText('Maze game', this._width / 2, 1);

    	// Draw maze
        for (var xindex = 0; xindex < this._mazeWidth; xindex++) {
            for (var yindex = 0; yindex < this._mazeHeight; yindex++) {
            	var mazeCell = this._maze[xindex][yindex];
            	var boxStartX = 5 + (xindex * this._boxSizeX);
            	var boxStartY = 20 + (yindex * this._boxSizeY);
            	mazeCell.drawBox(this._context, boxStartX, boxStartY, this._boxSizeX, this._boxSizeY);
            }
        }
        this._context.stroke();
        
        // TODO: Draw player

        this.logMessage('drawCanvas end');
    };
    
    /**
     * Logging function
     */
    this.logMessage = function(message) {
    	if (window.console && window.console.log) {
        	window.console.log('mazegame: ' + message);
    	}
    };
    
}

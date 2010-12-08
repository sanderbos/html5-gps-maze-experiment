
function MazeGame() {

    this.CheckInterval = 50;

    // Must be variables so drawCanvas function can use them
    var _canvas;
    var _context;
    var _window;
    var _object;
    var _width;
    var _height;
    
    var _mazeWidth = 15;
    var _mazeHeight = 10;
    var _boxSizeX = 40;
    var _boxSizeY = 40;
    var _maze;

    this.initialize = function (canvasElement, window) {
        _canvas = canvasElement;
        _window = window;
        _object = this;
        if (_canvas && _canvas.getContext) {
            _context = _canvas.getContext('2d');
            _width = _canvas.width;
            _height = _canvas.height;
            //setInterval(this.drawCanvas, 3000);
            this.logMessage('initialized with width ' + _width);
            this.initializeMaze();
            this.drawCanvas();
            return true;
        } else {
            return false;
        }
    };
    
    this.initializeMaze = function() {
    	// initialize array (x, y)
        _maze = new Array(_mazeWidth);
        for (var index = 0; index < _maze.length; index++) {
            _maze[index] = new Array(_mazeHeight);
        }
        for (var xindex = 0; xindex < _mazeWidth; xindex++) {
            for (var yindex = 0; yindex < _mazeHeight; yindex++) {
            	var mazeBox = new MazeBox();
            	var mustHaveTop = (yindex == 0) || (_maze[xindex][yindex - 1].hasBottom());
            	var mustHaveRight = (xindex == (_mazeWidth - 1));
            	var mustHaveBottom = (yindex == (_mazeHeight - 1));
            	var mustHaveLeft = (xindex == 0) || (_maze[xindex - 1][yindex].hasRight());
            	mazeBox.initialize(mustHaveTop, mustHaveRight, mustHaveBottom, mustHaveLeft);
            	_maze[xindex][yindex] = mazeBox;
            }
        }
    };

    this.logMessage = function (message) {
    	if (window.console && window.console.log) {
        	window.console.log('mazegame: ' + message);
    	}
    };

    this.drawCanvas = function () {
    	// Note: Do not use this here, called from event handler
    	_object.logMessage('drawCanvas');

    	// General context settings used every time
    	_context.strokeStyle = 'white';
    	_context.fillStyle = 'white';
    	_context.textBaseline = 'top'; 

    	// Redraw entire canvas, so clear entire sheet
    	_context.fillStyle = 'black';
    	_context.fillRect(0, 0, _width, _height);
    	_context.fillStyle = 'white';
    	// Draw a white line around canvas
    	_context.strokeRect(0, 0, _width, _height);
    	
    	_context.font = 'bold 16px sans-serif';
    	_context.textAlign = 'center';
    	_context.fillText('Maze game', _width / 2, 1);

    	// Draw maze
        for (var xindex = 0; xindex < _mazeWidth; xindex++) {
            for (var yindex = 0; yindex < _mazeHeight; yindex++) {
            	var mazeBox = _maze[xindex][yindex];
            	var boxStartX = 5 + (xindex * _boxSizeX);
            	var boxStartY = 5 + (yindex * _boxSizeY);
            	_object.logMessage(boxStartX + ', ' + boxStartY);
            	mazeBox.drawBox(_context, boxStartX, boxStartY, _boxSizeX, _boxSizeY);
            }
        }
        _context.stroke();
        
        // TODO: Draw player

        _object.logMessage('drawCanvas end');
    };
    
}


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
    var _mazeHeight = 15;
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
    	// Determine correct maze size and cell sizes
    	// Basis is 15 cell width:
    	_mazeWidth = 15;
    	// So that means width of individual cell of:
    	_boxSizeX = Math.floor((_width - 20) / _mazeWidth);
    	// Keep cells square
    	_boxSizeY = _boxSizeX;
    	// Fill out height in cells too
    	_mazeHeight = Math.floor((_height - 20)/ _boxSizeY);
    	
    	// initialize maze array (x, y)
        _maze = new Array(_mazeWidth);
        for (var index = 0; index < _maze.length; index++) {
            _maze[index] = new Array(_mazeHeight);
        }
        // Put 'random' cells into the maze
        for (var xindex = 0; xindex < _mazeWidth; xindex++) {
            for (var yindex = 0; yindex < _mazeHeight; yindex++) {
            	var mazeCell = new MazeCell();
            	var setTop = (yindex == 0) || (_maze[xindex][yindex - 1].hasBottom());
            	var setLeft = (xindex == 0) || (_maze[xindex - 1][yindex].hasRight());
            	var mustHaveRight = (xindex == (_mazeWidth - 1));
            	var mustHaveBottom = (yindex == (_mazeHeight - 1));
            	mazeCell.initialize(setTop, setLeft, mustHaveRight, mustHaveBottom);
            	_maze[xindex][yindex] = mazeCell;
            }
        }
        // TODO: Traverse all paths to exit, ensure there is a long enough path and no paths are shorter
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
            	var mazeCell = _maze[xindex][yindex];
            	var boxStartX = 5 + (xindex * _boxSizeX);
            	var boxStartY = 20 + (yindex * _boxSizeY);
            	mazeCell.drawBox(_context, boxStartX, boxStartY, _boxSizeX, _boxSizeY);
            }
        }
        _context.stroke();
        
        // TODO: Draw player

        _object.logMessage('drawCanvas end');
    };
    
}

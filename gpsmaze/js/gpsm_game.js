
function MazeGame() {

    this.CheckInterval = 50;

    // Must be variables so drawCanvas function can use them
    var _canvas;
    var _context;
    var _window;
    var _object;
    var _width;
    var _height;

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
            this.drawCanvas();
            return true;
        } else {
            return false;
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

    	_object.logMessage('drawCanvas end');
    };
    
}

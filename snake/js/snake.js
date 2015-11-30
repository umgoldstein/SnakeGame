var Coord = function (row, col) {
  this.row = row;
  this.col = col;
};

Coord.prototype.equals = function (coord) {
  // "this" is a coordinate that get compared to coord
  return (this.row == coord.row) && (this.col == coord.col);
};

Coord.prototype.isOpposite = function (coord) {
  return (this.row == (coord.row * -1)) && (this.col == (-1 * coord.col));
};

Coord.prototype.plus = function (coord) {
  return new Coord(this.row + coord.row, this.col + coord.col);
};

  var Snake = function (board) {
    this.dir = "S"; // , "E", "S", "W"]
    this.turning = false;
    this.board = board;

    var topCenter = new Coord(0, Math.floor(board.dim/2));
    this.segments = [topCenter];

    this.growTurns = 0;
  };

  Snake.DIRECTIONS = {
    "N": new Coord(-1, 0),
    "E": new Coord( 0, 1),
    "S": new Coord( 1, 0),
    "W": new Coord( 0, -1)
  };
  Snake.COORD_DIRS = [[-1,0],[0,1], [1,0],[0 -1]];

  Snake.prototype.move = function () {
    this.segments.push(this.head().plus(Snake.DIRECTIONS[this.dir]));
    this.turning = false;
    this.segments.shift();
  };



  Snake.prototype.turn = function (direction) {
    if (Snake.DIRECTIONS[this.dir].isOpposite(Snake.DIRECTIONS[direction]) ||
      this.turning) {
      return;
    } else {
      this.dir = direction;
      this.turning = true;
    }
  };

  Snake.prototype.isOccupying = function (array) {
  var result = false;
  this.segments.forEach(function (segment) {
    if (segment.row === array[0] && segment.col === array[1]) {
      result = true;
      return result;
    }
  });
  return result;
};

Snake.prototype.head = function () {
  return this.segments[this.segments.length - 1];
};

Snake.prototype.isValid = function () {
  var head = this.head();

  if (!this.board.validPosition(this.head())) {
    return false;
  }

  for (var i = 0; i < this.segments.length - 1; i++) {
    if (this.segments[i].equals(head)) {
      return false;
    }
  }

  return true;
};

  var Board = function (dimension) {
    this.dim = dimension;

    this.snake = new Snake(this);
  };

  Board.BLANK = ".";

  Board.blankGrid = function (dimension) {
    var grid = {};

    for ( var i = 0 ; i < dimension ; i++) {
      var row = [];
      for ( var j = 0 ; j < dimension ; j++) {
        row.push(Board.BLANK);
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    this.snake.segments.forEach(function (segment) {
      grid[segment.row][segment.col] = Snake.SYMBOL;
    });

    var rowStrs = [];
    grid.map(function (row) {
      return row.join("");
    }).join("\n");
  };

  Board.prototype.validPosition = function (coord) {
  return (coord.row >= 0) && (coord.row < this.dim) &&
    (coord.col >= 0) && (coord.col < this.dim);
  };

  module.exports = Board;
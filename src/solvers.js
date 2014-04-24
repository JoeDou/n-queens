/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.columnCount = function(board, n) {
  var sum = 0;
  var result = [];
  for (var col = 0; col < n; col++) {
    for (var row = 0; row < n; row++) {
      sum += board.get(row)[col];
    }
    if (sum) {
      result.push(col);
    }
    sum = 0;
  }
  return result;
};


window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var recurse = function(board, row) {
    board = board || new Board({'n':n});
    row = row || 0;
    var colArr = columnCount(board, n);
    for(var col = 0; col < n; col++) {
      if (colArr.indexOf(col) === -1) {
        board.togglePiece(row, col);
        // only if row < n
        row++;
        if (row < n) {
          recurse(board, row);
          row--;
        } else {
          if (solution.length < 1) {
            var arr = [];
            for (var j = 0; j < n; j++) {
              arr.push(board.get(j).slice(0));
            }
            var newBoard = new Board(arr);
            solution.push(newBoard);
          }
          return;
          //row--;
        }
        board.togglePiece(row,col);
      }
    }
  };

  recurse();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0].rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var recurse = function(board, row) {
    board = board || new Board({'n':n});
    row = row || 0;
    var colArr = columnCount(board, n);
    for(var col = 0; col < n; col++) {
      if (colArr.indexOf(col) === -1) {
        board.togglePiece(row, col);
        row++;
        if (row < n) {
          recurse(board, row);
          row--;
        } else {
          count++;
          row--;
        }
        board.togglePiece(row,col);
      }
    }
  };
  recurse();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return count;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var recurse = function(board, row) {
    board = board || new Board({'n':n});
    row = row || 0;
    var colArr = columnCount(board, n);
    for(var col = 0; col < n; col++) {
      if(solution.length > 0){
        return;
      }
      if (colArr.indexOf(col) === -1) {
        board.togglePiece(row, col);
        if (!board.hasAnyMinorDiagonalConflicts() &&
            !board.hasAnyMajorDiagonalConflicts()) {
          row++;
          if (row < n) {
            recurse(board, row);
            row--;
          } else {
            if (solution.length < 1) {
              var arr = [];
              for (var j = 0; j < n; j++) {
                arr.push(board.get(j).slice(0));
              }
              var newBoard = new Board(arr);
              solution.push(newBoard);
              return;
            }
            row--;
          }
        }
        board.togglePiece(row,col);
      }
    }
  };
  recurse();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  if (solution.length < 1) {
    return (new Board({'n':n})).rows();
  }
  return solution[0].rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0;
  var recurse = function(board, row) {
    board = board || new Board({'n':n});
    row = row || 0;
    var colArr = columnCount(board, n);
    for(var col = 0; col < n; col++) {
      if (colArr.indexOf(col) === -1) {
        board.togglePiece(row, col);
        // only if row < n
        if (!board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(row, col)) &&
            !board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(row, col))) {
          row++;
          if (row < n) {
            recurse(board, row);
            row--;
          } else {
            count++;
            row--;
          }
        }
        board.togglePiece(row,col);
      }
    }
  };
  recurse();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return count;
};

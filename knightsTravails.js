function knightClass(position, parent=null) {
  function generateAllMoves() {
    // moves shall be named according to the hands of clock
    let one = [position[0] + 1, position[1] + 2]
    let two = [position[0] + 2, position[1] + 1]

    let four = [position[0] + 2, position[1] - 1]
    let five = [position[0] + 1, position[1] - 2]

    let seven = [position[0] - 1, position[1] - 2]
    let eight = [position[0] - 2, position[1] - 1]

    let ten = [position[0] - 2, position[1] + 1]
    let eleven = [position[0] - 1, position[1] + 2]
    return {
      one,two,four,five,seven,eight,ten,eleven
    }
  }
  function moveChecker(position) {
    // if both x and y of position are between the values 0 and 7, return the position, else return null
    // this prevents the program from processing illegal moves
    if ((0 <= position[0]) && (position[0] <= 7) && (0 <= position[1]) && (position[1] <= 7)) {
      return position
    } else {
      return null;
    }
  }

  if (position === null) {
    return null;
  }

  let allMoves = generateAllMoves(position);
  return {
    position,
    parent,
    one: moveChecker(allMoves.one),
    two: moveChecker(allMoves.two),
    four: moveChecker(allMoves.four),
    five: moveChecker(allMoves.five),
    seven: moveChecker(allMoves.seven),
    eight: moveChecker(allMoves.eight),
    ten: moveChecker(allMoves.ten),
    eleven: moveChecker(allMoves.eleven)
  }
}

function knightMoves(startPos, finalPos) {
  // startPos and finalPos should be formated as [x,y], i.e. knightsMove([0,0], [1,2]) should out put something like 'shortest route takes 1 move(s), [0,0] -> [1,2]'
  function prettyPrint(arr) {
    let result = ''
    while (arr.length > 1) {
      result = result + '[' + arr[0] + '] --> '
      arr.shift()
    }
    return result  + '[' + arr[0] + ']'
  }

  function positionsAreNotEqual(position1, position2) {
    if ((position1[0] === position2[0]) && (position1[1] === position2[1])) {
      return false;
    } else {
      return true;
    }
  }

  let queue = [];
  queue.push(knightClass(startPos))
  while (queue[0] === null || positionsAreNotEqual(queue[0].position, finalPos)) {
    // continue searching until queue[0].position === finalPos
    currentNode = queue.shift();
    if (currentNode === null) {
      continue; // this should skip to next iteration of the loop, since the position doesn't exist, all move from that position are illegal and irrelevant
    }
    queue.push(knightClass(currentNode.one, currentNode));
    queue.push(knightClass(currentNode.two, currentNode));
    queue.push(knightClass(currentNode.four, currentNode));
    queue.push(knightClass(currentNode.five, currentNode));
    queue.push(knightClass(currentNode.seven, currentNode));
    queue.push(knightClass(currentNode.eight, currentNode));
    queue.push(knightClass(currentNode.ten, currentNode));
    queue.push(knightClass(currentNode.eleven, currentNode));
  }
  let moves = []
  result = queue.shift();
  while (result.parent) {
    moves.push(result.position)
    result = result.parent;
  }
  moves.push(result.position);
  return `It took ${moves.length - 1} move(s) to get from ${startPos} to ${finalPos} in this order: ` + prettyPrint(moves.reverse())
}

console.log(knightMoves([0,0], [7,7]))

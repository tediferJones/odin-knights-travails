function knightClass(currentPos, prevMoves=[]) { //}, level=0) {
  function generateAllMoves() {
    // moves shall be named according to the hands of clock
    // IF ANY OF THESE VARS IS EQUAL TO CURRENT POS, CHANGE IT TO NULL, THIS WILL PREVENT YOU FROM PROCESSING CIRCULAR MOVES
    let one = [currentPos[0] + 1, currentPos[1] + 2]
    let two = [currentPos[0] + 2, currentPos[1] + 1]

    let four = [currentPos[0] + 2, currentPos[1] - 1]
    let five = [currentPos[0] + 1, currentPos[1] - 2]

    let seven = [currentPos[0] - 1, currentPos[1] - 2]
    let eight = [currentPos[0] - 2, currentPos[1] - 1]

    let ten = [currentPos[0] - 2, currentPos[1] + 1]
    let eleven = [currentPos[0] - 1, currentPos[1] + 2]
    return {
      one,two,four,five,seven,eight,ten,eleven
    }
  }
  function moveChecker(position) {
    // if both x and y of position are between the values 0 and 7, return the position, else return null
    if ((0 <= position[0]) && (position[0] <= 7) && (0 <= position[1]) && (position[1] <= 7)) {
      return position
    } else {
      return null;
    }
  }
  if (currentPos === null) {
    return null;
  }
  let allMoves = generateAllMoves(currentPos);
  // console.log(allMoves.one);
  return {
    position: currentPos,
    prevMoves,
    // make each potential move a value of this object for easy reference in knightMoves function
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
// k = knightClass([1,1])
// console.log(k);

function boardClass() {
  return {

  }
}

// consider making a coordinate class, easier than referencing pos[0] as x and pos[1] as y

function knightMoves(startPos, finalPos) {
  // startPos and finalPos should be formated as [x,y], i.e. knightsMove([0,0], [1,2]) should out put something like 'shortest route takes 1 move(s), [0,0] -> [1,2]'
  // this is where the action happens
  // 0,0 is bottom left square, 8,8 is top right square, maximum board values (0 <= x <= 7),(0 <= y <= 7)
  // is the board really needed?  just make sure position values for x and y are between 0 and 7, if they excede these values, set to null

  // USE A QUEUE (refer to levelOrder function of the binary search tree for a basic example)
  // YOU SHOULD USE BREADTH FIRST SEARCHING (i think) 
  // breadth first searches the tree from top to bottom, i.e. checks root, then checks nodes at level 1, then level 2, and so on
  // in this scenario, the level of the node dictates the number of moves, and we want to find the so the highest node in the tree (least distance from root) thus requires the least number of moves

  function positionsAreNotEqual(position1, position2) {
    if ((position1[0] === position2[0]) && (position1[1] === position2[1])) {
      return false;
    } else {
      return true;
    }
  }



  let queue = [];
  queue.push(knightClass(startPos))
  // console.log(queue[0])
  while (queue[0] === null || positionsAreNotEqual(queue[0].position, finalPos)) {// (queue[0].currentPos != finalPos) { // replace this with a function that returns true or false, if start[0] = end[0] && start[1] = end[1] return true, else return false
    // console.log('WHILE STATEMENT')
    // counter should only increment in base 8, for iter 0 through 7, prevMoves[1]
    currentNode = queue.shift();
    if (currentNode === null) {
      continue; // this should skip to next iteration of the loop, since the position doesn't exist, all move from that position are illegal and irrelevant
    }
    let prevMoves = currentNode.prevMoves;
    prevMoves.push(currentNode.position);
    queue.push(knightClass(currentNode.one, prevMoves));
    queue.push(knightClass(currentNode.two, prevMoves));
    queue.push(knightClass(currentNode.four, prevMoves));
    queue.push(knightClass(currentNode.five, prevMoves));
    queue.push(knightClass(currentNode.seven, prevMoves));
    queue.push(knightClass(currentNode.eight, prevMoves));
    queue.push(knightClass(currentNode.ten, prevMoves));
    queue.push(knightClass(currentNode.eleven, prevMoves));
    // console.log(queue);
  }
  result = queue.shift();
  result.prevMoves.push(result.position)
  console.log(result.prevMoves)
  return `It took ${result.prevMoves.length} move(s), in this order`// + result.prevMoves;
}

console.log(knightMoves([0,0], [2,1]))

// I guess its time to fuck with the knightsMove function
// TEST [0,0] to [1,2]
// queue = knightClass([0,0])
// while ([0,0] != [1,2]) {
//   currentNode = knightClass([0,0]);
//   let prevMoves = currentNode.prevMoves => [];
//   prevMoves.push(currentNode.position) => prevMoves = [[0,0]]
//   pushall to queue
// }


// chess board is 8x8
// 8 potential knight moves [change in x, change in y]:
// [+2, +1] (up 2, right 1) NR
// [+2, -1] (up 2, left 1)  NL
// [-2, +1] (down 2, right 1) SR
// [-2, -1] (down 2, left 1) SL
// [+1, +2] (right 2, up 1) WR
// [-1, +2] (right 2, down 1) WL
// [+1, -2] (left 2, up 1) ER
// [-1, -2] (left 2, down 1) EL

// kind of like a binary tree
// the start position is root
// however instead of having 2 options, left and right, there are 8 options.  Create the tree, then find the shortest route to your desired node.
// BE CAREFUL
// the knight can exist at any location, so a loop that generates all possible moves is useless, keep generating until the correct result is found, then return number of steps and which moves to take


// psuedo code for:
// knightMoves(startPos, finalPos, moves=[], counter=0) {

//   // maybe dont go recursive, the queue only works if the function isnt recursive, otherwise your just queueing the 8 possible moves from the current position // we'll recursively call knightMoves(NEWPOS, finalPos)
//      the only upside to a recursive method is that it would be easier to keep track of which moves lead to which

//   let queue = []
//   queue.push(knightClass(startPos)) // repeat this for each move set
//   while (queue[0].currentPos != finalPos) maybe ?? idk
//     currentNode = queue.shift()
//     currentNode.prevMoves.push(currentNode.position)  //  moves.push(queue[0].position) // but only if its on the right path
//     counter++
  //   queue.push(knightClass(currentNode.nr))
  //   queue.push(knightClass(currentNode.nl))
  //   queue.push(knightClass(currentNode.sr))
  //   etc, etc...
//     queue.shift() // to actually remove the element once its been checked, this allowing the while loop to actually move through the list
  //   theoretically that will stack them in the queue in correct order, just need to figure out the right way to break the loop
//   return 'it took ${counter} move(s), in this order ${moves}'
// }

// each knight obj pushed into the queue shoul contain the previous moves to there

// start [0,0] end [1,2]
// queue = [knightClass[0,0]]
// while (queue[0].position != end) {
//   currentNode = queue.shift() => knightClass[0,0]
//   currentNode.prevMoves // .push(currentNode.currentPos)
//   // counter++
//   queue.push(knightClass([1,2], currentNode.position, counter)) // one o'clock move, i.e. nr
//   // do this for all 8 move types, once all options have been added to the queue, increase counter, it will take at least 1 move
//   counter++
// }
// while (queue[0] =!= end) => oh shit it does
// return (it took COUNTER moves to go from [0,0] to [1,2] in this order prevMoves)

// start [0,0] end [2,4]
// counter = 0 // you dont need a counter, just measure list of previous moves
// queue = [knightClass(start)] => [knightClass([0,0])]
// while {queue[0].position =!= end} {
//   currentNode = queue.shift() => knightClass([0,0])
//   queue.push(currentNode.nr) => knightClass([1,2], [0,0]) //, 0)
//   queue.push(currentNode.el) => knightClass([2,1], [0,0]) //, 0)
//   // push all other nodes
// }
// while (queue[0] != end) // we know the right path is in this next node, but the answer is not
//   currentNode = queue.shift() => knightClass([1,2], [0,0])
//   queue.push(currentNode.nr) => knightClass([2,4], prevMoves.push(currentNode.position))
//   // repeat for all nodes
// while loop will repeat 7 more times to go through the other possible options from root, we dont care about those
// once we reach the node we previoiusly pushed:
// while (queue[0] != end) => OH SHIT IT IS EQUAL
// result = queue.shift;
// return result.prevMoves & result.length
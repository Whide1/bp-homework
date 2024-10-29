process.stdin.resume();
process.stdin.setEncoding('utf8');

const detectIntersection = (nodes) => {
    const visitedNodes = new Set();

    for (const startNode of nodes) {
      let currentNode = startNode;
      while (currentNode && !visitedNodes.has(currentNode)) {
        visitedNodes.add(currentNode);
        currentNode = neighbourList.get(currentNode);
      }
      if (currentNode) {
        return true;
      }
    }
    return false;
}

const checkCycle = (startingNode) => {
  const visited = new Set();
  const stack = [startingNode];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (visited.has(currentNode)) return true;

    visited.add(currentNode);
    const nextNode = neighbourList.get(currentNode);
    if (nextNode) {
      stack.push(nextNode);
    }
  }
  return false;
}

const combinedResults = () => {
  for (const nodeSet of startingNodeSets) {
    const visitedNodesGlobal = new Set();
    let finished = false;
    let result = "OK";
    let startingNodeSetsIdx = 0;

    while (!finished && startingNodeSetsIdx < nodeSet.length) {
      const startNode = nodeSet[startingNodeSetsIdx];
      const visitedNodes = new Set();
      let currentNode = startNode;

      // Traversing the graph
      while (!finished && currentNode) {
        if (visitedNodes.has(currentNode)) {
          result = "CYCLE";
          finished = true;
        }
        else if (visitedNodesGlobal.has(currentNode)) {
          result = "INTERSECTION";
          finished = true;
        }
        else {
          visitedNodes.add(currentNode);
          visitedNodesGlobal.add(currentNode);
        }
        currentNode = neighbourList.get(currentNode);
      }
      startingNodeSetsIdx++;
      console.log(result);
    };
  }
};

// const startingNodeSets = [['a', 'c']];
// const neighbourList = new Map();
// neighbourList.set('a', 'b');
// neighbourList.set('b', 'x');
// neighbourList.set('c', 'd');

// combinedResults();

let stdin = '';
process.stdin.on('data', (chunk) => {
  stdin = `${stdin}${chunk}`;
}).on('end', () => {
  const lines = stdin.trim().split('\n');
  let parseSets = false;
 
  // Parsing the input
  // 1 -> 2
  // 2 -> 3
  // 3 -> 4
  // 4 -> 1
  for (const line of lines) {
    if (!parseSets && line.includes(',')) {
      parseSets = true;
    }
    if (!parseSets) {
      const [from, to] = line.split('->');
       neighbourList.set(from, to);
    }
    else {
      startingNodeSets.push(line.split(','));
    }
  }
  // Now we have the startingNodes and the neighbours ready to go
  // Lets iterate through and solve the problem
  combinedResults();
});
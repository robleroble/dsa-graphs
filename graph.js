class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let vertexAdjacents = vertex.adjacent;
    for (let adjacent of vertexAdjacents) {
      this.removeEdge(adjacent, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let visitedVertices = new Set();
    let finalReturnedVertices = [];
    let currentVertex;

    while (toVisitStack.length > 0) {
      // remove last item from toVisitStack
      currentVertex = toVisitStack.pop();
      // add value of item to finalArray
      finalReturnedVertices.push(currentVertex.value);
      // add vertex to visitedVertexes set
      visitedVertices.add(currentVertex);

      // loop over adjacents of current node and add to stack and visited vertices
      for (let adjacent of currentVertex.adjacent) {
        if (!visitedVertices.has(adjacent)) {
          toVisitStack.push(adjacent);
          visitedVertices.add(adjacent);
        }
      }
    }
    return finalReturnedVertices;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visitedVertices = new Set();
    let finalReturnedVertices = [];
    let currentVertex;

    while (toVisitQueue.length > 0) {
      // remove first item from toVisitQueue
      currentVertex = toVisitQueue.shift();
      // add value of item to finalArray
      finalReturnedVertices.push(currentVertex.value);
      // add vertex to visitedVertexes set
      visitedVertices.add(currentVertex);

      // loop over adjacents of current node and add to stack and visited vertices
      for (let adjacent of currentVertex.adjacent) {
        if (!visitedVertices.has(adjacent)) {
          toVisitQueue.push(adjacent);
          visitedVertices.add(adjacent);
        }
      }
    }
    return finalReturnedVertices;
  }
}

module.exports = { Graph, Node };

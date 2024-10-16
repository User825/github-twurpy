const base = {
  names: ['car 1', 'car 2', 'car 3'],
  values: [
    [1, 2, 3, 4],
    [2, 4, 1, 4],
    [2, 3, 1, 0],
  ],
};

const incr = {
  names: ['car 1', 'car 2', 'car 7', 'car 8'],
  values: [[4], [4], [0], [1]],
};

const expectedResult = {
  names: ['car 1', 'car 2', 'car 3', 'car 7', 'car 8'],
  values: [
    [2, 3, 4, 4],
    [4, 1, 4, 4],
    [3, 1, 0, null],
    [null, null, null, 0],
    [null, null, null, 1],
  ],
};

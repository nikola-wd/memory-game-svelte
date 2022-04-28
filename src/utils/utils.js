const cellsTemplate = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 34, 25, 26, 27, 28, 29, 30,
];

const makeRepeatedArr = (arr, n) =>
  Array.from({ length: n }, () => arr)
    .flat()
    .map((item, index) => ({ key: index, val: item, solved: false }));

const shuffleArray = (arr) => {
  const updatedArr = [...arr];
  for (let i = updatedArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = updatedArr[i];
    updatedArr[i] = updatedArr[j];
    updatedArr[j] = temp;
  }
  return updatedArr;
};

const markSolved = (arr, peekArr) => {
  let updatedArr = [...arr];
  updatedArr = updatedArr.map((cell) => {
    if (cell.key === peekArr[0] || cell.key === peekArr[1]) {
      cell.solved = true;
    }

    return cell;
  });
  return updatedArr;
};

export { cellsTemplate, makeRepeatedArr, shuffleArray, markSolved };

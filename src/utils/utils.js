const cellsTemplate = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const makeRepeatedArr = (arr, n) =>
  Array.from({ length: n }, () => arr)
    .flat()
    .map((item, index) => ({ key: index, val: item, solved: false }));

const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
  }
  return newArr;
};

export { cellsTemplate, makeRepeatedArr, shuffleArray };

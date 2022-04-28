<script>
  import { afterUpdate } from 'svelte';

  let size = 4
  const cellsTemplate = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  let peekTwo = []

  const makeRepeatedArr = (arr, n) => Array.from({length: n}, () => arr).flat().map((item, index) => ({key: index, val: item, solved: false}))

  let cells = makeRepeatedArr(cellsTemplate.slice(0, size * 2), 2)

  const handleClick = (key) => {
    if (peekTwo.length === 2) {
      peekTwo = [key]
    } else {
      peekTwo = [...peekTwo, key]
    }
  }


  afterUpdate(() => {
		if (
        peekTwo.length === 2 
        && 
        cells[peekTwo[0]].val === cells[peekTwo[1]].val
      ) {
      const updatedCells = [...cells]
      updatedCells[peekTwo[0]].solved = true
      updatedCells[peekTwo[1]].solved = true
      cells = updatedCells
      peekTwo = []
    }
	});

</script>

<div class="grid" style="--size: {size}">
  {#each cells as cell, index (cell.key)}
    <div 
      class="
        cell 
        {peekTwo.includes(cell.key) ? 'peek' : ''}
        {cell.solved ? 'solved' : ''}
      "
      data-cell-val="{cell.val}" 
      on:click="{() => handleClick(cell.key)}"
    />
	{/each}
</div>

<div>{JSON.stringify(peekTwo)}</div>
<div>{JSON.stringify(cells, null, 2)}</div>

<style scoped>
.grid {
  --padd: 10px;
  --grid-size: 300px;
  background: #f6fafd;
  margin-top: 1rem;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--padd);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  /* align-content: flex-start; */
  width: var(--grid-size);
  height: var(--grid-size);
  user-select: none;
}
.cell {
  --cell-size: calc((var(--grid-size) - var(--padd) * (var(--size) - 1) ) / var(--size));
  position: relative;
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: 3px;
  transform-style: preserve-3d;
  transition: all 1.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cell:after,
.cell:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
}

.cell:before {
  content: attr(data-cell-val);
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background: teal;
  color: #fff;
}
.cell:after {
  backface-visibility: hidden;
  background: #cecece;
  z-index: 1;
}

/* .cell:hover, */
.cell.peek,
.cell.solved {
  transform: rotateY(180deg);
}

.cell.solved:before {
  background: lightblue;
}
</style>
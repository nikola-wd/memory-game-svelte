<div class="grid" style="--size: {size}">
  {#each cells as cell, index (cell.key)}
    <Cell 
      peekTwo="{peekTwo}" 
      cell="{cell}" 
      onHandleClick="{handleClick}" 
    />
	{/each}
</div>

<div>{JSON.stringify(peekTwo)}</div>
<div>{JSON.stringify(cells, null, 2)}</div>


<script>
  import { afterUpdate } from 'svelte';
  import Cell from './Cell.svelte'

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
  width: var(--grid-size);
  height: var(--grid-size);
  user-select: none;
  padding-bottom: 0;
}
</style>
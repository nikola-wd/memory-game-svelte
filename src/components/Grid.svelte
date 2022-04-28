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

  import {cellsTemplate, makeRepeatedArr, shuffleArray} from '../utils/utils'

  // State
  let size = 4
  let peekTwo = []
  let cells = shuffleArray(makeRepeatedArr(cellsTemplate.slice(0, size * 2), 2))

  const handleClick = (key) => {
    if (peekTwo.includes(key)) return

    if (peekTwo.length === 2) {
      peekTwo = [key]
    } else {
      peekTwo = [...peekTwo, key]
    }
  }


  afterUpdate(() => {
    console.log(111)

		if (
      peekTwo.length === 2 
      && 
      cells[peekTwo[0]].val === cells[peekTwo[1]].val
    ) {
      let updatedCells = [...cells]
      console.log(updatedCells)
      updatedCells = updatedCells.map(cell => {
        console.log(cell)
        if (
          cell.key === peekTwo[0]
          ||
          cell.key === peekTwo[1]
        ) {
          console.log('Yooo')
          cell.solved = true
        }
      })
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
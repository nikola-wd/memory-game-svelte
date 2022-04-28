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
<!-- <div>{JSON.stringify(cells, null, 2)}</div> -->


<script>
  import { afterUpdate } from 'svelte';
  import Cell from './Cell.svelte'

  import {cellsTemplate, makeRepeatedArr, shuffleArray, markSolved} from '../utils/utils'

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

  $: twoMatched = (
    peekTwo.length === 2 
    && 
    cells.find(c => c.key === peekTwo[0]).val === cells.find(c => c.key === peekTwo[1]).val
  )


  afterUpdate(() => {
		if (twoMatched) {
      cells = markSolved(cells, peekTwo)
      peekTwo = []
    }
	});

</script>



<style scoped>
.grid {
  --padd: 10px;
  --cell-size: 60px;
  --grid-size: calc(var(--cell-size) * var(--size));
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
  user-select: none;
  margin-bottom: calc(-1 * var(--padd))
}
</style>
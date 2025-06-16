import './style.css'
import {createSankeyChart} from "./SankeyDrawer.ts";
import {NikeData} from "./NikeData.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container">
    <h2>Budget data example</h2>
    <div id="svg-container-budget"></div>
  </div>
`

const container: HTMLDivElement = document.querySelector<HTMLDivElement>('#svg-container-budget')!

const budgetSankeyChart = createSankeyChart(NikeData)
container.append(budgetSankeyChart)

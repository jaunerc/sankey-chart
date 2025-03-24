import './style.css'
import {budgetData, budgetNodeFullNames} from "./BudgetData.ts";
import {createSankeyChart} from "./SankeyDrawer.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container">
    <h2>Budget data example</h2>
    <div id="svg-container-budget"></div>
  </div>
`


const container: HTMLDivElement = document.querySelector<HTMLDivElement>('#svg-container-budget')!


const budgetSankeyChart = createSankeyChart(budgetData, budgetNodeFullNames)
container.append(budgetSankeyChart)

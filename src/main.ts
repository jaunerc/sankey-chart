import * as d3 from 'd3';
import './style.css'
import {sankey, sankeyLeft, SankeyLink, sankeyLinkHorizontal, SankeyNode} from "d3-sankey";
import {budgetData, budgetNodeFullNames} from "./BudgetData.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container">
    <h2>Budget data example</h2>
    <div id="svg-container-budget"></div>
  </div>
  </div>
`

interface ISankeyNode {
    name: string
}

interface ISankeyLink {
}

const width = 600
const height = 500
const nodeLabelPadding = 6

const container: HTMLDivElement = document.querySelector<HTMLDivElement>('#svg-container-budget')!

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

const generator = sankey<ISankeyNode, ISankeyLink>()
    .nodeId(data => data.name)
    .nodeWidth(15)
    .nodePadding(20)
    .nodeAlign(sankeyLeft)
    .nodeSort((a, b) => b.value! - a.value!)
    .extent([[0, 5], [width, height - 5]])

const sankeyGraph = generator(budgetData)
const nodeNames = budgetNodeFullNames

svg.append('g')
    .selectAll()
    .data<SankeyNode<ISankeyNode, ISankeyLink>>(sankeyGraph.nodes)
    .join('rect')
    .attr('x', d => d.x0!)
    .attr('y', d => d.y0!)
    .attr("height", d => d.y1! - d.y0!)
    .attr("width", d => d.x1! - d.x0!)
    .attr('fill', '#693382')
    .append('title')
    .text(d => `${nodeNames.get(d.name)}\n${d.value}`)

svg.append('g')
    .selectAll()
    .data<SankeyNode<ISankeyNode, ISankeyLink>>(sankeyGraph.nodes)
    .join('text')
    .attr('x', d => d.x0! < width / 2 ? d.x1! + nodeLabelPadding : d.x0! - nodeLabelPadding)
    .attr('y', d => (d.y1! + d.y0!) / 2)
    .attr('dy', '0.35em')
    .attr("height", d => d.y1! - d.y0!)
    .attr("width", d => d.x1! - d.x0!)
    .attr('text-anchor', d => d.x0! < width / 2 ? 'start' : 'end')
    .text(d => nodeNames.get(d.name))

svg.append('g')
    .attr('fill', 'none')
    .style('mix-blend-mode', 'multiply')
    .selectAll('g')
    .data<SankeyLink<ISankeyNode, ISankeyLink>>(sankeyGraph.links)
    .join('g')
    .attr('x1', link => (link.source as SankeyNode<ISankeyNode, ISankeyLink>).x1!)
    .attr('x2', link => (link.target as SankeyNode<ISankeyNode, ISankeyLink>).x0!)
    .append('path')
    .attr('d', sankeyLinkHorizontal())
    .attr('stroke-opacity', 0.3)
    .attr("stroke-width", ({width}) => Math.max(1, width!))
    .attr('stroke', '#693382')
    .append('title')
    .attr('font-size', '20px')
    .text(d => {
        const source = d.source as SankeyNode<ISankeyNode, ISankeyLink>
        const target = d.target as SankeyNode<ISankeyNode, ISankeyLink>
        return `${nodeNames.get(source.name)} ⇨ ${nodeNames.get(target.name)}\n${d.value}`
    })

container.append(svg.node()!)

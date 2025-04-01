import {sankey, SankeyGraph, sankeyLeft, SankeyLink, sankeyLinkHorizontal, SankeyNode} from "d3-sankey";
import {ISankeyLink, ISankeyNode} from "./Definitions.ts";
import * as d3 from "d3";

export function createSankeyChart(data: SankeyGraph<ISankeyNode, ISankeyLink>, nodeNames: Map<string, string>): SVGSVGElement {
    const width = 800
    const height = 600
    const nodeLabelPadding = 6
    const color = '#693382';

    // initial svg creation
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // sankey generator
    const generator = sankey<ISankeyNode, ISankeyLink>()
        .nodeId(data => data.name)
        .nodeWidth(15)
        .nodePadding(20)
        .nodeAlign(sankeyLeft)
        .nodeSort((a, b) => b.value! - a.value!)
        .extent([[0, 5], [width, height - 5]])
    const sankeyGraph = generator(data)

    // node rects
    svg.append('g')
        .selectAll()
        .data<SankeyNode<ISankeyNode, ISankeyLink>>(sankeyGraph.nodes)
        .join('rect')
        .attr('x', d => d.x0!)
        .attr('y', d => d.y0!)
        .attr("height", d => d.y1! - d.y0!)
        .attr("width", d => d.x1! - d.x0!)
        .attr('fill', color)
        .append('title')
        .text(d => `${nodeNames.get(d.name)}\n${d.value}`)

    // node labels
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
        .text(d => nodeNames.get(d.name)!)

    // links
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
        .attr('stroke', color)
        .append('title')
        .text(d => {
            const source = d.source as SankeyNode<ISankeyNode, ISankeyLink>
            const target = d.target as SankeyNode<ISankeyNode, ISankeyLink>
            return `${nodeNames.get(source.name)} ⇨ ${nodeNames.get(target.name)}\n${d.value}`
        })

    return svg.node()!
}

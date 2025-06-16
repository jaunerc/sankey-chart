import {sankey, SankeyGraph, sankeyLeft, SankeyLink, SankeyNode} from "d3-sankey";
import {ISankeyLink, ISankeyNode} from "./Definitions.ts";
import * as d3 from "d3";

export function createSankeyChart(data: SankeyGraph<ISankeyNode, ISankeyLink>): SVGSVGElement {
    const width = 1000
    const height = 600
    const nodeLabelPadding = 6
    const color = '#693382';

    // Initial svg creation
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Sankey generator
    const generator = sankey<ISankeyNode, ISankeyLink>()
        .nodeId(data => data.name)
        .nodeWidth(15)
        .nodePadding(20)
        .nodeAlign(sankeyLeft)
        .nodeSort((a, b) => b.value! - a.value!)
        .extent([[0, 5], [width, height - 5]])
    const sankeyGraph = generator(data)

    // Node rectangles
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
        .text(d => `${d.name}\n${d.value}`)

    // Node labels
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
        .text(d => d.name!)

    // Links
    svg.append('g')
        .attr('fill', 'none')
        .style('mix-blend-mode', 'multiply')
        .selectAll('g')
        .data<SankeyLink<ISankeyNode, ISankeyLink>>(sankeyGraph.links)
        .join('g')
        .attr('x1', link => (link.source as SankeyNode<ISankeyNode, ISankeyLink>).x1!)
        .attr('x2', link => (link.target as SankeyNode<ISankeyNode, ISankeyLink>).x0!)
        .append('path')
        .attr('d', link => sankeyLinkPathHorizontal(link))
        .attr('fill-opacity', 0.3)
        .attr("stroke-width", ({width}) => Math.max(1, width!))
        .attr('fill', color)
        .append('title')
        .text(d => {
            const source = d.source as SankeyNode<ISankeyNode, ISankeyLink>
            const target = d.target as SankeyNode<ISankeyNode, ISankeyLink>
            return `${source.name} ⇨ ${target.name}\n${d.value}`
        })

    return svg.node()!
}

// Fix for the reported issue https://github.com/d3/d3-sankey/issues/111
function sankeyLinkPathHorizontal(link: SankeyLink<ISankeyNode, ISankeyLink>): string {
    // Source and target of the link
    const sourceNode: SankeyNode<ISankeyNode, ISankeyLink> = link.source as ISankeyNode;
    const targetNode: SankeyNode<ISankeyNode, ISankeyLink> = link.target as ISankeyNode;
    const sx1: number = sourceNode.x1!;
    const tx0: number = targetNode.x0!;

    // All four corners of the link
    const linkWidthOrMinWidth: number = Math.max(link.width!, 1);
    const lsy0: number = link.y0! - (linkWidthOrMinWidth / 2);
    const lsy1: number = link.y0! + (linkWidthOrMinWidth / 2);
    const lty0: number = link.y1! - (linkWidthOrMinWidth / 2);
    const lty1: number = link.y1! + (linkWidthOrMinWidth / 2);

    // Center of the link
    const lcx: number = sx1 + (tx0 - sx1) / 2;
    let lcxLeft: number = link.y0! < link.y1! ? lcx + linkWidthOrMinWidth / 2 : lcx - linkWidthOrMinWidth / 2;
    let lcxRight: number = link.y0! > link.y1! ? lcx + linkWidthOrMinWidth / 2 : lcx - linkWidthOrMinWidth / 2;

    const horizontalGapBetweenNodes: number = Math.abs(lty0 - lsy0);
    if (horizontalGapBetweenNodes < linkWidthOrMinWidth) {
        lcxLeft = lcx;
        lcxRight = lcx;
    }

    // Define the outline of the link as path
    const path: d3.Path = d3.path();
    path.moveTo(sx1, lsy0);
    path.bezierCurveTo(lcxLeft, lsy0, lcxLeft, lty0, tx0, lty0);
    path.lineTo(tx0, lty1);
    path.bezierCurveTo(lcxRight, lty1, lcxRight, lsy1, sx1, lsy1);
    path.lineTo(sx1, lsy0);
    return path.toString();
}

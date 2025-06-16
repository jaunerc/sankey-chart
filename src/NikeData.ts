import {SankeyGraph} from "d3-sankey";
import {ISankeyLink, ISankeyNode} from "./Definitions.ts";

const links: Array<ISankeyLink> = [
    {source: 'Footwear', target: 'North America', value: 2245},
    {source: 'Footwear', target: 'Europe, Middle East & Africa', value: 1419},
    {source: 'Footwear', target: 'Greater China', value: 1022},
    {source: 'Footwear', target: 'Asia Pacific & Latin America', value: 879},
    {source: 'Apparel', target: 'North America', value: 1405},
    {source: 'Apparel', target: 'Europe, Middle East & Africa', value: 794},
    {source: 'Apparel', target: 'Asia Pacific & Latin America', value: 360},
    {source: 'Apparel', target: 'Greater China', value: 490},
    {source: 'Equipment', target: 'North America', value: 132},
    {source: 'Equipment', target: 'Europe, Middle East & Africa', value: 100},
    {source: 'Equipment', target: 'Greater China', value: 32},
    {source: 'Equipment', target: 'Asia Pacific & Latin America', value: 59},
    {source: 'North America', target: 'NIKE Brand', value: 3782},
    {source: 'Europe, Middle East & Africa', target: 'NIKE Brand', value: 2313},
    {source: 'Greater China', target: 'NIKE Brand', value: 1544},
    {source: 'Asia Pacific & Latin America', target: 'NIKE Brand', value: 1298},
    {source: 'Global Brand Divisions', target: 'NIKE Brand', value: 9},
    {source: 'NIKE Brand', target: 'Revenues', value: 8946},
    {source: 'Converse', target: 'Revenues', value: 425},
    {source: 'Corporate', target: 'Revenues', value: 3},
    {source: 'Revenues', target: 'Cost of sales', value: 5269},
    {source: 'Revenues', target: 'Gross profit', value: 4105},
    {source: 'Gross profit', target: 'Selling and administrative expense', value: 3142},
    {source: 'Gross profit', target: 'Interest expense', value: 14},
    {source: 'Gross profit', target: 'Income before taxes', value: 949},
    {source: 'Other income', target: 'Income before taxes', value: 48},
    {source: 'Selling and administrative expense', target: 'Demand creation expense', value: 910},
    {source: 'Selling and administrative expense', target: 'Operating overhead expense', value: 2232},
    {source: 'Income before taxes', target: 'Tax expense', value: 150},
    {source: 'Income before taxes', target: 'Net income', value: 847},
]

function extractNodes(): Array<ISankeyNode> {
    const nodeNames: Array<string> = []
    links.forEach(link => {
        if (!nodeNames.includes(link.source)) {
            nodeNames.push(link.source)
        }
        if (!nodeNames.includes(link.target)) {
            nodeNames.push(link.target)
        }
    })
    return nodeNames.map(nodeName => {return {name: nodeName}})
}

export const NikeData: SankeyGraph<ISankeyNode, ISankeyLink> = {
    nodes: extractNodes(),
    links
}
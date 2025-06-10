import {SankeyGraph} from "d3-sankey";
import {ISankeyLink, ISankeyNode} from "./Definitions.ts";

export const budgetData: SankeyGraph<ISankeyNode, ISankeyLink> = {
    nodes: [{name: 'GroI'},{name: 'AhvC'},{name: 'NoIC'},{name: 'Pen'},{name: 'SicI'},
        {name: 'NetI'},{name: 'Rent'},{name: 'Pen3a'},{name: 'HeaI'},{name: 'Ski'},
        {name: 'MobI'},{name: 'Cyc'},{name: 'Inv'},{name: 'Tra'},{name: 'Gro'},{name: 'Str'},
        {name: 'Den'},{name: 'Sha'},{name: 'Cry'},{name: 'Bit'},{name: 'Eth'},],
    links: [
        {source: 'GroI', target: 'NetI', value: 900},
        {source: 'GroI', target: 'AhvC', value: 30},
        {source: 'GroI', target: 'NoIC', value: 25},
        {source: 'GroI', target: 'Pen', value: 20},
        {source: 'GroI', target: 'SicI', value: 25},

        {source: 'NetI', target: 'Rent', value: 300},
        {source: 'NetI', target: 'Inv', value: 300},
        {source: 'NetI', target: 'Pen3a', value: 100},
        {source: 'NetI', target: 'HeaI', value: 30},
        {source: 'NetI', target: 'Ski', value: 20},
        {source: 'NetI', target: 'MobI', value: 5},
        {source: 'NetI', target: 'Cyc', value: 95},
        {source: 'NetI', target: 'Tra', value: 18},
        {source: 'NetI', target: 'Gro', value: 22},
        {source: 'NetI', target: 'Str', value: 5},
        {source: 'NetI', target: 'Den', value: 5},

        {source: 'Inv', target: 'Sha', value: 100},
        {source: 'Inv', target: 'Cry', value: 200},

        {source: 'Cry', target: 'Bit', value: 100},
        {source: 'Cry', target: 'Eth', value: 100},
    ]
}

const budgetNodeFullNames = new Map()
budgetNodeFullNames.set('GroI', 'Gross Income')
budgetNodeFullNames.set('AhvC', 'AHV contribution')
budgetNodeFullNames.set('NoIC', 'Non-industrial accident')
budgetNodeFullNames.set('Pen', 'Pension fund EE')
budgetNodeFullNames.set('SicI', 'Sick pay insurance')
budgetNodeFullNames.set('NetI', 'Net Income')
budgetNodeFullNames.set('Rent', 'Rent')
budgetNodeFullNames.set('Pen3a', 'Private pension (pillar 3a)')
budgetNodeFullNames.set('HeaI', 'Health insurance')
budgetNodeFullNames.set('Ski', 'Skiing')
budgetNodeFullNames.set('MobI', 'Mobile and internet')
budgetNodeFullNames.set('Cyc', 'Cycling')
budgetNodeFullNames.set('Inv', 'Investment')
budgetNodeFullNames.set('Tra', 'Travel')
budgetNodeFullNames.set('Gro', 'Groceries')
budgetNodeFullNames.set('Str', 'Streaming')
budgetNodeFullNames.set('Den', 'Dentist')
budgetNodeFullNames.set('Sha', 'Shares')
budgetNodeFullNames.set('Cry', 'Cryptocurrencies')
budgetNodeFullNames.set('Bit', 'Bitcoin')
budgetNodeFullNames.set('Eth', 'Ethereum')
export {budgetNodeFullNames}

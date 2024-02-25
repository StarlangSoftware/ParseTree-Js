import {ParseNode} from "./ParseNode";
import * as fs from "fs";
import {NodeCollector} from "./NodeCollector";
import {IsEnglishLeaf} from "./NodeCondition/IsEnglishLeaf";
import {ConstituentSpan} from "./ConstituentSpan";

export class ParseTree {

    static sentenceLabels = ["SINV", "SBARQ", "SBAR", "SQ", "S"];

    protected root: ParseNode = undefined
    protected name: string

    /**
     * Basic constructor for a ParseTree. Initializes the root node with the input.
     * @param rootOrFileName Root node of the tree
     */
    constructor(rootOrFileName?: any) {
        if (rootOrFileName != undefined){
            if (rootOrFileName instanceof ParseNode){
                this.root = rootOrFileName
            } else {
                let data = fs.readFileSync(rootOrFileName, 'utf8')
                let line = data.split("\n")[0]
                if (line.includes("(") && line.includes(")")) {
                    line = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")")).trim();
                    this.root = new ParseNode(undefined, line, false);
                }
            }
        }
    }

    setName(name: string){
        this.name = name
    }

    getName(): String{
        return this.name
    }

    /**
     * Gets the next leaf node after the given leaf node in the ParseTree.
     * @param parseNode ParseNode for which next node is calculated.
     * @return Next leaf node after the given leaf node.
     */
    nextLeafNode(parseNode: ParseNode): ParseNode{
        let nodeCollector = new NodeCollector(this.root, new IsEnglishLeaf());
        let leafList = nodeCollector.collect();
        for (let i = 0; i < leafList.length - 1; i++){
            if (leafList[i] == parseNode){
                return leafList[i + 1];
            }
        }
        return undefined;
    }

    /**
     * Gets the previous leaf node before the given leaf node in the ParseTree.
     * @param parseNode ParseNode for which previous node is calculated.
     * @return Previous leaf node before the given leaf node.
     */
    previousLeafNode(parseNode: ParseNode): ParseNode{
        let nodeCollector = new NodeCollector(this.root, new IsEnglishLeaf());
        let leafList = nodeCollector.collect();
        for (let i = 1; i < leafList.length; i++){
            if (leafList[i] == parseNode){
                return leafList[i - 1];
            }
        }
        return undefined;
    }

    /**
     * Calls recursive method to calculate the number of all nodes, which have more than one children.
     * @return Number of all nodes, which have more than one children.
     */
    nodeCountWithMultipleChildren(): number{
        return this.root.nodeCountWithMultipleChildren();
    }

    /**
     * Calls recursive method to calculate the number of all nodes tree.
     * @return Number of all nodes in the tree.
     */
    nodeCount(): number{
        return this.root.nodeCount();
    }

    /**
     * Calls recursive method to calculate the number of all leaf nodes in the tree.
     * @return Number of all leaf nodes in the tree.
     */
    leafCount(): number{
        return this.root.leafCount();
    }

    isFullSentence(): boolean{
        if (this.root != undefined && ParseTree.sentenceLabels.includes(this.root.getData().getName())){
            return true;
        }
        return false;
    }

    /**
     * Generates a list of constituents in the parse tree and their spans.
     * @return A list of constituents in the parse tree and their spans.
     */
    constituentSpanList(): Array<ConstituentSpan>{
        let result = new Array<ConstituentSpan>();
        if (this.root != undefined){
            this.root.constituentSpanList(1, result);
        }
        return result;
    }

    /**
     * Calls recursive method to restore the parents of all nodes in the tree.
     */
    correctParents(){
        this.root.correctParents()
    }

    /**
     * Calls recursive method to remove all nodes starting with the symbol X. If the node is removed, its children are
     * connected to the next sibling of the deleted node.
     */
    removeXNodes(){
        this.root.removeXNodes()
    }

    /**
     * Calls recursive method to remove all punctuation nodes from the tree.
     */
    stripPunctuation(){
        this.root.stripPunctuation()
    }

    /**
     * Accessor method for the root node.
     * @return Root node
     */
    getRoot(): ParseNode{
        return this.root
    }

    /**
     * Calls recursive function to convert the tree to a string.
     * @return A string which contains all words in the tree.
     */
    toString(): string{
        return this.root.toString()
    }

    /**
     * Calls recursive function to convert the tree to a sentence.
     * @return A sentence which contains all words in the tree.
     */
    toSentence(): string{
        return this.root.toSentence().trim()
    }

    /**
     * Calls recursive function to count the number of words in the tree.
     * @param excludeStopWords If true, stop words are not counted.
     * @return Number of words in the tree.
     */
    wordCount(excludeStopWords: boolean): number{
        return this.root.wordCount(excludeStopWords);
    }

}
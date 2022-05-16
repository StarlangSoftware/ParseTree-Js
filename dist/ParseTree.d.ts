import { ParseNode } from "./ParseNode";
import { ConstituentSpan } from "./ConstituentSpan";
export declare class ParseTree {
    static sentenceLabels: string[];
    protected root: ParseNode;
    protected name: string;
    /**
     * Basic constructor for a ParseTree. Initializes the root node with the input.
     * @param rootOrFileName Root node of the tree
     */
    constructor(rootOrFileName?: any);
    setName(name: string): void;
    getName(): String;
    /**
     * Gets the next leaf node after the given leaf node in the ParseTree.
     * @param parseNode ParseNode for which next node is calculated.
     * @return Next leaf node after the given leaf node.
     */
    nextLeafNode(parseNode: ParseNode): ParseNode;
    /**
     * Gets the previous leaf node before the given leaf node in the ParseTree.
     * @param parseNode ParseNode for which previous node is calculated.
     * @return Previous leaf node before the given leaf node.
     */
    previousLeafNode(parseNode: ParseNode): ParseNode;
    /**
     * Calls recursive method to calculate the number of all nodes, which have more than one children.
     * @return Number of all nodes, which have more than one children.
     */
    nodeCountWithMultipleChildren(): number;
    /**
     * Calls recursive method to calculate the number of all nodes tree.
     * @return Number of all nodes in the tree.
     */
    nodeCount(): number;
    /**
     * Calls recursive method to calculate the number of all leaf nodes in the tree.
     * @return Number of all leaf nodes in the tree.
     */
    leafCount(): number;
    isFullSentence(): boolean;
    /**
     * Generates a list of constituents in the parse tree and their spans.
     * @return A list of constituents in the parse tree and their spans.
     */
    constituentSpanList(): Array<ConstituentSpan>;
    /**
     * Calls recursive method to restore the parents of all nodes in the tree.
     */
    correctParents(): void;
    /**
     * Calls recursive method to remove all punctuation nodes from the tree.
     */
    stripPunctuation(): void;
    /**
     * Accessor method for the root node.
     * @return Root node
     */
    getRoot(): ParseNode;
    /**
     * Calls recursive function to convert the tree to a string.
     * @return A string which contains all words in the tree.
     */
    toString(): string;
    /**
     * Calls recursive function to convert the tree to a sentence.
     * @return A sentence which contains all words in the tree.
     */
    toSentence(): string;
    /**
     * Calls recursive function to count the number of words in the tree.
     * @param excludeStopWords If true, stop words are not counted.
     * @return Number of words in the tree.
     */
    wordCount(excludeStopWords: boolean): number;
}

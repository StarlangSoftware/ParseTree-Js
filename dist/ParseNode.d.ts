import { Symbol } from "./Symbol";
import { ConstituentSpan } from "./ConstituentSpan";
export declare class ParseNode {
    protected children: Array<ParseNode>;
    protected parent: ParseNode;
    protected data: Symbol;
    static ADJP: string[];
    static ADVP: string[];
    static CONJP: string[];
    static FRAG: Array<string>;
    static INTJ: Array<string>;
    static LST: string[];
    static NAC: string[];
    static PP: string[];
    static PRN: Array<string>;
    static PRT: string[];
    static QP: string[];
    static RRC: string[];
    static S: string[];
    static SBAR: string[];
    static SBARQ: string[];
    static SINV: string[];
    static SQ: string[];
    static UCP: Array<string>;
    static VP: string[];
    static WHADJP: string[];
    static WHADVP: string[];
    static WHNP: string[];
    static WHPP: string[];
    static NP1: string[];
    static NP2: string[];
    static NP3: string[];
    static NP4: string[];
    static NP5: string[];
    /**
     * Constructs a ParseNode from a single line. If the node is a leaf node, it only sets the data. Otherwise, splits
     * the line w.r.t. spaces and paranthesis and calls itself resursively to generate its child parseNodes.
     * @param parentOrLeftOrSymbol The parent node of this node.
     * @param lineOrRightOrData The input line to create this parseNode.
     * @param dataOrIsleaf True, if this node is a leaf node; false otherwise.
     */
    constructor(parentOrLeftOrSymbol?: any, lineOrRightOrData?: any, dataOrIsleaf?: any);
    /**
     * Extracts the head of the children of this current node.
     * @param priorityList Depending on the pos of current node, the priorities among the children are given with this parameter
     * @param direction Depending on the pos of the current node, search direction is either from left to right, or from
     *                  right to left.
     * @param defaultCase If true, and no child appears in the priority list, returns first child on the left, or first
     *                    child on the right depending on the search direction.
     * @return Head node of the children of the current node
     */
    private searchHeadChild;
    /**
     * If current node is not a leaf, it has one or more children, this method determines recursively the head of
     * that (those) child(ren). Otherwise, it returns itself. In this way, this method returns the head of all leaf
     * successors.
     * @return Head node of the descendant leaves of this current node.
     */
    headLeaf(): ParseNode;
    /**
     * Calls searchHeadChild to determine the head node of all children of this current node. The search direction and
     * the search priority list is determined according to the symbol in this current parent node.
     * @return Head node among its children of this current node.
     */
    headChild(): ParseNode;
    /**
     * Returns an iterator for the child nodes of this {@link ParseNode}.
     * @return Iterator for the children of thid very node.
     */
    getChildIterator(): IterableIterator<ParseNode>;
    /**
     * Adds a child node at the end of the children node list.
     * @param child Child node to be added.
     * @param index Index where the new child node will be added.
     */
    addChild(child: ParseNode, index?: number): void;
    /**
     * Recursive method to remove all nodes starting with the symbol X. If the node is removed, its children are
     * connected to the next sibling of the deleted node.
     */
    removeXNodes(): void;
    /**
     * Recursive method to restore the parents of all nodes below this node in the hierarchy.
     */
    correctParents(): void;
    /**
     * Replaces a child node at the given specific with a new child node.
     * @param index Index where the new child node replaces the old one.
     * @param child Child node to be replaced.
     */
    setChild(index: number, child: ParseNode): void;
    /**
     * Removes a given child from children node list.
     * @param child Child node to be deleted.
     */
    removeChild(child: ParseNode): void;
    /**
     * Recursive method to calculate the number of all leaf nodes in the subtree rooted with this current node.
     * @return Number of all leaf nodes in the current subtree.
     */
    leafCount(): number;
    /**
     * Recursive method to calculate the number of all nodes in the subtree rooted with this current node.
     * @return Number of all nodes in the current subtree.
     */
    nodeCount(): number;
    /**
     * Recursive method to calculate the number of all nodes, which have more than one children, in the subtree rooted
     * with this current node.
     * @return Number of all nodes, which have more than one children, in the current subtree.
     */
    nodeCountWithMultipleChildren(): number;
    /**
     * Recursive method to remove all punctuation nodes from the current subtree.
     */
    stripPunctuation(): void;
    /**
     * Returns number of children of this node.
     * @return Number of children of this node.
     */
    numberOfChildren(): number;
    /**
     * Returns the i'th child of this node.
     * @param i Index of the retrieved node.
     * @return i'th child of this node.
     */
    getChild(i: number): ParseNode;
    /**
     * Returns the first child of this node.
     * @return First child of this node.
     */
    firstChild(): ParseNode;
    /**
     * Returns the last child of this node.
     * @return Last child of this node.
     */
    lastChild(): ParseNode;
    /**
     * Checks if the given node is the last child of this node.
     * @param child To be checked node.
     * @return True, if child is the last child of this node, false otherwise.
     */
    isLastChild(child: ParseNode): boolean;
    /**
     * Returns the index of the given child of this node.
     * @param child Child whose index shoud be returned.
     * @return Index of the child of this node.
     */
    getChildIndex(child: ParseNode): number;
    /**
     * Returns true if the given node is a descendant of this node.
     * @param node Node to check if it is descendant of this node.
     * @return True if the given node is descendant of this node.
     */
    isDescendant(node: ParseNode): boolean;
    /**
     * Returns the previous sibling (sister) of this node.
     * @return If this is the first child of its parent, returns null. Otherwise, returns the previous sibling of this
     * node.
     */
    previousSibling(): ParseNode;
    /**
     * Returns the next sibling (sister) of this node.
     * @return If this is the last child of its parent, returns null. Otherwise, returns the next sibling of this
     * node.
     */
    nextSibling(): ParseNode;
    /**
     * Accessor for the parent attribute.
     * @return Parent of this node.
     */
    getParent(): ParseNode;
    /**
     * Accessor for the data attribute.
     * @return Data of this node.
     */
    getData(): Symbol;
    /**
     * Mutator of the data attribute.
     * @param data Data to be set.
     */
    setData(data: Symbol): void;
    /**
     * Recursive function to count the number of words in the subtree rooted at this node.
     * @param excludeStopWords If true, stop words are not counted.
     * @return Number of words in the subtree rooted at this node.
     */
    wordCount(excludeStopWords: boolean): number;
    /**
     * Construct recursively the constituent span list of a subtree rooted at this node.
     * @param startIndex Start index of the leftmost leaf node of this subtree.
     * @param list Returned span list.
     */
    constituentSpanList(startIndex: number, list: Array<ConstituentSpan>): void;
    /**
     * Returns true if this node is leaf, false otherwise.
     * @return true if this node is leaf, false otherwise.
     */
    isLeaf(): boolean;
    /**
     * Returns true if this node does not contain a meaningful data, false otherwise.
     * @return true if this node does not contain a meaningful data, false otherwise.
     */
    isDummyNode(): boolean;
    /**
     * Recursive function to convert the subtree rooted at this node to a sentence.
     * @return A sentence which contains all words in the subtree rooted at this node.
     */
    toSentence(): string;
    /**
     * Recursive function to convert the subtree rooted at this node to a string.
     * @return A string which contains all words in the subtree rooted at this node.
     */
    toString(): string;
    /**
     * Swaps the given child node of this node with the previous sibling of that given node. If the given node is the
     * leftmost child, it swaps with the last node.
     * @param node Node to be swapped.
     */
    moveLeft(node: ParseNode): void;
    /**
     * Recursive function to concatenate the data of the all ascendant nodes of this node to a string.
     * @return A string which contains all data of all the ascendant nodes of this node.
     */
    ancestorString(): string;
    /**
     * Swaps the given child node of this node with the next sibling of that given node. If the given node is the
     * rightmost child, it swaps with the first node.
     * @param node Node to be swapped.
     */
    moveRight(node: ParseNode): void;
}

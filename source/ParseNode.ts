import {Symbol} from "./Symbol";
import {SearchDirectionType} from "./SearchDirectionType";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {ConstituentSpan} from "./ConstituentSpan";

export class ParseNode {

    protected children: Array<ParseNode> = new Array<ParseNode>()
    protected parent : ParseNode = undefined
    protected data : Symbol = undefined

    static ADJP = ["NNS", "QP", "NN", "$", "ADVP", "JJ", "VBN", "VBG", "ADJP", "JJR", "NP", "JJS", "DT", "FW", "RBR", "RBS", "SBAR", "RB"]
    static ADVP = ["RB", "RBR", "RBS", "FW", "ADVP", "TO", "CD", "JJR", "JJ", "IN", "NP", "JJS", "NN"]
    static CONJP = ["CC", "RB", "IN"]
    static FRAG : Array<string> = []
    static INTJ : Array<string> = []
    static LST = ["LS", ":"]
    static NAC = ["NN", "NNS", "NNP", "NNPS", "NP", "NAC", "EX", "$", "CD", "QP", "PRP", "VBG", "JJ", "JJS", "JJR", "ADJP", "FW"]
    static PP = ["IN", "TO", "VBG", "VBN", "RP", "FW"]
    static PRN : Array<string> = []
    static PRT = ["RP"]
    static QP = ["$", "IN", "NNS", "NN", "JJ", "RB", "DT", "CD", "NCD", "QP", "JJR", "JJS"]
    static RRC = ["VP", "NP", "ADVP", "ADJP", "PP"]
    static S = ["TO", "IN", "VP", "S", "SBAR", "ADJP", "UCP", "NP"]
    static SBAR = ["WHNP", "WHPP", "WHADVP", "WHADJP", "IN", "DT", "S", "SQ", "SINV", "SBAR", "FRAG"]
    static SBARQ = ["SQ", "S", "SINV", "SBARQ", "FRAG"]
    static SINV = ["VBZ", "VBD", "VBP", "VB", "MD", "VP", "S", "SINV", "ADJP", "NP"]
    static SQ = ["VBZ", "VBD", "VBP", "VB", "MD", "VP", "SQ"]
    static UCP : Array<string> = []
    static VP = ["TO", "VBD", "VBN", "MD", "VBZ", "VB", "VBG", "VBP", "VP", "ADJP", "NN", "NNS", "NP"]
    static WHADJP = ["CC", "WRB", "JJ", "ADJP"]
    static WHADVP = ["CC", "WRB"]
    static WHNP = ["WDT", "WP", "WP$", "WHADJP", "WHPP", "WHNP"]
    static WHPP = ["IN", "TO", "FW"]
    static NP1 = ["NN", "NNP", "NNPS", "NNS", "NX", "POS", "JJR"]
    static NP2 = ["NP"]
    static NP3 = ["$", "ADJP", "PRN"]
    static NP4 = ["CD"]
    static NP5 = ["JJ" , "JJS", "RB", "QP"]

    /**
     * Constructs a ParseNode from a single line. If the node is a leaf node, it only sets the data. Otherwise, splits
     * the line w.r.t. spaces and paranthesis and calls itself resursively to generate its child parseNodes.
     * @param parentOrLeftOrSymbol The parent node of this node.
     * @param lineOrRightOrData The input line to create this parseNode.
     * @param dataOrIsleaf True, if this node is a leaf node; false otherwise.
     */
    constructor(parentOrLeftOrSymbol?: any, lineOrRightOrData?: any, dataOrIsleaf?: any) {
        if (parentOrLeftOrSymbol != undefined || lineOrRightOrData != undefined){
            if (parentOrLeftOrSymbol instanceof Symbol){
                this.data = parentOrLeftOrSymbol
            } else {
                if (lineOrRightOrData instanceof Symbol &&
                    parentOrLeftOrSymbol instanceof ParseNode){
                    let data = lineOrRightOrData
                    let left = parentOrLeftOrSymbol
                    this.children.push(left)
                    left.parent = this
                    this.data = data
                } else {
                    if (lineOrRightOrData instanceof ParseNode &&
                        parentOrLeftOrSymbol instanceof ParseNode &&
                        dataOrIsleaf instanceof Symbol){
                        let data = dataOrIsleaf
                        let left = parentOrLeftOrSymbol
                        let right = lineOrRightOrData
                        this.children.push(left)
                        left.parent = this
                        this.children.push(right)
                        right.parent = this
                        this.data = data
                    } else {
                        if (parentOrLeftOrSymbol instanceof ParseNode || parentOrLeftOrSymbol == undefined){
                            let parent = parentOrLeftOrSymbol
                            let line = <string> lineOrRightOrData
                            let isLeaf = <boolean> dataOrIsleaf
                            let parenthesisCount = 0;
                            let childLine = "";
                            this.parent = parent;
                            if (isLeaf){
                                this.data = new Symbol(line);
                            } else {
                                this.data = new Symbol(line.substring(1, line.indexOf(" ")));
                                if (line.indexOf(")") == line.lastIndexOf(")")){
                                    this.children.push(new ParseNode(this, line.substring(line.indexOf(" ") + 1, line.indexOf(")")), true));
                                } else {
                                    for (let i = line.indexOf(" ") + 1; i < line.length; i++){
                                        if (line.charAt(i) != ' ' || parenthesisCount > 0){
                                            childLine = childLine + line.charAt(i);
                                        }
                                        if (line.charAt(i) == '('){
                                            parenthesisCount++;
                                        } else {
                                            if (line.charAt(i) == ')'){
                                                parenthesisCount--;
                                            }
                                        }
                                        if (parenthesisCount == 0 && childLine != ""){
                                            this.children.push(new ParseNode(this, childLine.trim(), false));
                                            childLine = "";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Extracts the head of the children of this current node.
     * @param priorityList Depending on the pos of current node, the priorities among the children are given with this parameter
     * @param direction Depending on the pos of the current node, search direction is either from left to right, or from
     *                  right to left.
     * @param defaultCase If true, and no child appears in the priority list, returns first child on the left, or first
     *                    child on the right depending on the search direction.
     * @return Head node of the children of the current node
     */
    private searchHeadChild(priorityList: Array<string>, direction: SearchDirectionType, defaultCase: boolean): ParseNode{
        switch (direction){
            case SearchDirectionType.LEFT:
                for (let item of priorityList) {
                    for (let child of this.children) {
                        if (child.getData().trimSymbol().getName() == item) {
                            return child;
                        }
                    }
                }
                if (defaultCase){
                    return this.firstChild();
                }
                break;
            case SearchDirectionType.RIGHT:
                for (let item of priorityList) {
                    for (let j = this.children.length - 1; j >= 0; j--) {
                        let child = this.children[j];
                        if (child.getData().trimSymbol().getName() == item) {
                            return child;
                        }
                    }
                }
                if (defaultCase){
                    return this.lastChild();
                }
        }
        return undefined;
    }

    /**
     * If current node is not a leaf, it has one or more children, this method determines recursively the head of
     * that (those) child(ren). Otherwise, it returns itself. In this way, this method returns the head of all leaf
     * successors.
     * @return Head node of the descendant leaves of this current node.
     */
    headLeaf(): ParseNode{
        if (this.children.length > 0){
            let head = this.headChild();
            if (head != undefined){
                return head.headLeaf();
            } else {
                return undefined;
            }
        } else {
            return this;
        }
    }

    /**
     * Calls searchHeadChild to determine the head node of all children of this current node. The search direction and
     * the search priority list is determined according to the symbol in this current parent node.
     * @return Head node among its children of this current node.
     */
    headChild(): ParseNode{
        switch (this.data.trimSymbol().toString()){
            case "ADJP":
                return this.searchHeadChild(ParseNode.ADJP, SearchDirectionType.LEFT, true);
            case "ADVP":
                return this.searchHeadChild(ParseNode.ADVP, SearchDirectionType.RIGHT, true);
            case "CONJP":
                return this.searchHeadChild(ParseNode.CONJP, SearchDirectionType.RIGHT, true);
            case "FRAG":
                return this.searchHeadChild(ParseNode.FRAG, SearchDirectionType.RIGHT, true);
            case "INTJ":
                return this.searchHeadChild(ParseNode.INTJ, SearchDirectionType.LEFT, true);
            case "LST":
                return this.searchHeadChild(ParseNode.LST, SearchDirectionType.RIGHT, true);
            case "NAC":
                return this.searchHeadChild(ParseNode.NAC, SearchDirectionType.LEFT, true);
            case "PP":
                return this.searchHeadChild(ParseNode.PP, SearchDirectionType.RIGHT, true);
            case "PRN":
                return this.searchHeadChild(ParseNode.PRN, SearchDirectionType.LEFT, true);
            case "PRT":
                return this.searchHeadChild(ParseNode.PRT, SearchDirectionType.RIGHT, true);
            case "QP":
                return this.searchHeadChild(ParseNode.QP, SearchDirectionType.LEFT, true);
            case "RRC":
                return this.searchHeadChild(ParseNode.RRC, SearchDirectionType.RIGHT, true);
            case "S":
                return this.searchHeadChild(ParseNode.S, SearchDirectionType.LEFT, true);
            case "SBAR":
                return this.searchHeadChild(ParseNode.SBAR, SearchDirectionType.LEFT, true);
            case "SBARQ":
                return this.searchHeadChild(ParseNode.SBARQ, SearchDirectionType.LEFT, true);
            case "SINV":
                return this.searchHeadChild(ParseNode.SINV, SearchDirectionType.LEFT, true);
            case "SQ":
                return this.searchHeadChild(ParseNode.SQ, SearchDirectionType.LEFT, true);
            case "UCP":
                return this.searchHeadChild(ParseNode.UCP, SearchDirectionType.RIGHT, true);
            case "VP":
                return this.searchHeadChild(ParseNode.VP, SearchDirectionType.LEFT, true);
            case "WHADJP":
                return this.searchHeadChild(ParseNode.WHADJP, SearchDirectionType.LEFT, true);
            case "WHADVP":
                return this.searchHeadChild(ParseNode.WHADVP, SearchDirectionType.RIGHT, true);
            case "WHNP":
                return this.searchHeadChild(ParseNode.WHNP, SearchDirectionType.LEFT, true);
            case "WHPP":
                return this.searchHeadChild(ParseNode.WHPP, SearchDirectionType.RIGHT, true);
            case "NP":
                if (this.lastChild().getData().getName() == "POS"){
                    return this.lastChild();
                } else {
                    let result = this.searchHeadChild(ParseNode.NP1, SearchDirectionType.RIGHT, false);
                    if (result != undefined){
                        return result;
                    } else {
                        result = this.searchHeadChild(ParseNode.NP2, SearchDirectionType.LEFT, false);
                        if (result != undefined){
                            return result;
                        } else {
                            result = this.searchHeadChild(ParseNode.NP3, SearchDirectionType.RIGHT, false);
                            if (result != undefined){
                                return result;
                            } else {
                                result = this.searchHeadChild(ParseNode.NP4, SearchDirectionType.RIGHT, false);
                                if (result != undefined){
                                    return result;
                                } else {
                                    result = this.searchHeadChild(ParseNode.NP5, SearchDirectionType.RIGHT, false);
                                    if (result != undefined){
                                        return  result;
                                    } else {
                                        return this.lastChild();
                                    }
                                }
                            }
                        }
                    }
                }
        }
        return undefined;
    }

    /**
     * Returns an iterator for the child nodes of this {@link ParseNode}.
     * @return Iterator for the children of thid very node.
     */
    getChildIterator(): IterableIterator<ParseNode>{
        return this.children.values()
    }

    /**
     * Adds a child node at the end of the children node list.
     * @param child Child node to be added.
     * @param index Index where the new child node will be added.
     */
    addChild(child: ParseNode, index?: number){
        if (index == undefined){
            this.children.push(child);
        } else {
            this.children.splice(index, 0, child)
        }
        child.parent = this;
    }

    /**
     * Recursive method to restore the parents of all nodes below this node in the hierarchy.
     */
    correctParents(){
        for (let child of this.children){
            child.parent = this;
            child.correctParents();
        }
    }

    /**
     * Replaces a child node at the given specific with a new child node.
     * @param index Index where the new child node replaces the old one.
     * @param child Child node to be replaced.
     */
    setChild(index: number, child: ParseNode){
        this.children.splice(index, 0, child)
    }

    /**
     * Removes a given child from children node list.
     * @param child Child node to be deleted.
     */
    removeChild(child: ParseNode){
        for (let i = 0; i < this.children.length; i++){
            if (this.children[i] == child){
                this.children.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Recursive method to calculate the number of all leaf nodes in the subtree rooted with this current node.
     * @return Number of all leaf nodes in the current subtree.
     */
    leafCount(): number{
        if (this.children.length == 0){
            return 1;
        } else {
            let sum = 0;
            for (let child of this.children) {
                sum += child.leafCount();
            }
            return sum;
        }
    }

    /**
     * Recursive method to calculate the number of all nodes in the subtree rooted with this current node.
     * @return Number of all nodes in the current subtree.
     */
    nodeCount(): number{
        if (this.children.length > 0){
            let sum = 1;
            for (let child of this.children){
                sum += child.nodeCount();
            }
            return sum;
        } else {
            return 1;
        }
    }

    /**
     * Recursive method to calculate the number of all nodes, which have more than one children, in the subtree rooted
     * with this current node.
     * @return Number of all nodes, which have more than one children, in the current subtree.
     */
    nodeCountWithMultipleChildren(): number{
        if (this.children.length > 1){
            let sum = 1;
            for (let child of this.children){
                sum += child.nodeCountWithMultipleChildren();
            }
            return sum;
        } else {
            return 0;
        }
    }

    /**
     * Recursive method to remove all punctuation nodes from the current subtree.
     */
    stripPunctuation(){
        for (let i = 0; i < this.children.length; i++){
            let node = this.children[i]
            if (Word.isPunctuation(node.getData().getName())){
                this.children.splice(i, 1)
                i--;
            }
        }
        for (let node of this.children){
            node.stripPunctuation();
        }
    }

    /**
     * Returns number of children of this node.
     * @return Number of children of this node.
     */
    numberOfChildren(): number{
        return this.children.length
    }

    /**
     * Returns the i'th child of this node.
     * @param i Index of the retrieved node.
     * @return i'th child of this node.
     */
    getChild(i: number): ParseNode{
        return this.children[i]
    }

    /**
     * Returns the first child of this node.
     * @return First child of this node.
     */
    firstChild(): ParseNode{
        return this.children[0]
    }

    /**
     * Returns the last child of this node.
     * @return Last child of this node.
     */
    lastChild(): ParseNode{
        return this.children[this.children.length - 1]
    }

    /**
     * Checks if the given node is the last child of this node.
     * @param child To be checked node.
     * @return True, if child is the last child of this node, false otherwise.
     */
    isLastChild(child: ParseNode): boolean{
        return this.children[this.children.length - 1] == child;
    }

    /**
     * Returns the index of the given child of this node.
     * @param child Child whose index shoud be returned.
     * @return Index of the child of this node.
     */
    getChildIndex(child: ParseNode): number{
        return this.children.indexOf(child)
    }

    /**
     * Returns true if the given node is a descendant of this node.
     * @param node Node to check if it is descendant of this node.
     * @return True if the given node is descendant of this node.
     */
    isDescendant(node: ParseNode): boolean{
        for (let aChild of this.children){
            if (aChild == node){
                return true;
            } else {
                if (aChild.isDescendant(node)){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns the previous sibling (sister) of this node.
     * @return If this is the first child of its parent, returns null. Otherwise, returns the previous sibling of this
     * node.
     */
    previousSibling(): ParseNode{
        for (let i = 1; i < this.parent.children.length; i++){
            if (this.parent.children[i] == this){
                return this.parent.children[i - 1];
            }
        }
        return undefined;
    }

    /**
     * Returns the next sibling (sister) of this node.
     * @return If this is the last child of its parent, returns null. Otherwise, returns the next sibling of this
     * node.
     */
    nextSibling(): ParseNode{
        for (let i = 0; i < this.parent.children.length - 1; i++){
            if (this.parent.children[i] == this){
                return this.parent.children[i + 1];
            }
        }
        return undefined;
    }

    /**
     * Accessor for the parent attribute.
     * @return Parent of this node.
     */
    getParent(): ParseNode{
        return this.parent
    }

    /**
     * Accessor for the data attribute.
     * @return Data of this node.
     */
    getData(): Symbol{
        return this.data
    }

    /**
     * Mutator of the data attribute.
     * @param data Data to be set.
     */
    setData(data: Symbol){
        this.data = data
    }

    /**
     * Recursive function to count the number of words in the subtree rooted at this node.
     * @param excludeStopWords If true, stop words are not counted.
     * @return Number of words in the subtree rooted at this node.
     */
    wordCount(excludeStopWords: boolean): number{
        let sum
        if (this.children.length == 0){
            if (!excludeStopWords){
                sum = 1;
            } else {
                if (Word.isPunctuation(this.data.getName())
                    || this.data.getName().includes("*") || this.data.getName().toLowerCase() == "at" || this.data.getName().toLowerCase() == "the"
                    || this.data.getName().toLowerCase() == "to" || this.data.getName().toLowerCase() == "a" || this.data.getName().toLowerCase() == "an"
                    || this.data.getName().toLowerCase() == "not" || this.data.getName().toLowerCase() == "is" || this.data.getName().toLowerCase() == "was"
                    || this.data.getName().toLowerCase() == "were" || this.data.getName().toLowerCase() == "have" || this.data.getName().toLowerCase() == "had"
                    || this.data.getName().toLowerCase() == "has"
                    || this.data.getName().toLowerCase() == "by" || this.data.getName().toLowerCase() == "at" || this.data.getName().toLowerCase() == "on"
                    || this.data.getName().toLowerCase() == "off" || this.data.getName().toLowerCase() == "'s" || this.data.getName().toLowerCase() == "n't"
                    || this.data.getName().toLowerCase() == "can" || this.data.getName().toLowerCase() == "could" || this.data.getName().toLowerCase() == "may"
                    || this.data.getName().toLowerCase() == "might" || this.data.getName().toLowerCase() == "will" || this.data.getName().toLowerCase() == "would"
                    || this.data.getName().toLowerCase() == "as" || this.data.getName().toLowerCase() == "with"
                    || this.data.getName().toLowerCase() == "for" || this.data.getName().toLowerCase() == "will" || this.data.getName().toLowerCase() == "would"
                    || this.data.getName().toLowerCase() == "than" || this.data.getName().toLowerCase() == "$"
                    || this.data.getName().toLowerCase() == "and" || this.data.getName().toLowerCase() == "or" || this.data.getName().toLowerCase() == "of"
                    || this.data.getName().toLowerCase() == "are" || this.data.getName().toLowerCase() == "be" || this.data.getName().toLowerCase() == "been"
                    || this.data.getName().toLowerCase() == "do" || this.data.getName().toLowerCase() == "few" || this.data.getName().toLowerCase() == "there"
                    || this.data.getName().toLowerCase() == "up" || this.data.getName().toLowerCase() == "down" || this.data.getName().toLowerCase() == "in"
                    || this.data.getName().toLowerCase() == "'re") {
                    sum = 0;
                } else {
                    sum = 1;
                }
            }
        }
        else{
            sum = 0;
        }
        for (let aChild of this.children) {
            sum += aChild.wordCount(excludeStopWords);
        }
        return sum;
    }

    /**
     * Construct recursively the constituent span list of a subtree rooted at this node.
     * @param startIndex Start index of the leftmost leaf node of this subtree.
     * @param list Returned span list.
     */
    constituentSpanList(startIndex: number, list: Array<ConstituentSpan>){
        if (this.children.length > 0){
            list.push(new ConstituentSpan(this.data, startIndex, startIndex + this.leafCount()));
        }
        let total = 0;
        for (let parseNode of this.children){
            parseNode.constituentSpanList(startIndex + total, list);
            total += parseNode.leafCount();
        }
    }

    /**
     * Returns true if this node is leaf, false otherwise.
     * @return true if this node is leaf, false otherwise.
     */
    isLeaf(): boolean{
        return this.children.length == 0
    }

    /**
     * Returns true if this node does not contain a meaningful data, false otherwise.
     * @return true if this node does not contain a meaningful data, false otherwise.
     */
    isDummyNode(): boolean{
        return this.getData().getName().includes("*") || (this.getData().getName() == "0" &&
            this.parent.getData().getName() == "-NONE-");
    }

    /**
     * Recursive function to convert the subtree rooted at this node to a sentence.
     * @return A sentence which contains all words in the subtree rooted at this node.
     */
    toSentence(): string{
        if (this.children.length == 0){
            if (this.getData() != undefined && !this.isDummyNode()){
                return " " + this.getData().getName().replace("-LRB-", "(").
                replace("-RRB-", ")").replace("-LSB-", "[").
                replace("-RSB-", "]").replace("-LCB-", "{").
                replace("-RCB-", "}").replace("-lrb-", "(").
                replace("-rrb-", ")").replace("-lsb-", "[").
                replace("-rsb-", "]").replace("-lcb-", "{").
                replace("-rcb-", "}");
            } else {
                if (this.isDummyNode()){
                    return "";
                } else {
                    return " ";
                }
            }
        } else {
            let st = "";
            for (let aChild of this.children) {
                st = st + aChild.toSentence();
            }
            return st;
        }
    }

    /**
     * Recursive function to convert the subtree rooted at this node to a string.
     * @return A string which contains all words in the subtree rooted at this node.
     */
    toString(): string{
        if (this.children.length < 2){
            if (this.children.length < 1){
                return this.getData().getName();
            } else {
                return "(" + this.data.getName() + " " + this.firstChild().toString() + ")";
            }
        } else {
            let st = "(" + this.data.getName();
            for (let aChild of this.children) {
                st = st + " " + aChild.toString();
            }
            return st + ") ";
        }
    }

    /**
     * Swaps the given child node of this node with the previous sibling of that given node. If the given node is the
     * leftmost child, it swaps with the last node.
     * @param node Node to be swapped.
     */
    moveLeft(node: ParseNode){
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] == node){
                if (i == 0){
                    let tmp = this.children[0]
                    this.children[0] = this.children[this.children.length - 1]
                    this.children[this.children.length - 1] = tmp
                } else {
                    let tmp = this.children[i]
                    this.children[i] = this.children[(i - 1) % this.children.length]
                    this.children[this.children.length - 1] = tmp
                }
                return;
            }
        }
        for (let aChild of this.children){
            aChild.moveLeft(node);
        }
    }

    /**
     * Recursive function to concatenate the data of the all ascendant nodes of this node to a string.
     * @return A string which contains all data of all the ascendant nodes of this node.
     */
    ancestorString(): string{
        if (parent == undefined){
            return this.data.getName();
        } else {
            return this.parent.ancestorString() + this.data.getName();
        }
    }

    /**
     * Swaps the given child node of this node with the next sibling of that given node. If the given node is the
     * rightmost child, it swaps with the first node.
     * @param node Node to be swapped.
     */
    moveRight(node: ParseNode){
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] == node){
                if (i == this.children.length - 1){
                    let tmp = this.children[0]
                    this.children[0] = this.children[this.children.length - 1]
                    this.children[this.children.length - 1] = tmp
                } else {
                    let tmp = this.children[i]
                    this.children[i] = this.children[(i + 1) % this.children.length]
                    this.children[this.children.length - 1] = tmp
                }
            }
        }
        for (let aChild of this.children){
            aChild.moveRight(node);
        }
    }
}
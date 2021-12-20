import { NodeCondition } from "./NodeCondition/NodeCondition";
import { ParseNode } from "./ParseNode";
export declare class NodeCollector {
    private condition;
    private rootNode;
    /**
     * Constructor for the NodeCollector class. NodeCollector's main aim is to collect a set of ParseNode's from a
     * subtree rooted at rootNode, where the ParseNode's satisfy a given NodeCondition, which is implemented by other
     * interface class.
     * @param rootNode Root node of the subtree
     * @param condition The condition interface for which all nodes in the subtree rooted at rootNode will be checked
     */
    constructor(rootNode: ParseNode, condition: NodeCondition);
    /**
     * Private recursive method to check all descendants of the parseNode, if they ever satisfy the given node condition
     * @param parseNode Root node of the subtree
     * @param collected The {@link Array} where the collected ParseNode's will be stored.
     */
    private collectNodes;
    /**
     * Collects and returns all ParseNode's satisfying the node condition.
     * @return All ParseNode's satisfying the node condition.
     */
    collect(): Array<ParseNode>;
}

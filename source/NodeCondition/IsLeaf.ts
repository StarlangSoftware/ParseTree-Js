import {NodeCondition} from "./NodeCondition";
import {ParseNode} from "../ParseNode";

export class IsLeaf implements NodeCondition{

    /**
     * Implemented node condition for the leaf node. If a node has no children it is a leaf node.
     * @param parseNode Checked node.
     * @return True if the input node is a leaf node, false otherwise.
     */
    satisfies(parseNode: ParseNode): boolean {
        return parseNode.numberOfChildren() == 0;
    }

}
import { ParseNode } from "../ParseNode";
import { IsLeaf } from "./IsLeaf";
export declare class IsEnglishLeaf extends IsLeaf {
    /**
     * Implemented node condition for English leaf node.
     * @param parseNode Checked node.
     * @return If the node is a leaf node and is not a dummy node, returns true; false otherwise.
     */
    satisfies(parseNode: ParseNode): boolean;
}

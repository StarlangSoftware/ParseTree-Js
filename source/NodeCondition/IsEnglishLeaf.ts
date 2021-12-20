import {ParseNode} from "../ParseNode";
import {IsLeaf} from "./IsLeaf";

export class IsEnglishLeaf extends IsLeaf{

    /**
     * Implemented node condition for English leaf node.
     * @param parseNode Checked node.
     * @return If the node is a leaf node and is not a dummy node, returns true; false otherwise.
     */
    satisfies(parseNode: ParseNode): boolean {
        if (super.satisfies(parseNode)) {
            let data = parseNode.getData().getName();
            let parentData = parseNode.getParent().getData().getName();
            if (data.includes("*") || (data == "0" && parentData == "-NONE-")){
                return false;
            }
            return true;
        }
        return false;
    }

}
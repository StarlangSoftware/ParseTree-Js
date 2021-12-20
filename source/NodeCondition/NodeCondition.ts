import {ParseNode} from "../ParseNode";

export interface NodeCondition {

    satisfies(parseNode: ParseNode): boolean
}
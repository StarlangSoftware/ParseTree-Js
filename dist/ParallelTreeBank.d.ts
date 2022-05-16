import { TreeBank } from "./TreeBank";
import { ParseTree } from "./ParseTree";
export declare class ParallelTreeBank {
    protected fromTreeBank: TreeBank;
    protected toTreeBank: TreeBank;
    constructor(folder1?: string, folder2?: string, pattern?: string);
    removeDifferentTrees(): void;
    size(): Number;
    fromTree(index: number): ParseTree;
    toTree(index: number): ParseTree;
    getFromTreeBank(index: number): TreeBank;
    toFromTreeBank(index: number): TreeBank;
}

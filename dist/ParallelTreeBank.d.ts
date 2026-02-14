import { TreeBank } from "./TreeBank";
import { ParseTree } from "./ParseTree";
export declare class ParallelTreeBank {
    protected fromTreeBank: TreeBank;
    protected toTreeBank: TreeBank;
    /**
     * Another constructor for the ParallelTreeBank class. A ParallelTreeBank consists of two treebanks, where each
     * sentence appears in both treebanks with possibly different tree structures. Each treebank is stored in a separate
     * folder. Both treebanks are read and distinct sentences are removed from the treebanks. In thid constructor, only
     * files matching the pattern are read. Pattern is used for matching the extensions such as .train, .test, .dev.
     * @param folder1 Folder containing the files for trees in the first treebank.
     * @param folder2 Folder containing the files for trees in the second treebank.
     * @param pattern File pattern used for matching. Patterns are usually used for setting the extensions such as
     *                .train, .test, .dev.
     */
    constructor(folder1?: string, folder2?: string, pattern?: string);
    /**
     * Given two treebanks read, the method removes the trees which do not exist in one of the treebanks. At the end,
     * we will only have the tree files that exist in both treebanks.
     */
    removeDifferentTrees(): void;
    /**
     * Returns number of sentences in ParallelTreeBank.
     * @return Number of sentences.
     */
    size(): Number;
    /**
     * Returns the tree at position index in the first treebank.
     * @param index Position of the tree in the first treebank.
     * @return The tree at position index in the first treebank.
     */
    fromTree(index: number): ParseTree;
    /**
     * Returns the tree at position index in the second treebank.
     * @param index Position of the tree in the second treebank.
     * @return The tree at position index in the second treebank.
     */
    toTree(index: number): ParseTree;
    /**
     * Returns the first treebank.
     * @return First treebank.
     */
    getFromTreeBank(): TreeBank;
    /**
     * Returns the second treebank.
     * @return Second treebank.
     */
    getToTreeBank(): TreeBank;
}

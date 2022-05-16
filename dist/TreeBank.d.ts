import { ParseTree } from "./ParseTree";
export declare class TreeBank {
    protected parseTrees: Array<ParseTree>;
    /**
     * A constructor of {@link TreeBank} class which reads all {@link ParseTree} files inside the given folder. For each
     * file inside that folder, the constructor creates a ParseTree and puts in inside the list parseTrees.
     * @param folder Folder where all parseTrees reside.
     * @param pattern File pattern such as "." ".train" ".test".
     */
    constructor(folder?: string, pattern?: string);
    /**
     * Strips punctuation symbols from all parseTrees in this TreeBank.
     */
    stripPunctuation(): void;
    /**
     * Returns number of trees in the TreeBank.
     * @return Number of trees in the TreeBank.
     */
    size(): number;
    /**
     * Returns number of words in the parseTrees in the TreeBank. If excludeStopWords is true, stop words are not
     * counted.
     * @param excludeStopWords If true, stop words are not included in the count process.
     * @return Number of all words in all parseTrees in the TreeBank.
     */
    wordCount(excludeStopWords: boolean): number;
    /**
     * Accessor for a single ParseTree.
     * @param index Index of the parseTree.
     * @return The ParseTree at the given index.
     */
    get(index: number): ParseTree;
    removeTree(index: number): void;
}

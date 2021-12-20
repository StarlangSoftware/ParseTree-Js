import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
export declare class Symbol extends Word {
    static nonTerminalList: string[];
    static phraseLabels: string[];
    static sentenceLabels: string[];
    static verbLabels: string[];
    static VPLabel: string;
    /**
     * Constructor for Symbol class. Sets the name attribute.
     * @param name Name attribute
     */
    constructor(name: string);
    /**
     * Checks if this symbol is a verb type.
     * @return True if the symbol is a verb, false otherwise.
     */
    isVerb(): boolean;
    /**
     * Checks if the symbol is VP or not.
     * @return True if the symbol is VB, false otherwise.
     */
    isVP(): boolean;
    /**
     * Checks if this symbol is a terminal symbol or not. A symbol is terminal if it is a punctuation symbol, or
     * if it starts with a lowercase symbol.
     * @return True if this symbol is a terminal symbol, false otherwise.
     */
    isTerminal(): boolean;
    /**
     * Checks if this symbol can be a chunk label or not.
     * @return True if this symbol can be a chunk label, false otherwise.
     */
    isChunkLabel(): boolean;
    /**
     * If the symbol's data contains '-' or '=', this method trims all characters after those characters and returns
     * the resulting string.
     * @return Trimmed symbol.
     */
    trimSymbol(): Symbol;
}

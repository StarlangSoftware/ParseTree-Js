import { Symbol } from "./Symbol";
export declare class ConstituentSpan {
    private constituent;
    private start;
    private end;
    /**
     * Constructor for the ConstituentSpan class. ConstituentSpan is a structure for storing constituents or phrases in
     * a sentence with a specific label. Sets the attributes.
     * @param constituent Label of the span.
     * @param start Start index of the span.
     * @param end End index of the span.
     */
    constructor(constituent: Symbol, start: number, end: number);
    /**
     * Accessor for the constituent attribute
     * @return Current constituent
     */
    getConstituent(): Symbol;
    /**
     * Accessor for the start attribute
     * @return Current start
     */
    getStart(): number;
    /**
     * Accessor for the end attribute
     * @return Current end
     */
    getEnd(): number;
}

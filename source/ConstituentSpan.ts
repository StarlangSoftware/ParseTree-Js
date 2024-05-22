import {Symbol} from "./Symbol";

export class ConstituentSpan {

    private constituent: Symbol
    private start: number
    private end: number

    /**
     * Constructor for the ConstituentSpan class. ConstituentSpan is a structure for storing constituents or phrases in
     * a sentence with a specific label. Sets the attributes.
     * @param constituent Label of the span.
     * @param start Start index of the span.
     * @param end End index of the span.
     */
    constructor(constituent: Symbol, start: number, end: number) {
        this.constituent = constituent
        this.start = start
        this.end = end
    }

    /**
     * Accessor for the constituent attribute
     * @return Current constituent
     */
    getConstituent(): Symbol{
        return this.constituent
    }

    /**
     * Accessor for the start attribute
     * @return Current start
     */
    getStart(): number{
        return this.start
    }

    /**
     * Accessor for the end attribute
     * @return Current end
     */
    getEnd(): number{
        return this.end
    }
}
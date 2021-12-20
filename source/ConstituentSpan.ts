import {Symbol} from "./Symbol";

export class ConstituentSpan {

    private constituent: Symbol
    private start: number
    private end: number

    constructor(constituent: Symbol, start: number, end: number) {
        this.constituent = constituent
        this.start = start
        this.end = end
    }

    getConstituent(): Symbol{
        return this.constituent
    }

    getStart(): number{
        return this.start
    }

    getEnd(): number{
        return this.end
    }
}
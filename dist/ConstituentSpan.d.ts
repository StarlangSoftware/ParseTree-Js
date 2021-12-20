import { Symbol } from "./Symbol";
export declare class ConstituentSpan {
    private constituent;
    private start;
    private end;
    constructor(constituent: Symbol, start: number, end: number);
    getConstituent(): Symbol;
    getStart(): number;
    getEnd(): number;
}

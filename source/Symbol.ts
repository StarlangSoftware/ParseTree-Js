import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class Symbol extends Word{

    static nonTerminalList = ["ADJP", "ADVP", "CC", "CD", "CONJP", "DT", "EX", "FRAG", "FW", "IN", "INTJ", "JJ", "JJR",
        "JJS", "LS", "LST", "MD", "NAC", "NN", "NNP", "NNPS", "NNS", "NP", "NX", "PDT", "POS", "PP", "PRN", "PRP",
        "PRP$", "PRT", "PRT|ADVP", "QP", "RB", "RBR", "RP", "RRC", "S", "SBAR", "SBARQ", "SINV", "SQ", "SYM", "TO",
        "UCP", "UH", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "VP", "WDT", "WHADJP", "WHADVP", "WHNP", "WP", "WP$",
        "WRB", "X", "-NONE-"];
    static phraseLabels = ["NP", "PP", "ADVP", "ADJP", "CC", "VG"];
    static sentenceLabels = ["SINV","SBARQ","SBAR","SQ","S"];
    static verbLabels = ["VB", "VBD", "VBG", "VBN","VBP", "VBZ", "VERB"];
    static VPLabel = "VP"

    /**
     * Constructor for Symbol class. Sets the name attribute.
     * @param name Name attribute
     */
    constructor(name: string) {
        super(name);
    }

    /**
     * Checks if this symbol is a verb type.
     * @return True if the symbol is a verb, false otherwise.
     */
    isVerb(): boolean{
        return Symbol.verbLabels.indexOf(this.name) != -1
    }

    /**
     * Checks if the symbol is VP or not.
     * @return True if the symbol is VB, false otherwise.
     */
    isVP(): boolean{
        return this.name == Symbol.VPLabel
    }

    /**
     * Checks if this symbol is a terminal symbol or not. A symbol is terminal if it is a punctuation symbol, or
     * if it starts with a lowercase symbol.
     * @return True if this symbol is a terminal symbol, false otherwise.
     */
    isTerminal(): boolean{
        if (this.name == "," || this.name == "." || this.name == "!" || this.name == "?" || this.name == ":"
            || this.name == ";" || this.name == "\"" || this.name == "''" || this.name == "'" || this.name == "`"
            || this.name == "``" || this.name == "..." || this.name == "-" || this.name == "--")
            return true;
        if (Symbol.nonTerminalList.indexOf(this.name) != -1)
            return false;
        if (this.name == "I" || this.name == "A")
            return true;
        for (let i = 0; i < this.name.length; i++){
            if (this.name.charAt(i) >= 'a' && this.name.charAt(i) <= 'z'){
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if this symbol can be a chunk label or not.
     * @return True if this symbol can be a chunk label, false otherwise.
     */
    isChunkLabel(): boolean{
        if (Word.isPunctuation(this.name) ||
            Symbol.sentenceLabels.indexOf(this.name.replace("-.*","")) != -1 ||
            Symbol.phraseLabels.indexOf(this.name.replace("-.*", "")) != -1)
            return true;
        return false;
    }

    /**
     * If the symbol's data contains '-' or '=', this method trims all characters after those characters and returns
     * the resulting string.
     * @return Trimmed symbol.
     */
    trimSymbol(): Symbol{
        if (this.name.startsWith("-") || (!this.name.includes("-") && !this.name.includes("="))){
            return this;
        }
        let minusIndex = this.name.indexOf('-');
        let equalIndex = this.name.indexOf('=');
        if (minusIndex != -1 || equalIndex != -1){
            if (minusIndex != -1 && equalIndex != -1){
                if (minusIndex < equalIndex){
                    return new Symbol(this.name.substring(0, minusIndex));
                } else {
                    return new Symbol(this.name.substring(0, equalIndex));
                }
            } else {
                if (minusIndex != -1){
                    return new Symbol(this.name.substring(0, minusIndex));
                } else {
                    return new Symbol(this.name.substring(0, equalIndex));
                }
            }
        } else {
            return this;
        }
    }
}
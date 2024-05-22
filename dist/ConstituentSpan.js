(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConstituentSpan = void 0;
    class ConstituentSpan {
        /**
         * Constructor for the ConstituentSpan class. ConstituentSpan is a structure for storing constituents or phrases in
         * a sentence with a specific label. Sets the attributes.
         * @param constituent Label of the span.
         * @param start Start index of the span.
         * @param end End index of the span.
         */
        constructor(constituent, start, end) {
            this.constituent = constituent;
            this.start = start;
            this.end = end;
        }
        /**
         * Accessor for the constituent attribute
         * @return Current constituent
         */
        getConstituent() {
            return this.constituent;
        }
        /**
         * Accessor for the start attribute
         * @return Current start
         */
        getStart() {
            return this.start;
        }
        /**
         * Accessor for the end attribute
         * @return Current end
         */
        getEnd() {
            return this.end;
        }
    }
    exports.ConstituentSpan = ConstituentSpan;
});
//# sourceMappingURL=ConstituentSpan.js.map
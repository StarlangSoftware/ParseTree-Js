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
        constructor(constituent, start, end) {
            this.constituent = constituent;
            this.start = start;
            this.end = end;
        }
        getConstituent() {
            return this.constituent;
        }
        getStart() {
            return this.start;
        }
        getEnd() {
            return this.end;
        }
    }
    exports.ConstituentSpan = ConstituentSpan;
});
//# sourceMappingURL=ConstituentSpan.js.map
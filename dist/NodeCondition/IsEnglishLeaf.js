(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeaf"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsEnglishLeaf = void 0;
    const IsLeaf_1 = require("./IsLeaf");
    class IsEnglishLeaf extends IsLeaf_1.IsLeaf {
        /**
         * Implemented node condition for English leaf node.
         * @param parseNode Checked node.
         * @return If the node is a leaf node and is not a dummy node, returns true; false otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let data = parseNode.getData().getName();
                let parentData = parseNode.getParent().getData().getName();
                if (data.includes("*") || (data == "0" && parentData == "-NONE-")) {
                    return false;
                }
                return true;
            }
            return false;
        }
    }
    exports.IsEnglishLeaf = IsEnglishLeaf;
});
//# sourceMappingURL=IsEnglishLeaf.js.map
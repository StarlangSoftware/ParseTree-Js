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
    exports.IsLeaf = void 0;
    class IsLeaf {
        /**
         * Implemented node condition for the leaf node. If a node has no children it is a leaf node.
         * @param parseNode Checked node.
         * @return True if the input node is a leaf node, false otherwise.
         */
        satisfies(parseNode) {
            return parseNode.numberOfChildren() == 0;
        }
    }
    exports.IsLeaf = IsLeaf;
});
//# sourceMappingURL=IsLeaf.js.map
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
    exports.NodeCollector = void 0;
    class NodeCollector {
        /**
         * Constructor for the NodeCollector class. NodeCollector's main aim is to collect a set of ParseNode's from a
         * subtree rooted at rootNode, where the ParseNode's satisfy a given NodeCondition, which is implemented by other
         * interface class.
         * @param rootNode Root node of the subtree
         * @param condition The condition interface for which all nodes in the subtree rooted at rootNode will be checked
         */
        constructor(rootNode, condition) {
            this.rootNode = rootNode;
            this.condition = condition;
        }
        /**
         * Private recursive method to check all descendants of the parseNode, if they ever satisfy the given node condition
         * @param parseNode Root node of the subtree
         * @param collected The {@link Array} where the collected ParseNode's will be stored.
         */
        collectNodes(parseNode, collected) {
            if (this.condition == undefined || this.condition.satisfies(parseNode)) {
                collected.push(parseNode);
            }
            for (let i = 0; i < parseNode.numberOfChildren(); i++) {
                this.collectNodes(parseNode.getChild(i), collected);
            }
        }
        /**
         * Collects and returns all ParseNode's satisfying the node condition.
         * @return All ParseNode's satisfying the node condition.
         */
        collect() {
            let result = new Array();
            this.collectNodes(this.rootNode, result);
            return result;
        }
    }
    exports.NodeCollector = NodeCollector;
});
//# sourceMappingURL=NodeCollector.js.map
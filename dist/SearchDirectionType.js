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
    exports.SearchDirectionType = void 0;
    /**
     * Enumerator class for search direction
     */
    var SearchDirectionType;
    (function (SearchDirectionType) {
        SearchDirectionType[SearchDirectionType["LEFT"] = 0] = "LEFT";
        SearchDirectionType[SearchDirectionType["RIGHT"] = 1] = "RIGHT";
    })(SearchDirectionType = exports.SearchDirectionType || (exports.SearchDirectionType = {}));
});
//# sourceMappingURL=SearchDirectionType.js.map
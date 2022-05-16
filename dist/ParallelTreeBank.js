(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeBank"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParallelTreeBank = void 0;
    const TreeBank_1 = require("./TreeBank");
    class ParallelTreeBank {
        constructor(folder1, folder2, pattern) {
            this.fromTreeBank = new TreeBank_1.TreeBank(folder1, pattern);
            this.toTreeBank = new TreeBank_1.TreeBank(folder2, pattern);
            this.removeDifferentTrees();
        }
        removeDifferentTrees() {
            let i = 0;
            let j = 0;
            while (i < this.fromTreeBank.size() && j < this.toTreeBank.size()) {
                if (this.fromTreeBank.get(i).getName() < this.toTreeBank.get(j).getName()) {
                    this.fromTreeBank.removeTree(i);
                }
                else {
                    if (this.toTreeBank.get(j).getName() > this.fromTreeBank.get(i).getName()) {
                        this.toTreeBank.removeTree(j);
                    }
                    else {
                        i++;
                        j++;
                    }
                }
            }
            while (i < this.fromTreeBank.size()) {
                this.fromTreeBank.removeTree(i);
            }
            while (j < this.toTreeBank.size()) {
                this.toTreeBank.removeTree(j);
            }
        }
        size() {
            return this.fromTreeBank.size();
        }
        fromTree(index) {
            return this.fromTreeBank.get(index);
        }
        toTree(index) {
            return this.toTreeBank.get(index);
        }
        getFromTreeBank(index) {
            return this.fromTreeBank;
        }
        toFromTreeBank(index) {
            return this.toTreeBank;
        }
    }
    exports.ParallelTreeBank = ParallelTreeBank;
});
//# sourceMappingURL=ParallelTreeBank.js.map
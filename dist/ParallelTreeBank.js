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
        /**
         * Another constructor for the ParallelTreeBank class. A ParallelTreeBank consists of two treebanks, where each
         * sentence appears in both treebanks with possibly different tree structures. Each treebank is stored in a separate
         * folder. Both treebanks are read and distinct sentences are removed from the treebanks. In thid constructor, only
         * files matching the pattern are read. Pattern is used for matching the extensions such as .train, .test, .dev.
         * @param folder1 Folder containing the files for trees in the first treebank.
         * @param folder2 Folder containing the files for trees in the second treebank.
         * @param pattern File pattern used for matching. Patterns are usually used for setting the extensions such as
         *                .train, .test, .dev.
         */
        constructor(folder1, folder2, pattern) {
            this.fromTreeBank = new TreeBank_1.TreeBank(folder1, pattern);
            this.toTreeBank = new TreeBank_1.TreeBank(folder2, pattern);
            this.removeDifferentTrees();
        }
        /**
         * Given two treebanks read, the method removes the trees which do not exist in one of the treebanks. At the end,
         * we will only have the tree files that exist in both treebanks.
         */
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
        /**
         * Returns number of sentences in ParallelTreeBank.
         * @return Number of sentences.
         */
        size() {
            return this.fromTreeBank.size();
        }
        /**
         * Returns the tree at position index in the first treebank.
         * @param index Position of the tree in the first treebank.
         * @return The tree at position index in the first treebank.
         */
        fromTree(index) {
            return this.fromTreeBank.get(index);
        }
        /**
         * Returns the tree at position index in the second treebank.
         * @param index Position of the tree in the second treebank.
         * @return The tree at position index in the second treebank.
         */
        toTree(index) {
            return this.toTreeBank.get(index);
        }
        /**
         * Returns the first treebank.
         * @return First treebank.
         */
        getFromTreeBank() {
            return this.fromTreeBank;
        }
        /**
         * Returns the second treebank.
         * @return Second treebank.
         */
        getToTreeBank() {
            return this.toTreeBank;
        }
    }
    exports.ParallelTreeBank = ParallelTreeBank;
});
//# sourceMappingURL=ParallelTreeBank.js.map
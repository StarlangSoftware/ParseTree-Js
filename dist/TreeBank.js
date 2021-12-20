(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ParseTree", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeBank = void 0;
    const ParseTree_1 = require("./ParseTree");
    const fs = require("fs");
    class TreeBank {
        /**
         * A constructor of {@link TreeBank} class which reads all {@link ParseTree} files inside the given folder. For each
         * file inside that folder, the constructor creates a ParseTree and puts in inside the list parseTrees.
         * @param folder Folder where all parseTrees reside.
         * @param pattern File pattern such as "." ".train" ".test".
         */
        constructor(folder, pattern) {
            this.parseTrees = new Array();
            let files = fs.readdirSync(folder);
            files.sort();
            for (let file of files) {
                if (pattern != undefined) {
                    if (!file.includes(pattern)) {
                        continue;
                    }
                }
                let parseTree = new ParseTree_1.ParseTree(folder + "/" + file);
                if (parseTree.getRoot() != undefined) {
                    this.parseTrees.push(parseTree);
                }
            }
        }
        /**
         * Strips punctuation symbols from all parseTrees in this TreeBank.
         */
        stripPunctuation() {
            for (let tree of this.parseTrees) {
                tree.stripPunctuation();
            }
        }
        /**
         * Returns number of trees in the TreeBank.
         * @return Number of trees in the TreeBank.
         */
        size() {
            return this.parseTrees.length;
        }
        /**
         * Returns number of words in the parseTrees in the TreeBank. If excludeStopWords is true, stop words are not
         * counted.
         * @param excludeStopWords If true, stop words are not included in the count process.
         * @return Number of all words in all parseTrees in the TreeBank.
         */
        wordCount(excludeStopWords) {
            let count = 0;
            for (let tree of this.parseTrees) {
                count += tree.wordCount(excludeStopWords);
            }
            return count;
        }
        /**
         * Accessor for a single ParseTree.
         * @param index Index of the parseTree.
         * @return The ParseTree at the given index.
         */
        get(index) {
            return this.parseTrees[index];
        }
    }
    exports.TreeBank = TreeBank;
});
//# sourceMappingURL=TreeBank.js.map
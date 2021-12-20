import * as assert from "assert";
import {TreeBank} from "../dist/TreeBank";

describe('TreeBankTest', function() {
    describe('TreeBankTest', function() {
        it('testTreeBank', function() {
            let treeBank1 = new TreeBank("trees");
            assert.strictEqual(5, treeBank1.size());
            assert.strictEqual(30, treeBank1.wordCount(true));
            let treeBank2 = new TreeBank("trees", ".dev");
            assert.strictEqual(5, treeBank2.size());
            assert.strictEqual(30, treeBank2.wordCount(true));
        });
    });
});

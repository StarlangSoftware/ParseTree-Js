import * as assert from "assert";
import {ParallelTreeBank} from "../dist/ParallelTreeBank";

describe('ParallelTreeBankTest', function() {
    describe('ParallelTreeBankTest', function() {
        it('testParallelTreeBank', function() {
            let treeBank1 = new ParallelTreeBank("trees", "trees2");
            assert.strictEqual(3, treeBank1.size());
        });
    });
});

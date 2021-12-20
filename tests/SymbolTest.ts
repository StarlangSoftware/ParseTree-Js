import * as assert from "assert";
import {Symbol} from "../dist/Symbol";

describe('SymbolTest', function() {
    describe('SymbolTest', function() {
        it('trimSymbol', function() {
            assert.strictEqual("NP", new Symbol("NP-SBJ").trimSymbol().getName());
            assert.strictEqual("VP", new Symbol("VP-SBJ-2").trimSymbol().getName());
            assert.strictEqual("NNP", new Symbol("NNP-SBJ-OBJ-TN").trimSymbol().getName());
            assert.strictEqual("S", new Symbol("S-SBJ=OBJ").trimSymbol().getName());
        });
    });
});

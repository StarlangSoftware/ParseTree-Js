import * as assert from "assert";
import {ParseTree} from "../dist/ParseTree";
import {NodeCollector} from "../dist/NodeCollector";
import {IsLeaf} from "../dist/NodeCondition/IsLeaf";
import {IsEnglishLeaf} from "../dist/NodeCondition/IsEnglishLeaf";

describe('ParseTreeTest', function() {
    describe('ParseTreeTest', function() {
        let parseTree1 = new ParseTree("trees/0000.dev");
        let parseTree2 = new ParseTree("trees/0001.dev");
        let parseTree3 = new ParseTree("trees/0002.dev");
        let parseTree4 = new ParseTree("trees/0003.dev");
        let parseTree5 = new ParseTree("trees/0014.dev");
        it('testCollectLeaf', function() {
            let nodeCollector1 = new NodeCollector(parseTree1.getRoot(), new IsLeaf());
            assert.strictEqual(13, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree2.getRoot(), new IsLeaf());
            assert.strictEqual(15, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree3.getRoot(), new IsLeaf());
            assert.strictEqual(10, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree4.getRoot(), new IsLeaf());
            assert.strictEqual(10, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree5.getRoot(), new IsLeaf());
            assert.strictEqual(4, nodeCollector1.collect().length);
        });
        it('testCollectNode', function() {
            let nodeCollector1 = new NodeCollector(parseTree1.getRoot(), null);
            assert.strictEqual(34, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree2.getRoot(), null);
            assert.strictEqual(39, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree3.getRoot(), null);
            assert.strictEqual(32, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree4.getRoot(), null);
            assert.strictEqual(28, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree5.getRoot(), null);
            assert.strictEqual(9, nodeCollector1.collect().length);
        });
        it('testCollectEnglish', function() {
            let nodeCollector1 = new NodeCollector(parseTree1.getRoot(), new IsEnglishLeaf());
            assert.strictEqual(13, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree2.getRoot(), new IsEnglishLeaf());
            assert.strictEqual(15, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree3.getRoot(), new IsEnglishLeaf());
            assert.strictEqual(9, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree4.getRoot(), new IsEnglishLeaf());
            assert.strictEqual(10, nodeCollector1.collect().length);
            nodeCollector1 = new NodeCollector(parseTree5.getRoot(), new IsEnglishLeaf());
            assert.strictEqual(4, nodeCollector1.collect().length);
        });
    });
});

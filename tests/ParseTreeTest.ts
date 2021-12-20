import * as assert from "assert";
import {ParseTree} from "../dist/ParseTree";
import {Symbol} from "../dist/Symbol";

describe('ParseTreeTest', function() {
    describe('ParseTreeTest', function() {
        let parseTree1 = new ParseTree("trees/0000.dev");
        let parseTree2 = new ParseTree("trees/0001.dev");
        let parseTree3 = new ParseTree("trees/0002.dev");
        let parseTree4 = new ParseTree("trees/0003.dev");
        let parseTree5 = new ParseTree("trees/0014.dev");
        it('testNodeCount', function() {
            assert.strictEqual(34, parseTree1.nodeCount());
            assert.strictEqual(39, parseTree2.nodeCount());
            assert.strictEqual(32, parseTree3.nodeCount());
            assert.strictEqual(28, parseTree4.nodeCount());
            assert.strictEqual(9, parseTree5.nodeCount());
        });
        it('testIsFullSentence', function() {
            assert.ok(parseTree1.isFullSentence());
            assert.ok(parseTree2.isFullSentence());
            assert.ok(parseTree3.isFullSentence());
            assert.ok(parseTree4.isFullSentence());
            assert.ok(!parseTree5.isFullSentence());
        });
        it('testLeafCount', function() {
            assert.strictEqual(13, parseTree1.leafCount());
            assert.strictEqual(15, parseTree2.leafCount());
            assert.strictEqual(10, parseTree3.leafCount());
            assert.strictEqual(10, parseTree4.leafCount());
            assert.strictEqual(4, parseTree5.leafCount());
        });
        it('testNodeCountWithMultipleChildren', function() {
            assert.strictEqual(8, parseTree1.nodeCountWithMultipleChildren());
            assert.strictEqual(9, parseTree2.nodeCountWithMultipleChildren());
            assert.strictEqual(8, parseTree3.nodeCountWithMultipleChildren());
            assert.strictEqual(6, parseTree4.nodeCountWithMultipleChildren());
            assert.strictEqual(1, parseTree5.nodeCountWithMultipleChildren());
        });
        it('testWordCount', function() {
            assert.strictEqual(7, parseTree1.wordCount(true));
            assert.strictEqual(8, parseTree2.wordCount(true));
            assert.strictEqual(6, parseTree3.wordCount(true));
            assert.strictEqual(7, parseTree4.wordCount(true));
            assert.strictEqual(2, parseTree5.wordCount(true));
        });
        it('testToSentence', function() {
            assert.strictEqual("The complicated language in the huge new law has muddied the fight .", parseTree1.toSentence());
            assert.strictEqual("The Ways and Means Committee will hold a hearing on the bill next Tuesday .", parseTree2.toSentence());
            assert.strictEqual("We 're about to see if advertising works .", parseTree3.toSentence());
            assert.strictEqual("This time around , they 're moving even faster .", parseTree4.toSentence());
            assert.strictEqual("Ad Notes ... .", parseTree5.toSentence());
        });
        it('testConstituentSpan', function() {
            let span = parseTree1.constituentSpanList()[6];
            assert.deepStrictEqual(new Symbol("PP-LOC"), span.getConstituent());
            assert.strictEqual(4, span.getStart());
            assert.strictEqual(9, span.getEnd());
            span = parseTree2.constituentSpanList()[10];
            assert.deepStrictEqual(new Symbol("VB"), span.getConstituent());
            assert.strictEqual(7, span.getStart());
            assert.strictEqual(8, span.getEnd());
            span = parseTree3.constituentSpanList()[0];
            assert.deepStrictEqual(new Symbol("S"), span.getConstituent());
            assert.strictEqual(1, span.getStart());
            assert.strictEqual(11, span.getEnd());
            span = parseTree4.constituentSpanList()[5];
            assert.deepStrictEqual(new Symbol("ADVP"), span.getConstituent());
            assert.strictEqual(3, span.getStart());
            assert.strictEqual(4, span.getEnd());
            span = parseTree5.constituentSpanList()[4];
            assert.deepStrictEqual(new Symbol("."), span.getConstituent());
            assert.strictEqual(4, span.getStart());
            assert.strictEqual(5, span.getEnd());
        });
    });
});

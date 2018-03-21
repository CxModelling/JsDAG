var tape = require("tape"),
    epidag = require("../dist/epidag");


tape("vld validates type and value of a variable", function(test) {
    const res = {x: 5}, v = new epidag.Validator("X", "str", "X", false);

    test.deepEqual(v.correct("x", res), 5);
    test.end();
});
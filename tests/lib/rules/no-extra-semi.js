/**
 * @fileoverview Tests for no-extra-semi rule.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/no-extra-semi", {
    valid: [
        "var x = 5;",
        "function foo(){}",

        // Class body.
        {code: "class A { }", ecmaFeatures: {classes: true}},
        {code: "var A = class { };", ecmaFeatures: {classes: true}},
        {code: "class A { a() { this; } }", ecmaFeatures: {classes: true}},
        {code: "var A = class { a() { this; } };", ecmaFeatures: {classes: true}},
        {code: "class A { } a;", ecmaFeatures: {classes: true}}
    ],
    invalid: [
        { code: "var x = 5;;", errors: [{ message: "Unnecessary semicolon.", type: "EmptyStatement"}] },
        { code: "function foo(){};", errors: [{ message: "Unnecessary semicolon.", type: "EmptyStatement"}] },

        // Class body.
        {
            code: "class A { ; }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 10}]
        },
        {
            code: "class A { /*a*/; }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 15}]
        },
        {
            code: "class A { ; a() {} }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 10}]
        },
        {
            code: "class A { a() {}; }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 16}]
        },
        {
            code: "class A { a() {}; b() {} }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 16}]
        },
        {
            code: "class A {; a() {}; b() {}; }",
            ecmaFeatures: {classes: true},
            errors: [
                {message: "Unnecessary semicolon.", type: "Punctuator", column: 9},
                {message: "Unnecessary semicolon.", type: "Punctuator", column: 17},
                {message: "Unnecessary semicolon.", type: "Punctuator", column: 25}
            ]
        },
        {
            code: "class A { a() {}; get b() {} }",
            ecmaFeatures: {classes: true},
            errors: [{message: "Unnecessary semicolon.", type: "Punctuator", column: 16}]
        }
    ]
});

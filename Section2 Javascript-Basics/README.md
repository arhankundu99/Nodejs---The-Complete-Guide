# Javascript Hoisting
JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables, classes, or imports to the top of their scope, prior to execution of the code.

# Hoisting of var vs Hoisting of let and const
Variables declared with let and const are hoisted in JavaScript, but they have a different behavior compared to variables declared with var. Here's how hoisting works for let and const:

Hoisting: Both let and const declarations are hoisted to the top of their containing block or scope during the compilation phase. This means that you can reference the variable before its declaration, but you will encounter the "temporal dead zone" and get a ReferenceError if you try to access the variable before it's declared in the code.

Temporal Dead Zone (TDZ): When a variable declared with let or const is hoisted, it enters the temporal dead zone. During this period, the variable exists in the scope, but it is not yet initialized. Attempting to access the variable before its declaration in the code results in a ReferenceError. (It's temporarily dead)

Here's an example to illustrate hoisting and the temporal dead zone with let and const:

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;
```

```javascript
const x = 1;
{
  console.log(x); // ReferenceError
  const x = 2;
}
```
In this code, x is hoisted to the top of the scope, but it's not yet initialized, and trying to access it before its declaration causes a ReferenceError.

In contrast, variables declared with var are also hoisted but initialized with undefined by default, so you can access them before their declaration without encountering a ReferenceError. However, this can lead to unexpected behavior and bugs in your code, which is one of the reasons why let and const were introduced to provide more predictable scoping behavior.


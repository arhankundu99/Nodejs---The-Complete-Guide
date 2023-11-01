# What is Node.js?
Node.js is a javascript runtime environment. Which means it can execute javascript code anywhere else other than the browser. 

# How does it work?
Node.js uses V8 Engine. V8 is basically the javascript engine built by Google which runs javascript code in the browser. The engine takes javascript code, 
compiles it into the machine code (This is also what the browser does). V8 is written in C++. 
So, Node.js takes V8 codebase, and adds certain features like working with local files (Which is not possible with the original V8 engine code) and removes certain features like manipulating dom (Obviously dom will not be present outside the browser.)

![How does Node work?](./images/image1.png)

So when our code gets executed by the javascript engine:
1)	All the memory allocations happen on stack or heap (Primitive type allocations (const x = 5, const y = true etc) happen on stack and array, object allocations happen on heap)

2)	When a function is needed to be executed, it is inserted into the callstack. The function is then removed from the callstack after execution. (Note: Call stack is different from the memory stack. See explanation below)

3)	While executing the js code, if the interpreter notices resolving/rejecting a promise, setTimeout, setInterval, etc then node handles these operations using c++ libraries like libuv which uses threads (In case of browser, these are called browser apis which are handled by the browser itself). After node completes processing, the callback functions are then added into a micro-task queue or macro-task queue (Only Promise.then or Promise.catch callbacks are added into the micro-task queue and these have higher priority than macro-task queue functions)

4)	Event Loop: Event loop runs continuously to check if the call stack is empty or not. If the call stack is empty, then it processes all the job queue tasks, then it processes all the callback queue tasks (Here processing means that event loop would pop the function from the queue and put it on top of the call stack)
Pseudo code of event loop:

```javascript
runScript() //Synchronously execute the script as though it were a function body. Run until the Call Stack is empty.
while (true) {
  if(callStack.isEmpty()){
    const jobQueue = EventLoop.getJobQueue();
    if (jobQueue.hasNextTask()) {
        jobQueue.processNextTask();
    }

    const callbackQueue = EventLoop.getCallbackQueue();
    while (callbackQueue.hasNextMicrotask()) {
        callbackQueue.processNextMicrotask();
    }
    
    // the rerender step DOES NOT happen in node. It happens in browser.
    rerender();
  }
}
```

**Important example**: If you dont understand, read the above "How does Node work?" again.
```js
const func = async() => {
    console.log("func");
    return new Promise((resolve, reject) => {
        console.log("Inside promise");
        resolve()
        console.log("After resolve");
    })
}

func().then(data => {
    console.log("Resolved promise.")
});
console.log("Hi");
```

```
func
Inside promise
After resolve
Hi
Resolved promise.
```


Visulalise the flow: https://www.jsv9000.app/

Reference:
1)	Understanding Event Loop, Call Stack, Event & Job Queue in Javascript | by Rahul Sagore | Medium
2)	Tasks, microtasks, queues and schedules - JakeArchibald.com
3)	https://www.reddit.com/r/node/comments/147jf6t/how_does_node_work_internally/
4)	https://www.turing.com/kb/handling-memory-management-in-javascript

# What are the features of Node?
1) Node is built on chromes V8 engine written in C++, which makes it fast. (Read more from here: https://nodejs.dev/en/learn/the-v8-javascript-engine/)
2) Asynchronous and multi-threaded (See, Node.js runs javascript on a single thread., But Node.js provides hidden threads using libuv library (written in C++) which is used for file operations, network requests etc.)
3)	Non-Blocking and Event Driven. (When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.) (Read more from here: Overview of Blocking vs Non-Blocking | Node.js (nodejs.org))
4)	It has Node Package Manager (npm) which is a library of many packages.

# Callstack vs memory stack 
The call stack in JavaScript is different from the stack used for memory allocations. These two concepts are separate and serve different purposes in a JavaScript runtime environment.

**Call Stack**:

The call stack is a data structure in JavaScript that keeps track of the execution context of functions and their respective call frames.
It is responsible for managing the flow of program execution, tracking function calls, and maintaining the order in which functions are executed.
As functions are called, their call frames are pushed onto the call stack, and when a function returns, its call frame is popped off the stack.
The call stack is used for the execution of synchronous code and for maintaining the context of function calls.
Memory Allocation Stack:

**Memory Stack**:

JavaScript uses a memory allocation stack (sometimes referred to as the "heap" and "stack") to manage the allocation and deallocation of memory for variables and objects.
This memory allocation stack is not exposed or directly accessible in JavaScript. It's managed by the JavaScript engine itself.
The memory stack is used to store primitive data types and references to objects in memory. Objects themselves are allocated in the heap, which is a separate region of memory.
Variables and objects are allocated and deallocated on the memory stack as needed.
In summary, the call stack is responsible for managing the execution context of functions, while the memory allocation stack manages the allocation and deallocation of memory for variables and objects. These two stacks serve different purposes within the JavaScript runtime, and they are not the same.

# How does node interpret js code?

Node follows the below four steps for interpreting js code

**Parsing and AST Creation**: Node.js starts by parsing the JavaScript source code and creating an Abstract Syntax Tree (AST). The AST represents the structure and semantics of the code.

**Execution via Interpretation**: Node.js initially interprets the code by traversing the AST. It doesn't convert the entire AST to machine code. Instead, it interprets the code directly from the AST, executing one statement at a time. This interpretation allows the code to run immediately without the need for a separate compilation step.

**Just-In-Time (JIT) Compilation**: To improve performance, Node.js and the V8 engine may employ JIT compilation. JIT compilation involves identifying frequently executed code segments and compiling those segments into optimized machine code. These compiled segments are then cached and executed for subsequent calls. This JIT compilation process is used to speed up the execution of performance-critical parts of the code. (Note the jit compilation code is stored in RAM and not in some binaries)

**Hybrid Execution**: Node.js uses a hybrid approach, combining interpretation and JIT compilation. Less frequently used parts of the code are interpreted, while hot paths (frequently executed code) are compiled for better performance.

In summary, Node.js interprets JavaScript code directly from the AST, executing it one statement at a time. However, for performance optimization, it may use JIT compilation to convert frequently executed code segments into machine code. This hybrid approach allows for the best of both worlds: immediate execution and performance improvements when needed.


console.log("First Statement");

setTimeout(()=>{
    console.log("Second Statement");
},2000);

setTimeout(()=>{
    console.log("Third Statement");
},0);

console.log("Last Statement");

/*
Output:
-------------------------------------------------
First Statement
Last Statement
Third Statement
Second Statement
-------------------------------------------------


Node.js Execution Flow Explanation
-------------------------------------------------

Detailed Explanation (using Node.js architecture terms):

1. console.log("First Statement")
   - Synchronous code.
   - Goes directly to the Call Stack and executes immediately.
   - Prints: First Statement

2. setTimeout(()=>{ console.log("Second Statement"); }, 2000);
   - setTimeout is a Node API (Timer API).
   - The callback is handed to Node APIs with a 2000 ms timer.
   - After 2000 ms, the callback will be moved to the Callback Queue (not yet).

3. setTimeout(()=>{ console.log("Third Statement"); }, 0);
   - Same as above, but with 0 ms delay.
   - The callback is given to Node APIs (Timer API).
   - As soon as the 0 ms is up, the callback is moved to the Callback Queue.
   - It will not run immediately—it waits until the Call Stack is empty.

4. console.log("Last Statement")
   - Synchronous code.
   - Executes immediately on the Call Stack.
   - Prints: Last Statement

5. Event Loop
   - At this point, the Call Stack is empty (all synchronous work is done).
   - The Event Loop checks the Callback Queue.

   - "Third Statement" is waiting (0 ms timer expired).
     -> Event Loop moves it to Call Stack -> executes -> Prints: Third Statement

   - "Second Statement" is still waiting in Node APIs (timer not yet finished).

6. After ~2000 ms
   - Node API moves "Second Statement" callback into the Callback Queue.
   - Event Loop checks -> Call Stack is empty -> moves callback -> executes -> Prints: Second Statement

-------------------------------------------------
Final Execution Order:
1. First Statement   (Call Stack, synchronous)
2. Last Statement    (Call Stack, synchronous)
3. Third Statement   (Callback Queue after 0 ms)
4. Second Statement  (Callback Queue after 2000 ms)

-------------------------------------------------
Key Node.js Components Involved:
- Call Stack: Executes synchronous code immediately.
- Node APIs: Handle timers (setTimeout).
- Callback Queue: Stores callbacks once timers finish.
- Event Loop: Moves callbacks from Callback Queue to Call Stack when it's empty.

-------------------------------------------------
Timeline Diagram (Text Representation):

Time --->

[Start]
Call Stack: console.log("First Statement") -> executes -> prints
-------------------------------------------------
Call Stack: setTimeout(...2000) -> handed to Node API (timer starts)
Call Stack: setTimeout(...0)    -> handed to Node API (timer starts)
Call Stack: console.log("Last Statement") -> executes -> prints
-------------------------------------------------
(End of synchronous code -> Call Stack is empty)

[~0 ms]
Node API (0ms timer) -> moves callback to Callback Queue
Event Loop -> moves "Third Statement" to Call Stack -> executes -> prints
-------------------------------------------------

[~2000 ms]
Node API (2000ms timer) -> moves callback to Callback Queue
Event Loop -> moves "Second Statement" to Call Stack -> executes -> prints
-------------------------------------------------

[End]
Execution finished in order:
First Statement -> Last Statement -> Third Statement -> Second Statement
*/
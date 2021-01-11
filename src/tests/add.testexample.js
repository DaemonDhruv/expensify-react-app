// jest searches files ending with .test.js
// jest provides globals like: test(), expect() (called an assertion)


const add = (a, b) => a + b; //+ 1;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;
/**
 * test() function sets up test cases
 * It takes 2 arguments:
 *  1. name: String
 *  2. a function: function
 * 
 * This function must throw Error if test case fails
 */
test('should add two numbers', () => {
    const result = add(4, 3);

    // Setting up test case
    /* if ( result !== 7 ) {
        throw new Error(`You add 4 and 3, the result was ${result}. Expected 7`);
    } */

    // Another method of doing it is via using assertion:
    expect(result).toBe(7);
});

test('should greet', () => {
    const result = generateGreeting('Dhruv');
    expect(result).toBe('Hello Dhruv!');
});

test('should greet if no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
})
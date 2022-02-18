
/**
 * Generates a seed based on the Collatz conjecture 
 * an iteration on a simple gist i made: https://gist.github.com/dweng0/3dffb81fd5ef538bda00a62a30bdef69
 */
const seedFromCollatzConjecture = (seed: number, take: number = 4): Array<number> => {
    
    const calc = (n: number) => ((n & 1) === 1) ? (n * 3) + 1 : n / 2;

    let position: number = seed;

    const cycle = (n: number) => {
        position = calc(n);
        return position;
    }

    const results = [];

    for (let i = 0; i < take; i++) {
        results.push(cycle(position));
    }

    return results;
}

export default seedFromCollatzConjecture;



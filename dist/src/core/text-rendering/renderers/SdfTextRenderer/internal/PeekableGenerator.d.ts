/**
 * A wrapper Generator class that makes a generator peekable.
 */
export declare class PeekableIterator<T = unknown, TReturn = any, TNext = unknown> implements Iterator<T, TReturn, TNext> {
    private iterator;
    private peekBuffer;
    private _lastIndex;
    constructor(iterator: Iterator<T, TReturn, TNext>, indexBase?: number);
    next(): IteratorResult<T, TReturn>;
    peek(): IteratorResult<T, TReturn>;
    get lastIndex(): number;
}

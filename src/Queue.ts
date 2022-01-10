/**
 * @author surfdev7
 * @description object that processes entries in order.
 */
export class Queue<T extends defined> {
	processor: (entry: T) => void;
	list: T[] = [];
	/**
	 * @param processor synchronous function for processing entires.
	 * @important DO NOT USE ASYNC PROCESSOR, A YIELDING QUEUE IS FATAL!
	 */
	constructor(processor: (entry: T) => void) {
		this.processor = processor;
	}
	/**
	 * processes next entry.
	 */
	process() {
		const entry = this.list[0];
		if (entry) {
			this.processor(entry);
			this.list.remove(0);
		}
	}
	/**
	 * adds entry to back of queue.
	 * @param value entry.
	 */
	push(value: T) {
		this.list.push(value);
	}
	/**
	 * gets size of queue.
	 * @returns number of entries remaining in queue.
	 */
	size(): number {
		return this.list.size();
	}
}

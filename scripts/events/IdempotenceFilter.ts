import {Event} from "./Event";

const cbuffer = require("CBuffer");
import {forEach, omit} from "lodash";
import SpecialEvents from "./SpecialEvents";

export interface IIdempotenceFilter {
    setItems(items: RingBufferItem[]);

    filter(event: Event): boolean;

    serialize(): RingBufferItem[];
}

export class IdempotenceFilter implements IIdempotenceFilter {
    private ringBuffer = new cbuffer(100);

    constructor(items: RingBufferItem[] = []) {
        this.setItems(items);
    }

    setItems(items: RingBufferItem[]) {
        forEach(items, item => this.ringBuffer.push(item));
    }

    filter(event: Event): boolean {
        if (event.type === SpecialEvents.FETCH_EVENTS) return true;

        let filtered = this.ringBuffer.every(item => item.id !== event.id, this);
        if (filtered) this.ringBuffer.push(omit(event, ["payload", "type", "metadata"]));
        return filtered;
    }

    serialize(): RingBufferItem[] {
        return this.ringBuffer.toArray().sort((first, second) => first.timestamp - second.timestamp);
    }
}

export type RingBufferItem = {
    id: string;
    timestamp: Date;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCulture = void 0;
const uuid_1 = require("uuid");
class EventCulture {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new EventCulture({
            ...props,
            id: (0, uuid_1.v4)(),
            date: new Date(),
        });
    }
    update(props) {
        const { ...otherProps } = props;
        Object.assign(this.props, otherProps);
    }
}
exports.EventCulture = EventCulture;

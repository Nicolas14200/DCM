"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
const uuid_1 = require("uuid");
class Series {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new Series({
            ...props,
            id: (0, uuid_1.v4)(),
        });
    }
    update(props) {
        this.props.vegetableVariety = props.vegetableVariety,
            this.props.nbPlank = props.nbPlank;
    }
}
exports.Series = Series;

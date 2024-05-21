"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// * Dry principle for do not repeat yourself
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };
};
exports.default = catchAsync;

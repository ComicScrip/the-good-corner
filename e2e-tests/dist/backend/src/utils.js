"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidDataError = exports.notFoundError = exports.unauthaurizedError = exports.unauthenticatedError = exports.ObjectId = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_1 = require("graphql");
let ObjectId = class ObjectId {
    id;
};
exports.ObjectId = ObjectId;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ObjectId.prototype, "id", void 0);
exports.ObjectId = ObjectId = __decorate([
    (0, type_graphql_1.InputType)()
], ObjectId);
function unauthenticatedError() {
    return new graphql_1.GraphQLError("You need to be authenticated to perform this action", {
        extensions: { code: "UNAUTHENTICATED" },
    });
}
exports.unauthenticatedError = unauthenticatedError;
function unauthaurizedError() {
    return new graphql_1.GraphQLError("You don't have the permission to perform this action", {
        extensions: { code: "UNAUTHORIZED" },
    });
}
exports.unauthaurizedError = unauthaurizedError;
function notFoundError() {
    return new graphql_1.GraphQLError("The requested resource was not found", {
        extensions: { code: "NOT_FOUND" },
    });
}
exports.notFoundError = notFoundError;
function invalidDataError(errors) {
    return new graphql_1.GraphQLError("Invalid data was provided", {
        extensions: { code: "INVALID_DATA", errors },
    });
}
exports.invalidDataError = invalidDataError;
//# sourceMappingURL=utils.js.map
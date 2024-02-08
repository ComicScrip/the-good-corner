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
exports.UpdateTagInput = exports.NewTagInput = exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const ad_1 = require("./ad");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let Tag = class Tag extends typeorm_1.BaseEntity {
    id;
    name;
    ads;
};
exports.Tag = Tag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(2, 50),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ad_1.Ad, (ad) => ad.tags),
    __metadata("design:type", Array)
], Tag.prototype, "ads", void 0);
exports.Tag = Tag = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Tag);
let NewTagInput = class NewTagInput {
    name;
};
exports.NewTagInput = NewTagInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" }),
    __metadata("design:type", String)
], NewTagInput.prototype, "name", void 0);
exports.NewTagInput = NewTagInput = __decorate([
    (0, type_graphql_1.InputType)()
], NewTagInput);
let UpdateTagInput = class UpdateTagInput {
    name;
};
exports.UpdateTagInput = UpdateTagInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" }),
    __metadata("design:type", String)
], UpdateTagInput.prototype, "name", void 0);
exports.UpdateTagInput = UpdateTagInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTagInput);
//# sourceMappingURL=tag.js.map
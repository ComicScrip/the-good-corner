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
exports.UpdateCategoryInput = exports.NewCategoryInput = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const ad_1 = require("./ad");
const class_validator_1 = require("class-validator");
let Category = class Category extends typeorm_1.BaseEntity {
    id;
    name;
    ads;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ad_1.Ad, (ad) => ad.category),
    __metadata("design:type", Array)
], Category.prototype, "ads", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Category);
let NewCategoryInput = class NewCategoryInput {
    name;
};
exports.NewCategoryInput = NewCategoryInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" }),
    __metadata("design:type", String)
], NewCategoryInput.prototype, "name", void 0);
exports.NewCategoryInput = NewCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], NewCategoryInput);
let UpdateCategoryInput = class UpdateCategoryInput {
    name;
};
exports.UpdateCategoryInput = UpdateCategoryInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "name", void 0);
exports.UpdateCategoryInput = UpdateCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateCategoryInput);
//# sourceMappingURL=category.js.map
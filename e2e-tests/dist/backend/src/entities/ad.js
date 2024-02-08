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
exports.UpdateAdInput = exports.NewAdInput = exports.Ad = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const category_1 = require("./category");
const tag_1 = require("./tag");
const utils_1 = require("../utils");
const user_1 = require("./user");
let Ad = class Ad extends typeorm_1.BaseEntity {
    id;
    title;
    description;
    owner;
    price;
    location;
    picture;
    createdAt;
    category;
    tags;
};
exports.Ad = Ad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Ad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Ad.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.default),
    (0, typeorm_1.ManyToOne)(() => user_1.default, (c) => c.ads, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_1.default)
], Ad.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Ad.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Ad.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Ad.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Ad.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_1.Category, (c) => c.ads, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", category_1.Category)
], Ad.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => tag_1.Tag, (t) => t.ads, {
        cascade: true,
    }),
    (0, type_graphql_1.Field)(() => [tag_1.Tag]),
    __metadata("design:type", Array)
], Ad.prototype, "tags", void 0);
exports.Ad = Ad = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Ad);
let NewAdInput = class NewAdInput {
    title;
    description;
    price;
    location;
    picture;
    category;
    tags;
};
exports.NewAdInput = NewAdInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" }),
    __metadata("design:type", String)
], NewAdInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewAdInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Min)(0, { message: "le prix doit etre positif" }),
    __metadata("design:type", Number)
], NewAdInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewAdInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewAdInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => utils_1.ObjectId),
    __metadata("design:type", utils_1.ObjectId)
], NewAdInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [utils_1.ObjectId], { nullable: true }),
    __metadata("design:type", Array)
], NewAdInput.prototype, "tags", void 0);
exports.NewAdInput = NewAdInput = __decorate([
    (0, type_graphql_1.InputType)()
], NewAdInput);
let UpdateAdInput = class UpdateAdInput {
    title;
    description;
    price;
    city;
    picture;
    category;
    tags;
    location;
};
exports.UpdateAdInput = UpdateAdInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" }),
    __metadata("design:type", String)
], UpdateAdInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAdInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Min)(0, { message: "le prix doit etre positif" }),
    __metadata("design:type", Number)
], UpdateAdInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAdInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAdInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => utils_1.ObjectId, { nullable: true }),
    __metadata("design:type", utils_1.ObjectId)
], UpdateAdInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [utils_1.ObjectId], { nullable: true }),
    __metadata("design:type", Array)
], UpdateAdInput.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAdInput.prototype, "location", void 0);
exports.UpdateAdInput = UpdateAdInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateAdInput);
//# sourceMappingURL=ad.js.map
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
exports.getSafeAttributes = exports.verifyPassword = exports.hashPassword = exports.UpdateUserInput = exports.UserLoginInput = exports.UserInput = void 0;
const argon2_1 = require("argon2");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ad_1 = require("./ad");
let User = class User extends typeorm_1.BaseEntity {
    id;
    email;
    hashedPassword;
    role;
    avatar;
    nickname;
    ads;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ enum: ["visitor", "admin"], default: "visitor" }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({
        default: "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png",
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ad_1.Ad, (ad) => ad.owner),
    __metadata("design:type", Array)
], User.prototype, "ads", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
let UserInput = class UserInput {
    email;
    password;
    nickname;
};
exports.UserInput = UserInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UserInput.prototype, "nickname", void 0);
exports.UserInput = UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let UserLoginInput = class UserLoginInput {
    email;
    password;
};
exports.UserLoginInput = UserLoginInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
exports.UserLoginInput = UserLoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserLoginInput);
let UpdateUserInput = class UpdateUserInput {
    email;
    password;
    nickname;
    avatar;
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(3),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "nickname", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "avatar", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateUserInput);
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2_1.argon2id,
};
const hashPassword = async (plainPassword) => await (0, argon2_1.hash)(plainPassword, hashingOptions);
exports.hashPassword = hashPassword;
const verifyPassword = async (plainPassword, hashedPassword) => await (0, argon2_1.verify)(hashedPassword, plainPassword, hashingOptions);
exports.verifyPassword = verifyPassword;
const getSafeAttributes = (user) => ({
    ...user,
    hashedPassword: undefined,
});
exports.getSafeAttributes = getSafeAttributes;
exports.default = User;
//# sourceMappingURL=user.js.map
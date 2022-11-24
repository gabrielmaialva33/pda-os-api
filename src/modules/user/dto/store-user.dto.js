"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoreUserDto = void 0;
var class_validator_1 = require("class-validator");
var StoreUserDto = /** @class */ (function () {
    function StoreUserDto() {
    }
    __decorate([
        (0, class_validator_1.Length)(4, 80)
    ], StoreUserDto.prototype, "first_name");
    __decorate([
        (0, class_validator_1.Length)(4, 80)
    ], StoreUserDto.prototype, "last_name");
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], StoreUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.Length)(4, 50)
    ], StoreUserDto.prototype, "user_name");
    __decorate([
        (0, class_validator_1.Length)(6, 20)
    ], StoreUserDto.prototype, "password");
    return StoreUserDto;
}());
exports.StoreUserDto = StoreUserDto;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.list = function (page, per_page, search, sort, direction) {
        return this.userService.list({
            page: page,
            per_page: per_page,
            search: search,
            sort: sort,
            direction: direction
        });
    };
    UserController.prototype.get = function (id) {
        return this.userService.get(id);
    };
    UserController.prototype.create = function (createUserDto) {
        return this.userService.create(createUserDto);
    };
    UserController.prototype.update = function (id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    };
    UserController.prototype["delete"] = function (id) {
        return this.userService["delete"](id);
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)('page')),
        __param(1, (0, common_1.Query)('per_page')),
        __param(2, (0, common_1.Query)('search')),
        __param(3, (0, common_1.Query)('sort')),
        __param(4, (0, common_1.Query)('direction'))
    ], UserController.prototype, "list");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "get");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "delete");
    UserController = __decorate([
        (0, common_1.Controller)('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

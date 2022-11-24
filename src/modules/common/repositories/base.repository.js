"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.BaseRepository = void 0;
var core_1 = require("@mikro-orm/core");
var BaseRepository = /** @class */ (function (_super) {
    __extends(BaseRepository, _super);
    function BaseRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseRepository.prototype.paginate = function (_a) {
        var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.per_page, per_page = _c === void 0 ? 10 : _c, search = _a.search, _d = _a.sort, sort = _d === void 0 ? 'created_at' : _d, _e = _a.direction, direction = _e === void 0 ? 'asc' : _e;
        return __awaiter(this, void 0, void 0, function () {
            var filter, fields, _f, data, total;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        filter = [];
                        if (search) {
                            fields = this._em.getMetadata().get(String(this.entityName))
                                .properties['search_fields'].items;
                            fields.forEach(function (field) {
                                var _a;
                                filter.push((_a = {}, _a[field] = { $like: "%".concat(search, "%") }, _a));
                            });
                        }
                        return [4 /*yield*/, this.findAndCount({
                                $or: __spreadArray([], filter, true)
                            }, {
                                limit: per_page,
                                offset: Math.abs(per_page * (page - 1)),
                                orderBy: (_g = {},
                                    _g[sort] = direction,
                                    _g)
                            })];
                    case 1:
                        _f = _h.sent(), data = _f[0], total = _f[1];
                        return [2 /*return*/, {
                                meta: {
                                    total: total,
                                    per_page: Number(per_page),
                                    current_page: Number(page),
                                    last_page: Math.ceil(total / Number(per_page)),
                                    first_page: 1,
                                    first_page_url: '/?page=1',
                                    last_page_url: "/?page=".concat(Math.ceil(total / Number(per_page))),
                                    next_page_url: "/?page=".concat(Number(page) + 1),
                                    previous_page_url: Number(page) > 1 ? "/?page=".concat(Number(page) - 1) : null
                                },
                                data: data
                            }];
                }
            });
        });
    };
    return BaseRepository;
}(core_1.EntityRepository));
exports.BaseRepository = BaseRepository;

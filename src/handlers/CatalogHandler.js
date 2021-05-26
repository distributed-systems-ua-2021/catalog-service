"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geo_pb_1 = require("../proto/geo/geo_pb");
var geo_grpc_pb_1 = require("../proto/geo/geo_grpc_pb");
var geoService_1 = __importDefault(require("../services/geoService"));
var cache = require('memory-cache');
var CatalogHandler = /** @class */ (function () {
    function GeoHandler() {
        this.geoService = new geoService_1.default();
    }
    GeoHandler.prototype.listCities = function (call, callback) {
        var result = this.geoService.getAllCities(call.request.getSubcountry());
        var response = new geo_pb_1.ListCitiesResponse();
        response.setCitiesList(result);
        callback(null, response);
    };
    GeoHandler.prototype.listCountries = function (call, callback) {
        var result = this.geoService.getAllCountries();
        var response = new geo_pb_1.ListCountriesResponse();
        response.setCountriesList(result);
        callback(null, response);
    };
    GeoHandler.prototype.listSubCountries = function (call, callback) {
        var result = this.geoService.getAllSubCountries(call.request.getCountry());
        var response = new geo_pb_1.ListSubCountriesResponse();
        response.setSubcountriesList(result);
        callback(null, response);
    };
    GeoHandler.prototype.getByIp = function (call, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c, _d, country, subcountry, name, response;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = cache.get(call.request.getIp());
                        if (_a) return [3 /*break*/, 2];
                        _c = (_b = cache).put;
                        _d = [call.request.getIp()];
                        return [4 /*yield*/, this.geoService.getCityByIp(call.request.getIp())];
                    case 1:
                        _a = _c.apply(_b, _d.concat([_e.sent()]));
                        _e.label = 2;
                    case 2:
                        result = _a;
                        country = result.country, subcountry = result.subcountry, name = result.name;
                        response = new geo_pb_1.GetByIpResponse();
                        response.setCity(name);
                        response.setCountry(country);
                        response.setSubcountry(subcountry);
                        callback(null, response);
                        return [2 /*return*/];
                }
            });
        });
    };
    return GeoHandler;
}());
exports.default = {
    service: geo_grpc_pb_1.GeoServiceService,
    handler: new CatalogHandler(),
};

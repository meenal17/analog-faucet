"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("./config.json"));
exports.default = axios_1.default.create({
    baseURL: process.env.NODE_ENV == "production" ? config_json_1.default.apiBaseEndpointProduction : config_json_1.default.apiBaseEndpointDevelopment,
    timeout: config_json_1.default.apiTimeout,
});
exports.config = {
    api: {
        sendToken: '/sendToken',
        getChainConfigs: '/getChainConfigs',
        getBalance: '/getBalance',
        faucetAddress: 'faucetAddress'
    },
    SITE_KEY: config_json_1.default.CAPTCHA.siteKey,
    V2_SITE_KEY: config_json_1.default.CAPTCHA.v2siteKey,
    ACTION: config_json_1.default.CAPTCHA.action,
    banner: config_json_1.default.banner
};

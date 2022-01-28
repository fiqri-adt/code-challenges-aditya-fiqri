"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs_1 = __importDefault(require("fs"));
const APP_PORT = 3001;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
};
// List of currencies
const listCurrency = (req, res) => {
    var _a;
    const params = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/')[2];
    if (params) {
        const Rate03 = fs_1.default.readFileSync('./fixtures/usd-2021-08-03.json', 'utf-8');
        const Rate03Parse = JSON.parse(Rate03);
        const Rate04 = fs_1.default.readFileSync('./fixtures/usd-2021-08-04.json', 'utf-8');
        const Rate04Parse = JSON.parse(Rate04);
        const newRateList = [];
        for (let [key, value] of Object.entries(Rate03Parse.usd)) {
            newRateList.push({
                date: Rate03Parse.date,
                code: key,
                rate: value,
            });
        }
        for (let [key, value] of Object.entries(Rate04Parse.usd)) {
            newRateList.push({
                date: Rate04Parse.date,
                code: key,
                rate: value,
            });
        }
        const filterUsdList = newRateList.filter(item => item.code === params);
        if (params === 'showall') {
            const data = {
                statusCode: 200,
                data: newRateList,
            };
            res.writeHead(200, Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }));
            res.end(JSON.stringify(data));
        }
        else if (filterUsdList.length) {
            const data = {
                statusCode: 200,
                data: filterUsdList,
            };
            res.writeHead(200, Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }));
            res.end(JSON.stringify(data));
        }
        else {
            const data = {
                statusCode: 404,
                data: {
                    message: 'No Data Not Found',
                },
            };
            res.writeHead(200, Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }));
            res.end(JSON.stringify(data));
        }
        return;
    }
    //   Default List Currency
    const currenciesData = fs_1.default.readFileSync('./fixtures/currencies.json', 'utf-8');
    const currenciesDataParse = JSON.parse(currenciesData);
    const newCurrenciesData = [];
    for (let [key, value] of Object.entries(currenciesDataParse)) {
        newCurrenciesData.push({
            code: key,
            country: value,
        });
    }
    const data = {
        statusCode: 200,
        data: newCurrenciesData,
    };
    res.writeHead(200, Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }));
    res.end(JSON.stringify(data));
};
// Server Setup with Router
const server = (req, res) => {
    const endpoint = req.url || '';
    if (/\/list-currency/.test(endpoint)) {
        listCurrency(req, res);
    }
    else {
        res.statusCode = 404;
        res.write('404 Not Found');
        res.end();
    }
};
http.createServer(server).listen(APP_PORT, () => {
    console.log(`Server Port ${APP_PORT} connected Successfully`);
});

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAccount = exports.addAsset = exports.addNetwork = void 0;
const addNetwork = (config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(config, "config::");
    if (!config) {
        return;
    }
    if (window.ethereum == undefined) {
        window.open('https://metamask.io/download', '_blank');
    }
    yield ((_a = window === null || window === void 0 ? void 0 : window.ethereum) === null || _a === void 0 ? void 0 : _a.request({
        method: 'wallet_addEthereumChain',
        params: [{
                chainId: `0x${(_b = config.CHAINID) === null || _b === void 0 ? void 0 : _b.toString(16)}`,
                chainName: config.NAME,
                nativeCurrency: {
                    name: config.NAME,
                    symbol: config.TOKEN,
                    decimals: 18
                },
                rpcUrls: [config.RPC],
                blockExplorerUrls: config.EXPLORER ? [config.EXPLORER] : null
            }]
    }).catch((error) => {
        console.log(error);
    }));
});
exports.addNetwork = addNetwork;
const addAsset = (config) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (!config) {
        return;
    }
    if (window.ethereum == undefined) {
        window.open('https://metamask.io/download', '_blank');
    }
    yield ((_c = window === null || window === void 0 ? void 0 : window.ethereum) === null || _c === void 0 ? void 0 : _c.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: config.CONTRACTADDRESS,
                symbol: config.TOKEN,
                decimals: config.DECIMALS || 18
            }
        }
    }).catch((error) => {
        console.log(error);
    }));
});
exports.addAsset = addAsset;
const connectAccount = (updateAddress, showPopup = true) => __awaiter(void 0, void 0, void 0, function* () {
    if (window.ethereum == undefined) {
        showPopup && window.open('https://metamask.io/download', '_blank');
        return;
    }
    try {
        window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => __awaiter(void 0, void 0, void 0, function* () {
            accounts = yield handleConnection(accounts, showPopup);
            updateAddress(accounts[0]);
        })).catch(console.error);
        window.ethereum.on('accountsChanged', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const accounts = yield window.ethereum.enable();
                updateAddress(accounts[0]);
            });
        });
    }
    catch (_d) {
        alert("Request denied!");
    }
});
exports.connectAccount = connectAccount;
function handleConnection(accounts, showPopup) {
    return __awaiter(this, void 0, void 0, function* () {
        if (accounts.length === 0) {
            if (showPopup) {
                try {
                    const accounts = yield window.ethereum.request({ method: 'eth_requestAccounts' });
                    return accounts;
                }
                catch (err) {
                    console.log("Request denied!");
                }
            }
        }
        else {
            return accounts;
        }
    });
}

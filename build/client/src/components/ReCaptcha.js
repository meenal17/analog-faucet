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
class ReCaptcha {
    constructor(SITE_KEY, ACTION, V2_SITE_KEY, setWidgetID, widgetID) {
        this.resetV2Captcha = () => {
            const v2CaptchaContainer = document.getElementsByClassName('v2-recaptcha')[0];
            if (v2CaptchaContainer) {
                if (this.widgetID) {
                    window.grecaptcha.reset(this.widgetID);
                }
                v2CaptchaContainer.style.display = "none";
            }
        };
        this.loadV2Captcha = (v2siteKey) => {
            const v2CaptchaContainer = document.getElementsByClassName('v2-recaptcha')[0];
            if (this.widgetID || this.widgetID == "0") {
                const v2CaptchaContainer = document.getElementsByClassName('v2-recaptcha')[0];
                if (v2CaptchaContainer) {
                    v2CaptchaContainer.style.display = "block";
                }
            }
            else {
                const widgetID = window.grecaptcha.render(v2CaptchaContainer, {
                    'sitekey': v2siteKey,
                    'theme': 'dark'
                });
                this.setWidgetID(widgetID);
            }
            return true;
        };
        this.loadReCaptcha = (siteKey) => {
            const script = document.createElement('script');
            script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${siteKey}`;
            document.body.appendChild(script);
            return true;
        };
        this.loadReCaptcha(SITE_KEY);
        this.siteKey = SITE_KEY;
        this.v2siteKey = V2_SITE_KEY;
        this.action = ACTION;
        this.widgetID = widgetID;
        this.setWidgetID = setWidgetID;
    }
    getToken(isV2 = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = "", v2Token = "";
            !isV2 && (yield window.grecaptcha.execute(this.siteKey, { action: this.action })
                .then((res) => {
                token = res;
            }));
            if (isV2) {
                v2Token = yield window.grecaptcha.getResponse(this.widgetID);
            }
            return { token, v2Token };
        });
    }
}
exports.default = ReCaptcha;

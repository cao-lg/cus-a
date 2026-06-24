var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { TTEventSource } from "./tt-event-source";
import { WxEventSource } from "./wx-event-source";
import { getEnv, ENV_TYPE } from "@tarojs/taro";
function getPromiseInfo() {
    let resolve = undefined;
    let reject = undefined;
    const promise = new Promise((resolveIn, rejectIn) => {
        resolve = resolveIn;
        reject = rejectIn;
    });
    return { resolve, reject, promise };
}
export function requestSSE(options) {
    return __asyncGenerator(this, arguments, function* requestSSE_1() {
        const eventSource = getEnv() === ENV_TYPE.TT
            ? new TTEventSource(options)
            : new WxEventSource(options);
        let yieldPromise = undefined;
        let resolve = undefined;
        let reject = undefined;
        let isDone = false;
        let messageList = [];
        eventSource.onOpen(() => { });
        eventSource.onMessage((data) => {
            messageList.push(data);
            resolve === null || resolve === void 0 ? void 0 : resolve(undefined);
        });
        eventSource.onClose(() => {
            resolve === null || resolve === void 0 ? void 0 : resolve(undefined);
            isDone = true;
        });
        eventSource.onError((err) => {
            reject === null || reject === void 0 ? void 0 : reject(err);
            isDone = true;
        });
        eventSource.sendMessage();
        genNextPromise();
        do {
            yield __await(yieldPromise);
            const messageListNow = messageList.splice(0);
            genNextPromise();
            for (let eventData of messageListNow) {
                if (eventData) {
                    yield yield __await(eventData);
                }
            }
        } while (!isDone);
        function genNextPromise() {
            const { resolve: resolveInit, reject: rejectInit, promise: promiseInit, } = getPromiseInfo();
            yieldPromise = promiseInit;
            resolve = resolveInit;
            reject = rejectInit;
        }
    });
}
//# sourceMappingURL=request.js.map
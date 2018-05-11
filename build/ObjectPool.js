"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPool = /** @class */ (function () {
    function ObjectPool(type) {
        this._members = new Array();
        this._remainCount = 0;
        this._createCount = 0;
        this._allocateCount = 0;
        this._releaseCount = 0;
        this._type = type;
    }
    /**
     * return a object of type
     */
    ObjectPool.prototype.allocObject = function () {
        var result = null;
        if (this._remainCount > 0) {
            this._remainCount--;
            result = this._members.pop();
        }
        else {
            result = new this._type();
            this._createCount++;
        }
        this._allocateCount++;
        return result;
    };
    ;
    /**
     * 释放一个对象，进入存储栈
     */
    ObjectPool.prototype.releaseObject = function (object) {
        if (object.release) {
            object.release();
        }
        this._members.push(object);
        this._remainCount++;
        this._releaseCount++;
    };
    ;
    /**
     * 未被释放的对象数量
     */
    ObjectPool.prototype.unReleaseCount = function () {
        return (this._createCount - this._remainCount);
    };
    ;
    /**
     * 释放所有实例
     */
    ObjectPool.prototype.dispose = function () {
        var count = this._members.length;
        for (var i = 0; i < count; i++) {
            if (this._members[i].dispose) {
                this._members[i].dispose();
            }
        }
        this._members = null;
        this._remainCount = null;
        this._createCount = null;
        this._allocateCount = null;
        this._releaseCount = null;
        this._type = null;
    };
    return ObjectPool;
}());
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=ObjectPool.js.map
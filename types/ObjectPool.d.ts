export declare class ObjectPool<T> {
    private _members;
    private _remainCount;
    private _createCount;
    private _allocateCount;
    private _releaseCount;
    private _type;
    constructor(type: T);
    /**
     * return a object of type
     */
    allocObject(): T;
    /**
     * 释放一个对象，进入存储栈
     */
    releaseObject(object: T): void;
    /**
     * 未被释放的对象数量
     */
    unReleaseCount(): number;
    /**
     * 释放所有实例
     */
    dispose(): void;
}

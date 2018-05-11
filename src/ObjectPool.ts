export class ObjectPool<T> {
   private _members: Array<T>;
   private _remainCount: number;
   private _createCount: number;
   private _allocateCount: number;
   private _releaseCount: number;
   private _type: any;

   constructor(type: T) {
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
   public allocObject(): T {
      var result = null as any;
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
   /**
    * 释放一个对象，进入存储栈
    */
   public releaseObject(object: T) {
      if ((object as any).release) {
         (object as any).release();
      }
      this._members.push(object);
      this._remainCount++;
      this._releaseCount++;
   };
   /**
    * 未被释放的对象数量
    */
   public unReleaseCount() {
      return (this._createCount - this._remainCount);
   };
   /**
    * 释放所有实例
    */
   public dispose() {
      var count = this._members.length;
      for (var i = 0; i < count; i++) {
         if ((this._members[i] as any).dispose) {
            (this._members[i] as any).dispose();
         }
      }
      this._members = null as any;
      this._remainCount = null as any;
      this._createCount = null as any;
      this._allocateCount = null as any;
      this._releaseCount = null as any;
      this._type = null;
   }
}

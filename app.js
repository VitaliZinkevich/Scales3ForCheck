var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales(classRef) {
        this.object = new classRef();
    }
    ;
    Scales.prototype.add = function (product) {
        //debugger
        this.object.addItem(product);
        return this;
    };
    ;
    Scales.prototype.getSumScale = function () {
        return this.object.getCount();
    };
    ;
    Scales.prototype.getNameList = function () {
        //debugger;
        var i = 0;
        var nameList = [];
        while (i >= 0) {
            var item = this.object.getItem(i);
            if (item) {
                i++;
                nameList.push(item.getName());
            }
            else {
                i = -1;
            }
        }
        return nameList;
    };
    return Scales;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        window.localStorage.setItem('storageEngine', JSON.stringify([]));
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        //debugger;
        var stored = window.localStorage.getItem('storageEngine');
        var storedArr = JSON.parse(stored);
        storedArr.push(item);
        var stringArr = JSON.stringify(storedArr);
        window.localStorage.setItem('storageEngine', stringArr);
        return this;
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        //debugger;
        var stored = window.localStorage.getItem('storageEngine');
        var storedArr = JSON.parse(stored);
        storedArr = this.supplyMethods(storedArr);
        return storedArr[index];
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        //debugger;
        var stored = window.localStorage.getItem('storageEngine');
        var storedArr = JSON.parse(stored);
        storedArr = this.supplyMethods(storedArr);
        return storedArr.reduce(function (r, v) {
            //debugger;
            return r += v.getScale();
        }, 0);
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.supplyMethods = function (storedArr) {
        //debugger;
        var productExmpl = new Product(null, null);
        for (var i in productExmpl) {
            //console.log(i);
            if (!storedArr[0][i]) {
                storedArr.forEach(function (v, ind, a) {
                    //console.log(v[i]);
                    v[i] = productExmpl[i];
                });
            }
        }
        return storedArr;
    };
    ;
    return ScalesStorageEngineLocalStorage;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.storedArr = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.storedArr.push(item);
        return this;
    };
    ;
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.storedArr[index];
    };
    ;
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.storedArr.reduce(function (r, v) {
            //debugger;
            return r += v.getScale();
        }, 0);
    };
    ;
    return ScalesStorageEngineArray;
}());
var Product = /** @class */ (function () {
    function Product(name, scale) {
        this.name = name;
        this.scale = scale;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.scale;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tomato;
}(Product));
var apple0 = new Apple('zeroApple', 3);
var apple1 = new Apple('first', 4);
var apple2 = new Apple('second', 2);
var tomato0 = new Tomato('zeroTomato', 1.5);
var scales = new Scales(ScalesStorageEngineLocalStorage);
scales.add(apple0).add(apple1).add(apple2).add(tomato0);
console.log(scales.getSumScale());
console.log(scales.getNameList());
var scales2 = new Scales(ScalesStorageEngineArray);
scales2.add(apple0).add(apple1).add(tomato0).add(apple0);
console.log(scales2.getSumScale());
console.log(scales2.getNameList());
/*
function funcScales<StorageEngine>(classRef: { new (): StorageEngine; }): any {
    return {
        'object': new classRef(),
        'add':function(product:Product):StorageEngine{
            //debugger
            this.object.addItem(product);
            return this;
        },
        'getSumScale':function():number{
            return this.object.getCount();
        },
        'getNameList':function():Array<string>{
            //debugger;
            let i:number = 0;
            let nameList:Array<string>=[];
            while(i>=0){
                let item =this.object.getItem(i);
                if(item!=undefined){
                    i++;
                    nameList.push(item.getName());
                } else{
                    i=-1;
                }
            }
            return nameList;
        }
    };
}
*/ 
//# sourceMappingURL=app.js.map
interface IStorageEngine{
    addItem(item: Product): IStorageEngine;
    getItem(index: number): Product;
    getCount(): number;
}

class Scales<StorageEngine extends IStorageEngine>{
    private object:StorageEngine;
    constructor(classRef: { new (): StorageEngine; }){
        this.object = new classRef();
    };
    add(product:Product):Scales<StorageEngine>{
        //debugger
        this.object.addItem(product);
        return this;
    };
    getSumScale():number{
        return this.object.getCount();
    };
    getNameList():Array<string>{
        //debugger;
        let i:number = 0;
        let nameList:Array<string>=[];
        while(i>=0){
            let item =this.object.getItem(i);
            if(item){
                i++;
                nameList.push(item.getName());
            } else{
                i=-1;
            }
        }
        return nameList;
    }
}
 
class ScalesStorageEngineLocalStorage implements IStorageEngine{
    constructor(){
        window.localStorage.setItem('storageEngine',JSON.stringify([]));        
    }
    addItem(item: Product): IStorageEngine{
        //debugger;
        var stored:string = window.localStorage.getItem('storageEngine');
        var storedArr:Array<Product>= JSON.parse(stored);
        storedArr.push(item);
        var stringArr: string = JSON.stringify(storedArr)
        window.localStorage.setItem('storageEngine', stringArr);
        return this;
    };
    getItem(index: number): Product{
        //debugger;
        var stored:string = window.localStorage.getItem('storageEngine');
        var storedArr:Array<Product>= JSON.parse(stored);
        storedArr = this.supplyMethods(storedArr);
        return storedArr[index];
    };
    getCount(): number{
        //debugger;
        var stored:string = window.localStorage.getItem('storageEngine');
        var storedArr:Array<Product>= JSON.parse(stored);
        storedArr = this.supplyMethods(storedArr);
        return storedArr.reduce(function(r:number, v:Product):number{
            //debugger;
            return r+=v.getScale();
        }, 0);
    };   
    private supplyMethods(storedArr:Array<Product>):Array<Product>{
        //debugger;
        var productExmpl:Product = new Product(null, null);
        for(var i in productExmpl){
            //console.log(i);
            if(!storedArr[0][i]){
                storedArr.forEach((v, ind, a)=>{
                    //console.log(v[i]);
                    v[i]=productExmpl[i];
                });        
            }
        }
        return storedArr;        
    };    
}
class ScalesStorageEngineArray implements IStorageEngine{
    private storedArr:Array<Product>;
    constructor(){
        this.storedArr=[];
    }
    addItem(item: Product): IStorageEngine{
        this.storedArr.push(item);
        return this;
    };
    getItem(index: number): Product{
        return this.storedArr[index];
    };
    getCount(): number{
        return this.storedArr.reduce(function(r:number, v:Product):number{
            //debugger;
            return r+=v.getScale();
        }, 0);
    };   
}

class Product{
    private name:string;
    private scale: number;
    constructor(name:string, scale:number){
        this.name = name;
        this.scale = scale;
    }
    getName():string{
        return this.name;
    }
    getScale():number{
        return this.scale;
    }
}

class Apple extends Product{}
class Tomato extends Product{}

let apple0 = new Apple('zeroApple', 3);
let apple1 = new Apple('first', 4);
let apple2 = new Apple('second', 2);
let tomato0 = new Tomato('zeroTomato', 1.5);
let scales = new Scales(ScalesStorageEngineLocalStorage);

scales.add(apple0).add(apple1).add(apple2).add(tomato0);
console.log(scales.getSumScale());
console.log(scales.getNameList());

let scales2 = new Scales(ScalesStorageEngineArray);

scales2.add(apple0).add(apple1).add(tomato0).add(apple0);
console.log(scales2.getSumScale());
console.log(scales2.getNameList());


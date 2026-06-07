export class StoreData {
  constructor(public title:string,public img:string , public branches:string[]){}
}

/**
 *  Interface : implement --> abstract method [pure virtual method]
 *        on class --> may increase methods & properties
 *        on object --> must have props & methods related to interface only
 *  Abstract Class : extends --> abstract method && concert method
 */

interface Iperson{
  id:number,
  name:string,
  hi:()=>string
}

let person1:Iperson={
  id:2,
  name:"",
  hi(){
    return ""
  }
}

class person implements Iperson{
  id=2;
  name="";
  address=""
  hi(){
    return ""
  }
}

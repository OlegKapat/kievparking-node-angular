export interface User{
  name:string,
  email:string,
  password:string,
  owner:any,
  information?:AdditionInformation

}
export interface AdditionInformation{
  address:string,
  city:string,
  district:string,
  imageSrc?:string,
  phone:string,
  place:any
}
export interface Application{
  name:string,
  city:string,
  district:string,
  street:string,
  place:number,
  from:string,
  to:string,
  description:string
}
export interface Filter{
  start?:Date,
  end?:Date,

}
export interface Rent{
  termstatus?:boolean,
  confirmstatus?:boolean,
  start:Date,
  end:Date,
  parkingForRentId:string
}
export interface Contact{
  email:string,
  name:string,
  phohe?:string,
  text:string
}

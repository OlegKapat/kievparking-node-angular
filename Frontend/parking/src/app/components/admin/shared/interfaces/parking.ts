export interface Parking{
  city:string,
  district:string,
  street:string,
  building:number,
  numberOfPlace?:number,
  information?:string,
  security:string,
  imageSrc?:string
}
export interface Manager{
  name:string,
  password:boolean
}

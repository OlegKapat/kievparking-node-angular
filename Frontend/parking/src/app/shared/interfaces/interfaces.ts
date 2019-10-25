export interface User{
  name:string,
  email:string,
  password:string,
  owner:any,
  information?:AdditionInformation

}
export interface AdditionInformation{
  address:string,
  imageSrc?:string,
  phone:string,
  place:any
}
export interface Application{
  name:string,
  from:string,
  to:string,
  description:string
}
export interface Filter{
  start?:Date,
  end?:Date,

}

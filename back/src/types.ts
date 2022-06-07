export type authenticationData= {
    id:string,
    admin: boolean,
  iat?: number,
  exp?: number,
 }

 export type userType ={
    id: string
    email: string
    name: string
    password: string
    admin:boolean
    
 } 
 export interface iUserSignUpDTO {
   name: string,
   email: string,
   password: string,
   admin: boolean
 }
 enum todoStatus {
   DONE = 'DONE',
   PENDING = 'PENDING'
 }
 export type todoType = {
   id: string,
   description: string,
   status: todoStatus,
   deadline: Date,
   createdAt?: Date,
   updatedAt?: Date,
   finishedAt?: Date,
   id_user?: string
 }
 export interface iInputTodo {
   description: string,
   deadline: Date
 }
 
 export interface iTodoDTO extends iInputTodo {
   id: string,
   status: string,
   id_user: string
 }

export const Users = "Users";
export const TodoList = "TodoList";


// // // // interface IPost {
// // // //     userId: number;
// // // //     id: number;
// // // //     title: string;
// // // //     body: string;
// // // //   }
// // // //   // const data:IPost[] = [{},{},{}]
// // // //   const getPosts = async () => {
// // // //     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
// // // //     const posts: IPost[] = await response.json();
// // // //     const data = posts.map((post,index) => {
// // // //       return {...post,index};
// // // //     });
// // // //     console.log(data)
// // // //   };
// // // //   getPosts();



// // // // interface ITodo {
// // // //   userId: number
// // // //   id: number
// // // //   title: string
// // // //   completed: boolean
// // // // }
// // // // const getTodoByID = async (id:number) => {
// // // //   const url = `https://jsonplaceholder.typicode.com/todos/${id}`
// // // //   const response = await fetch(url);
// // // //   const todo:ITodo = await response.json();
// // // //   console.log(todo)
// // // // };
// // // // getTodoByID(55)

// // // // interface ICompany {
// // // //   name: string;
// // // //   catchPhrase: string;
// // // //   bs: string;
// // // // }

// // // // interface IAddress {
// // // //   street: string;
// // // //   suite: string;
// // // //   city: string;
// // // //   zipcode: string;
// // // //   geo: {
// // // //     lat: string;
// // // //     lng: string;
// // // //   };
// // // // }
// // // // interface IUser {
// // // //   id: number;
// // // //   name: string;
// // // //   username: string;
// // // //   email: string;
// // // //   address: IAddress;
// // // //   phone: string;
// // // //   website: string;
// // // //   company: ICompany;
// // // // }

// // // // const getUser = async () => {
// // // //   const response = await fetch("https://jsonplaceholder.typicode.com/users/5");
// // // //   const user:IUser = await response.json();
// // // //   console.log(user)
// // // // };
// // // // getUser()
// // // interface IAddress {
// // //     street: string;
// // //     suite: string;
// // //     city: string;
// // //     zipcode: number;
// // //     geo: {
// // //       lat: number;
// // //       lng: number;
// // //     };
// // //   }
  
// // //   interface ICompany {
// // //     name: string;
// // //     catchPhrase: string;
// // //     bs: string;
// // //   }
  
// // //   interface IUser {
// // //     id: number;
// // //     name: string;
// // //     email: string;
// // //     address: IAddress;
// // //     phone: number;
// // //     website: string;
// // //     company: ICompany;
// // //   }
  
// // //   const getUser =async () => {
// // //     const response = await fetch("https://jsonplaceholder.typicode.com/users/5");
// // //     const 
// // //   }
// // type Mode = "add" | "sub" | "div" | "multi" 

// // const calculator = (num1: number, num2: number, mode: Mode):number | null  => {
// //   if (mode == "add") {
// //     return num1 + num2;
// //   }
// //   if (mode == "sub") {
// //     return num2 - num1;
// //   }
// //   if (mode == "div") {
// //     return num2 / num1;
// //   }
// //   if (mode == "multi") {
// //     return num1 * num2;
// //   }
// //   return null
// // };
// // const result = calculator(5, 5,"add" );
// // console.log(result);

// interface IFullName {
//     //   firstName: string;
//     //   middleName: string;
//     //   lastName: string;
//     // }
    
//     // const fullName = (ID: IFullName): string => {
//     //   const { firstName, lastName, middleName } = ID;
//     //   return `${firstName} ${middleName} ${lastName}`;
//     // };
//     // const person: IFullName = {
//     //   firstName: "Vishal",
//     //   middleName: "Kumar",
//     //   lastName: "Singh",
//     // };
//     // const Name = fullName(person);
//     // console.log(Name);
    
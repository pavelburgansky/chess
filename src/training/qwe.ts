// interface Animal {
//     name: string;
//     age: number;
//     weight: number
// }
// interface Poodle extends Animal {
//     weight: number;
// }
// class Rty implements Animal {
//     private _name: string;
//     private _age: number;
//     private _weight: number;
//     constructor(name: string, age: number, weight: number) {
//         this._name = name,
//             this._age = age,
//             this._weight = weight
//     }
//     get name() {
//         return this._name;
//     }
//     set name(newName: string) {
//         this._name = newName
//     }
//     get age() {
//         return this._age;
//     }

//     get weight() {
//         return this._weight;
//     }
// }
// const myPoodle: Poodle = {
//     name: "Fluffy",
//     age: 3,
//     weight: 10
// };
// // const podle: Rty = new Rty("Fluffy", 3, 10)
// // console.log(myPoodle)
// // console.log(podle)
// // console.log(JSON.stringify(myPoodle) == JSON.stringify(podle))
// // console.log(podle.name)
// // podle.name = "Хуяти"
// // console.log(podle.name)

// const myAnimal: Animal = {
//     name: "Generic Animal",
//     age: 5,
//     weight: 4
// };

// type MyT = string

// function testGeneric<T extends MyT>(a: T, b: T): void {
//        if (a == "qwe") {
//         a = "zxc" as T
//     }
//     console.log(a)
// }
// testGeneric("qwe", "b")

// const test = <T, Y>(a: T, b: Y): string => {
//     return ""
// }

// type nameType = object|{name:string}
// type NameFunction<T extends nameType> = (obj: T) => T;
// const getNameFromServer:NameFunction<{}|nameType> = <T extends nameType>(obj:T):T=>{
//     return obj
// }

// const name = {name:"Pavel",age:43}
// console.log(getNameFromServer(name))




// // function App() {
// //     console.log("render App")
// //     const [count, setCount] = useState(0)
// //     const [text, setText] = useState("")
// //     let numberr = useRef(0)
// //     console.log(numberr)
// //     const handleClick = () => {
// //       numberr.current = numberr.current + 1
// //       console.log(numberr)
// //     }
// //     const setCo = ()=>{
// //       setCount(value=>value+1)
// //     }
// //     numberr.current = numberr.current + 1

// //     const handleChange = (e:any)=>{
// //       setText(e.target.value)
// //     }
// //     return (

// //       <div>
// //         {/* <Counter/> */}
// //         <div>
// //           Count: {count}
// //         </div>
// //         Number: {numberr.current}
// //         <button onClick={handleClick}>increment</button>
// //         <button onClick={setCo}>button</button>
// //         <div>
// //                 Component rerender {numberr.current} times: <input type="text" onChange={handleChange} value = {text} />

// //         </div>
// //       </div>
// //     )
// //   }

// type Route = { from: string, to: string }
// type MyFunc = (array: Array<Route>,routeLen:number) => any;

// const getRoute:MyFunc = (routs:Route[]) => {
//     for (let i = 0; i < routs.length; i++) {
//         const ticket = routs[i];
//     }
// };

// const handleGetRoute = (routs,number)=>{

// }
// const routs: Route[] = [
//     {
//         from: "London",
//         to: "Moscow"
//     },
//     {
//         from: "NY",
//         to: "London"
//     },
//     {
//         from: "Moscow",
//         to: "SPB"
//     }
// ]
// console.log(getRoute(routs,0))

//let resultArray:[number,number][] = [] //if you wanna assign type for array like [[1,3],[3,6]] were 1d array include [number,number] array
type Route = {from:string,to:string}
type TypeFindRoute = (tickets:Route[]) => Route[]


const findRoute: TypeFindRoute = (tickets) => {
    const map: Map<string, string> = new Map();
    let resultArray:Route[] = []
    for (let i = 0; i < tickets.length; i++) {
        map.set(tickets[i].from,tickets[i].to)
    }
    let start = tickets.find((ticket)=>!Array.from(map.values()).includes(ticket.from))?.from as string
    console.log(start)
    while(map.has(start)){
        const nextKey = map.get(start)!
        resultArray.push({from:start,to:nextKey})
        start = nextKey
    }
    return resultArray
}

const tickets = [{from:"NY",to:"London"},{from:"Moscow",to:"Spb"}, {from:"London",to:"Moscow"}]
console.log(findRoute(tickets))

// type Route = { from: string, to: string }
// type TypeFindRoute = (tickets: Route[]) => Route[]


// const findRoute: TypeFindRoute = (tickets) => {
//     const starts: string[] = []
//     const ends: string[] = []

//     let resultArray: Route[] = []
//     for (let i = 0; i < tickets.length; i++) {
//         starts.push(tickets[i].from)
//         ends.push(tickets[i].to)
//     }
//     let start = ""
//     for (const fromCity of starts) {
//         if (!ends.includes(fromCity)) {
//             start = fromCity
//         }
//     }

//     while (start) {
//         let k = false;
//         for (let i = 0; i < tickets.length; i++) {
//             if (tickets[i].from == start) {
//                 k = true;
//                 resultArray.push(tickets[i])
//                 start = tickets[i].to
//                 break;
//             }
//         }
//         if(!k){
//             break
//         }
        
//     }
//     return resultArray
// }

// const tickets = [{ from: "NY", to: "London" }, { from: "Moscow", to: "Spb" }, { from: "London", to: "Moscow" }]
// console.log(findRoute(tickets))

let outside = {room: "outside"}
let lobby = {room: "lobby"}
let diningRoom = {room: "diningRoom"}
let kitchen = {room: "kitchen"}
let bar = {room: "bar"}
let staffRoom= {room: "staff room"}

let roomLookup= {
      outside: outside,
      lobby: lobby,
      diningRoom: diningRoom,
      kitchen: kitchen,
      bar: bar,
      "staff room": staffRoom
}

let start= outside

let canMoveTo ={
      outside: [lobby],
      lobby: [outside, diningRoom, bar],
      diningRoom: [kitchen,lobby],
      kitchen: [diningRoom],
      "staff room": [bar],
      bar: [staffRoom, lobby],
    
}



function changeRoom(nextRoom){
      let currentRoom=start
 console.log(currentRoom)
      if (canMoveTo[currentRoom.room].includes(roomLookup[nextRoom])){
            start = roomLookup[nextRoom]
      } else{
            console.log("Settle down rookie, it's your first day on the job you can't go from the" + currentRoom + " to " + nextRoom + " try again")
      }
}




console.log(start)
changeRoom("lobby")
console.log(start)
changeRoom("bar")
console.log(start)
changeRoom("staff room")
console.log(start)
changeRoom("lobby")
console.log(start)
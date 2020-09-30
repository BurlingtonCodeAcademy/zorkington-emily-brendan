const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//--------lowercase sanitization function
function sanitizeInput(input) {
  return input.toLowerCase()
}
//---------player/game INFO
let player = {
  status: ["I am hungry"],
  Inventory: []
}
let inventoryCount = 0

let game = ["key"]

//-------------------------------ALL CLASSES HERE
//------- all staff
class Staff {
  constructor(person, position, saying) {
    this.person = person
    this.position = position
    this.saying = saying
  }
  //---------------- when called this is what a staff member will say
  speak() {
    return `I am ${this.person} and I ${this.position}. ${this.saying}`
  }
}
// people variables creater from class Staff
let pedestrian = new Staff("looking for a place to eat", "have never been here before!!", "I think I am going to go in!")
let host = new Staff("Marla", "am ready for my lunch break", "What??? I'm working a double.")
let manager = new Staff("Justin, I'm a manager", "am going to ruin your life", "haha just kidding, but seriously watch your back kid.")
let chef = new Staff("Chef Fred", "am the brains behind the operation around here", "First day huh... good luck with this crew.")
let bartender = new Staff("Peyton", "have been here for far too long", "There is a shift beer for you in the staff room, but it might be locked!")
let sam = new Staff("excited!! It's a beautiful day", "am going on a hike", "Do you want to come. \n You are now faced with the option to go on a hike or go to work")
//-----look table for staff
let lookupPerson = {
  pedestrian: pedestrian,
  host: host,
  manager: manager,
  chef: chef,
  bartender: bartender,
  sam: sam
}
//---------------- all rooms
class Room {
  static aloneRoom(type, description) {
    return new Room(type, description, "only you here")
  }
  constructor(type, description, people, nextRoom) {
    this.type = type
    this.desc = description
    this.people = people
    this.nextRoom = nextRoom
  }
  //---------------- when called this will be the description of a room
  describe() {
    return `You are now ${this.type} and see ${this.desc}.There is ${this.people}. `
  }
}
//---------------- room variables created from class Room
let work = new Room("outside of One Rock", "a sign", "a pedestrian walking into the restaurant from off the street", ["lobby"], ["sign"])
let lobby = new Room("in the lobby", "a menu on the host stand", "a host and a FOH manager judging you. In the lobby you see the dining room and bar", ["work, diningRoom, ber"], ["menu"])
let diningRoom = Room.aloneRoom("in the dining area", "a tip on the table. You see the bar to your right and the entrance to the kitchen. You are hopeful there is staff food in there.", "", ["tip"])
let kitchen = new Room("in the kitchen", "a plate of delicious fries", "the chef prepping food for the busy weekend ahead. There is no way to exit the kitchen, it looks like you might have to go back the way you came", "", ["fries"])
let bar = new Room("at the bar", "a key in the well window, looks like it might go to a room", "a bartender trying to get your attention. Beyond the bartender you see a room labeled 'staff room'", "", ["key"])
let staffRoom = Room.aloneRoom("in the staff room", "a shift drink, Fiddlehead to be exact, for you on the table and an exit sign", "", ["fiddlehead"])  // we are going to want this locked --through the state or order 
//---------------- look up table for rooms
let roomLookup = {
  work: work,
  lobby: lobby,
  "dining room": diningRoom,
  kitchen: kitchen,
  bar: bar,
  "staff room": staffRoom
}
//--------------all items listed here
class Item {
  //Sign, menu, apron, tip, food items, glasses/work items
  constructor(name, description, takeable, eats, drop,) {
    this.name = name;
    this.description = description;
    this.takeable = takeable;
    this.eats = eats;
    this.drop = drop
  }
  drop() {
    if (this.name === 'key' && player.Inventory.includes(key)) {
      player.Inventory.pop(this.name)
      return ("You have dropped the key")
    }
  }
  take() {
    if (this.name === "key" && game.includes("key")) {
      player.Inventory.push(this.name)
      game.pop(0)
      return (`You have added ${this.name} to your inventory.`)
    }
    else if (this.name === "sign") {
      return (`Sorry you cannot take this!!`)
    }
    else if (this.name === "menu") {
      return ("We need to leave this here for customers but you can read it!")
    }
    else if (this.name === 'tip') {
      return ('Manager comes up from behind and confronts you, "YOUR FIRED"')
      process.exit()
    } else {
      return 'You already have the key!! First days huh?'
    }
  }
  //need to have this effect status
  eat() {
    if (this.eats) {
      player.status.pop(this.eats)
      player.status.push("I am full and ready to work!")
      return ('that was delicious!')
    }
  }
  read() {
    if (this.name === 'sign') {
      return ('One Rock- Modern Asian Bistro with a Vermont touch.\nTo enter please go to the lobby and check with a host')
    } else if (this.name === 'menu') {
      return (`Small: Scallion Fritters with Napa Slaw, Blistered Green beans with Maple Soy Glaze.
        Dinner: One Pot Local Chicken w/ Lacinto Kale or Neil Farm Sirloin Tips w/ Broccolini  `)
    }

  }
}

//-------------readables
//item|description|take|eat|drop|drink
let sign = new Item("sign", "Red clay plaque, you read", false, false, true,)
let menu = new Item("menu", "Standard thick print paper, you read", false, false, true,)
let key = new Item("key", "Peyton hands you a key after you bring him the clean pint glasses", "says welcome to the team", true, false, true,)
let tip = new Item("tip", "You find a $175 tip on one of the large-family tables, taking some off the top could really help with rent...", "you don\'t see any staff nearby. ", false, false, true,)
let fries = new Item("Fries", " Delicous hot and crispy sweet-potato fries, you eat some", false, true, false,)
let fiddlehead = new Item("Fiddlehead", "Cold refreshing shift beer, obviously you enjoy it.", false, true, false,)

//---------------- look up table for items
let itemTable = {
  sign: sign,
  menu: menu,
  tip: tip,
  fries: fries,
  key: key,
  fiddlehead: fiddlehead
}

//----------------------------------------------START GAME
async function play() {
  //----INVENTORY and STATUS
  let userAction = await ask("What would you like to do?\n>")
  userAction = sanitizeInput(userAction)
  let inputArray = userAction.split(" ")
  let action = inputArray.slice(0, 2).join(" ")
  let placePersonItem = inputArray.splice(2).join(" ")

  if (action === "talk to" && placePersonItem === "host" || placePersonItem === "bartender" || placePersonItem === "manager" || placePersonItem === "chef" || placePersonItem === "sam" || placePersonItem === "pedestrian") {
    console.log(lookupPerson[placePersonItem].speak())
    return play()
  }
  else if (action === "go to" && placePersonItem === "staff room") {
    if (player.Inventory.includes("key")) {
      console.log(roomLookup[placePersonItem].describe())
      return play()
    } else {
      console.log("The door is locked! Find the key!")
      return play()
    }
  }
  else if (action === "yell at") {
    console.log("Hey don't yell at me!!")
    return play()
  }
  else if (action === "go to" && placePersonItem === "work" || placePersonItem === "lobby" || placePersonItem === "dining room" || placePersonItem === "kitchen" || placePersonItem === "bar") {
    console.log(roomLookup[placePersonItem].describe())
    return play()
  }
  else if (action === "read the" && placePersonItem === 'menu' || placePersonItem === 'sign') {
    console.log(itemTable[placePersonItem].read())
    return play()
  }
  else if (action === "take the" && placePersonItem === 'sign' ||  placePersonItem === 'menu' || placePersonItem === 'key' || placePersonItem === 'tip') {
    console.log(itemTable[placePersonItem].take())
    return play()
  }
  else if (action === "drop the" && placePersonItem === "key" && player.Inventory.includes("key")) {
    game[0]= "key"
    player.Inventory.pop()
    console.log("You have dropped the key")
    return play()
  }
  else if (action === "drop the" && placePersonItem === "key") {
    console.log("You don't have the key")
    return play()
  }
  else if (action === "eat the" && placePersonItem === "fries") {
    console.log(itemTable[placePersonItem].eat())
    return play()
  }
  else if (action === "drink the" && placePersonItem === 'fiddlehead') {
    console.log(itemTable[placePersonItem].eat())
    return play()
  }
  else if (action === "go on" && placePersonItem === "hike") {
    console.log("You decide to skip your first day of work- YOU ARE FIRED!")
    process.exit()
  }
  else if (action === "check my" && placePersonItem === "inventory") {
    console.log("You are carrying: " + player.Inventory)
    return play()
  }
  else if (action === "check my" && placePersonItem === "status") {
    console.log(player.status)
    return play()
  }
  else if (action === "exit the" && placePersonItem === "game") {
    process.exit()
  }
  else {
    console.log("Sorry I do not recognize that!! Try again")
    return play()
  }
}

console.log("Welcome to your first day of work, there are a few things to remember to keep you caught up. \n\n To talk to a person, please type, talk to 'individuals-name'.\n To take an item, please type, take the 'item-name'.\n To eat an item, please type eat the 'item-name'.\n To drink an item, please type drink the 'item-name' \n To change rooms, please type go to 'room name'\nTo check your inventory, please type check my inventory\nTo check your status, please type check my status\n\n\n 133 Bank St. \n\n Walking towards the lake, you pass friendly faces standing outside of Alf's diner on the left.\n Damn! You've forgotten to eat lunch again, you're famished and need some food soon.\n 2:50 PM.\n Your shift starts at 3:00.\nYour stomach has butterflies as you realize you're not as early as you planned on.\n'Last first day of a restaurant job,' you say to yourself, as you cross St.Paul Street headed towards, 'One Rock.'\nAs you turn to go to work, you see your friend Sam running up St. Paul Street flagging you down.` ")
play()
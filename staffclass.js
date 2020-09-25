//----------------------------ALL FUNCTIUON HERE
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
let bartender = new Staff("Peyton", "have been here for far too long", "here is a key for the staff room.")
let sam = new Staff("excited!!","am going on a hike", "Do you want to come", "") //--maybe modify this??

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

  constructor(type, description, people) {
    this.type = type
    this.desc = description
    this.people = people
  }

  //---------------- when called this will be the description of a room
  describe() {
    return `You are now ${this.type} and see ${this.desc}.There is ${this.people}`
  }

}

//---------------- room variables created from class Room
let work = new Room("outside of One Rock", "a sign", "a pedestrian walking into the restaurant from off the street")
let lobby = new Room("in the lobby", "a menu and an apron on the host stand", "a host and a FOH manager judging you")
let diningRoom = Room.aloneRoom("in the dining area", "a big tip on the table and a plate of half eaten wings")
let kitchen = new Room("in the kitchen", "a plate of delicious crispy fries with BBQ and clean pints that need to be brought to the bar", "the chef making pasta")
let bar = new Room("at the bar", "martinis in the well window", "a bartender trying to get your attention")
let staffRoom = Room.aloneRoom("in the staff room", "a shift drink, Fiddlehead to be exact, for you on the table and an exit sign")  // we are going to want this locked --through the state or order 

//---------------- look up table for rooms
let roomLookup = {
  work: work,
  lobby: lobby,
  diningRoom: diningRoom,
  kitchen: kitchen,
  bar: bar,
  "staff room": staffRoom
}

//--------------all items listed here

class Item {
  //Sign, menu, apron, tip, food items, glasses/work items

  constructor(name, description, takeable, eat) {
    this.name = name;
    this.description = description;
    this.takeable = takeable;
    this.eat = eat
  }

  take() {
    if (this.takeable) {
      inventory.push(this.name)
    } else {
      return 'Sorry, cannot be taken'
    } if (this.description === 'cashTip') {
      throw ('Manager comes up from behind and confronts you, asks you to leave the building, obviously very dissapointed.')

    }
  }
  eat() {
    if (this.eat) {
      inventory.push(this.eat)
      status.pop(this.eat)
      return console.log('that was delicious')
    }
  }
  read() {
    if (this.description === 'sign') {
      console.log('One Rock- Modern asian bistro with a Vermont touch.')
    } else {
      if (this.description === 'menu') {
        console.log(`Small: Scallion Fritters with Napa Slaw, Blistered Green beans with Maple Soy Glaze. 
        Dinner: One Pot Local Chicken w/ Lacinto Kale or Neil Farm Sirloin Tips w/ Broccolini  `)
      }
    }
  }
}

//-------------readables
let sign = new Item("Sign", "Red clay plaque, you read", false, false)
let menu = new Item("Menu", "Standard thick print paper, you read", true, false)
//-------------takeable
let apron = new Item("Apron", "Normal black apron you're given by the Manager, has a few stains", "You take and put on.", true, false)
let cleanPints = new Item("Clean pint glasses", "Full rack of clean glasses, you hear the bartender asking loudly for them over the music in the kitchen, you take them over.", true, false)
let key = new Item("smallkey", "Peyton hands you a key after you bring him the clean pint glasses", "says welcome to the team",true, false)
//--------------not takeable
let cashTip = new Item("Large-tip", "You find a $175 tip on one of the large-family tables, taking some off the top could really help with rent...", "you don\'t see any staff nearby. ", false, false,)
//-------------eatables
let fries = new Item("Crispy Fries", " Delicous hot and crispy sweet-potato fries, you eat some", true, true)
let halfEatenWings = new Item("Half-eaten Wings", "Four chicken wings on the edge of the pass, obviously for staff.", true, true)
//-------------takeable only
//-------------drinkables
let fiddlehead = new Item("Fiddlehead beer", "Cold refreshing shift beer, obviously you enjoy it.", true, true)
let martinis = new Item("martinis", "Three dirty martinis and one classic, need to be brought to their patrons, you take them to the dining room.", true, false)


//---------------- look up table for items
let itemTable = {
  sign: sign,
  menu: menu,
  apron: apron,
  cashTip: cashTip,
  fries: fries,
  cleanPints: cleanPints,
  halfEatenWings: halfEatenWings,
  martinis: martinis,
  key: key,
  fiddlhead: fiddlehead
}

let inventory = []
let inventoryCount = 0
let gameInventory = ['sign', 'menu', 'apron', 'largeCashTip', 'crsipyFries', 'cleanPints', 'martinis', 'fiddlhead']
let status = ['hungry', 'jittery/nervous', 'tired', 'excited']

//----------------------------------------------START GAME
async function play() {

//----INVENTORY and STATUS



  let userAction = await ask("What would you like to do?\n>")
  userAction = sanitizeInput(userAction)
  let inputArray = userAction.split(" ")
  let action = inputArray.slice(0, 2).join(" ")
  let placePersonItem = inputArray.splice(2)



  if (action === "talk to" || action === "speak to") {
    console.log(lookupPerson[placePersonItem].speak())
    return play()
  }
  else if (action === "yell at") {
    console.log("Hey don't yell at me!!")
    return play()
  }
  else if (action === "go to") {
    console.log(roomLookup[placePersonItem].describe())
    return play()
  }
  else if (action === "pick up") {
    console.log(itemTable[placePersonItem].eat())
    return play()
  }
  else if (action === "eat the") {
    console.log(itemTable[placePersonItem].eat())
    return play()
  }
  else if (action === "take the") {
    console.log(itemTable[placePersonItem].take())
    return play()
  }
  else if (action === "drink the") {
    console.log(itemTable[placePersonItem].eat())
    return play()
  }
  else {
    console.log("Sorry I do not recognize that!!")
    return play()
  }
}


console.log("`Welcome to your first day of work, there are a few things to remember to keep you caught up. To talk to a person, please type, talk to 'individuals-name'. To take a item, please type, pick up 'item-name'. To eat an item, please type eat the 'item-name'. 133 Bank St. \n Walking towards the lake, you pass friendly faces standing outside of Alf's diner on the left. 2:50 PM. Your shift starts at 3:00. Your stomach has butterflies as you realize you're not as early as you planned on. Last first day of a restaurant job you say to yourself, as you cross St.Pauls headed towards One Rock. You see your friend sam running up St. Pauls flagging you down.` ")
play()
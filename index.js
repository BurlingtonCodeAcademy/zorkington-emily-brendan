const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//--will want to write a "state of order here" for how room transition works/

start();
//Welcome message/intro
async function start() {
  const welcomeMessage = `Welcome to your first day of work, there are a few things to remember to keep you caught up.
    To talk to a person, please type, talk to 'individuals-name'.
    To take a item, please type, pick up 'item-name'. To eat an item, please type eat the 'item-name'.
    133 Bank St.
    \n Walking towards the lake, you pass friendly faces standing outside of Alf's diner on the left. 2:50 PM. Your shift starts at 3:00. 
    Your stomach has butterflies as you realize you're not as early as you planned on. 
   'Last first day of a restaurant job' you say to yourself, as you cross St.Paul's headed towards One Rock. You see your friend sam 
   running up St. Pauls flagging you down.`
  let answer = await ask(welcomeMessage);
  while (answer !== 'exit') {
    answer = await ask('>_ ')
    if (action === 'talk to' || 'speak to')
      console.log(lookupPerson(placePersonItem).speak())
    return start()
    if (action === 'yes ok') {
      console.log(lookUpPerson(placePersonItem).speak())
      console.log('Congratulations, you went for a hike and missed your first day.')
      // await ask(`Great!', 'Let's meet at my apartment in half an hour.`)
      // console.log('')
    } if (action === 'no, sorry') {
      console.log(lookUpPerson(placePersonItem).speak())

    }
  }
}
start()

function itemAction(takeable, item) {
  let validItems = ['sign', 'menu', 'apron', 'cashTip', 'crispyFries', 'cleanPints', 'martinis', 'halfEatenWings', 'fiddlehead', 'key']
  if (validItems.includes(item)) {
    if (item === 'sign' || item === 'menu' || item === 'apron')
      return [takeable, item]
  } if (item === 'crispyFries' || item === 'halfEatenWings') {
    return [takeable, item, "  "]

  } if (item === 'cleanPints' || item === 'martinis') {
    return [takeable, item]
  } if (item === 'fiddlehead' || item === 'key')
    return "Congratulations, well deserved!"

}

class Item {
  //Sign, menu, apron, tip, food items, glasses/work items

  constructor(name, description, takeable, eat) {
    this.name = name;
    this.description = description;
    this.takeable = takeable;
    this.eat = eat
  }

  //speak, take , read, eat functions
  speak() {
    return `I am ${this.person} and I ${this.position}. ${this.saying}`
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
      return `${this.description}, hit the spot`
    }
  }
  read() {
    if (this.description) {
      return ``
    }
  } else {
  if (this.description === 'menu') {
    console.log(`Small: Scallion Fritters with Napa Slaw, Blistered Green beans with Maple Soy Glaze. 
        Dinner: One Pot Local Chicken w/ Lacinto Kale or Neil Farm Sirloin Tips w/ Broccolini  `)
  }
}
  }
}
//-------------all items here
//-------------readables
let sign = new Item("Sign", "Red clay plaque, you read", false, false)
let menu = new Item("Menu", "Standard thick print paper, you read", true, false)
//-------------takeable
let apron = new Item("Apron", "Normal black apron you're given by the Manager, has a few stains", "You take and put on.", true, false)
let cleanPints = new Item("Clean pint glasses", "Full rack of clean glasses, you hear the bartender asking loudly for them over the music in the kitchen, you take them over.", true, false)
let key = new Item("smallkey", "Peyton hands you a key after you bring him the clean pint glasses", "says welcome to the team", true, false)
//--------------not takeable
let cashTip = new Item("Large-tip", "You find a $175 tip on one of the large-family tables, taking some off the top could really help with rent...", "you don\'t see any staff nearby. ", false, false,)
//-------------eatables
let fries = new Item("Crispy Fries", " Delicous hot and crispy sweet-potato fries, you eat some", true, true)
let halfEatenWings = new Item("Half-eaten Wings", "Four chicken wings on the edge of the pass, obviously for staff.", true, true)
//-------------takeable only
//-------------drinkables
let fiddlehead = new Item("Fiddlehead beer", "Cold refreshing shift beer, obviously you enjoy it.", true, true)
let martinis = new Item("martinis", "Three dirty martinis and one classic, need to be brought to their patrons, you take them to the dining room.", true, false)


let playerInventory = []
let inventoryCount = 0
let gameInventory = ['sign', 'menu', 'apron', 'largeCashTip', 'crsipyFries', 'cleanPints', 'martinis', 'fiddlhead']
let status = ['hungry', 'jittery/nervous', 'tired', 'excited']


if (action === 'takeable') {
  console.log(itemTable[item].take())
  return play()
} else if (action === 'describe' || action === 'read') {
  console.log(itemTable[item].read())
  return play()
} else if (action === 'eat' || action === 'drink') {
  console.log(itemTable[item].eat())
  return play()
} else {
  console.log('Sorry, cannot be performed')
}



let itemTable = {
  sign: sign,
  menu: menu,
  apron: apron,
  cashTip: large - tip,
  crispyFries: crispyFries,
  cleanPints: cleanPints,
  halfEatenWings: halfEatenWings,
  key: key,
  fiddlhead: fiddlehead
}

let roomTable = {
  outside: outside,
  lobby: lobby,
  diningRoom: diningRoom,
  kitchen: kitchen,
  bar: bar,
  staffRoom: staffroom
}


//--- each room described
class Room {
  static aloneRoom(type, description) {
    return new Room(type, description, "only you here")
  }

  constructor(type, description, people) {
    this.type = type
    this.desc = description
    this.people = people
  }

  describe() {
    return `You are now ${this.type} and see ${this.desc}.There is ${this.people}`
  }

}

let outside = new Room("outside of One Rock", "a sign", "a pedestrian walking into the restaurant from off the street")
let lobby = new Room("in the lobby", "a menu and an apron on the host stand", "a host and a FOH manager judging you")
let diningRoom = Room.aloneRoom("in the dining area", "a big tip on the table and a plate of half eaten wings")
let kitchen = new Room("in the kitchen", "a plate of delicious crispy fries with BBQ and clean pints that need to be brought to the bar", "the chef making pasta")
let bar = new Room("at the bar", "martinis in the well window", "a bartender trying to get your attention")
let staffRoom = Room.aloneRoom("in the staff room", "a shift drink, Fiddlehead to be exact, for you on the table and an exit sign")  // we are going to want this locked --through the state or order 


//-- each staff member/ encounter described
class Staff {
  constructor(person, position, saying) {
    this.person = person
    this.position = position
    this.saying = saying
  }

  speak() {
    return `I am ${this.person} and I ${this.position}. ${this.saying}`
  }
}

let pedestrian = new Staff("looking for a place to eat", "have never been here before!!", "I think I am going to go in!")
let host = new Staff("Marla", "am ready for my lunch break", "What??? I'm working a double")
let manager = new Staff("Justin, I'm a manager", "am going to ruin your life", "haha just kidding, but seriously watch your back")
let chef = new Staff("Chef Fred", "am the brains behind the operation around here", "First day huh... good luck with this crew")
let bartender = new Staff("Peyton", "have been here for far too long", "here is a key for the staff room")
let friend = new Staff("Sam", "friend", "going on a hike", "think you should come", "") //--maybe modify this??

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
      return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
      });
    }

function sanitizeInput(input) {
      return input.toLowerCase().trim()
    }


  
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
    let friend = new Staff("going on a hike", "think you should come", "") //--maybe modify this??

    let lookupPerson = {
      pedestrian: pedestrian,
      host :host,
      manager: manager,
      chef : chef,
      bartender: bartender,
      friend: friend
    }

async function play() {
      //  let userAction = await ask("What would you like to do?\n")
      // userAction = sanitizeInput(userAction)
      // let inputArray = userAction.split(" ")
      // let action = inputArray[0]
      // let target = inputArray.splice(1).join(" ")
      // let correctedTarget =checkTarget(action, target)
      // action = correctedTarget[0]
      // target = correctedTarget[1]

 
    if(action ==="talk to"){
          console.log(lookupPerson[person].speak())
      return play()
    } 
    else if  (action=== "yell at"){
          console.log("Hey don't yell at me!!")
          return play()
    }
    else {
          console.log("Get back to work!")
          return play()
    }

}


console.log("Welcome to people")
play()
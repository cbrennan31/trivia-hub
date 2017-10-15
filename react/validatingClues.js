// How to add valid clues by selecting invalid clue ID's

// 1. Go to jArchive, offset by max amount for that value (to get most recent), then work backwards.
// 2. Remove JSONView from Chrome
// 3. Parse in (json.parser.online.fr)
// 4. Copy string into console as newArray (jsconsole.com)
// 5. newArray = newArray.map( (obj) => obj.id )
// 6. Reinstall JSONView
// 6. newArray = newArray.filter( (id) => { return !([list invalid ids here].includes(id))})
// 7. Concantenate the validIDsArray (below) with the new array.

validIDsArray = [

]


//
// Goal: 1000 clues for each value
// //
// // Progress:
// //   $200:
//       - New max date: 2014-09-18
//       - Clues to choose from: 1301
//     - Clues validated:
//
//     - Offset completed (lower offset = more clues):
//
// When finished with all values, change options in clues method in app
  // (new max date, random = clues to choose from)

highlightBrownhighlightGreen// send the page title as a chrome message
chrome.runtime.sendMessage(document.title);
var array = new Array();
console.log("here0");
console.log(document.body.innerText);
const cars = { "data": JSON.stringify(document.body.innerText) };

async function highlight(text) {
  var innerHTML = document.body.innerHTML;

  var index = innerHTML.indexOf(text);
  console.log(text, index);
  if (index >= 0) {
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: yellow;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   document.body.innerHTML = innerHTML;
  }
  index = innerHTML.indexOf(text, index + 15);
  if (index >= 0) {
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: yellow;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    index = innerHTML.indexOf(text, index + 15);
  }
  document.body.innerHTML = innerHTML;
}

async function highlightBlue(text) {
  var innerHTML = document.body.innerHTML;
  var index = innerHTML.indexOf(text);
  console.log(text, index);
  if (index >= 0) {
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: blue;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   document.body.innerHTML = innerHTML;
  }
  index = innerHTML.indexOf(text, index + 15);
  if (index >= 0) {
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: blue;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    index = innerHTML.indexOf(text, index + 15);
  }
  document.body.innerHTML = innerHTML;
}

async function highlightGreen(text) {
  var innerHTML = document.body.innerHTML;
  var index = innerHTML.indexOf(text);
  console.log(text, index);
  if (index >= 0) {
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: green;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   document.body.innerHTML = innerHTML;
  }
  index = innerHTML.indexOf(text, index + 15);
  if (index >= 0) {
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: green;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    index = innerHTML.indexOf(text, index + 15);
  }
  document.body.innerHTML = innerHTML;
}

async function highlightBrown(text) {
  var innerHTML = document.body.innerHTML;
  var index = innerHTML.indexOf(text);
  console.log(text, index);
  if (index >= 0) {
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: brown;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   document.body.innerHTML = innerHTML;
  }
  index = innerHTML.indexOf(text, index + 15);
  if (index >= 0) {
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight' style='background-color: brown;'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    index = innerHTML.indexOf(text, index + 15);
  }
  document.body.innerHTML = innerHTML;
}

async function getWords() {
let variables =   await fetch("http://127.0.0.1:5000/",
          {
              method: 'POST',
              headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
              },
          // Strigify the payload into JSON:
          body:JSON.stringify(cars)}).then(res=>{
                  if(res.ok){
                      return res.json();
                  }else{
                      alert("something is wrong");
                  }
              }).then(jsonResponse=>{

                  // Log the response data in the console
                  console.log(jsonResponse);
                  return {'people':jsonResponse['B-PER'], 'locations':jsonResponse['B-LOC'], 'organizations':jsonResponse['B-ORG'],
                          'people1':jsonResponse['I-PER'], 'locations1':jsonResponse['I-LOC'], 'organizations1':jsonResponse['I-ORG'],
                          'misc': jsonResponse['I-MISC'], 'misc1': jsonResponse['B-MISC']};
              }
              ).catch((err) => console.error(err));
  console.log(variables);
  return await variables;
}

async function highlightWords() {
  console.log("entered");
  let all_words = await getWords();
  let people = all_words['people'];
  let people1 = all_words['people1'];
  var dict = {};
  console.log(people);
  console.log("here3");
  try {
    for (var i = 0; i < people.length; i++) {
      dict[people[i]] = 1;
      highlight(people[i]);
    }
  } catch(error) {
    console.log(error);
  }
  try {
    for (var i = 0; i < people1.length; i++) {
      dict[people1[i]] = 1;
      highlight(people1[i]);
    }
  } catch(error) {
    console.log(error);
  }

  let locations = all_words['locations'];
  let locations1 = all_words['locations1'];
  console.log("collected locations");
  try {
    for (var i = 0; i < locations.length; i++) {
      dict[locations[i]] = 1;
      highlightBlue(locations[i]);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    for (var i = 0; i < locations1.length; i++) {
      dict[locations[i]] = 1;
      highlightBlue(locations1[i]);
    }
  } catch (error) {
    console.log(error);
  }

  let organizations = all_words['organizations'];
  let organizations1 = all_words['organizations1'];
  console.log("collected organizations");
  try {
    for (var i = 0; i < organizations.length; i++) {
      dict[organizations[i]] = 1;
      highlightGreen(organizations[i]);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    for (var i = 0; i < organizations1.length; i++) {
      dict[organizations[i]] = 1;
      highlightGreen(organizations1[i]);
    }
  } catch (error) {
    console.log(error);
  }
  let miscs = all_words['misc'];
  let miscs1 = all_words['misc1'];
  console.log("collected miscellaneous");
  try {
    for (var i = 0; i < miscs.length; i++) {
      if (dict[miscs[i]] === undefined) {
        highlightBrown(miscs[i]);
      }
    }
    for (var i = 0; i < miscs1.length; i++) {
      if (dict[miscs1[i]] === undefined) {
        highlightBrown(miscs1[i]);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
console.log("here1");
highlightWords();

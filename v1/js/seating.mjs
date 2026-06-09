  /*

  Get cookie by name

  */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return "";
  }

  /*

  Find exact name match from search string

  */
  function getTableIDFromName(seatingChartJSON, searchStr) {
    for (const tableID in seatingChartJSON) {
      if (seatingChartJSON[tableID].includes(searchStr)) {
        return tableID;
      }
    }
    return null;
  }

  /*

  List all names that sits in table 

  */
  function getNamesfromTableID(seatingChartJSON, tableID) {
    return seatingChartJSON[tableID];
  }

  /*

  Find all potential name matches from search string

  */
  function getNameMatches(seatingChartJSON, searchStr) {
    const matches = [];
    for (const tableID in seatingChartJSON) {
      for (let i = 0; i < seatingChartJSON[tableID].length; i++) {
        if (seatingChartJSON[tableID][i].toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
          matches.push(seatingChartJSON[tableID][i]);
        }
      }
    }
    return matches;
  }

  /*

  Function to override what to display on the TableElementDisplay. Usually used for a joke when certain people enter their names.
  Currently, it completely overrides the display string (original content will not be displayed).

  */
  function overrideTableElementDispStr(tableID) {

    // Condition
    if (tableID != 0) return null;

    // Content to inject
    return "You know where you're sitting...<br><small>Hint: Your table doesn't have a number!</small>";

  }

  /*

  Function to change name input

  */
  function changeInputContent(inputElementName, str) {
    if (str == "") {
      return;
    }
    var inputElement = document.getElementById(inputElementName);
    inputElement.value = str;
    inputElement.dispatchEvent(new Event('input'));
  }

  /*

  Generate Seating Chart HTML
  Main Function

  */
  function getTableElementDisplayString(seatingChartJSON, name, inputElementName) {

    // Disable display if too many names are matched
    let numMatchesLessThanBeforeDisplayingStr = "50";

    var str = "";

    // ignore if input is empty
    if (name.length < 1) { return str };

    let nameMatches = getNameMatches(seatingChartJSON, name);

    str += "Name: ";

    // If not 1 match
    if (nameMatches.length != 1) {
      document.cookie = "nameInput=;";
      str += name + "<br><br>";
    }

    // No names to display
    if (nameMatches.length === 0) {
      return str;
    }

    // Too many names to display
    if (nameMatches.length >= numMatchesLessThanBeforeDisplayingStr) {
      return str;
    }


    // More than 1 match, less than too many - display potential names
    if (nameMatches.length > 1) {
      for (var i=0; i < nameMatches.length; i++) {
        str += "<p onclick=\"changeInputContent('" + inputElementName + "', '" + nameMatches[i] + "')\" style='margin-bottom: 0;'>" + nameMatches[i] + "</p>";
      }
      return str;
    }

    // 1 match
    let finalName = nameMatches[0];
    let tableID = getTableIDFromName(seatingChartJSON, finalName);

    // store cookie and generate string
    document.cookie = "nameInput=" + name + ";";
    str += finalName + "<br><br>";

    // Check if a special string is used instead
    let overrideStr = overrideTableElementDispStr(tableID);
    if (overrideStr != null) {
      str += overrideStr;
      return str;
    }

    // Display all names in table if name has a tableID
    if (tableID != null) {
      str += "<br>Table " + tableID + "<hr>";
      for (var i=0; i < seatingChartJSON[tableID].length; i++) {
        let i_name = seatingChartJSON[tableID][i];
        if (i_name == finalName) { str += "<b><u>"};
        str += i_name;
        if (i_name == finalName) { str += "</b></u>"};
        str += "<br>";
      }
    }
    return str;
  }

  /*

  Hook into HTML

  */
  // Ensure page starts at top on refresh
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  window.scrollTo(0, 0);

  import seatingChartData from "/seating_chart.json" with { type: "json" };
  window.onload=function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    window.changeInputContent = changeInputContent;
    console.log("Seating Chart:");
    console.log(seatingChartData);
    var inputElementName = "inputName"
    var nameInputElement = document.getElementById(inputElementName);
    var tableDispElement = document.getElementById("tableDisplay");
    var nameQueryLblElement = document.getElementById("nameQueryLbl");

    // Add hook & load from cookie
    nameInputElement.addEventListener("input", handleNameInput);
    nameInputElement.value = getCookie("nameInput");
    nameInputElement.dispatchEvent(new Event('input'));

    // Hook function
    function handleNameInput(event) {
      let nameValue = event.target.value;

      // Do not display border if input empty
      if (nameValue == "") {
        nameQueryLblElement.classList.remove("border-bottom");
        tableDispElement.innerHTML = "";
        return;
      }

      // Process input
      nameQueryLblElement.classList.add("border-bottom");
      tableDispElement.innerHTML = getTableElementDisplayString(seatingChartData, nameValue, inputElementName);
    }
  }

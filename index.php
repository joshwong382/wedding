<?php

$FF_PAGE_ENABLED = true;

$name_groom = "Oscar";
$name_bride = "Angel";
$img_carousel1 = "roses.jpg";
$img_menu_cover = "menu-cover.png";
$img_menu_bot = "menu-bot.png";

$support_name = "Joshua Wong & Kevin To";
$support_email = "joshua@josh-wong.net";
$support_domain = "https://wedding.josh-wong.net";

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title><?php echo "$name_bride & $name_groom" ?> - We're getting married!</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <!-- Preload -->
  <link rel="preload" href="/fonts/amoresa-aged.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href='img/<?php echo "$img_carousel1" ?>' as="image">

  <!-- Favicon -->
  <link href="favicon.ico" rel="icon">

  <!-- Google Web Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;600&display=swap" rel="stylesheet"> 

  <!-- Font Awesome -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">

  <!-- Libraries Stylesheet -->
  <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet">

  <!-- Customized Bootstrap Stylesheet -->
  <link href="css/style.css" rel="stylesheet">

  <!-- Override footer CSS colors -->
  <style>
    .before-color-override::before {
      background: #CA7A7F !important;
    }
    .after-color-override::after {
      background: #CA7A7F !important;
    }

    .primary-text-color {
      color: #CA7A7F !important;
    }

    .bkgnd-dark {
      background-color: #A32140 !important;
    }

  </style>


  <!-- Javascript begin -->


  <script type=module>

  // Import Seating Chart
  <?php
  if ($FF_PAGE_ENABLED) {
    echo 'import seatingChartData from "./seating_chart.json" with { type: "json" };';
  } else {
    echo 'let seatingChartData = "";';
  }
  ?>
  console.log("Seating Chart:");
  console.log(seatingChartData);

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

    // Feature Flag Enabled
    if (!<?php echo $FF_PAGE_ENABLED ? 'true' : 'false' ?>) {
      return "Please check back later!";
    }

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
  window.onload=function() {
    window.changeInputContent = changeInputContent;
    let seatingChart = seatingChartData;
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
  </script>

  <!-- JavaScript Libraries -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
  <script src="lib/easing/easing.min.js"></script>
  <script src="lib/waypoints/waypoints.min.js"></script>
  <script src="lib/owlcarousel/owl.carousel.min.js"></script>
  <script src="lib/isotope/isotope.pkgd.min.js"></script>
  <script src="lib/lightbox/js/lightbox.min.js"></script>

  <!-- Template Javascript -->
  <script src="js/main.js"></script>
</head>


<!-- HTML body content begin -->



<body>
    <!-- Carousel Start -->
    <div class="container-fluid p-0" id="home">
      <div id="header-carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item position-relative active">
            <img class="position-absolute h-100 w-100" src="img/<?php echo "$img_carousel1" ?>" style="object-fit: cover; object-position: 100% 80%;" />
            <div class="position-relative" style="height: 110vh;">
              <div>
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div class="p-3" style="max-width: 900px; position: relative; overflow: hidden;">
                    <h1 class="display-1 font-secondary text-white mb-md-4"><?php echo "$name_bride & $name_groom" ?></h1>
                    <div class="d-inline-block border-top border-bottom border-light py-3 px-4">
                        <h3 class="text-uppercase font-weight-normal text-white m-0" style="letter-spacing: 2px;">Find your table</h3>
                    </div>
                    <div></div>
                    <div class="d-inline-block py-3 px-4" style="letter-spacing: 2px;"><br>
                      <div id="nameQueryLbl" class="border-light">
                        <label class="border-light font-weight-normal text-white mx-auto" style="letter-spacing: 1.5px;" for="name">Enter your name: </label>
                        <input type="text" class="text-center text-sm-left" id="inputName" name="name" value="">
                        <br><br>
                      </div>
                      <br><div id=tableDisplay class="border-light font-weight-normal text-white mx-auto hide-scrollbar" style="letter-spacing: 1px; max-height: 55vh; overflow: hidden;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Carousel End -->

    <!-- Menu Start -->
    <div class="container-fluid py-5" id="event">
        <div class="container pb-5" style="max-width: 85%;">
            <div class="section-title before-color-override after-color-override position-relative text-center" style="margin-bottom: inherit;">
              <div class="row justify-content-center">
                <img class="position-absolute" src="img/<?php echo $img_menu_cover ?>" style="object-fit: cover; max-height: 85%; max-width: 135%;">
                <br><br><br><br>
              </div>
              <h1 class="font-secondary display-1 mb-5 mt-6">Menu</h1>
              <i class="far fa-heart text-dark"></i>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="text-center text-md-right ml-md-3 mb-md-0">
                        <h4 class="mb-2 mt-5 font-secondary"><u>First Course</u></h4>
                        <p class="mb-2"><b>Mixed Greens Cucumber Bouquet</b></p>
                        <p class="mb-2">Candied Pecans, Goat’s Cheese </p>
                        <p class="mb-2">Heirloom Tomatoes, Balsamic Vinaigrette</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="text-center text-md-center">
                        <h4 class="mb-2 mt-5 font-secondary"><u>Second Course</u></h4>
                        <p class="mb-2"><b>8 oz. Boneless Red Wine Braised Beef Short Ribs</b></p>
                        <p class="mb-2">Roasted Garlic Potato Pave</p>
                        <p class="mb-2">Fresh Snipped Carrot & Asparagus</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="text-center text-md-left ml-md-3 mb-md-0">
                        <h4 class="mb-2 mt-5 font-secondary"><u>Third Course</u></h4>
                        <p class="mb-2"><b>Warm Apple Blossom</b></p>
                        <p class="mb-2">Butterscotch Drizzle</p>
                        <p class="mb-2">French Vanilla Ice Cream</p>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-4">
              <img src="img/<?php echo $img_menu_bot ?>" style="object-fit: cover; max-width: 100%; max-height: 10vh;">
            </div>
            <div class="row justify-content-center">
              <div class="col-md-4 text-center text-md-center">
                <h4 class="mb-2 mt-4 font-secondary"><u>Late Night Station</u></h4>
                  <p class="mb-2"><b>EXTREME POUTINE STATION</b></p>
                  <p class="mb-2">Yukon Gold & Sweet Potato Fries, Pulled Pork, Bacon Bits, Scallions, Sour Cream, Shredded Cheddar Cheese, Fresh Cheese Curds, Sautéed Mushrooms, Diced Tomatoes, Jalapeno Peppers, Home-Style Beef Gravy & Cheese Sauce served in Authentic Take-Away Containers</p>


              </div>
            </div>
            <div class="row justify-content-center mt-4">
              <img src="img/<?php echo $img_menu_bot ?>" style="object-fit: cover; max-width: 100%; max-height: 10vh;">
            </div>
        </div>
    </div>
    <!-- Menu End -->

    <!-- Footer Start -->
    <div class="container-fluid bkgnd-dark text-white" id="contact" style="padding-right: 0px; padding-left: 0px;">
      <div class="py-5 container-fluid" style="background: rgba(0,0,0,0.1);">
        <div class="container text-center py-5">
            <div class="section-title before-color-override after-color-override position-relative text-center">
                <h1 class="font-secondary display-3 text-white">Thank You</h1>
                <i class="far fa-heart text-white"></i>
            </div>
	          <p class="m-0 mb-1"><a class="primary-text-color" href="<?php echo "$support_domain"?>"><?php echo "$support_domain" ?></a></p>
            <div class="row d-flex justify-content-center py-2">
              <div class="col-md-5 text-md-right">
                <p class="m-0 mb-1">Website by <?php echo "$support_name" ?></p>
              </div>
              <div class="col-md-5 text-md-left">
                <p class="text-white" href="#"><?php echo "$support_email" ?></p>
              </div>
            </div>
            <p class="m-0 mb-1" style="font-size: 0.75rem;">Original HTML/CSS template by <a class="primary-text-color" href="https://htmlcodex.com">HTML Codex</a></p>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <!-- Appendix Full Seating Chart Image -->
    <div class="container-fluid py-5" id="event">
      <div class="container pb-5" style="max-width: 85%;">
        <img src="img/seating-chart-full.png" style="object-fit: contain; max-width: 100%;">
      </div>
    </div>

</body>

</html>

<?php

$FF_PAGE_ENABLED = true;

$name_groom = "Oscar";
$name_bride = "Angel";
$img_carousel1 = "aobkgd.jpg";
$img_carousel1_mobile = "mobilebg.jpg";
$img_menu_cover = "menu-cover.png";
$img_menu_bot = "menu-bot.png";
$img_menu_bot2 = "menu-bot2.png";

$support_name = "Joshua Wong<br>& Kevin To";
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
  <link rel="preload" href="fonts/amoresa-aged.otf" as="font" type="font/otf" crossorigin>
  <link rel="modulepreload" href='js/seating.mjs'>

  <!-- Favicon -->
  <link href="favicon.ico" rel="icon">

  <!-- Google Web Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;600&display=swap" rel="stylesheet"> 

  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">

  <!-- Customized Bootstrap Stylesheet -->
  <link href="css/style.css" rel="stylesheet">
  <link href="css/textbox.css" rel="stylesheet">

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

    /* Mobile-only fix for tableDisplay layout shift */
    @media (max-width: 768px) {
      #tableDisplay {
        height: 55vh !important;
        min-height: 55vh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
      }
    }
  </style>


  <!-- JavaScript Libraries -->
  <script src="js/seating.mjs" type="module"></script>

  <script src="js/main.js"></script>
</head>


<!-- HTML body content begin -->



<body>
    <!-- Carousel Start -->
    <div class="container-fluid p-0" id="home">
      <div id="header-carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item position-relative active">
            <picture>
                <!-- Mobile version -->
		<source srcset="img/<?php echo "$img_carousel1_mobile" ?>" media="(max-width: 768px)">
                <!-- Desktop version -->
                    <img class="position-absolute h-100 w-100" src="img/<?php echo "$img_carousel1" ?>" style="object-fit: cover; object-position: 45% 80%;" />
            </picture>
            <div class="position-relative" style="height: 110vh;">
              <div>
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div class="p-3" style="max-width: 900px; position: relative; overflow: hidden;">
		    <h1 class="display-1 font-secondary text-white mb-md-4 hero-element delay-1"><?php echo "$name_bride & $name_groom" ?></h1>
		    <br>
                    <div class="d-inline-block border-top border-bottom border-light py-3 px-4 hero-element delay-2">
                        <h3 class="text-uppercase font-weight-normal text-white m-0" style="letter-spacing: 2px;">Find your table</h3>
                    </div>
                    <div></div>
                    <div class="d-inline-block py-3 px-4 hero-element delay-3" style="letter-spacing: 2px;"><br>
                      <div id="nameQueryLbl" class="border-light">
                        <label class="border-light font-weight-normal text-white mx-auto" style="letter-spacing: 1.5px;" for="name">enter your name</label><br>
                        <input type="text" class="text-center starry-textbox" id="inputName" name="name" value="">
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
                <img class="position-absolute" src="img/<?php echo $img_menu_cover ?>" style="object-fit: cover; max-height: 110%; max-width: 135%;" loading="lazy">
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
              <img src="img/<?php echo $img_menu_bot ?>" style="object-fit: cover; max-width: 100%; max-height: 30vh;" loading="lazy">
            </div>
            <div class="row justify-content-center">
              <div class="col-md-4 text-center text-md-center">
                <h4 class="mb-2 mt-4 font-secondary"><u>Late Night Station</u></h4>
                  <p class="mb-2"><b>EXTREME POUTINE STATION</b></p>
                  <p class="mb-2">Yukon Gold & Sweet Potato Fries, Pulled Pork, Bacon Bits, Scallions, Sour Cream, Shredded Cheddar Cheese, Fresh Cheese Curds, Sautéed Mushrooms, Diced Tomatoes, Jalapeno Peppers, Home-Style Beef Gravy & Cheese Sauce served in Authentic Take-Away Containers</p>


              </div>
            </div>
            <div class="row justify-content-center mt-4">
              <img src="img/<?php echo $img_menu_bot2 ?>" style="object-fit: cover; max-width: 100%; max-height: 50vh;" loading="lazy">
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
      <div class="container pb-5 text-center" style="max-width: 85%;">
        <img src="img/seating-chart-full.png" style="object-fit: contain; max-width: 100%;">
      </div>
    </div>

</body>

</html>


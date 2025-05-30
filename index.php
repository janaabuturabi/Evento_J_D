<?php
session_start();
$username = isset($_SESSION['user']) ? $_SESSION['user'] : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>
        <?php echo $username ? "Evento - " . htmlspecialchars($username) . "!" : "Evento - Home"; ?>
    </title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" href="IMAGE/favicon1.ico" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com/3.4.16"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#004047',
                        secondary: '#ffffff'
                    },
                    borderRadius: {
                        'none': '0px',
                        'sm': '4px',
                        DEFAULT: '8px',
                        'md': '12px',
                        'lg': '16px',
                        'xl': '20px',
                        '2xl': '24px',
                        '3xl': '32px',
                        'full': '9999px',
                        'button': '8px'
                    }
                }
            }
        };
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" rel="stylesheet">
</head>
<body>
<!-- home section starts here -->
<section class="home">
    <div class="home-box">
        <nav>
            <div class="logo bars">
                <div class="bar">
                    <i class="fa fa-bars"></i>
                </div>
                <?php if ($username): ?>
                    <span class="text-white text-sm md:text-base">
            <strong><?php echo htmlspecialchars($username); ?></strong>
        </span>
                    <h3>EVENTO</h3>
                    </a>
                <?php else: ?>
                    <h3>EVENTO</h3>
                <?php endif; ?>


            </div>
            <div class="menu">
                <div class="close">
                    <i class="fa fa-close"></i>
                </div>
                <ul>
                    <li><a href="index.php">home</a></li>
                    <li><a href="about.html">about</a></li>
                    <li><a href="#contact" class="text-white">Contact us</a></li>
                </ul>
            </div>

            <!-- تعديل زر الدخول والخروج -->
            <div class="signup-login flex items-center gap-4">
                <?php if ($username): ?>
                     <a href="logout.php" class="text-white flex items-center gap-1 hover:text-red-400 transition">
                        <i class="ri-logout-box-r-line text-xl"></i> Logout
                    </a>
                <?php else: ?>
                    <a href="signup_extra.php">Sign in</a>
                    <a href="signup_extra.php">Login</a>
                <?php endif; ?>

            </div>
        </nav>

        <div class="content">
            <h5>Evento</h5>
            <h1>Catch the moment before it’s gone.</h1>
            <p>Explore top events, feel the energy, and be part of something amazing — your next experience starts here</p>

            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="Your perfect event is just one search ...">
                <button>search</button>
            </div>

            <!-- الزر الأبيض الكبير -->
            <div class="search full-button">
                <a href="events.html">Book or Create</a>
            </div>
        </div>
    </div>



</section>
<!-- home section ends here  -->

<!-- travel section starts here  -->
<section class="py-20 bg-white">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            <!-- Box 1 -->
            <div>
                <img src="IMAGE/planning.png" alt="Event Planning" class="mx-auto mb-4 w-24 h-24">
                <h4 class="text-xl font-semibold mb-2">Event Planning</h4>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Event planning is a detailed process that ensures success. From setting goals to coordinating with suppliers, every step is crucial. With proper organization, the event becomes a memorable experience.
                </p>
            </div>

            <!-- Box 2 -->
            <div>
                <img src="IMAGE/map.png" alt="Event Location" class="mx-auto mb-4 w-24 h-24">
                <h4 class="text-xl font-semibold mb-2">Event Location</h4>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Our platform offers accurate event locations, making it easy to find and book your next experience. With up-to-date maps and details, you’ll always know where the event is, saving time and effort.
                </p>

            </div>

            <!-- Box 3 -->
            <div>
                <img src="IMAGE/trust.png" alt="Reliable and Trustworthy" class="mx-auto mb-4 w-24 h-24">
                <h4 class="text-xl font-semibold mb-2">Reliable and Trustworthy</h4>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Our platform is reliable and trustworthy, ensuring a smooth and secure booking experience for every event. You can count on us for accurate details and seamless service, every time.
                </p>
            </div>

        </div>
    </div>
</section>

<!-- travel section ends here  -->

<!-- destinatons section starts here  -->
<section class="destinations">
    <h4 class="label">Some of the most famous events</h4>
    <div class="container">
        <div class="container-box">
            <h2 class="heading">Exclusive Events and Memorable Experiences</h2>
            <div class="content">
                <p>Discover the most prominent and famous events we offer, where fun and a unique experience meet in every event. From huge parties to unique exhibitions, every event is an unforgettable moment waiting for you. Don't miss the opportunity and be part of the most amazing experiences that you will only find here!</p>
                <a href="events.html">explore more <i class="fa fa-arrow-right"></i></a>
            </div>
        </div>
        <div class="gallery">
            <div class="box box1">
                <img src="IMAGE/Cooking course.jpg" alt="">
                <div class="text">
                    <h2>Cooking course</h2>
                </div>
            </div>
            <div class="box box2">
                <img src="IMAGE/Clay hand-making course.jpg" alt="">
                <div class="text">
                    <h2>Clay hand-making course</h2>
                </div>
            </div>
            <div class="box box3">
                <img src="IMAGE/Horse course.jpg" alt="">
                <div class="text">
                    <h2>Horse course</h2>
                </div>
            </div>
            <div class="box box4">
                <img src="IMAGE/Robotics course.jpg" alt="">
                <div class="text">
                    <h2>Robotics course</h2>
                </div>
            </div>
            <div class="box box5">
                <img src="IMAGE/Handmade Projects.jpg" alt="">
                <div class="text">
                    <h2>Hand made course</h2>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- destinatons section ends here  -->

<!-- featured section starts here  -->
<section class="featured">
    <div class="gallery">
        <div class="box box1">
            <div class="first-box">
                <h4 class="label">featured offers</h4>
                <h2 class="heading">Book or create special events</h2>
                <p>
                    From here you can book or create events
                </p>
                <p>entertainment , cultural , group or official events
                </p>
                <a href="events.html">show more</a>
                <div class="image">
                    <!--                    <img src="IMAGE/events icon.png" alt="">-->
                </div>
            </div>
        </div>
        <div class="box box2">
            <img src="IMAGE/Plant Caree.jpg" alt="">
            <div class="content">
                <h2>Plant Care</h2>
                <div class="review-and-idr">
                    <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                    <p>ILS 30.00</p>
                </div>
            </div>
        </div>
        <div class="box box3">
            <img src="IMAGE/Music.jpg" alt="">
            <div class="content">
                <h2>Music Jam Session</h2>
                <div class="review-and-idr">
                    <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                    <p>ILS 50.00</p>
                </div>
            </div>
        </div>
        <div class="box box4">
            <img src="IMAGE/Group drawing.jpg" alt="">
            <div class="content">
                <h2>Group Pain</h2>
                <div class="review-and-idr">
                    <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                    <p>ILS 50.00</p>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- featured section ends here  -->

<!-- feedback section starts here  -->
<section class="feedback">
    <div class="container">
        <h4 class="label">Some opinions about us</h4>
        <h2 class="heading">Some opinions about us</h2>
        <p class="paragraph">
            Real stories from people
        </p>
    </div>

    <div class="voices">
        <div class="voice box1">
            <div class="profile">
                <img src="IMAGE/photo1.jpg" alt="">
                <div class="detail">
                    <li>ahmad</li>
                </div>
            </div>
            <p>"Payments were secure, and confirmations were instant. The customer support team was quick and helpful. I'll definitely use this platform again!"
            </p>
        </div>
        <div class="voice box2">
            <div class="profile">
                <img src="IMAGE/photo2.jpg" alt="">
                <div class="detail">
                    <li>suha</li>
                </div>
            </div>
            <p>"The variety of events is amazing, and the booking process was simple and clear. A great experience from start to finish."
            </p>
        </div>
        <div class="voice box3">
            <div class="profile">
                <img src="IMAGE/photo3.jpg" alt="">
                <div class="detail">
                    <li>osama</li>

                </div>
            </div>
            <p>"We were a group of five, and everything went perfectly. Instant confirmation with all the details and a map to the venue."
            </p>
        </div>
        <div class="voice box4">
            <div class="profile">
                <img src="IMAGE/photo4.jpg" alt="">
                <div class="detail">
                    <li>mohammad</li>

                </div>
            </div>
            <p>"The variety of events is amazing, and the booking process was simple and clear. A great experience from start to finish."
            </p>
        </div>
        <div class="voice box5">
            <div class="profile">
                <img src="IMAGE/photo5.jpg" alt="">
                <div class="detail">
                    <li>bana</li>

                </div>
            </div>
            <p>"Payments were secure, and confirmations were instant. The customer support team was quick and helpful. I'll definitely use this platform again!"</p>
        </div>
        <div class="voice box6">
            <div class="profile">
                <img src="IMAGE/photo6.jpg" alt="">
                <div class="detail">
                    <li>deema</li>

                </div>
            </div>
            <p>"The booking process was quick and simple. I loved how easy it was to find exactly what I was looking for!"</p>
        </div>
    </div>
</section>
<!-- feedback section ends here  -->

<section id="contact" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16 reveal">
                <h2 class="text-3xl lg:text-4xl font-bold mb-6">Get in Touch</h2>
                <p class="text-lg text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
                <div>
                    <form class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your name">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="your@email.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-32" placeholder="Your message"></textarea>
                        </div>
                        <button class="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition !rounded-button whitespace-nowrap">Send Message</button>
                    </form>
                </div>
                <div class="space-y-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Office Location</h3>
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <div class="w-5 h-5 flex items-center justify-center text-primary">
                                    <i class="ri-map-pin-line"></i>
                                </div>
                            </div>
                            <div>
                                <p class="text-gray-600">An-Najah National University-nablus-Palestine</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Contact Info</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <div class="w-5 h-5 flex items-center justify-center text-primary">
                                        <i class="ri-phone-line"></i>
                                    </div>
                                </div>
                                <p class="text-gray-600">0595209807</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <div class="w-5 h-5 flex items-center justify-center text-primary">
                                        <i class="ri-mail-line"></i>
                                    </div>
                                </div>
                                <a href="janaabuturabi4@gmail.com">janaabuturabi4@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Follow Us</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                                <i class="ri-facebook-fill"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                                <i class="ri-twitter-fill"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                                <i class="ri-linkedin-fill"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                                <i class="ri-instagram-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- footer section starts here  -->
<footer>
    <section class="footer">
        <div class="container">
            <div class="detail">
                <h3>Evento</h3>
                <p>At evento we make booking events easy and stress-free. Find, book, and enjoy amazing events all in one place. Your next adventure is just a click away!</p>
                <h5>get in touch</h5>
                <a href="janaabuturabi4@gmail.com">janaabuturabi4@gmail.com</a>
                <div class="social">
                    <a href="#"><i class="fa fa-linkedin-square"></i></a>
                    <a href="#"><i class="fa fa-facebook-square"></i></a>
                    <a href="#"><i class="fa fa-twitter-square"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>


                </div>
            </div>
            <div class="about-us">
                <h4>about us</h4>
                <li><a href="about.html">about us</a></li>
            </div>
            <div class="about-us">
                <h4>help</h4>
                <li><a href="FAQ.html">FAQ</a></li>
                <li><a href="sitemap.html">site map</a></li>
            </div>
            <div class="about-us">
                <h4></h4>
            </div>
        </div>

        <div class="copyright">
            <div>
                &copy;2024 - Evento , inc, all rights reserved
            </div>


            <div>

            </div>
        </div>
    </section>
</footer>
<!-- footer section ends here  -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" integrity="sha512-EZI2cBcGPnmR89wTgVnN3602Yyi7muWo8y1B3a8WmIv1J9tYG+udH4LvmYjLiGp37yHB7FfaPBo8ly178m9g4Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js" integrity="sha512-OzC82YiH3UmMMs6Ydd9f2i7mS+UFL5f977iIoJ6oy07AJT+ePds9QOEtqXztSH29Nzua59fYS36knmMcv79GOg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="script.js"></script>
</body>
</html>
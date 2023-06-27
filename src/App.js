// import { setTimeout } from 'timers';
import './Barba.js';
barba.init({
    views: [{
        namespace: 'home',
        beforeEnter(data) {
            basic();
            $('.banner-carousel').owlCarousel({
                loop: true,
                // margin: 10,
                nav: false,
                autoplay: true,
                autoplayTimeout: 1500,
                // animateOut: 'fadeOut',
                // stagePadding: 20,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            })


            // fetch images
            fetch('action/gallery.php')
                .then(response => response.json())
                .then(data => {
                    $('.gallery .card-wrapper').empty();
                    if (data.length) {
                        data.map((x, i) => {
                            console.log(i)
                            if (i < 8) {
                                const { id, image } = x;
                                $('#gallery .card-wrapper').append(`
                                <a href="admin/uploads/images/${image}" class="card spotlight" data-aos="zoom-out-up">
                                    <div class="thumbnail">
                                        <img src="admin/uploads/images/${image}" alt="">
                                        <div class="icon">
                                            <img src="./assets/images/icons/scan.png" alt="">
                                        </div>
                                    </div>
                                </a>`);
                            }
                        })
                    } else {
                        alert('No images found');
                    }
                })

            // mailer
            mailer();
        }
    }, {
        namespace: 'about',
        beforeEnter(data) {
            basic();

            $('.about-carousel').owlCarousel({
                loop: true,
                // margin: 10,
                nav: false,
                autoplay: true,
                autoplayTimeout: 1000,
                // stagePadding: 20,
                dots: false,
                responsive: {
                    0: {
                        items: 1,

                        stagePadding: 20,
                    },
                    600: {

                    },
                    1000: {
                        items: 3
                    }
                }
            })
        }
    }, {
        namespace: 'gallery',
        beforeEnter(data) {
            basic();

            // fetch images
            fetch('action/gallery.php')
                .then(response => response.json())
                .then(data => {
                    $('.images').empty();
                    if (data.length) {
                        data.map(x => {
                            const { id, image } = x;
                            $('.images').append(`
                                    <a href="admin/uploads/images/${image}" class="card spotlight" data-aos="zoom-out-up">
                                <div class="thumbnail">
                                    <img src="admin/uploads/images/${image}" alt="">
                                    <div class="icon">
                                        <img src="./assets/images/icons/scan.png" alt="">
                                    </div>
                                </div>
                            </a>`);
                        })
                    } else {
                        alert('No images found');
                    }
                })
        }
    },
    {
        namespace: 'videos',
        beforeEnter(data) {
            basic();

            // fetch images
            fetch('action/videos.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    $('.video').empty();
                    if (data.length) {
                        data.map(x => {
                            const { id, video } = x;
                            $('.video').append(`
                            <video controls src="admin/uploads/videos/${video}"></video>`);
                        })
                    } else {
                        alert('No Videos found');
                    }
                })
        }
    },
    {
        namespace: 'certificates',
        beforeEnter(data) {
            basic();

            // fetch images
            fetch('action/certificates.php')
                .then(response => response.json())
                .then(data => {
                    $('.certificates').empty();
                    if (data.length) {
                        data.map(x => {
                            const { id, image } = x;
                            $('.certificates').append(`
                            <a href="admin/uploads/certificates/${image}" class="card spotlight" data-aos="zoom-out-up">
                            <div class="thumbnail">
                                <img src="admin/uploads/certificates/${image}" alt="">
                                <div class="icon">
                                    <img src="./assets/images/icons/scan.png" alt="">
                                </div>
                            </div>
                        </a>`);
                        })
                    } else {
                        alert('No certificates found');
                    }
                })
        }
    },
    {
        namespace: 'news',
        beforeEnter(data) {
            basic();

            // fetch images
            fetch('action/news.php')
                .then(response => response.json())
                .then(data => {
                    $('.news').empty();
                    if (data.length) {
                        data.map(x => {
                            const { id, image } = x;
                            $('.news').append(`
                            <a href="admin/uploads/news/${image}" class="card spotlight" data-aos="zoom-out-up">
                            <div class="thumbnail">
                                <img src="admin/uploads/news/${image}" alt="">
                                <div class="icon">
                                    <img src="./assets/images/icons/scan.png" alt="">
                                </div>
                            </div>
                        </a>`);
                        })
                    } else {
                        alert('No News found');
                    }
                })
        }
    },
    {
        namespace: 'service',
        beforeEnter(data) {
            basic();

        }
    }, {
        namespace: 'contact',
        beforeEnter(data) {
            basic();
            mailer() 
        }
    }]
});

function mailer() {
    // mailer
    $('#contact-form').submit(e => {
        e.preventDefault();
        const button = $('#contact-btn');
        button.text('Sending..');
        let fd = new FormData();
        fd.append('name', $('#name').val());
        fd.append('email', $('#email').val());
        fd.append('phone', $('#phone').val());
        fd.append('message', $('#message').val());
        fetch('action/mailer.php', {
            method: 'post',
            body: fd
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result['status'] == true) {
                    button.text(`${result['message']}`);
                    setTimeout(() => {
                        button.empty().append(`Send Message &nbsp <ion-icon
                        name='arrow-forward-outline'></ion-icon>`);
                        $('#contact-form').trigger('reset');
                    }, 1000);
                } else {
                    button.text(`${result['message']}`);
                    setTimeout(() => {
                        button.empty().append(`Send Message &nbsp <ion-icon
                        name="arrow-forward-outline"></ion-icon>`);
                    }, 1000);
                }
            })
    })
}

function basic() {

    $('.contact-button-sticky-desktop button').css({ display: 'block' })
    $('.show-contact').click(function () {

        $('.contact-button-sticky-desktop').addClass('contact-button-sticky-desktop-active');
        $('.shimmer').show();
    })
    $('.contact-button-sticky-desktop .close ion-icon').click(function () {

        $('.contact-button-sticky-desktop').removeClass('contact-button-sticky-desktop-active');
        $('.shimmer').hide();
    });

    $('html, body').scrollTop(0);

    // sidemeu toggle
    $('.hamburger').click(function (x) {
        x.preventDefault();
        $('.sidemenu').addClass('sidemenu-active');
        $('.shimmer').show();
    });
    $('.sidemenu .close').click(function () {
        $('.sidemenu').removeClass('sidemenu-active');
        $('.shimmer').hide();
    });

    $(function () {
        if (!$('.header').hasClass("prevent")) {
            $(window).on("scroll", function () {

                if ($(window).scrollTop() > 50) {
                    $(".header").addClass("active-header");
                } else {
                    //remove the background property so it comes transparent again (defined in your css)
                    $(".header").removeClass("active-header");
                }

            });
        } else {
            $(".header").addClass("active-header");
        }
    });

}



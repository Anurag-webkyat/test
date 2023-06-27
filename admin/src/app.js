import barba from "./barba.js";
import Button from "./component/button/button.js";
import Header from "./component/header/Header.js";
import Loader from "./component/loader/Loader.js";
import Shimmer from "./component/shimmer/shimmer.js";
import Sidemenu from "./component/sidemenu/Sidemenu.js";
import Table from "./component/table/Table.js";
import Toaster from "./component/toaster/toaster.js";
// sidemenu
const sidemenu = new Sidemenu();
sidemenu.render();
sidemenu.hint({
    target: 'admission',
    content: `new`
});
// header
const header = new Header();
header.render();
// shimmer
const shimmer = new Shimmer();
shimmer.render();
// Toster
const toaster = new Toaster();
// Loader
const loader = new Loader();
barba.init({
    debug: true,
    views: [{
        namespace: 'dashboard',
        beforeEnter(data) {
            sidemenu.active('dashboard');
            header.update('Dashboard', sidemenu.current().find('i')[0].outerHTML);
            loader.load();
            loader.stop();
            logCheck();
            logout();
        }
    }, {
        namespace: 'gallery',
        beforeEnter() {
            loader.load();
            sidemenu.active('gallery');
            header.update('List Gallery', sidemenu.current().find('i')[0].outerHTML);
            logCheck();
            logout();

            const crued = import("../server/CRUED.js");
            let table = new Table($('#gallery')[0]);
            fetch('action/gallery.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop();
                        let slno = 0;
                        data.map((row) => {
                            slno++;
                            const {
                                id, image, date, time
                            } = row;
                            // Validate input
                            if (!image || !date || !time) {
                                console.error('Invalid input data:', row);
                                return;
                            }
                            const rowContent = [slno, `<img src="./uploads/images/${image}" width="100px" height="80px"></img>`, date, time];
                            table.addRow(rowContent, id);
                            table.actions({
                                // edit: 'edit-gallery.html?id=' + id,
                                delete: async (id) => {
                                    const data = {
                                        id: id
                                    };
                                    crued.then(option => {
                                        option._del_block('action/deleteGallery.php', data).then(response => {
                                            if (table.rowCount() == 0) {
                                                table.empty();
                                            }
                                            toaster.trigger({
                                                content: 'You have delete this image',
                                                timeout: 2000,
                                                type: 'success',
                                            });
                                        });
                                    });
                                },
                            });
                        });
                    } else {
                        table.empty();
                        loader.stop();
                    }
                });

        }
    }, {
        namespace: 'add-gallery',
        beforeEnter() {
            loader.load();
            sidemenu.active('gallery');
            header.update('Create gallery', sidemenu.current().find('i')[0].outerHTML);
            loader.stop();
            logCheck();
            logout();
            const button = new Button($('#save_btn')[0]);
            $('#form_gallery').submit(x => {
                x.preventDefault();
                button.load('Creating');
                const images = $('#image')[0].files;
                let fd = new FormData();
                for (let x = 0; x < images.length; x++) {
                    fd.append('image[]', images[x]);
                }

                fetch('./action/addGallery.php', {
                    method: 'post',
                    body: fd
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data['status'] == 'success') {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 2000,
                                type: 'success',
                            });
                            location.href = './gallery.html';
                        } else {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 3000,
                                type: 'error',
                            });
                        }
                    });
            });
        }
    }, {
        namespace: 'news',
        beforeEnter() {
            loader.load();
            sidemenu.active('news');
            header.update('List News', sidemenu.current().find('i')[0].outerHTML);
            logCheck();
            logout();

            const crued = import("../server/CRUED.js");
            let table = new Table($('#news')[0]);
            fetch('action/news.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop();
                        let slno = 0;
                        data.map((row) => {
                            slno++;
                            const {
                                id, image, date, time
                            } = row;
                            // Validate input
                            if (!image || !date || !time) {
                                console.error('Invalid input data:', row);
                                return;
                            }
                            const rowContent = [slno, `<img src="./uploads/news/${image}" width="100px" height="80px"></img>`, date, time];
                            table.addRow(rowContent, id);
                            table.actions({
                                delete: async (id) => {
                                    const data = {
                                        id: id
                                    };
                                    crued.then(option => {
                                        option._del_block('action/deleteNews.php', data).then(response => {
                                            if (table.rowCount() == 0) {
                                                table.empty();
                                            }
                                            toaster.trigger({
                                                content: 'You have delete this News',
                                                timeout: 2000,
                                                type: 'success',
                                            });
                                        });
                                    });
                                },
                            });
                        });
                    } else {
                        table.empty();
                        loader.stop();
                    }
                });

        }
    }, {
        namespace: 'add-news',
        beforeEnter() {
            loader.load();
            sidemenu.active('news');
            header.update('Create News', sidemenu.current().find('i')[0].outerHTML);
            loader.stop();
            logCheck();
            logout();
            const button = new Button($('#save_btn')[0]);
            $('#form_news').submit(x => {
                x.preventDefault();
                button.load('Creating');
                const image = $('#image')[0].files[0];
                let fd = new FormData();
                fd.append('image', image);

                fetch('./action/addNews.php', {
                    method: 'post',
                    body: fd
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data['status'] == 'success') {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 2000,
                                type: 'success',
                            });
                            location.href = './news.html';
                        } else {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 3000,
                                type: 'error',
                            });
                        }
                    });
            });
        }
    }, {
        namespace: 'certificates',
        beforeEnter() {
            loader.load();
            sidemenu.active('certificate');
            header.update('List Certificates', sidemenu.current().find('i')[0].outerHTML);
            logCheck();
            logout();

            const crued = import("../server/CRUED.js");
            let table = new Table($('#certificate')[0]);
            fetch('action/certificates.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop();
                        let slno = 0;
                        data.map((row) => {
                            slno++;
                            const {
                                id, image, date, time
                            } = row;
                            // Validate input
                            if (!image || !date || !time) {
                                console.error('Invalid input data:', row);
                                return;
                            }
                            const rowContent = [slno, `<img src="./uploads/certificates/${image}" width="100px" height="80px"></img>`, date, time];
                            table.addRow(rowContent, id);
                            table.actions({
                                delete: async (id) => {
                                    const data = {
                                        id: id
                                    };
                                    crued.then(option => {
                                        option._del_block('action/deleteCertificate.php', data).then(response => {
                                            if (table.rowCount() == 0) {
                                                table.empty();
                                            }
                                            toaster.trigger({
                                                content: 'You have delete this Certificate',
                                                timeout: 2000,
                                                type: 'success',
                                            });
                                        });
                                    });
                                },
                            });
                        });
                    } else {
                        table.empty();
                        loader.stop();
                    }
                });

        }
    }, {
        namespace: 'add-certificate',
        beforeEnter() {
            loader.load();
            sidemenu.active('certificate');
            header.update('Create Certificate', sidemenu.current().find('i')[0].outerHTML);
            loader.stop();
            logCheck();
            logout();
            const button = new Button($('#save_btn')[0]);
            $('#form_certificate').submit(x => {
                x.preventDefault();
                button.load('Creating');
                const image = $('#image')[0].files[0];
                let fd = new FormData();
                fd.append('image', image);

                fetch('./action/addCertificate.php', {
                    method: 'post',
                    body: fd
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data['status'] == 'success') {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 2000,
                                type: 'success',
                            });
                            location.href = './certificates.html';
                        } else {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 3000,
                                type: 'error',
                            });
                        }
                    });
            });
        }
    }, {
        namespace: 'videos',
        beforeEnter() {
            loader.load();
            sidemenu.active('video');
            header.update('List Videos', sidemenu.current().find('i')[0].outerHTML);
            logCheck();
            logout();

            const crued = import("../server/CRUED.js");
            let table = new Table($('#video')[0]);
            fetch('action/videos.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length) {
                        loader.stop();
                        let slno = 0;
                        data.map((row) => {
                            slno++;
                            const {
                                id, video, date, time
                            } = row;
                            // Validate input
                            if (!video || !date || !time) {
                                console.error('Invalid input data:', row);
                                return;
                            }
                            const rowContent = [slno, `<video width="150px" height="110px" controls><source src="uploads/videos/${video}" type="video/mp4"> </video>`, date, time];
                            table.addRow(rowContent, id);
                            table.actions({
                                delete: async (id) => {
                                    const data = {
                                        id: id
                                    };
                                    crued.then(option => {
                                        option._del_block('action/deleteVideo.php', data).then(response => {
                                            if (table.rowCount() == 0) {
                                                table.empty();
                                            }
                                            toaster.trigger({
                                                content: 'You have delete this Video',
                                                timeout: 2000,
                                                type: 'success',
                                            });
                                        });
                                    });
                                },
                            });
                        });
                    } else {
                        table.empty();
                        loader.stop();
                    }
                });

        }
    }, {
        namespace: 'add-video',
        beforeEnter() {
            loader.load();
            sidemenu.active('video');
            header.update('Create Video', sidemenu.current().find('i')[0].outerHTML);
            loader.stop();
            logCheck();
            logout();
            const button = new Button($('#save_btn')[0]);
            $('#form_video').submit(x => {
                x.preventDefault();
                button.load('Creating');
                const video = $('#video')[0].files[0];
                let fd = new FormData();
                fd.append('video', video);

                fetch('./action/addVideo.php', {
                    method: 'post',
                    body: fd
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data['status'] == 'success') {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 2000,
                                type: 'success',
                            });
                            location.href = './videos.html';
                        } else {
                            button.stop();
                            toaster.trigger({
                                content: `${data['message']}`,
                                timeout: 3000,
                                type: 'error',
                            });
                        }
                    });
            });
        }
    }, {
        namespace: "login",
        beforeEnter() {

            $("#login_form .eye-button").click(function () {
                const input = $(this).parent().find("input");
                const icon = $(this);
                if (input.attr("type") == "password") {
                    icon.empty().append(`<ion-icon name="eye-outline"></ion-icon>`);
                    input.attr("type", "text");
                } else {
                    icon
                        .empty()
                        .append(`<ion-icon name="eye-off-outline"></ion-icon>`);
                    input.attr("type", "password");
                }
            });

            const button = $('#login-button');
            $("#login_form").submit((x) => {
                x.preventDefault();
                button.text('Please wait');
                const username = $("#userName").val();
                const password = $("#password").val();

                fetch("./action/loginAction.php", {
                    method: "post",
                    headers: {
                        contentType: "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const { status, message } = data;
                        if (status === 'success') {
                            window.location.href = 'dashboard.html';
                        } else {
                            $(".AUTH_ERROR").text(message).show();
                        }
                    });

            });
        },
    },
    ]
});

function logCheck() {
    fetch('action/checkLoginAdmin.php')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data[0]['info'] != 'true') {
                location.replace('./index.html');
            }
        });
}
function logout() {
    $('.logout').click(x => {
        x.preventDefault();
        fetch('action/logout.php')
            .then(response => response.json())
            .then(data => {
                if (data == 1) {
                    location.href = './index.html';
                }
            });
    });
}
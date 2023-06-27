class Sidemenu {

    constructor() {
        this.isRendered = false;
    }

    render() {
        if (!this.isRendered) {
            let template = `
            <nav class="sidemenu">
                <div class="header">          
                    <p>Admin</p>
                </div>
                <div class="navigation">
                    <ul>
                        <li><a link-ref="gallery" href="gallery.html"><i class="fas fa-tv"></i> &nbsp; Gallery</a></li>
                        <li><a link-ref="video" href="videos.html"><i class="fas fa-tv"></i> &nbsp; Videos</a></li>
                        <li><a link-ref="news" href="news.html"><i class="fas fa-tv"></i> &nbsp; News</a></li>
                        <li><a link-ref="certificate" href="certificates.html"><i class="fas fa-tv"></i> &nbsp; Certificates</a></li>
                    </ul>
                </div>
            </nav>`;
            $('body').prepend(template);
            this.#setup();
        }
    }

    #setup() {
        // active class
        const links = $('.navigation ul li a');
        links.click(e => {
            e.preventDefault();
            links.removeClass('active');
            $(e.target).addClass('active');
        });
    }

    active(para) {
        if (!this.isRendered) {
            const links = $('.navigation ul li a');
            links.each(function () {
                const link = $(this).attr('link-ref');
                if (para == link) {
                    links.removeClass('active');
                    $(this).addClass('active');
                }
            })
            this.isRendered = true;
        }
    }

    hint(para) {
        const { target, content } = para;
        let template = `<div class="hint">${content}</div>`;
        const links = $('.navigation ul li a');
        links.each(function () {
            const link = $(this).attr('link-ref');
            if (target == link) {
                $(this).append(template);
            }
        })
    }

    current() {
        const links = $('.navigation ul li .active');
        return links;
    }
}
export default Sidemenu;
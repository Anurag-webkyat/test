class Header {
    render () {
        const template = `<header><div class="title">${this.title}</div> <div class="options"><div class="setting logout"><i class="fas fa-sign-out-alt"></i></div></div></header>`
        $('body').prepend(template);
    }
    update (title, icon) {
        $('header .title').empty().append(icon + ' &nbsp; ' + title);
    }

}

export default Header;
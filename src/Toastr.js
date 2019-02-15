class Toastr {
    constructor(Vue, layout, options) {
        this.Vue = Vue;
        this.layout = layout;
        this.options = options;

        this.defaults = {
            duration: options.duration,
            title: null,
            html: false,
        };
    }

    title(title) {
        this.options.title = title;
        return this;
    }

    duration(duration) {
        this.options.duration = duration;
        return this;
    }

    position(position) {
        this.options.position = position;
        return this;
    }

    html() {
        this.options.html = true;
        return this;
    }

    error(body) {
        this.toastr('danger', body);
    }

    info(body) {
        this.toastr('info', body);
    }

    message(body) {
        this.toastr('message', body);
    }

    primary(body) {
        this.toastr('primary', body);
    }

    success(body) {
        this.toastr('success', body);
    }

    warning(body) {
        this.toastr('warning', body);
    }

    toastr(type, body) {
        const ToastrNotification = this.Vue.extend(this.layout);

        const props = Object.assign({}, this.options, { type, body });

        (new ToastrNotification({
            propsData: props,
        })).$mount();

        this.reset();
    }

    reset() {
        Object.assign(this.options, this.defaults);
    }
}

export default Toastr;

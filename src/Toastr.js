class Toastr {
    constructor(Vue, layout, options) {
        this.Vue = Vue;
        this.layout = layout;
        this.options = options;

        this.defaults = {
            duration: options.duration,
            icon: null,
            title: null,
            html: false,
        };
    }

    when(condition, callback, fallback = null) {
        if (condition) {
            return callback(this, condition) || this;
        } if (fallback) {
            return fallback(this, condition) || this;
        }

        return this;
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

    icon(icon) {
        this.options.icon = icon;
        return this;
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

import Vue from 'vue';

class Toastr {
    constructor(layout) {
        this.Vue = Vue;
        this.layout = layout;

        this.defaultOptions = {
            duration: 3500,
            position: 'top-center',
            icon: null,
            title: null,
            html: false,
        };

        this.options = { ...this.defaultOptions };
    }

    defaults(defaultOptions) {
        Object.assign(this.defaultOptions, defaultOptions);
        return this;
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
        const ToastrNotification = Vue.extend(this.layout);

        const props = { ...this.options, type, body };

        (new ToastrNotification({
            propsData: props,
        })).$mount();

        this.reset();
    }

    reset() {
        Object.assign(this.options, this.defaultOptions);
    }
}

export default Toastr;

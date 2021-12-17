import { createApp } from 'vue';
import { nanoid } from 'nanoid/non-secure';
import Container from './bulma/Container.vue';

const defaultOptions = {
    duration: 350000,
    icon: null,
    title: null,
    html: false,
};

const defaultPosition = 'top-center';
const containerClass = 'toastr-notifications';

class Toastr {
    constructor() {
        this.setup(defaultPosition);
    }

    when(condition, callback, fallback = null) {
        if (condition) {
            return callback(this, condition) || this;
        }

        if (fallback) {
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

    createContainer() {
        const container = document.createElement('div');
        container.className = containerClass;
        document.body.appendChild(container);

        return createApp(Container).mount(container);
    }

    toastr(type, body) {
        const props = { ...this.options, type, body, key: nanoid() };

        this.container.toastr(props);

        this.setup();
    }

    setup(position = null) {
        this.options = { ...defaultOptions };

        this.container ??= this.createContainer();
        this.container.position = position ?? this.container.position;
    }
}

export default Toastr;

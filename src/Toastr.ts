import { createApp, Component } from 'vue';
import { nanoid } from 'nanoid/non-secure';
import Container from './bulma/Container.vue';

interface ToastrOptions {
    duration: number;
    icon: string | null;
    title: string | null;
    html: boolean;
}

const defaultOptions: ToastrOptions = {
    duration: 3500,
    icon: null,
    title: null,
    html: false,
};

const defaultPosition: string = 'top-center';
const containerClass: string = 'toastr-notifications';

class Toastr {
    private options: ToastrOptions;
    private container: Component | null;

    constructor() {
        this.setup(defaultPosition);
    }

    when(condition: boolean, callback: (toastr: Toastr, condition: boolean) => void, fallback: ((toastr: Toastr, condition: boolean) => void) | null = null): Toastr {
        if (condition) {
            return callback(this, condition) || this;
        }

        if (fallback) {
            return fallback(this, condition) || this;
        }

        return this;
    }

    title(title: string): Toastr {
        this.options.title = title;
        return this;
    }

    duration(duration: number): Toastr {
        this.options.duration = duration;
        return this;
    }

    html(): Toastr {
        this.options.html = true;
        return this;
    }

    error(body: string): void {
        this.toastr('danger', body);
    }

    icon(icon: string): Toastr {
        this.options.icon = icon;
        return this;
    }

    info(body: string): void {
        this.toastr('info', body);
    }

    message(body: string): void {
        this.toastr('message', body);
    }

    primary(body: string): void {
        this.toastr('primary', body);
    }

    success(body: string): void {
        this.toastr('success', body);
    }

    warning(body: string): void {
        this.toastr('warning', body);
    }

    createContainer(): Component {
        const container = document.createElement('div');
        container.className = containerClass;
        document.body.appendChild(container);

        return createApp(Container).mount(container);
    }

    toastr(type: string, body: string): void {
        const props = { ...this.options, type, body, key: nanoid() };

        this.container.toastr(props);

        this.setup();
    }

    setup(position: string | null = null): void {
        this.options = { ...defaultOptions };

        this.container ??= this.createContainer();
        this.container.position = position ?? this.container.position;
    }
}

export default Toastr;

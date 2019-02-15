class Notification {
    constructor(vm, layout, options) {
        this.vm = vm;
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
        if (this.toastrDuration) {
            this.options.duration = this.toastrDuration;
        }

        if (this.toastrPosition) {
            this.options.position = this.toastrPosition;
        }

        const ToastrNotification = this.vm.extend(this.layout);

        (new ToastrNotification({
            propsData: { ...this.options, type, body },
        })).$mount();

        this.reset();
    }

    reset() {
        this.options = { ...this.options, ...this.defaults };
    }
}

export default Notification;

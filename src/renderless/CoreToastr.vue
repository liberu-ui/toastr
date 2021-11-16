<script>
import Vue from 'vue';
import positions from '../config/positions';

export default {
    name: 'CoreToastr',

    props: {
        duration: {
            type: Number,
            required: true,
            validator: val => val > 0,
        },
        position: {
            type: String,
            required: true,
            validator: position => positions.includes(position),
        },
    },

    data: () => ({
        container: 'toastr-notifications',
        hovering: false,
        portal: null,
        progress: 0,
        progressDelay: 10,
        visible: true,
    }),

    computed: {
        portalClass() {
            return `${this.container} ${this.position.split('-').join(' ')}`;
        },
        portalSelector() {
            return `.${this.container}`;
        },
        progressRate() {
            return 100 / (this.duration / this.progressDelay);
        },
    },

    created() {
        this.setUp();
    },

    mounted() {
        this.show();
    },

    methods: {
        setUp() {
            const portal = document.querySelector(this.portalSelector);

            this.portal = portal
                ? portal.__vue__
                : this.createPortal();

            this.portal.$el.className = this.portalClass;
        },
        createPortal() {
            const portal = new Vue({
                render: renderElement => renderElement('div'),
            }).$mount();

            document.body.appendChild(portal.$el);

            return portal;
        },
        startHovering() {
            this.hovering = true;
            clearTimeout(this.timer);
            clearInterval(this.interval);
            this.progress = 0;
        },
        stopHovering() {
            this.hovering = false;
            this.startTimer();
        },
        show() {
            this.portal.$el.appendChild(this.$el);
            this.startTimer();
        },
        close() {
            this.hovering = false;
            clearTimeout(this.timer);
            clearInterval(this.interval);
            this.visible = false;
        },
        startTimer() {
            this.timer = setTimeout(() => {
                this.close();
            }, this.duration);

            this.interval = setInterval(() => {
                this.progress += this.progressRate;
            }, this.progressDelay);
        },
    },

    render() {
        return this.$slots.default({
            visible: this.visible,
            hovering: this.hovering,
            progress: this.progress,
            hover: {
                mouseenter: () => this.startHovering(),
                mouseleave: () => this.stopHovering(),
            },
            close: this.close,
        });
    },
};
</script>

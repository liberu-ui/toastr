<script>
import Vue from 'vue';
import positions from '../config/positions';

export default {
    name: 'CoreToastr',

    emits: ['update:visible'],

    inheritAttrs: false,

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
        visible: {
            type: Boolean,
            required: true,
        },
    },

    data: () => ({
        hovering: false,
        progress: 0,
        progressDelay: 10,
    }),

    computed: {
        progressRate() {
            return 100 / (this.duration / this.progressDelay);
        },
    },

    mounted() {
        this.startTimer();
    },

    methods: {
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
        close() {
            this.hovering = false;
            clearTimeout(this.timer);
            clearInterval(this.interval);
            this.$emit('update:visible', false);
        },
        startTimer() {
            this.timer = setTimeout(() => this.close(), this.duration);

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

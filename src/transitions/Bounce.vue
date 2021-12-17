<template>
    <transition appear
        :enter-active-class="enterClass"
        :leave-active-class="leaveClass"
        @after-leave="$emit('close')">
        <slot/>
    </transition>
</template>

<script>
import 'animate.css';

export default {
    emits: ['close'],

    props: {
        position: {
            type: String,
            required: true,
        },
    },

    computed: {
        direction() {
            switch (this.position) {
            case 'top-center':
                return 'Down';
            case 'bottom-center':
                return 'Up';
            case 'top-right': case 'bottom-right':
                return 'Right';
            default:
                return 'Left';
            }
        },
        enterClass() {
            return `animate__bounceIn${this.direction}`;
        },
        leaveClass() {
            switch (this.direction) {
            case 'Down':
                return 'animate__bounceOutUp';
            case 'Up':
                return 'animate__bounceOutDown';
            default:
                return `animate__bounceOut${this.direction}`;
            }
        },
    },
};
</script>

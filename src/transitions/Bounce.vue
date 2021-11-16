<template>
    <transition appear
        :enter-active-class="enterClass"
        :leave-active-class="leaveClass"   >
        <slot/>
    </transition>
</template>

<script>


export default {
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
            return `bounceIn${this.direction}`;
        },
        leaveClass() {
            switch (this.direction) {
            case 'Down':
                return 'bounceOutUp';
            case 'Up':
                return 'bounceOutDown';
            default:
                return `bounceOut${this.direction}`;
            }
        },
    },
};

</script>

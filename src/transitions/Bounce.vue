<template>
    <renderless-toastr :position="position"
        v-bind="$attrs">
        <transition slot-scope="{ visible, hovering, progress, hover, close }"
            appear
            :enter-active-class="enterClass"
            :leave-active-class="leaveClass"
            @after-leave="$emit('after-leave')">
            <slot :hovering="hovering"
                :progress="progress"
                :close="close"
                :hover="hover"
                v-if="visible"/>
        </transition>
    </renderless-toastr>
</template>

<script>
import RenderlessToastr from '../renderless/Toastr.vue';

export default {
    components: { RenderlessToastr },

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

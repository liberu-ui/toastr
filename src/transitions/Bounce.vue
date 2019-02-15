<template>
    <r-l-toastr :position="position"
        :duration="duration">
        <transition slot-scope="{
                visible, hovering, close, progress, startHovering, stopHovering,
            }"
            appear
            :enter-active-class="enterClass"
            :leave-active-class="leaveClass"
            @after-leave="$emit('after-leave')">
            <slot :hovering="hovering"
                :progress="progress"
                :start-hovering="startHovering"
                :stop-hovering="stopHovering"
                :close="close"
                v-if="visible"/>
        </transition>
    </r-l-toastr>
</template>

<script>
import RLToastr from '../renderless/Toastr.vue';

export default {
    components: { RLToastr },

    props: {
        duration: {
            type: Number,
            required: true,
        },
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

<template>
    <div class="position"
        :class="cssClass">
        <toastr v-for="toastr in toastrs"
            v-bind="{...toastr, position}"
            @close="pop(toastr)"/>
    </div>
</template>

<script>
import Toastr from './Toastr.vue';
import positions from '@enso-ui/toastr/src/config/positions.js';

export default {
    name: 'Container',

    components: { Toastr },

    data: () => ({
        position: '',
        toastrs: [],
    }),

    computed: {
        cssClass() {
            return this.position.split('-').join(' ');
        },
    },

    methods: {
        toastr(toastr) {
            this.toastrs.push(toastr);
        },
        pop({ key }) {
            const index = this.toastrs.findIndex(toastr => toastr.key === key);

            this.toastrs.splice(index,1);
        }
    }
};
</script>

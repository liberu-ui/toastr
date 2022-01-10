<template>
    <div class="position"
        :class="cssClass">
        <toastr v-for="toaster in toastrs"
            :key="toaster.key"
            v-bind="{...toaster, position}"
            @close="pop(toaster)"/>
    </div>
</template>

<script>
import Toastr from './Toastr.vue';

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

            this.toastrs.splice(index, 1);
        },
    },
};
</script>

import ToastrHandler from './src/Toastr';
import Bounce from './src/transitions/Bounce.vue';
import BulmaLayout from './src/layouts/BmToastr.vue';
import RenderlessToastr from './src/renderless/Toastr.vue';

const Toastr = {
    install(Vue, { layout, options }) {
        Vue.prototype.$toastr = new ToastrHandler(Vue, layout, options);
    },
};

export {
    Toastr, RenderlessToastr, BulmaLayout, Bounce,
};

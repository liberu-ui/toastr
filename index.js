import Toastr from './src/Toastr';

export default {
    install(Vue, { layout, options }) {
        Vue.prototype.$toastr = new Toastr(Vue, layout, options);
    },
};

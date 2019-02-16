import ToastrHandler from './src/Toastr';

export default {
    install(Vue, { layout, options }) {
        Vue.prototype.$toastr = new ToastrHandler(Vue, layout, options);
    },
};


import ToastrPlugin from './src/Toastr';

export default {
    install(Vue, { layout, options }) {
        Vue.prototype.$toastr = new ToastrPlugin(Vue, layout, options);
    },
};

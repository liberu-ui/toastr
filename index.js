import ToastrHandler from './src/Toastr';

const Toastr = {
    install(Vue, { layout, options }) {
        Vue.prototype.$toastr = new ToastrHandler(Vue, layout, options);
    },
};

export { Toastr };


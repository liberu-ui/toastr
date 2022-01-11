<template>
    <bounce :position="position">
        <div class="toastr animate__animated"
            v-if="visible">
            <core-toastr v-bind="$attrs"
                :position="position"
                v-model:visible="visible">
                <template #default="{ close, hover, hovering, progress }">
                    <div class="notification"
                         :class="[{[`is-${type}`]: type }, { 'highlight': hovering }]"
                         @click="close">
                        <progress-bar color="#000000"
                            :progress="progress"
                            :opacity="0.35"
                            :thickness="2"/>
                        <article class="media"
                            v-on="hover">
                            <div class="media-left"
                                v-if="!html">
                                <span class="icon is-medium">
                                    <fa :icon="displayIcon"
                                        size="lg"/>
                                </span>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <template v-if="html">
                                        <!-- eslint-disable-next-line vue/no-v-html -->
                                        <p v-html="title"
                                            v-if="title"/>
                                        <!-- eslint-disable-next-line vue/no-v-html -->
                                        <p v-html="body"/>
                                    </template>
                                    <template v-else>
                                        <p class="title is-5"
                                            v-if="title">
                                            {{ title }}
                                        </p>
                                        <p class="subtitle is-6">
                                            {{ body }}
                                        </p>
                                    </template>
                                </div>
                            </div>
                        </article>
                    </div>
                </template>
            </core-toastr>
        </div>
    </bounce>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import ProgressBar from '@enso-ui/progress-bar';
import CoreToastr from '../renderless/CoreToastr.vue';
import Bounce from '../transitions/Bounce.vue';
import positions from '../config/positions';
import types from '../config/types';
import icons from '../config/icons';

export default {
    name: 'Toastr',

    components: {
        Bounce, CoreToastr, Fa, ProgressBar,
    },

    props: {
        body: {
            type: String,
            required: true,
        },
        icon: {
            type: [String, Object],
            default: null,
        },
        html: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            required: true,
            validator: position => positions.includes(position),
        },
        title: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            required: true,
            validator: val => types.includes(val),
        },
    },

    data: () => ({
        visible: true,
    }),

    computed: {
        displayIcon() {
            return this.icon || icons[this.type];
        },
    },
};
</script>

<style lang="scss">
.toastr-notifications {
    .position {
        position: fixed;
        display: flex;
        flex-direction: column;
        z-index: 9999;
        pointer-events: none;

        &.top {
            top: 4em;
        }

        &.bottom {
            bottom: 4em;
        }

        &.left {
            margin-right: auto;
            left: 1em;
        }

        &.right {
            margin-left: auto;
            right: 1em;
        }

        &.center {
            margin-left: calc(50% - 10em);
        }

        .toastr {
            &:not(:last-child) {
                margin-bottom: .35em;
            }

            .notification {
                display: flex;
                width: 20em;
                padding: .4em;
                pointer-events: auto;
                position: relative;
                overflow-x: hidden;
                cursor: pointer;
                -webkit-box-shadow: 0 0 5px 3px hsla(0,0%,50%,.4);
                box-shadow: 0 0 5px 3px hsla(0,0%,50%,.4);
                transition: box-shadow 0.2s ease-in-out;

                &.highlight {
                    -webkit-box-shadow: 0 0 5px 3px hsla(0,0%,4%,.5);
                    box-shadow: 0 0 5px 3px hsla(0,0%,4%,.3);
                }

                .media {
                    .media-left {
                        margin-right: .5rem;
                        margin-top: auto;
                        margin-bottom: auto;

                        .icon {
                            vertical-align: middle;
                        }
                    }
                }

                .media .media-content {
                    margin-top: auto;
                    margin-bottom: auto;
                }
            }
        }
    }
}
</style>

<template>
    <core-toastr :duration="duration"
        :position="position">
        <template #:default="{ visible, hovering, progress, hover, close }">
            <bounce :position="position"
                :duration="duration">
                <div class="notification toastr animated"
                    :class="[{ 'highlight': hovering }, type ? `is-${type}` : '']"
                    @click="close"
                    v-on="hover"
                    v-if="visible">
                    <progress-bar :progress="progress"
                        :opacity="0.35"
                        color="#000000"
                        :thickness="2"/>
                    <article class="media">
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
            </bounce>
        </template>
    </core-toastr>
</template>

<script>
import ProgressBar from '@enso-ui/progress-bar';
import Types from '../config/types';
import Icons from '../config/icons';
import CoreToastr from '../renderless/CoreToastr.vue';
import Bounce from '../transitions/Bounce.vue';
import positions from '../config/positions';

export default {
    name: 'Toastr',

    components: { CoreToastr, Bounce, ProgressBar },

    props: {
        body: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 3500,
            validator: val => val > 0,
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
            default: 'top-center',
            validator: position => positions.includes(position),
        },
        title: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            required: true,
            validator: val => Types.includes(val),
        },
    },

    computed: {
        displayIcon() {
            return this.icon || Icons[this.type];
        },
    },
};
</script>

<style lang="scss">
    .toastr-notifications {
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

        .toastr.notification {
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

            &:not(:last-child) {
                margin-bottom: .35em;
            }

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
</style>

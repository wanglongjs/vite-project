import { computed } from 'vue';

export default await (async () => {
const props = defineProps({
prefix: {
type: String,
default: 'icon'
},
iconClass: {
type: String,
required: false
},
color: {
type: String,
default: ''
}
});

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
const __VLS_Component = (await import('vue')).defineComponent({
props: ({
prefix: {
type: String,
default: 'icon'
},
iconClass: {
type: String,
required: false
},
color: {
type: String,
default: ''
}
}),
setup() {
() => {
// @ts-ignore
[];
// @ts-ignore
[symbolId, color];
};
return {};
},
});
return {} as typeof __VLS_Component & (new () => { $slots: typeof import('./index.vue.__VLS_template').default; });
})();

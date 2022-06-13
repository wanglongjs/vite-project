import { defineComponent, mergeProps, ref } from 'vue'
interface PropsType {
  msg: string
}
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup() {
    const count = ref(0)
    return (props: PropsType) => (
      <div>
        <p>{props.msg}</p>
        <div>{count.value}</div>
      </div>
    )
  }
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // render() {
  //   return (
  //     <div>
  //       <div>{this.msg}</div>
  //       <h1>{this.count}</h1>
  //     </div>
  //   )
  // }
})
// export default () => {
//   return (
//     <div>
//       <h1>foo 函数式组件</h1>
//     </div>
//   )
// }
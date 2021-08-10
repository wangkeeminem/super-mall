import CheckButton from 'components/content/checkbutton/CheckButton'
import {mapGetters} from 'vuex'
//cart中的全选和item选
export const useCheckButton ={
  data() {//监听item或合计全选的选中状况、在两个组件间混用了
    return {
      isActive:true
    }
  },
  computed: {
    ...mapGetters({cartlist:'getCartlist'}),

  },
  components:{CheckButton},
  methods: {
    totalchoiceclick(){
      console.log('点了全选');
      this.isActive=!this.isActive//反转
      this.$store.state.cartlist.forEach(item=>item.isActive=this.isActive)//给子赋值
    },
    itemchoiceclick(){
      console.log('点了');
      this.$store.commit('changechoice',this.product)
      console.log(this.product.isActive);
      // this.$store.dispatch('changetotalchoice')//item到totalchoice
      // console.log('全选状态为'+this.$store.state.totalchoose);
    }
  },
}
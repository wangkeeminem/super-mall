<template>
  <div class="DetailParamInfo">
    <div  class="itemRules">
    <table v-for="(item,index) in itemParam.tables" class="itemRules" :key="index">
      <tr v-for="(item1,index1) in item" :key="index1">
        <td v-for="(item2,index2) in item1" :key="index2">{{item2}}</td>
      </tr>
    </table>
    </div>
    <table class="infoSet">
      <tr v-for="(item,index) in itemParam.infoSet" :key="index">
        <td class='itemkey'>{{item.key}}</td>
        <td >{{item.value}}</td>        
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    itemParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.DetailParamInfo{
  margin-top: 20px;
  border-top:rgba(100, 100, 100, 0.1) solid 5px; 
  border-bottom:rgba(100, 100, 100, 0.1) solid 5px; 
  padding: 20px 15px 20px 15px;
  font-size: 14px;
}
div.itemRules{
  /* width: 100%; */
  border-bottom:rgba(100, 100, 100, 0.1) solid 2px;
}
table.itemRules{
  width: 100%;
}
table.itemRules>tr>td{
  border-bottom:rgba(100, 100, 100, 0.1) solid 1px;
}
table.itemRules>tr>td:first-child{
  width: 30%;
}
table{
  border-collapse: collapse;
}
.infoSet{
  width: 100%;
  /* border-bottom:rgba(100, 100, 100, 0.1) solid 3px; */
}
.infoSet>tr>td{
  border-bottom:rgba(100, 100, 100, 0.1) solid 1px;
  color: #e84868;
}
.itemkey{
  width: 30%;
}
td{
  padding:10px 0px 10px 0px
}

</style>
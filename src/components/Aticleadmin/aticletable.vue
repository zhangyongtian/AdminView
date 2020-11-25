<template>
  <div>
	  <el-table
	    ref="filterTable"
	    :data="tableData"
	    style="width: 100%">
	    <el-table-column
	      prop="date"
	      label="日期"
	      sortable
	      width="180"
	      column-key="date"
	      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
	      :filter-method="filterHandler"
	    >
	    </el-table-column>
		<el-table-column
		  prop="img"
		  label="首图"
		  width="180">
		  <template slot-scope="scope">
		       <img :src="scope.row.img" alt="" style="width: 100px;height: 50px; border-radius: 20%;">
		  </template>
		</el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址"
	      :formatter="formatter">
	    </el-table-column>
	    <el-table-column
	      prop="tag"
	      label="标签"
	      width="100"
	      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
	      :filter-method="filterTag"
	      filter-placement="bottom-end">
	      <template slot-scope="scope">
	        <el-tag
	          :type="scope.row.tag === '家' ? 'primary' : 'success'"
	          disable-transitions>{{scope.row.tag}}</el-tag>
	      </template>
	    </el-table-column>
		
		<el-table-column
		  prop="iscommit"
		  label="是否发布"
		  width="100"
		  :filters="[{ text: '是', value:true }, { text: '否', value:false}]"
		  :filter-method="filtercommit"
		  filter-placement="bottom-end">
		  <template slot-scope="scope">
		    <el-tag
		      :type="scope.row.iscommit===true ? 'primary' : 'success'"
		      disable-transitions>{{scope.row.iscommit|iscommitToCh}}</el-tag>
		  </template>
		</el-table-column>
		
		<el-table-column
		  prop="id"
		  label="操作"
		  :formatter="formatter">
		  <template slot-scope="scope">
		    <el-button type="primary" icon="el-icon-edit" circle v-on:click="editaticle(scope.row.id)"></el-button>
			<el-button type="danger" icon="el-icon-delete" circle v-on:click="deleteaticle(scope.row.id)"></el-button>
		  </template>
		</el-table-column>
	  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
		  id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
		  img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3220314562,1203413086&fm=26&gp=0.jpg",
		  iscommit:true
        },{
		  id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '公司',
		  img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3220314562,1203413086&fm=26&gp=0.jpg",
		  iscommit:false
        },{
		  id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
		  img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3220314562,1203413086&fm=26&gp=0.jpg",
		  iscommit:true
        }]
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
	  filtercommit(value, row) {
	    return row.iscommit=== value;
	  },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
	  editaticle(id){
		  console.log("修改文章"+id)
	  },
	  deleteaticle(id){
		  console.log("删除文章"+id)
	  }
    },
	filters:{
		iscommitToCh(iscommit){
			return iscommit?"是":"否"
		}
	}
  }
</script>
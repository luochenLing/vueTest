<template>
  <div>
    <el-table
      size="small"
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @cell-click="editCell"
      border
    >
      <el-table-column label="日期" column-key="data-time" width="180">
        <template slot-scope="scope">
          <div
            v-if="
              curRowIndex === scope.$index &&
                curColumnKey === scope.column.columnKey &&
                showInput
            "
          >
            <el-input size="small" v-model="scope.row.date" />
          </div>
          <div v-else>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
            <span class="prev-txt" v-show="scope.row.preVal">
              {{ scope.row.preVal }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" column-key="name" width="180">
        <template slot-scope="scope">
          <div>
            <!-- <el-tag
              v-if="
                curRowIndex === scope.$index &&
                  curColumnKey === scope.column.columnKey &&
                  showPanel
              "
              closable
              size="medium"
              >{{ scope.row.name }}
            </el-tag>
            <span v-else style="margin-left: 10px">{{ scope.row.name }}</span> -->
            <el-tag
              v-for="(tag, index) in scope.row.name"
              closable
              size="medium"
              :key="index"
              @close="handleClose(tag, scope.$index)"
              >{{ tag }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="年龄" column-key="age">
        <template slot-scope="scope">
          <div>
            <span style="margin-left: 10px">{{ scope.row.age }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="地址" column-key="address">
        <template slot-scope="scope">
          <el-input
            size="small"
            v-if="
              curRowIndex === scope.$index &&
                curColumnKey === scope.column.columnKey &&
                showInput
            "
            v-model="scope.row.address"
          />
          <div v-else>
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="save(scope)"
            >保存</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 某个字段的编辑列表 -->
    <el-dialog title="姓名" :visible.sync="showPanel">
      <el-table
        :row-class-name="tableRowClassName"
        @row-click="selRow"
        :data="tableData2"
      >
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- <el-button type="primary" @click="save">保存</el-button> -->
  </div>
</template>
<script>
var curDate = "";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          age: 12,
          name: ["王小虎", "王竹雀"],
          address: "沙江路 1518 弄",
          preVal: "1986-2-1"
        },
        {
          date: "2016-05-04",
          age: 20,
          name: ["王大虎"],
          address: "陀区金沙江路 1517 弄",
          preVal: ""
        },
        {
          date: "2016-05-01",
          age: 21,
          name: ["王老虎"],
          address: "上海市普陀区金沙江路 1519 弄",
          preVal: "2020-3-28"
        },
        {
          date: "2016-05-03",
          age: 13,
          name: ["王白虎"],
          address: "上海市金沙江路 1516 弄",
          preVal: ""
        }
      ],
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "沙江路 1518 弄",
          preVal: ""
        },
        {
          date: "2016-05-04",
          name: "王大虎",
          address: "陀区金沙江路 1517 弄",
          preVal: ""
        },
        {
          date: "2016-05-01",
          name: "王老虎",
          address: "上海市普陀区金沙江路 1519 弄",
          preVal: ""
        },
        {
          date: "2016-05-03",
          name: "王白虎",
          address: "上海市金沙江路 1516 弄",
          preVal: ""
        }
      ],
      //当前选中cell
      curColumnKey: "", //colum的index
      curRowIndex: -1, //row的index
      showInput: false,
      showPanel: false
    };
  },
  methods: {
    //借用header-row-class-name屬性是一個有行索引參數的方法的特性，獲取行索引
    tableRowClassName({ row, rowIndex }) {
      //新增一個index，把每一行的索引放进row
      row.index = rowIndex;
    },
    //修改单元格信息
    editCell(row, column, cell, event) {
      let ret = this.fileMap(column.columnKey, this.tableData[row.index]);
      if (ret) {
        this.curRowIndex = row.index;
        this.curColumnKey = column.columnKey;
      }
    },
    //保存
    save(scope) {
        //上一个值和当前值，当前值修改了那当前显示的值就是前任值，如果没修改上一个值还是之前的上一个值，当前值还是当前值
      //   this.tableData.forEach((val, index) => {});
      console.log(scope);
      //   if(this.tableData[scope.$index].preVal != this.tableData[scope.$index].date){
      //     this.tableData[scope.$index].preVal = this.tableData[scope.$index].date;
      //   }
      if (
        this.tableData[scope.$index].preVal != curDate &&
        this.tableData[scope.$index].preVal !=
          this.tableData[scope.$index].date &&
        this.tableData[scope.$index].date != curDate
      ) {
        this.tableData[scope.$index].preVal = curDate;
      }
      //这里后台能不能返回一个修改前的值在保存成功后
      this.curColumnKey = ""; //colum的index
      this.curRowIndex = -1; //row的index
    },
    //不同字段，不同操作
    fileMap(curFile, curItem) {
      switch (curFile) {
        case "data-time":
          this.showInput = true;
          this.showPanel = false;
          //字段为空或者新旧字段内容不一样的时候才会更新老的值
          //   if (!curItem.preVal && curItem.preVal != curItem.date) {
          //     //curItem.preVal = "";
          //     curItem.preVal = curItem.date;
          //   }
          curDate = curItem.date;
          // if (!curItem.preVal || curItem.preVal != curItem.date) {
          //   curItem.preVal = curItem.date;
          // }

          return true;
        case "name":
          this.showPanel = true;
          this.showInput = false;
          return true;
        case "address":
          this.showInput = true;
          this.showPanel = false;
          return true;
        default:
          //默认不能编辑
          this.showInput = false;
          this.showPanel = false;
          return false;
      }
    },
    //选中单元格数据
    selRow(row, column, event) {
      let index = this.tableData[this.curRowIndex].name.findIndex(
        (val, idx) => {
          return val === this.tableData2[row.index].name;
        }
      );
      if (index >= 0) {
        this.$alert("不能添加重复项", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.tableData[this.curRowIndex].name.push(
        this.tableData2[row.index].name
      );
    },
    //删除某个tag
    handleClose(tag, index) {
      this.tableData[index].name.splice(
        this.tableData[index].name.indexOf(tag),
        1
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.prev-txt {
  text-decoration: line-through;
  display: block;
  padding-left: 10px;
  color: red;
}
</style>

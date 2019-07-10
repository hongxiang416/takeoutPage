<template>
  <div class="container-fluid">
    <div class="row">
      <div class="imgbox col-md-2" style="cursor: pointer" @click="showDetail">
        <img v-lazy="picture" class="img-thumbnail" alt="Responsive image">
      </div>
      <div class="col-md-6" style="cursor: pointer"  @click="showDetail">
        <div class="card-link link">
          <div class="name mt-3 mb-2">{{menu.name}}</div>
          <div class="description">简介:{{menu.description}}</div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="menuid mt-3 mb-5">菜品编号:{{menu.menuid}}}</div>
        <div class="stock mb-2">库存   {{menu.stock}}</div>
        <div class="price">{{Math.round(menu.price*100)/100}}元</div>
      </div>
      <div class="col-md-2" v-if="!isManager">
        <div class="row mt-5 mb-2">
          <i class="iconfont icon-jian col-md-3"
             @click="substract"
             :style="count>1? 'cursor: pointer':''"
             :class="count>1?'text-danger':''"></i>
          <div class="col-md-6 text-center">{{count}}</div>
          <i class="iconfont icon-jia col-md-3"
             @click="add"
             :style="count<menu.stock? 'cursor: pointer':''"
             :class="count<menu.stock?'text-danger':''"></i>
        </div>
        <button class="btn btn-danger btn-block mt-1" @click="addtocart">
          加入购物车
        </button>
      </div>
      <div class="col-md-2" v-else>
        <button class="btn btn-primary btn-block mt-5" @click="showDetail">
          修改信息
        </button>
        <button class="btn btn-danger btn-block mt-5" @click="deleteMenu">
          删除菜品
        </button>
      </div>
    </div>
    <hr>
    <el-dialog
      :title="isManager? '菜单信息修改':'菜品详情'"
      :visible.sync="dialogVisible"
      width="60%">
      <div v-if="!isManager">
        <div class="mt-2">
          <div class="row mb-3">
            <div class="imgbox col-md-4">
              <img v-lazy="picture" class="img-thumbnail">
            </div>
            <div class="col-md-8">
              <div class="name">
                菜名：{{detail.name}}
              </div>
              <div class="mt-1">
                菜品编号：{{newmenuid}}
              </div>
              <div class="mt-1">
                库存:{{detail.stock}}
              </div>
            </div>
          </div>
          <div class="description mt-1 ml-5 mr-5">
            简介：{{detail.description}}
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="6" :offset="18">
                            <el-input-number v-model="count" controls-position="right" :min="1" :max="form.stock"  size="mini"></el-input-number>
                            <el-button type="danger" class="mr-2" @click="addtocart">加入购物车</el-button>
                        </el-col>
                    </el-row>
                </span>
      </div>
      <div v-else>
        <el-form ref="form" :model="detail" label-width="80px">
          <el-form-item label="菜名">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item label="菜品编号">
            <el-input v-model="newmenuid"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="detail.description" type="textarea" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-row>
              <el-col :span="24" class="mb-2"><el-input-number v-model="detail.stock" controls-position="right" :min="1" size="mini"></el-input-number></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="价格">
            <el-row>
              <el-col :span="24" class="mb-2">
                <el-input-number v-model="detail.price" controls-position="right" :min="1" size="mini"></el-input-number>元
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="图片">
            <el-row>
              <el-col :span="15">
                <el-upload
                  :on-remove="onRemove"
                  :on-success="onSuccess"
                  :on-error="onError"
                  :before-remove="beforeRemove"
                  :http-request="httpRequest"
                  list-type="picture"
                  action="/api/upload"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="6" :offset="18">
                            <el-button type="danger" @click="menu_modify">确认修改</el-button>
                        </el-col>
                    </el-row>
                </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {reqModifyMenu, reqDeleteImg, reqGetMenuDetail, reqDeleteMenu} from "../../api"
  import axios from 'axios'

  export default {
    name: "menu",
    props: {
      menu: Object,
      index: Number,
    },

    mounted() {
      if (this.menu.picture != null && this.menu.picture != "") {
        this.fileList = []
        this.fileList.push({
          name: this.menu.picture,
          url : "/api/images/"+this.menu.picture
        })
      }
    },
    data() {
      return {
        count: 1,
        dialogVisible: false,
        fileList: [],
        detail: {
        },
        form: {
          name: this.menu.name,
          menuid: this.menu.menuid,
          description: this.menu.description,
          stock: this.menu.stock,
          price: this.menu.price,
        },
        newmenuid: this.menu.menuid,
        picture_return: null,
      }
    },
    methods: {
      substract () {
        if (this.count > 1)
          this.count--
      },

      add () {
        if (this.count < this.menu.stock) {
          this.count++
        }
      },

      addtocart () {
        this.$store.dispatch('ShopCart/addtocart', {
          picture: this.menu.picture,
          name: this.menu.name,
          menuid: this.menu.menuid,
          count: this.count,
          price: this.menu.price,
          money: this.count * this.menu.price,
          stock: this.menu.stock,
        }).then(() => {
          this.$message.success("成功加入购物车")
        }).catch(() => {
          this.$message.error("超过库存，无法加入购物车")
        })
      },

      menu_modify () {
        reqModifyMenu(this.detail, this.newmenuid, this.picture_return).then( () => {
          this.$store.dispatch('Menus/getAllMenu')
          this.form.menuid = this.newmenuid
          this.$message.success("成功修改书籍信息")
          this.dialogVisible = !this.dialogVisible
          this.fileList = []
        })
      },

      formUpdate() {
        this.form.name = this.menu.name
        this.form.menuid =this.menu.menuid
        this.newmenuid =this.menu.menuid
        this.form.description =this.menu.description
        this.form.stock =this.menu.stock
        this.form.price =this.menu.price
        this.picture_return = null
        if (this.menu.picture != null && this.menu.picture !== "") {
          let fileList = []
          fileList.push({
            name:this.menu.picture,
            url : "/api/images/"+this.menu.picture
          })
          this.fileList = fileList
        }
      },

      beforeRemove (file) {
        reqDeleteImg(file.name).then((data) => {
          if (data === "删除失败") {
            return false
          }
        }).catch( () => {
          return false
        })
      },

      onSuccess (data) {
        this.picture_return = data
      },

      onRemove () {
        this.picture_return = null
      },

      onError (err) {
        this.$message.error(err)
      },

      httpRequest(data) {
        let file = data.file
        let url = '/api/upload'
        let formData = new FormData()
        formData.append("file",file)

        axios({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          },
          data: formData
        }).then((response) => {
          if (response.data !== "文件过大" && response.data !== "文件名已存在" && response.data !== "不支持的文件类型")
            data.onSuccess(response.data)
          else {
            data.onError(response.data)
          }
        })
      },

      // ajax显示菜单详情
      showDetail () {
        reqGetMenuDetail(this.menu.menuid).then((data) => {
          this.detail = data
          this.dialogVisible = !this.dialogVisible
        })
      },

      deleteMenu () {
        reqDeleteMenu(this.menu.menuid).then((data) => {
          if (data === "删除成功") {
            this.$store.dispatch('Menu/getAllMenu').then(() => {
              this.$message.success(data)
            })
          } else {
            this.$message.error(data)
          }
        }).catch((data) => {
          this.$message.error(data)
        })
      }
    },
    computed: {
      ...mapState({
        isManager: state => state.Person.isManager
      }),
      picture: function () {
        if (Object.keys(this.menu).length !== 0 && this.menu.picture != null) {
          let picture = "/api/images/"+ this.menu.picture
          return picture
        }
        return "./"
      }
    },
    watch: {
      menu() {
        this.formUpdate()
      },
    }
  }
</script>

<style scoped>
  .imgbox{
    font-size: 0;
    width: 200px;
    height: 200px;
    text-align: center;
  }
  .imgbox img{
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
  .name{
    font-family: 黑体;
    font-size: 24px;
  }
  .description{
    font-family: 等线;
    font-size: 12px;
    opacity: 0.6;
  }
  .menuid{
    font-size:10px;
    font-family: Arial;
  }
  .stock{
    font-size:15px;
    font-family: 仿宋;
  }
  .price{
    font-size: 20px;
    font-family: 黑体;
  }
  .link:hover{
    color: steelblue;
  }
</style>

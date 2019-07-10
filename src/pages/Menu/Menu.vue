<template>
  <div class="container-fluid">
    <div class="mt-5">
      菜单浏览
      <el-button type="primary" class="ml-3" v-if="isManager" @click="dialogVisible = !dialogVisible">
        添加菜品
      </el-button>
    </div>
    <ul  class="mt-5">
      <li v-for="(menu, index) in menus" :key="index" class="list-unstyled mb-5">
        <el-card shadow="hover">
          <Menu :menu="menu" :index="index"></Menu>
        </el-card>
      </li>
    </ul>
    <el-dialog
      title="添加菜品"
      :visible.sync="dialogVisible"
      width="60%">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="菜名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="menuId" prop="menuid">
            <el-input v-model="form.menuid"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-row>
              <el-col :span="24" class="mb-2"><el-input-number v-model="form.stock" controls-position="right" :min="1" size="mini"></el-input-number></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-row>
              <el-col :span="24" class="mb-2">
                <el-input-number v-model="form.price" controls-position="right" :min="1" size="mini"></el-input-number>元
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="图片">
            <el-row>
              <el-col :span="10">
                <el-upload
                  :on-remove="onRemove"
                  :on-success="onSuccess"
                  :on-error="onError"
                  :before-remove="beforeRemove"
                  :http-request="httpRequest"
                  list-type="picture"
                  action="http://fuck"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-form>
                    <span>
                    <el-row>
                        <el-col :span="6" :offset="18">
                            <el-button type="primary" @click="addMenu('form')">确认添加菜品</el-button>
                        </el-col>
                    </el-row>
                </span>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Menu from '../../components/Menu/Menu'
import {mapState} from 'vuex'
import {reqAddMenu, reqDeleteImg} from '../../api'
import axios from 'axios'
export default {
  name: 'Menu',
  mounted () {
    this.$store.dispatch('Menu/getAllMenu')
  },
  components: {
    Menu
  },
  data () {
    return {
      dialogVisible: false,
      fileList: [],
      form: {
        name: '',
        menuid: '',
        description: '',
        stock: undefined,
        price: undefined,
        picture: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入菜名', trigger: 'change'}
        ],
        menuid: [
          {required: true, message: '请输入菜品编号', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请输入简介', trigger: 'change'}
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'change'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'change'}
        ]
      },
      imageUrl: ''
    }
  },
  computed: {
    ...mapState({
      isManager: state => state.Person.isManager,
      menus: state => state.Menu.menus
    })
  },
  methods: {
    addMenu (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          reqAddMenu(this.form).then(() => {
            this.dialogVisible = !this.dialogVisible
            this.$message.success('成功添加菜品！')
            this.fileList = []
            this.$store.dispatch('Menu/getAllMenu')
          })
        } else {
          return false
        }
      })
    },
    beforeRemove (file) {
      reqDeleteImg(file.name).then((data) => {
        if (data === '删除失败') {
          return false
        }
      }).catch(() => {
        return false
      })
    },
    onSuccess (data) {
      this.form.picture = data
    },
    onRemove () {
      this.form.picture = null
    },
    onError (err) {
      this.$message.error(err)
    },
    httpRequest (data) {
      let file = data.file
      let url = '/api/upload'
      let formData = new FormData()
      formData.append('file', file)
      axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8'
        },
        data: formData
      }).then((response) => {
        if (response.data !== '文件过大' && response.data !== '文件名已存在' && response.data !== '不支持的文件类型') { data.onSuccess(response.data) } else {
          data.onError(response.data)
        }
      })
    }
  }
}
</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

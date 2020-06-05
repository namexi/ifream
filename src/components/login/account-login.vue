<template>
  <div class="account-login" accountLogin>
    <a-form-model ref="mainForm" :model="form" :wrapperCol="{ span: 24 }" :labelCol="{ span: 0 }">
      <a-form-model-item prop="userName" :rules="[{ required: true, message: '请输入您的账号', trigger: 'blur' }]">
        <a-input class="account field" v-model="form.userName" placeholder="请输入您的账号">
          <span slot="prefix" class="icon-slot">
            <i class="icon icon-zhanghao"></i>
            <span class="sep"></span>
          </span>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password" :rules="[{ required: true, message: '请输入您的密码', trigger: 'blur' }]">
        <a-input-password @pressEnter="onSubmit" class="password field" type="password" v-model="form.password" placeholder="请输入您的密码">
          <span slot="prefix" class="icon-slot">
            <i class="icon icon-mima"></i>
            <span class="sep"></span>
          </span>
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <div class="submit field" @click="onSubmit">{{ okText }}</div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'account',
  created() {},
  props: {
    okText: {
      type: String,
      required: false,
      default: '登录'
    }
  },
  data() {
    return {
      form: {
        userName: undefined,
        password: undefined
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.mainForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', { userName: this.form.userName, password: this.form.password })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.account-login[accountLogin] {
  height: 100%;
  width: 100%;
  padding-top: 40px;
  .ant-form-explain {
    padding-left: 31px;
  }
  .has-error {
    .ant-input-affix-wrapper {
      .ant-input,
      .ant-input:hover {
        background-color: transparent;
        border: 1px solid @error-color;
      }
    }
  }
  .field {
    width: 100%;
    height: 55px;
    border-radius: 31px;
    background-color: #f6f5fa;
    display: flex;
    align-items: center;
    font-size: 18px;
  }
  .account,
  .password {
    box-sizing: border-box;
    border: 1px #eee solid;
    .ant-input-prefix {
      left: 24px;
      .icon-slot {
        display: flex;
        align-items: center;
        .sep {
          width: 1px;
          height: 23px;
          background-color: #eee;
          margin-left: 19px;
        }
        .icon {
          color: #595959;
          font-size: 18px;
        }
      }
    }
    input {
      background-color: transparent;
      border: none;
      border-radius: 31px;
      padding-left: 78px;
      &:focus {
        outline: none;
        /*box-shadow: none;*/
      }
      &:hover {
        background-color: transparent;
      }
    }
  }

  .submit {
    cursor: pointer;
    background: linear-gradient(91deg, rgba(106, 163, 248, 1), rgba(76, 132, 255, 1));
    font-size: 22px;
    color: #fff;
    justify-content: center;
  }
}
</style>

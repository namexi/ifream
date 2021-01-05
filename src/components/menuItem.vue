<template>
  <div class="menu-children-list">
    <div v-for="(superItem, index) in menuList" :key="superItem.id">
      <div class="serach-menu-title">{{ superItem.name }}</div>
      <div class="search-menu-child">
        <div
          v-for="(subItem, i) in superItem.children"
          :key="subItem.id"
          ref="menuItem"
          class="search-menu-child-title"
          :class="{ 'select-bg': subItem.isActive }"
          @click.self="exclusiveClick({ superItem, subItem, index: i, i: index }, $event)"
        >
          {{ subItem.name }}
          <div class="span" @click.stop="handleFavorites">
            <img v-if="noFavorites" src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
            <img v-else src="../assets/icon/icon_menu_star_default@2x.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    noFavorites: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    },
    handleClick: {
      type: Function,
      default: () => () => {}
    },
    handleFavorites: {
      type: Function,
      default: () => () => {}
    }
  },
  methods: {
    exclusiveClick({ superItem, subItem, index, i }, e) {
      // let domArray = this.$refs.menuItem
      // for (let i = 0; i < domArray.length; i++) {
      //   let el = domArray[i]
      //   el.className = 'search-menu-child-title'
      //   // el.style.background = 'none !important'
      // }
      // // subItem.bg = true
      // this.menuList[i].children[index].isActive = true
      // this.$set(this.menuList[i].children[index], {
      //   ...subItem,
      //   isActive: true
      // })
      // domArray[index].style.background = 'rgba(255, 255, 255, 0.1)'
      // debugger
      let len = this.menuList.length
      console.log(len)
      for (let j = 0; j < len; j++) {
        let el = this.menuList[j]
        let childrenLen = el.children.length
        console.log(childrenLen)
        for (let k = 0; k < childrenLen; k++) {
          // let dom = el.children[k]
          this.menuList[j].children[k].isActive = false
          this.$set(this.menuList[j].children[k], {
            ...this.menuList[j].children[k],
            isActive: false
          })
        }
      }
      this.menuList[i].children[index].isActive = true
      this.$set(this.menuList[i].children[index], {
        ...subItem,
        isActive: true
      })
      console.log(this.menuList[i].children[index])
      // for (let j = 0; j < len; j++) {
      //   if (j === i) {
      //     let el = this.menuList[j]
      //     el.children[index].isActive = true
      //     this.$set(this.menuList[i].children[index], {
      //       ...subItem,
      //       isActive: true
      //     })
      //     break
      //   }
      // }
      // debugger
    }
  }
}
</script>

<style lang="less">
.search-results {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 20px 0;
  span {
    // width: 18px;
    height: 14px;
    background: #ffffff;
    opacity: 0.5;
    color: #333333;
    line-height: 14px;
    padding: 0 5px;
    margin: 0 3px;
    font-weight: 500;
  }
}
.serach-menu-title {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin: 20px 0 13px 0px;
}
.search-menu-child-title {
  display: inline-block;
  min-width: 166px;
  line-height: 34px;
  color: #ffffff;
  padding: 0 0px 0 8px;
  margin-right: 20px;
  margin-bottom: 14px;
  cursor: pointer;
  .span {
    display: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    .span {
      display: inline-block;
    }
  }
  img {
    width: 14px;
    height: 14px;
    margin-left: 20px;
    margin-right: 20px;
  }
}
.select-bg {
  background: rgba(255, 255, 255, 0.1);
}
</style>

<template>
  <div class="menu-children-list">
    <div v-for="(superItem, index) in menuList" :key="superItem.id">
      <div class="serach-menu-title">{{ superItem.name }}</div>
      <div class="search-menu-child">
        <div
          v-for="(subItem, i) in superItem.children"
          :key="subItem.id"
          :ref="menuItem(index, i)"
          class="search-menu-child-title"
          v-if="subItem.display == 1"
          @click="exclusiveClick({ superItem, subItem, index: i, i: index }, $event)"
        >
          <div class="tool-box">
            <div class="menu-title" :title="subItem.name">{{ subItem.name }}</div>
            <div class="span" @click.stop="handleFavorites(subItem)">
              <img v-if="subItem.collection" src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
              <img v-else src="../assets/icon/icon_menu_star_default@2x.png" alt="" />
            </div>
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
    value: {
      type: Array,
      default: () => () => []
    },
    // menuList: {
    //   type: Array,
    //   default: () => []
    // },
    handleClick: {
      type: Function,
      default: () => () => {}
    },
    handleFavorites: {
      type: Function,
      default: () => () => {}
    },
    itemMenuValue: {
      type: Object,
      default: () => {}
    }
  },
  model: {
    prop: 'value',
    event: 'list'
  },
  methods: {
    menuItem(i, index) {
      return `menuItem-${i}-${index}`
    },
    exclusiveClick({ superItem, subItem, index, i }, e) {
      // i 是父级索引 index是
      this.selectstyle(index, i)
      this.$store.dispatch('setBreadCrumbs', {
        superItem,
        subItem,
        index,
        i
      })
      this.handleClick({ superItem, subItem }, e)
    },
    selectstyle(index, i) {
      let len = this.menuList.length
      let menuItemkey = `menuItem-${i}-${index}`
      for (let j = 0; j < len; j++) {
        let el = this.menuList[j]
        let childrenLen = el.children.length
        for (let k = 0; k < childrenLen; k++) {
          let menuItemkey = `menuItem-${j}-${k}`

          this.$refs[menuItemkey][0].className = 'search-menu-child-title'
        }
      }
      this.$refs[menuItemkey][0].className = 'search-menu-child-title select-bg'
    }
  },
  computed: {
    menuList: {
      get() {
        return this.value
      },
      set(v) {
        console.log(v)
        // this.$emit('list', v)
      }
    }
  },
  mounted() {
    if (this.itemMenuValue && this.itemMenuValue.superItem) {
      let { superItem, subItem, index, i } = this.itemMenuValue
      this.selectstyle(index, i)
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
.search-menu-child {
  display: grid;
  grid-template-columns: repeat(auto-fill, 31.5%);
  grid-row-gap: 14px;
  grid-column-gap: 20px;
  .tool-box {
    display: flex;
    align-items: center;
  }
  .menu-title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-menu-child-title {
  display: inline-block;
  line-height: 34px;
  color: #ffffff;
  padding: 0 0px 0 8px;

  cursor: pointer;
  .span {
    display: inline-block;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    img {
      visibility: visible;
    }
  }
  img {
    visibility: hidden;
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

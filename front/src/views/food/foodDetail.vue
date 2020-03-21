<template>
  <div class="content-detail">
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "故事"
        }
    },
    methods: {
        show() {
            console.log(this.msg)
        }
    },
    mounted() {
        this.show()
    }
}
</script>

<style lang="scss" scoped>

</style>
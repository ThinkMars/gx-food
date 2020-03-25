<template>
  <div class="content-detail">
      {{ msg }}
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
            console.log(this.msg);
            this.msg = this.$route.query
        },
        // queryFoodDetail() {
        //     this.axios.get("api/jisuapi/search?keyword=西红柿炒鸡蛋&num=1&appkey=1d5b6011908168f74182bb5e410b36a6")
        //     .then((res) => {
        //         this.msg = res
        //     })
        // }
    },
    created() {
        // this.queryFoodDetail()

    },
    mounted() {
        this.show()
    }
}
</script>

<style lang="scss" scoped>

</style>
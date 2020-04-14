<template>
  <footer>
    <h2 class="title">联系</h2>
    <div class="content-link">
      <div class="chat">
        <p>微信</p>
        <img src="../../assets/image/wechat.jpg" alt="微信" />
      </div>
      <div class="chat">
        <p>QQ</p>
        <img src="../../assets/image/qq.jpg" alt="QQ" />
      </div>
    </div>
    <div class="footer">
      <p>@Copyright 2020 Design by shuangcheng</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content-link {
  height: 130px;
  background-color: $bg-color;
  padding: 10px 0;
  overflow: hidden;
  .chat {
    float: left;
    margin: 20px;
    overflow: hidden;
    text-align: center;
    img {
      width: 100px;
      vertical-align: middle;
    }
  }
  .slogan {
    float: right;
    margin: 20px;
  }
}
.footer {
  height: 50px;
  color: #333300;
  background-color: $bg-color;
  display: flex;
  p {
    margin: auto;
  }
}
</style>

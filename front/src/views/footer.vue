<template>
  <footer>
    <h2 class="title">联系</h2>
    <div class="content-link">
      <div class="chat">
        <p>微信</p>
        <img src="https://static.meishichina.com/v6/img/model/msc_app.png" alt="微信" />
      </div>
      <div class="chat">
        <p>QQ</p>
        <img src="https://static.meishichina.com/v6/img/footer/weixin.png" alt="QQ" />
      </div>
      <h2 class="slogan">
        <img src alt="广西美食网" />
      </h2>
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
  background-color: #ffcc66;
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
  background-color: #ffcc66;
  display: flex;
  p {
    margin: auto;
  }
}
</style>

const request = require("request");

const options = {
    method: 'GET',
    url: 'https://way.jd.com/jisuapi/search',
    qs:
    {
        keyword: '西红柿炒鸡蛋',
        num:1,
        appkey:'1d5b6011908168f74182bb5e410b36a6'
    }
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);
    // console.log(body);
});
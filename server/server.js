const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.get('/getProductListingData', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request.get({
        url: "http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1"
    },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("body",body)
                return res.send(body);
            }
        });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
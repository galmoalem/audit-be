const Push = require('../model/push-model');
const createError = require('http-errors')
const puppeteer = require("puppeteer");
const fs = require('fs');

module.exports = {
    savePush: async (body) => {
 
      
        let r = Math.random().toString(36).substring(7);
        const push = new Push(body)
        await makePhoto(body.url, r)

        push.img.data = fs.readFileSync( r) 
        push.img.contentType = "image/png";

        const saved = await push.save()
        
      console.log(saved)
   
    },
  
    
    
   
     
  
      getPushes : async (req,res,next) =>{
        

              const pushs = await Push.find()
              res.send(pushs)
          
          },
     
      

  
  }
  async function makePhoto  (url,fileName)  {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: fileName  , type: "image/png"});
        await browser.close();
      
      }
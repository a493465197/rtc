'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
const moment = require('moment')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  async save() {

    console.log(12345)
    app.io.of('/file').sockets.emit('res', "hello ");
  }
  
  async init() {

    // const {
    //   ctx
    // } = this;
    // ctx.body = {
    //   code: 0
    // }
  }


}

module.exports = HomeController;
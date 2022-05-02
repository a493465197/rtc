'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
const moment = require('moment')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  async save() {
    
    const { ctx, app } = this;
    const username = ctx.cookies.get('user')

    const nsp = app.io.of('/file');
    const msg = ctx.args[0]
    console.log(msg)
    if (msg.type === 'save') {
      msg.val && await ctx.model.Log.create({docId: msg.room, type: '保存', desc: '编辑成' + msg.val, username, isTag: true, detail: msg.val})

    } else if (msg.type === 'edit') {
      nsp.to(msg.room).emit('edit', {
        val: msg.val
      });
      await ctx.model.Doc.updateOne({id: msg.room}, {
        detail: msg.val
      })
      msg.val && await ctx.model.Log.create({docId: msg.room, type: '编辑', desc: '编辑成' + msg.val, username, detail: msg.val})
    }


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
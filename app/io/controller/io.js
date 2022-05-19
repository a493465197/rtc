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
    if (msg.type === 'save') {
      msg.val && await ctx.model.Log.create({docId: msg.room, type: '保存', desc: '编辑成' + msg.val, username, isTag: true, detail: msg.val})

    } else if (msg.type === 'edit') {

      nsp.to(ctx.socket.handshake.query.room).emit('edit', {
        val: msg.val
      });
      await ctx.model.Doc.updateOne({id: ctx.socket.handshake.query.room}, {
        detail: msg.val
      })
      msg.val && await ctx.model.Log.create({docId: msg.room, type: '编辑', desc: '编辑成' + msg.val, username, detail: msg.val})
    }


  }
  async data() {
    const { ctx, app } = this;
    const username = ctx.cookies.get('user')

    const nsp = app.io.of('/rtc');
    const msg = ctx.args[0]
    const room = nsp.to(ctx.socket.handshake.query.room)

    if (msg.type === 'plzSendYourReady') {
      console.log(Object.keys(room.sockets))
      for (let k in room.sockets) {
        if (room.sockets[k].handshake.query.room !== ctx.socket.handshake.query.room) {
          continue
        }

        if (k === ctx.socket.id) continue

        room.sockets[k].emit('data', msg);
        await new Promise((resolve) => {setTimeout(() => {
          resolve()
        }, 1000);})
      }
      return
    }


    Object.keys(room.sockets).forEach((e) => {
      if (room.sockets[e].handshake.query.room !== ctx.socket.handshake.query.room) return

      // 不给自己转发消息
      if (e === ctx.socket.id) return
      // 如果消息带id 不给其他id转发消息
      if (msg.id && e !== msg.id && msg.type !== 'ready') return


      room.sockets[e].emit('data', msg);

    })

    // nsp.to(ctx.socket.handshake.query.room).emit('data', msg);



  }
  async quiet() {
    const { ctx, app } = this;
    const username = ctx.cookies.get('user')

    const nsp = app.io.of('/rtc');
    const room = nsp.to(ctx.socket.handshake.query.room)

    for (let k in room.sockets) {
      if (room.sockets[k].handshake.query.room !== ctx.socket.handshake.query.room) {
        continue
      }
      if (k === ctx.socket.id) continue
      room.sockets[k].emit('quiet');
      await new Promise((resolve) => {setTimeout(() => {
        resolve()
      }, 1000);})
    }

  }
  async stopQuiet() {
    const { ctx, app } = this;
    const username = ctx.cookies.get('user')

    const nsp = app.io.of('/rtc');
    const room = nsp.to(ctx.socket.handshake.query.room)

    for (let k in room.sockets) {
      if (room.sockets[k].handshake.query.room !== ctx.socket.handshake.query.room) {
        continue
      }
      if (k === ctx.socket.id) continue
      room.sockets[k].emit('stopQuiet');
      await new Promise((resolve) => {setTimeout(() => {
        resolve()
      }, 1000);})
    }

  }
  async chatData() {
    const { ctx, app } = this;
    const username = ctx.cookies.get('user')

    const nsp = app.io.of('/chat');
    const msg = ctx.args[0]
    const room = nsp.to(ctx.socket.handshake.query.room)



    Object.keys(room.sockets).forEach((e) => {
      if (room.sockets[e].handshake.query.room !== ctx.socket.handshake.query.room) return
      // 如果消息带id 不给其他id转发消息
      if (msg.id && e !== msg.id && msg.type !== 'ready') return


      room.sockets[e].emit('data', msg);

    })

    // nsp.to(ctx.socket.handshake.query.room).emit('data', msg);



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
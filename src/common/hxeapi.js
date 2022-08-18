/*
狐小eAPI封装js
*/
import { Dialog, Toast } from 'vant';
import Vue from 'vue';
import store from '../store';
import img from './img';
//hxe对象
const hxe = window.hxe;
//获取授权码
function getCode () {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.getCode({
        // clientId: Vue.prototype.$config_env.VUE_APP_CLIENTID,
        // boxzhang
        clientId: "4a759466-ba59-43dd-ace4-2edcf5be52b1",
        // boxzhang end
        success: function (result) {
          resolve(result.code);
        },
        fail: function () {
          reject('获取授权码接口调用失败');
        }
      });
    } else {
      if (Vue.prototype.$config_env.VUE_APP_CODE)
        resolve(Vue.prototype.$config_env.VUE_APP_CODE);
      else
        reject('hxe对象为空，且未配置授权码');
    }
  })
}
//显示等待提示符
function showLoading (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showLoading({
        title: object ? (object.title || object) : '正在加载...',
        duration: object ? (object.duration || 0) : 0,
        success: function (result) {
          resolve();
        },
        fail: function () {
          reject('显示等待提示符接口调用失败');
        }
      });
    } else {
      Toast.loading({
        duration: object ? (object.duration * 1000 || 0) : 0,
        mask: true,
        message: object ? (object.title || object) : '正在加载...'
      });
    }
  })
}
//隐藏等待提示符
function hideLoading () {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.hideLoading();
    } else {
      Toast.clear();
    }
  })
}
//显示消息提示框
function showToast (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showToast({
        content: object ? (object.content || object) : '',
        duration: object ? (object.duration || 1.5) : 1.5,
        success: function (result) {
          resolve();
        },
        fail: function () {
          reject('显示消息提示框接口调用失败');
        }
      });
    } else {
      Toast({
        message: object ? (object.content || object) : '',
        duration: object ? (object.duration * 1000 || 1500) : 1500

      });
    }
  })
}
//获取网络状态
function getNetworkStatus () {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.getNetworkStatus({
        finish: function (result) {
          resolve(result.type);
        }
      });
    } else {
      resolve("wifi");
    }
  })
}
//拨打电话
function callPhone (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.callPhone({
        number: object,
        success: function () {
          resolve('拨打电话接口调用成功');
        },
        fail: function () {
          reject('拨打电话接口调用失败');
        }
      });
    } else {
      let a = document.createElement('a');
      a.setAttribute('href', "tel:" + object);
      a.setAttribute('id', 'startTelMedicine');
      // 防止反复添加
      if (document.getElementById('startTelMedicine')) {
        document.body.removeChild(document.getElementById('startTelMedicine'));
      }
      document.body.appendChild(a);
      a.click();
      resolve("拨打电话接口调用成功");
    }
  })
}
//显示提示框
function showModal (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showModal({
        title: object.title || "",
        content: object.content || "",
        showCancel: object.showCancel,
        success: function (result) {
          if (result.confirm)
            resolve();
          if (result.cancel)
            reject();
        },
        fail: function () {
          reject();
        }
      });
    } else {
      if (object.showCancel) {
        Dialog.confirm({
          title: object.title || "",
          message: object.content || ""
        }).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      } else {
        Dialog.alert({
          title: object.title || "",
          message: object.content || ""
        }).then(() => {
          resolve();
        });
      }
    }
  })
}
//显示操作菜单
function showActionSheet (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showActionSheet({
        title: object.title || "",
        content: object.content || "",
        menus: object.menus,
        success: function (result) {
          resolve(result.selectIndex);
        },
        fail: function () {
          reject('显示操作菜单接口调用失败');
        }
      });
    } else {
      let menus = object.menus.map((item, index) => {
        return { name: item.text, className: item.style ? ("van-actionsheet-" + item.style) : "" }
      })
      store.commit({ type: "setActionSheetTitle", title: object.title || "" });
      store.commit({ type: "setActionSheet", show: true });
      store.commit({ type: "setActionSheetMenus", menus: menus });
      window.onSelectActionSheet = function (item, index) {
        resolve(index);
      }
    }
  })
}
//获取基本信息
function getInfo () {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.getInfo({
        finish: function (result) {
          resolve(result);
        }
      });
    } else {
      var explorer = window.navigator.userAgent.toLowerCase();
      //ie
      if (explorer.indexOf("msie") >= 0) {
        var ver = explorer.match(/msie ([\d.]+)/)[1];
        resolve({ platform: "IE", systemVersion: ver });
      }
      //firefox
      else if (explorer.indexOf("firefox") >= 0) {
        var ver = explorer.match(/firefox\/([\d.]+)/)[1];
        resolve({ platform: "Firefox", systemVersion: ver });
      }
      //Chrome
      else if (explorer.indexOf("chrome") >= 0) {
        var ver = explorer.match(/chrome\/([\d.]+)/)[1];
        resolve({ platform: "Chrome", systemVersion: ver });
      }
      //Opera
      else if (explorer.indexOf("opera") >= 0) {
        var ver = explorer.match(/opera.([\d.]+)/)[1];
        resolve({ platform: "Opera", systemVersion: ver });
      }
      //Safari
      else if (explorer.indexOf("Safari") >= 0) {
        var ver = explorer.match(/version\/([\d.]+)/)[1];
        resolve({ platform: "Safari", systemVersion: ver });
      }
    }
  })
}
//获取定位信息
function getLocation (object) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.getLocation({
        success: function (result) {
          resolve(result);
        },
        fail: function () {
          reject('获取定位信息接口调用失败');
        }
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
          resolve(position.coords);
        });
      }
      else {
        reject('获取定位信息失败');
      }
    }
  })
}
//扫描二维码
function scanQRCode (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.scanQRCode({
        success: function (result) {
          resolve(result.content);
        },
        fail: function () {
          reject('扫描二维码接口调用失败');
        }
      });
    } else {
      resolve(obj);
    }
  })
}
//获取照片
function getPhoto (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      if (!obj.source || obj.source == "custom") {
        showActionSheet({
          title: '选择图片',
          menus: [{
            text: '拍照'
          }, {
            text: '相册'
          }, {
            text: '取消',
            style: 'cancel'
          }]
        }).then((index) => {
          if (index == 0 || index == 1) {
            hxe.getPhoto({
              encode: obj.encode || 'jpeg',
              quality: obj.quality || 30,
              source: index == 0 ? 'camera' : 'album',
              allowEdit: obj.quality === true,
              correctOrientation: obj.correctOrientation === true,
              success: function (result) {
                resolve(result.data);
              },
              fail: function (error) {
                reject(error.type);
              }
            });
          }
        })
      } else {
        hxe.getPhoto({
          encode: obj.encode || 'jpeg',
          quality: obj.quality || 30,
          source: obj.source,
          allowEdit: obj.quality === true,
          correctOrientation: obj.correctOrientation === true,
          success: function (result) {
            resolve(result.data);
          },
          fail: function (error) {
            reject(error.type);
          }
        });
      }
    } else {
      resolve(img.img);
    }
  })
}
//显示审批页面
function showApproval (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showApproval({
        SN: obj.SN,
        history: !(obj.history === false),
        annotation: !(obj.annotation === false),
        approval: !(obj.approval === false),
        approvalMore: !(obj.approvalMore === false),
        attachment: !(obj.attachment === false),
        discussion: !(obj.discussion === false),
        success: function (result) {
          resolve("显示审批页面接口调用成功");
        },
        fail: function () {
          reject('显示审批页面接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用审批页面接口');
    }
  })
}
//显示狐聊列表页面发送消息
function showChatList (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showChatList({
        type: obj.text,
        content: obj.content,
        search: !(obj.search === false),
        newChat: !(obj.newChat === false),
        selectGroup: !(obj.selectGroup === false),
        success: function (result) {
          resolve("显示狐聊列表页面发送消息接口调用成功");
        },
        fail: function () {
          reject('显示狐聊列表页面发送消息接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用显示狐聊列表页面发送消息接口');
    }
  })
}
//显示狐聊聊天页面
function showChat (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.showChat({
        group: obj.group,
        target: obj.target,
        groupSettings: !(obj.groupSettings === false),
        success: function (result) {
          resolve("显示狐聊聊天页面接口调用成功");
        },
        fail: function () {
          reject('显示狐聊聊天页面接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用显示狐聊聊天页面接口');
    }
  })
}
//社会化分享
function share (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.share({
        type: obj.type,
        content: obj.content,
        success: function (result) {
          resolve("社会化分享接口调用成功");
        },
        fail: function () {
          reject('社会化分享接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用社会化分享接口');
    }
  })
}
//搜索
function search (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.search({
        keyword: obj.keyword,
        success: function (result) {
          resolve(result.data);
        },
        fail: function () {
          reject('搜索接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用搜索接口');
    }
  })
}
//设置导航栏
function setNavigationBar (obj) {
  //没有传背景色情况下，如果是全屏应用，则传00000000，否则则使用默认背景色
  obj.backgroundColor = obj.backgroundColor || (Vue.prototype.$config.isFullScreen ? "00000000" : Vue.prototype.$config.navBarColor);
  //按钮图标base64替换
  if (obj.leftButton && obj.leftButton.name) {
    obj.leftButton.item = img.navIcon[obj.leftButton.name];
    delete obj.leftButton[name];
  }
  if (obj.rightButton && obj.rightButton.name) {
    obj.rightButton.item = img.navIcon[obj.rightButton.name];
    delete obj.rightButton[name];
  }
  if (obj.customButton && obj.customButton.name) {
    obj.customButton.item = img.navIcon[obj.customButton.name];
    delete obj.customButton[name];
  }
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.setNavigationBar({
        ...obj,
        success: function (result) {
          //如果标题栏透明，则获取网页顶部偏移量，存入store中
          if (obj.backgroundColor == "00000000") {
            getPageTopOffset().then(data => {
              store.commit({ type: "setPageTopOffset", pageTopOffset: data });
            })
          }
          resolve("设置导航栏接口调用成功");
        },
        fail: function () {
          reject('设置导航栏接口调用失败');
        }
      });
    } else {
      resolve("设置导航栏接口调用成功");
    }
  })
}
//获取网页内容顶部偏移量
function getPageTopOffset () {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.getPageTopOffset({
        finish: function (result) {
          resolve(result.offset);
        }
      });
    } else {
      resolve(60);
    }
  })
}
//调整异形屏网页内容底部缩进模式
function adjustContentBottomInset (obj) {
  return new Promise((resolve, reject) => {
    if (hxe) {
      hxe.adjustContentBottomInset({
        adjust: obj,
        success: function (result) {
          resolve("调整异形屏网页内容底部缩进模式接口调用成功");
        },
        fail: function () {
          reject('调整异形屏网页内容底部缩进模式接口调用失败');
        }
      });
    } else {
      reject('非狐小e环境无法调用调整异形屏网页内容底部缩进模式接口');
    }
  })
}
//退出轻应用
function exit (obj) {
  if (hxe) {
    hxe.exit()
  }
}
//调整异形屏网页内容底部缩进模式
function getLaunchOptions (obj) {
  if (hxe) {
    hxe.getLaunchOptions({ handler: obj });
  }
}
export default {
  getCode,
  showLoading,
  hideLoading,
  showToast,
  getNetworkStatus,
  callPhone,
  showModal,
  showActionSheet,
  getInfo,
  getLocation,
  scanQRCode,
  getPhoto,
  showApproval,
  showChatList,
  showChat,
  share,
  search,
  setNavigationBar,
  getPageTopOffset,
  adjustContentBottomInset,
  exit,
  getLaunchOptions
}
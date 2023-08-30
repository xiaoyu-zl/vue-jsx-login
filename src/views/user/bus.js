const { el } = require("element-plus/es/locale");

//ljp
const eventBus = function () {
  const eventMap = new Map();
  eventMap.set("*", []);
  return {
    on(eventName, callBack) {
      const isCallBack = eventMap.has(eventName);
      if (isCallBack) {
        if (eventName != "*") {
          const getMapBacks = eventMap.get(eventName);
          getMapBacks.push(callBack);
        }
        eventMap.get("*").push(callBack); //存入所有订阅事件
      } else {
        eventMap.set(eventName, [callBack]);
        eventMap.set("*", [...eventMap.get("*"), callBack]); //存入所有订阅事件
      }
    },
    emit(eventName, eventValue) {
      const isCallBack = eventMap.has(eventName);
      if (isCallBack) {
        for (const callBack of eventMap.get(eventName)) {
          callBack(eventValue);
        }
      }
    },
    off(eventName) {
      if (eventName == "*") {
        eventMap.get("*").length = 0;
      } else {
        const isCallBack = eventMap.has(eventName);
        if (isCallBack) {
          eventMap.delete(eventName);
        }
      }
    },
  };
};
const bus = new eventBus();
bus.on("bus", (e) => {
  console.log("触发bus1，我监听了", e);
});
bus.on("bus", (e) => {
  console.log("触发bus2，我监听了", e);
});
bus.on("sss", (e) => {
  console.log("触发sss，我监听了", e);
});
bus.emit("sss", "ddd");
bus.emit("*", "ddd");

//zzl
function EvBus() {
  let eventObject = {};
  return {
    on(eventName, callback, key = "*") {
      if (!eventObject[eventName]) {
        eventObject[eventName] = [];
      }
      eventObject[eventName].push({ key, callback });
    },
    off(eventName, key = "*") {
      if (eventObject[eventName] && key == "*") {
        delete eventObject[eventName];
      } else {
        eventObject[eventName] = eventObject[eventName].filter(
          (v) => v.key != key
        );
      }
    },
    emit(eventName, args, key = "*") {
      const callbackList = eventObject[eventName];
      if (!callbackList) return console.error(eventName + "没有这个事件");
      for (let item of callbackList) {
        if (key != "*" && item.key == key) {
          item.callback(args);
          return;
        }

        if (key == "*") {
          item.callback(args);
        }
      }
    },
  };
}
const eBus = new EvBus();
eBus.on(
  "X",
  (obj) => {
    console.log("A事件", obj);
  },
  "A事件"
);
eBus.on(
  "X",
  (obj) => {
    console.log("B事件", obj);
  },
  "B事件"
);
// eBus.off("X");
eBus.emit("X", { name: "X订阅" }, "B事件");

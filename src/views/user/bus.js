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
        eventMap.get("*").push(callBack);
      } else {
        eventMap.set(eventName, [callBack]);
      }
    },
    emit(eventName, eventValue) {
      const isCallBack = eventMap.has(eventName);
      if (isCallBack) {
        for (const callBack of eventMap.get(eventName)) {
          if (eventName != "*") callBack(eventValue);
        }
        for (const callBack of eventMap.get("*")) {
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
  console.log("触发bus，我监听了", e);
});
bus.emit("bus", "ddd");

//zzl
function EvBus() {
  let eventObject = {};
  return {
    on(eventName, callback) {
      if (!eventObject[eventName]) {
        eventObject[eventName] = [];
      }
      eventObject[eventName].push(callback);
    },
    off(eventName) {
      if (eventObject[eventName]) {
        delete eventObject[eventName];
      }
      return console.log(eventName + "注销成功");
    },
    emit(eventName, ...args) {
      const callbackList = eventObject[eventName];
      if (!callbackList) return console.error(eventName + "没有这个事件");
      for (let callback of callbackList) {
        callback(...args);
      }
    },
  };
}
const eBus = new EvBus();
eBus.on("X", (obj, num) => {
  console.log("A事件", obj, num);
});
eBus.on("X", (obj, num) => {
  console.log("B事件", obj, num);
});
// eBus.off("X");
eBus.emit("X", { name: "X订阅" }, 1);

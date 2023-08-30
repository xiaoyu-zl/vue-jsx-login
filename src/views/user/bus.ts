//回调函数
type CallbackFn = (e: any) => void
// eventObject
type EventObject = {
    [key: string]: Array<Key>;
}
type Key = {
    key: string,
    callback: CallbackFn
}
// 返回类型
type BackBus = {
    on: (eventName: string, callback: CallbackFn, key?: string) => void,
    off: (eventName: string, key?: string) => void,
    emit: (eventName: string, args: any, key?: string) => void
}
//构造
type BusConstructor = {
    new(): BackBus;
}
const EvBus = (function (): BackBus {
    let eventObject: EventObject = {};
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
} as unknown as BusConstructor)
const Bus: BusConstructor = EvBus;
const eBus = new Bus();
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

//zzl
type Callback = (e: any) => void
type Key = {
    key: string,
    callback: Callback
}
type EventObject = {
    [key: string]: Array<Key>;
}
function EvBus() {
    let eventObject: EventObject = {};
    return {
        on(eventName: string, callback: Callback, key = "*") {
            if (!eventObject[eventName]) {
                eventObject[eventName] = [];
            }
            eventObject[eventName].push({ key, callback });
        },
        off(eventName: string, key = "*") {
            if (eventObject[eventName] && key == "*") {
                delete eventObject[eventName];
            } else {
                eventObject[eventName] = eventObject[eventName].filter(
                    (v) => v.key != key
                );
            }
        },
        emit(eventName: string, args: any, key = "*") {
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
const eBus = new (EvBus as any)();
eBus.on(
    "X",
    (obj: object) => {
        console.log("A事件", obj);
    },
    "A事件"
);
eBus.on(
    "X",
    (obj: object) => {
        console.log("B事件", obj);
    },
    "B事件"
);
// eBus.off("X");
eBus.emit("X", { name: "X订阅" }, "B事件");

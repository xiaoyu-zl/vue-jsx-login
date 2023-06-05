import { defineStore } from 'pinia'
import { UseType } from '@/store/storeType'
// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    state(): { user: UseType; token: string } {
        return {
            user: {
                age: "",
                headimg: "",
                id: null,
                mobile: "",
                name: "",
                password: "",
                roles: [],
                sex: "",
            },
            token: "",
        };
    },
    getters: {},
    actions: {
        removeToKen() {
            this.token = "";
            this.user = {
                age: "",
                headimg: "",
                id: null,
                mobile: "",
                name: "",
                password: "",
                roles: [],
                sex: "",
            };
            console.log(this.token, this.user);
        },
    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: "user",
        // 修改为 sessionStorage，默认为 localStorage
        storage: window.sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ["token", "user"],
    },
})
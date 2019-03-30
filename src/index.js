import "./styles.css";
import Vue from "vue/dist/vue.js";
import getSyncFns from "./syncState";

const { syncToState, syncToUrl } = getSyncFns("param");

const op = {
  el: "#app",
  @syncToState
  data() {
    return {
      param: {}
    };
  },
  methods: {
    @syncToUrl
    fn1() {
      console.log("提交表单数据", this.param);
    }
  },
  template: `<div>
    <input type="text" v-model="param.a" />
    <input type="text" v-model="param.aaa" />
    <input type="text" v-model="param.b" />
    <input type="text" v-model="param.bbb" />
    <div>{{param}}</div>
    <button @click="fn1">提交数据</button>
  </div>`
};

new Vue(op);

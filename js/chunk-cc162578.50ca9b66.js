(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc162578"],{"4b5c":function(e,t,n){},6449:function(e,t,n){"use strict";n("4b5c")},a4c2:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),l={class:"user"},o={class:"content"};function r(e,t,n,r,c,i){var u=Object(a["resolveComponent"])("page-search"),p=Object(a["resolveComponent"])("page-content");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",l,[Object(a["createVNode"])(u,{searchFormConfig:e.searchFormConfig,onResetBtnClick:e.handleResetClick,onQueryBtnClick:e.handleQueryClick},null,8,["searchFormConfig","onResetBtnClick","onQueryBtnClick"]),Object(a["createElementVNode"])("div",o,[Object(a["createVNode"])(p,{ref:"pageContentRef",contentTableConfig:e.contentConfig,pageUrlName:"users"},null,8,["contentTableConfig"])])])}function c(e){if(Array.isArray(e))return e}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0");function i(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,l,o=[],r=!0,c=!1;try{for(n=n.call(e);!(r=(a=n.next()).done);r=!0)if(o.push(a.value),t&&o.length===t)break}catch(i){c=!0,l=i}finally{try{r||null==n["return"]||n["return"]()}finally{if(c)throw l}}return o}}var u=n("06c5");function p(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){return c(e)||i(e,t)||Object(u["a"])(e,t)||p()}var s={labelWidth:"120px",itemStyle:{padding:"10px 40px"},colLayout:{span:8},formItems:[{filed:"name",type:"input",label:"名字",placeholder:"请输入用户名"},{filed:"realname",type:"input",label:"真实姓名",placeholder:"请输入真实姓名"},{filed:"cellphone",type:"input",label:"电话号码",placeholder:"请输入电话号码"},{filed:"enable",type:"select",label:"用户状态",placeholder:"请选择用户状态",options:[{title:"启用",value:1},{title:"禁用",value:0}]},{filed:"createAt",type:"datepicker",label:"创建时间",otherOptions:{startPlaceholder:"开始时间",endPlaceholder:"结束时间",type:"daterange"}}]},f={title:"用户列表",propList:[{prop:"name",label:"用户名",minWidth:"100"},{prop:"realname",label:"真实姓名",minWidth:"100"},{prop:"cellphone",label:"电话号码 ",minWidth:"100"},{prop:"enable",label:"状态 ",minWidth:"100",slotName:"status"},{prop:"createAt",label:"创建时间 ",minWidth:"180",slotName:"createTime"},{prop:"updateAt",label:"更新时间 ",minWidth:"180",slotName:"updateTime"},{label:"操作 ",minWidth:"180",slotName:"handle"}],showIndexColumn:!0,showSelectColumn:!0,rechange:function(){},pageUrlName:"users"},b=n("fe8c"),m=n("3573");function h(){var e=Object(a["ref"])(),t=function(){var t;null===(t=e.value)||void 0===t||t.getPageData()},n=function(t){var n;null===(n=e.value)||void 0===n||n.getPageData(t)};return[e,t,n]}var v=Object(a["defineComponent"])({name:"user",components:{PageSearch:b["a"],PageContent:m["a"]},setup:function(){var e=h(),t=d(e,3),n=t[0],a=t[1],l=t[2];return{searchFormConfig:s,contentConfig:f,handleResetClick:a,handleQueryClick:l,pageContentRef:n}}}),g=(n("6449"),n("d959")),y=n.n(g);const C=y()(v,[["render",r],["__scopeId","data-v-74068c74"]]);t["default"]=C}}]);
//# sourceMappingURL=chunk-cc162578.50ca9b66.js.map
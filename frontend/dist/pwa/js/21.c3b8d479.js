(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"0bbc":function(t,a,o){"use strict";o.r(a);var e=function(){var t=this,a=t._self._c;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-table",{staticClass:"my-sticky-dynamic q-ma-lg",attrs:{square:"",flat:"",bordered:"",title:"Fluxos","hide-bottom":"",data:t.listachatFlow,columns:t.columns,loading:t.loading,"row-key":"id",pagination:t.pagination,"rows-per-page-options":[0]},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-btn",{staticClass:"q-ml-md",attrs:{color:"primary",label:"Adicionar",rounded:""},on:{click:function(a){t.chatFlowSelecionado={},t.modalChatFlow=!0}}})]},proxy:!0},{key:"body-cell-isActive",fn:function(o){return[a("q-td",{staticClass:"text-center"},[a("q-icon",{attrs:{size:"16px",name:o.value?"mdi-check-circle-outline":"mdi-close-circle-outline",color:o.value?"positive":"negative"}}),a("span",{staticClass:"q-mx-xs text-bold"},[t._v(" "+t._s(o.value?"Ativo":"Inativo")+" ")])],1)]}},{key:"body-cell-acoes",fn:function(o){return[a("q-td",{staticClass:"text-center"},[a("q-btn",{staticClass:"bg-padrao",attrs:{color:"blue-3",icon:"edit",flat:"",round:""},on:{click:function(a){return t.editFlow(o.row)}}},[a("q-tooltip",[t._v("\n                Editar informações\n              ")])],1),a("q-btn",{staticClass:"bg-padrao q-mx-sm",attrs:{color:"blue-3",icon:"mdi-content-duplicate",flat:"",round:""},on:{click:function(a){return t.duplicarFluxo(o.row)}}},[a("q-tooltip",[t._v("\n                Duplicar Fluxo\n              ")])],1),a("q-btn",{staticClass:"bg-padrao",attrs:{color:"blue-3",icon:"mdi-sitemap",flat:"",round:""},on:{click:function(a){return t.abrirFluxo(o.row)}}},[a("q-tooltip",[t._v("\n                Abrir Fluxo\n              ")])],1),a("q-btn",{staticClass:"bg-padrao",attrs:{color:"blue-3",icon:"delete",flat:"",round:""},on:{click:function(a){return t.deletarFluxo(o.row)}}},[a("q-tooltip",[t._v("\n                Excluir\n              ")])],1)],1)]}}])})],1)]),a("ModalChatFlow",{attrs:{modalChatFlow:t.modalChatFlow,chatFlowEdicao:t.chatFlowSelecionado},on:{"update:modalChatFlow":function(a){t.modalChatFlow=a},"update:modal-chat-flow":function(a){t.modalChatFlow=a},"update:chatFlowEdicao":function(a){t.chatFlowSelecionado=a},"update:chat-flow-edicao":function(a){t.chatFlowSelecionado=a},"chatFlow:criada":t.novoFluxoCriado,"chatFlow:editado":t.fluxoEditado}}),a("q-dialog",{attrs:{persistent:""},model:{value:t.confirmDelete,callback:function(a){t.confirmDelete=a},expression:"confirmDelete"}},[a("q-card",{staticStyle:{"min-width":"350px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Você tem certeza que dessa escluir esse fluxo?")]),a("div",[t._v(t._s(t.chatFlowSelecionado.name))])]),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{flat:"",label:"Cancelar"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Excluir",color:"negative"},on:{click:function(a){return t.confirmDeleteFoo()}}})],1)],1)],1)],1)},i=[],l=(o("14d9"),o("ee0e")),s=o("824a"),c=o("9a1b"),n=function(){var t=this,a=t._self._c;return a("q-dialog",{attrs:{value:t.modalChatFlow,persistent:""},on:{hide:t.fecharModal,show:t.abrirModal}},[a("q-card",{staticClass:"q-pa-lg",staticStyle:{width:"500px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v(t._s(t.chatFlow.isDuplicate?"Duplicar":t.chatFlowEdicao.id?"Editar":"Criar")+" Fluxo "),t.chatFlow.isDuplicate?a("span",[t._v(" (Nome: "+t._s(t.chatFlowEdicao.name)+") ")]):t._e()]),t.chatFlow.isDuplicate?a("div",{staticClass:"text-subtitle1"},[t._v(" Nome: "+t._s(t.chatFlowEdicao.name)+" ")]):t._e()]),a("q-card-section",[a("q-input",{staticClass:"row col",attrs:{outlined:"",rounded:"",dense:"",label:"Descrição"},model:{value:t.chatFlow.name,callback:function(a){t.$set(t.chatFlow,"name",a)},expression:"chatFlow.name"}}),a("div",{staticClass:"row col q-mt-md"},[a("q-input",{staticClass:"full-width",attrs:{clearable:"",rounded:"",dense:"",outlined:"",label:"Número para Teste",hint:"Deixe limpo para que a Auto resposta funcione. Caso contrário, irá funcionar somente para o número informado aqui."},model:{value:t.chatFlow.celularTeste,callback:function(a){t.$set(t.chatFlow,"celularTeste",a)},expression:"chatFlow.celularTeste"}})],1),a("div",{staticClass:"row col q-mt-md"},[a("q-checkbox",{attrs:{label:"Ativo"},model:{value:t.chatFlow.isActive,callback:function(a){t.$set(t.chatFlow,"isActive",a)},expression:"chatFlow.isActive"}})],1)],1),a("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{rounded:"",label:"Cancelar",color:"negative"}}),a("q-btn",{attrs:{rounded:"",label:"Salvar",color:"positive"},on:{click:t.handleAutoresposta}})],1)],1)],1)},r=[];const d={name:"Fluxo Inicial",nodeList:[{id:"start",name:"Início",type:"start",left:"26px",top:"100px",ico:"mdi-play",viewOnly:!0,status:"success",style:{}},{id:"configurations",name:"Configurações",type:"configurations",left:"340px",top:"100px",viewOnly:!0,ico:"mdi-alert-circle-outline",configurations:{notOptionsSelectMessage:{message:"",stepReturn:"A"},notResponseMessage:{time:10,type:1,destiny:""},welcomeMessage:{message:""},maxRetryBotMessage:{number:3,type:1,destiny:""}}},{id:"nodeC",name:"Boas vindas!",type:"node",left:"26px",top:"301px",interactions:[],conditions:[],actions:[]}],lineList:[{from:"start",to:"nodeC",paintStyle:{strokeWidth:3,stroke:"#8db1dd"}}]};function u(){return d}const h=+localStorage.getItem("userId");var p={name:"ModalNovoChatFlow",props:{modalChatFlow:{type:Boolean,default:!1},chatFlowEdicao:{type:Object,default:()=>({id:null})}},data(){return{chatFlow:{name:null,userId:h,celularTeste:null,isActive:!0}}},methods:{abrirModal(){this.chatFlowEdicao.id?this.chatFlow={...this.chatFlowEdicao,userId:h}:this.chatFlow={name:null,action:0,userId:h,celularTeste:null,isActive:!0}},fecharModal(){this.chatFlow={name:null,action:0,userId:h,celularTeste:null,isActive:!0},this.$emit("update:chatFlowEdicao",{id:null}),this.$emit("update:modalChatFlow",!1)},async handleAutoresposta(){var t;if(!this.chatFlow.id||null!==(t=this.chatFlow)&&void 0!==t&&t.isDuplicate){const t={...u(),...this.chatFlow,id:null},{data:a}=await Object(s["a"])(t);this.$notificarSucesso("Novo fluxo criado."),this.$emit("chatFlow:criada",a)}else{const{data:t}=await Object(s["d"])(this.chatFlow);this.$notificarSucesso("Fluxo editado."),this.$emit("chatFlow:editado",t)}this.fecharModal()}}},m=p,w=o("2877"),F=o("24e8"),f=o("f09f"),b=o("a370"),v=o("27f9"),C=o("8f8e"),x=o("4b7e"),g=o("9c40"),q=o("7f67"),y=o("eebe"),_=o.n(y),k=Object(w["a"])(m,n,r,!1,null,"447b99a6",null),A=k.exports;_()(k,"components",{QDialog:F["a"],QCard:f["a"],QCardSection:b["a"],QInput:v["a"],QCheckbox:C["a"],QCardActions:x["a"],QBtn:g["a"]}),_()(k,"directives",{ClosePopup:q["a"]});var S={name:"ChatFlowIndex",components:{ModalChatFlow:A},data(){return{confirmDelete:!1,listachatFlow:[],modalChatFlow:!1,chatFlowSelecionado:{},pagination:{rowsPerPage:40,rowsNumber:0,lastIndex:0},params:{pageNumber:1,searchParam:null,hasMore:!0},loading:!1,columns:[{name:"name",label:"Nome",field:"name",align:"left"},{name:"isActive",label:"Status",field:"isActive",align:"center"},{name:"celularTeste",label:"Celular Teste",field:"celularTeste",align:"center"},{name:"acoes",label:"",field:"acoes",align:"center"}],filas:[],usuarios:[]}},methods:{async listarChatFlow(){const{data:t}=await Object(s["c"])();this.listachatFlow=t.chatFlow},async listarFilas(){const{data:t}=await Object(l["d"])({isActive:!0});this.filas=t.filter((t=>t.isActive))},async listarUsuarios(){const{data:t}=await Object(c["f"])(this.params);this.usuarios=t.users},novoFluxoCriado(t){const a=[...this.listachatFlow];a.push(t),this.listachatFlow=a},duplicarFluxo(t){this.chatFlowSelecionado={...t,isDuplicate:!0},this.modalChatFlow=!0},fluxoEditado(t){const a=[...this.listachatFlow.filter((a=>a.id!==t.id))];a.push(t),this.listachatFlow=a},editFlow(t){this.chatFlowSelecionado=t,this.modalChatFlow=!0},async abrirFluxo(t){await this.$store.commit("SET_FLOW_DATA",{usuarios:this.usuarios,filas:this.filas,flow:t}),this.$router.push({name:"chat-flow-builder"})},deletarFluxo(t){this.chatFlowSelecionado=t,this.confirmDelete=!0},async confirmDeleteFoo(t){await Object(s["b"])(this.chatFlowSelecionado),await this.listarChatFlow()}},async mounted(){await this.listarChatFlow(),await this.listarFilas(),await this.listarUsuarios()}},D=S,E=o("eaac"),Q=o("db86"),T=o("0016"),I=o("05c0"),M=Object(w["a"])(D,e,i,!1,null,"53ec5652",null);a["default"]=M.exports;_()(M,"components",{QTable:E["a"],QBtn:g["a"],QTd:Q["a"],QIcon:T["a"],QTooltip:I["a"],QDialog:F["a"],QCard:f["a"],QCardSection:b["a"],QCardActions:x["a"]}),_()(M,"directives",{ClosePopup:q["a"]})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{"6c40":function(a,t,e){"use strict";e.r(t);var o=function(){var a=this,t=a._self._c;return t("div",[t("q-card",{staticClass:"q-ma-md"},[t("q-card-section",{staticClass:"q-pa-sm"},[t("ccFlow",{attrs:{filas:a.filas,usuarios:a.usuarios}})],1)],1),a._e()],2)},s=[],i=(e("14d9"),e("8982"));function l(a){return Object(i["a"])({url:"/auto-reply",method:"post",data:a})}function n(a){return Object(i["a"])({url:"/auto-reply",method:"get",params:a})}function p(a){return Object(i["a"])({url:`/auto-reply/${a.id}`,method:"put",data:a})}function c(a){return Object(i["a"])({url:`/auto-reply/${a}`,method:"delete"})}function r(a){return Object(i["a"])({url:`/auto-reply/${a.idAutoReply}/steps`,method:"post",data:a})}function d(a){return Object(i["a"])({url:`/auto-reply/${a.idAutoReply}/steps/${a.id}`,method:"put",data:a})}function u(a){return Object(i["a"])({url:`/auto-reply/${a.idAutoReply}/steps/${a.id}`,method:"delete"})}function m(a){return Object(i["a"])({url:"/auto-reply-action",method:"post",data:a})}function h(a){return Object(i["a"])({url:`/auto-reply-action/${a.id}`,method:"put",data:a})}function f(a){return Object(i["a"])({url:`/auto-reply-action/${a.id}`,method:"delete"})}var R=e("ee0e"),E=e("9a1b"),A=function(){var a=this,t=a._self._c;return t("q-dialog",{attrs:{value:a.modalAutoResposta,persistent:""},on:{hide:a.fecharModal,show:a.abrirModal}},[t("q-card",{staticClass:"q-pa-lg",staticStyle:{width:"500px"}},[t("q-card-section",[t("div",{staticClass:"text-h6"},[a._v(a._s(a.autoRespostaEdicao.id?"Editar":"Criar")+" Auto Resposta")])]),t("q-card-section",[t("q-input",{staticClass:"row col",attrs:{square:"",outlined:"",label:"Descrição"},model:{value:a.autoResposta.name,callback:function(t){a.$set(a.autoResposta,"name",t)},expression:"autoResposta.name"}}),t("div",{staticClass:"row col q-mt-md"},[t("q-checkbox",{attrs:{label:"Ativo"},model:{value:a.autoResposta.isActive,callback:function(t){a.$set(a.autoResposta,"isActive",t)},expression:"autoResposta.isActive"}})],1),t("div",{staticClass:"row col q-mt-md"},[t("q-input",{staticClass:"full-width",attrs:{clearable:"",square:"",outlined:"",label:"Número para Teste",hint:"Deixe limpo para que a Auto resposta funcione. Caso contrário, irá funcionar somente para o número informado aqui."},model:{value:a.autoResposta.celularTeste,callback:function(t){a.$set(a.autoResposta,"celularTeste",t)},expression:"autoResposta.celularTeste"}})],1)],1),t("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{flat:"",label:"Cancelar",color:"negative"}}),t("q-btn",{attrs:{flat:"",label:"Salvar",color:"primary"},on:{click:a.handleAutoresposta}})],1)],1)],1)},y=[];const b=+localStorage.getItem("userId");var v={name:"ModalAutoResposta",props:{modalAutoResposta:{type:Boolean,default:!1},autoRespostaEdicao:{type:Object,default:()=>({id:null})}},data(){return{autoResposta:{name:null,action:0,userId:b,celularTeste:null,isActive:!0}}},methods:{abrirModal(){this.autoRespostaEdicao.id?this.autoResposta={...this.autoRespostaEdicao,userId:b}:this.autoResposta={name:null,action:0,userId:b,celularTeste:null,isActive:!0}},fecharModal(){this.autoResposta={name:null,action:0,userId:b,celularTeste:null,isActive:!0},this.$emit("update:autoRespostaEdicao",{id:null}),this.$emit("update:modalAutoResposta",!1)},async handleAutoresposta(){if(this.autoResposta.id){const{data:a}=await p(this.autoResposta);this.$emit("autoResposta:editado",a)}else{const{data:a}=await l(this.autoResposta);this.$emit("autoResposta:criada",a)}this.fecharModal()}}},g=v,q=e("2877"),C=e("24e8"),w=e("f09f"),I=e("a370"),x=e("27f9"),$=e("9f0a"),S=e("8f8e"),j=e("4b7e"),Q=e("9c40"),D=e("7f67"),k=e("eebe"),M=e.n(k),O=Object(q["a"])(g,A,y,!1,null,"5676c68c",null),_=O.exports;M()(O,"components",{QDialog:C["a"],QCard:w["a"],QCardSection:I["a"],QInput:x["a"],QOptionGroup:$["a"],QCheckbox:S["a"],QCardActions:j["a"],QBtn:Q["a"]}),M()(O,"directives",{ClosePopup:D["a"]});var T=function(){var a=this,t=a._self._c;return t("q-dialog",{attrs:{persistent:"",value:a.modalEtapaAutoResposta},on:{hide:a.fecharModal,show:a.abrirModal}},[t("q-card",{staticClass:"q-pa-lg",staticStyle:{width:"600px"}},[t("q-card-section",[t("div",{staticClass:"text-caption"},[a._v("\n        Auto Resposta: "+a._s(a.autoReply.name)+"\n      ")]),t("div",{staticClass:"text-h6"},[a._v(a._s(a.etapaAutoRespostaEdicao.id?"Editar":"Criar")+" Etapa "+a._s(a.etapaAutoRespostaEdicao.id?`(ID: ${a.etapaAutoRespostaEdicao.id})`:""))])]),t("q-card-section",{staticClass:"q-pa-none"},[t("div",{staticClass:"row items-center"},[t("div",{staticClass:"col-xs-3 col-sm-2 col-md-1"},[t("q-btn",{staticClass:"q-ml-sm",attrs:{round:"",flat:""}},[t("q-icon",{attrs:{size:"2em",name:"mdi-emoticon-happy-outline"}}),t("q-tooltip",[a._v("\n              Emoji\n            ")]),t("q-menu",{attrs:{anchor:"top right",self:"bottom middle",offset:[5,40]}},[t("VEmojiPicker",{staticStyle:{width:"40vw"},attrs:{showSearch:!1,emojisByRow:20,labelSearch:"Localizar...",lang:"pt-BR"},on:{select:a.onInsertSelectEmoji}})],1)],1)],1),t("div",{staticClass:"col-xs-8 col-sm-10 col-md-11 q-pl-sm"},[t("label",{staticClass:"text-caption"},[a._v("Mensagem da Etapa:")]),t("textarea",{ref:"inputEnvioMensagem",staticClass:"q-pa-sm bg-white full-width",staticStyle:{"min-height":"15vh","max-height":"15vh"},attrs:{placeholder:"Digita sua mensagem",autogrow:"",dense:"",outlined:""},domProps:{value:a.etapa.reply},on:{input:t=>a.etapa.reply=t.target.value}})])]),t("div",{staticClass:"row col q-mt-md"},[t("q-checkbox",{attrs:{label:"Etapa inicial"},model:{value:a.etapa.initialStep,callback:function(t){a.$set(a.etapa,"initialStep",t)},expression:"etapa.initialStep"}})],1)]),t("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{flat:"",label:"Cancelar",color:"negative"}}),t("q-btn",{attrs:{flat:"",label:"Salvar",color:"primary"},on:{click:a.handleEtapaAutoresposta}})],1)],1)],1)},P=[],N=e("79b5"),B={name:"ModalEtapaAutoResposta",components:{VEmojiPicker:N["a"]},props:{modalEtapaAutoResposta:{type:Boolean,default:!1},autoReply:{type:Object,default:()=>({id:null,name:""})},etapaAutoRespostaEdicao:{type:Object,default:()=>({id:null})}},data(){return{etapa:{reply:null,idAutoReply:null,action:null,initialStep:!1}}},methods:{onInsertSelectEmoji(a){const t=this;var e=this.$refs.inputEnvioMensagem,o=e.selectionStart,s=e.selectionEnd,i=o,l=e.value;a.data&&(t.txtContent=this.etapa.reply,t.txtContent=l.substring(0,o)+a.data+l.substring(s,l.length),this.etapa.reply=t.txtContent,setTimeout((()=>{e.selectionStart=e.selectionEnd=i+a.data.length}),10))},fecharModal(){this.$emit("update:etapaAutoRespostaEdicao",{id:null}),this.$emit("update:modalEtapaAutoResposta",!1)},abrirModal(){this.etapaAutoRespostaEdicao.id?this.etapa={...this.etapaAutoRespostaEdicao}:(this.etapa={reply:null,idAutoReply:null,initialStep:!1},this.etapa.idAutoReply=this.autoReply.id)},verificarEtapaInicial(a){const t=this.autoReply.stepsReply?this.autoReply.stepsReply.find((t=>t.initialStep&&t.id!==a.id)):{};if(t&&a.initialStep)throw this.$q.notify({type:"negative",progress:!0,timeout:1e5,position:"top",closeBtn:!0,actions:[{icon:"close",round:!0,color:"white"}],message:`Cada Auto Resposta poderá ter apenas uma etapa inicial. A etapa de "ID: ${t.id}" está indicada como a etapa inicial. Caso deseje alterar, precisa primerio editar a etapa ("ID: ${t.id}") para que não seja a etapa inicial.`}),new Error("Etapa Inicial na Auto Resposta já existente")},async handleEtapaAutoresposta(){this.loading=!0;const a={...this.etapa,idAutoReply:this.autoReply.id};this.verificarEtapaInicial(a);try{if(this.etapa.id){const{data:t}=await d(a);this.$emit("etapaAutoResposta:editada",{...a,...t}),this.$q.notify({type:"info",progress:!0,position:"top",textColor:"black",message:"Etapa editada!",actions:[{icon:"close",round:!0,color:"white"}]})}else{const{data:t}=await r(a);this.$emit("etapaAutoResposta:criada",t),this.$q.notify({type:"positive",progress:!0,position:"top",message:"Etapa criada!",actions:[{icon:"close",round:!0,color:"white"}]})}this.fecharModal()}catch(t){console.error(t)}this.loading=!1}}},F=B,U=e("0016"),z=e("05c0"),V=e("4e73"),G=Object(q["a"])(F,T,P,!1,null,"1dcc7404",null),J=G.exports;M()(G,"components",{QDialog:C["a"],QCard:w["a"],QCardSection:I["a"],QBtn:Q["a"],QIcon:U["a"],QTooltip:z["a"],QMenu:V["a"],QCheckbox:S["a"],QCardActions:j["a"]}),M()(G,"directives",{ClosePopup:D["a"]});var L=function(){var a=this,t=a._self._c;return t("q-dialog",{attrs:{value:a.modalAcaoEtapa,persistent:"",position:"top"},on:{hide:a.fecharModal,show:a.abrirModal}},[t("q-card",{staticClass:"q-pa-lg",staticStyle:{width:"600px"}},[t("q-card-section",[t("div",{staticClass:"text-h6"},[a._v(a._s(a.acaoEtapaEdicao.id?"Editar":"Criar")+" Ação Etapa")])]),t("q-card-section",[t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("q-input",{attrs:{dense:"",square:"",outlined:"",label:"Chave"},model:{value:a.acaoEtapa.words,callback:function(t){a.$set(a.acaoEtapa,"words",t)},expression:"acaoEtapa.words"}})],1)]),t("div",{staticClass:"row q-mt-md"},[t("div",{staticClass:"col"},[t("q-option-group",{attrs:{inline:"",options:a.optionsAcao,color:"primary"},model:{value:a.acaoEtapa.action,callback:function(t){a.$set(a.acaoEtapa,"action",t)},expression:"acaoEtapa.action"}})],1)]),t("div",{staticClass:"row q-mt-md"},[t("div",{staticClass:"col"},[0===a.acaoEtapa.action?t("q-select",{staticClass:"full-width",attrs:{dense:"",outlined:"",options:a.autoReply.stepsReply,"option-label":"id","option-value":"id",label:"Etapa","map-options":"","emit-value":"",clearable:""},on:{input:function(t){a.acaoEtapa.queueId=null,a.acaoEtapa.userIdDestination=null}},model:{value:a.acaoEtapa.nextStepId,callback:function(t){a.$set(a.acaoEtapa,"nextStepId",t)},expression:"acaoEtapa.nextStepId"}}):a._e(),1===a.acaoEtapa.action?t("q-select",{staticClass:"full-width",attrs:{dense:"",outlined:"",options:a.filas,"option-label":"queue","option-value":"id",label:"Fila","map-options":"","emit-value":"",clearable:""},on:{input:function(t){a.acaoEtapa.nextStepId=null,a.acaoEtapa.userIdDestination=null}},model:{value:a.acaoEtapa.queueId,callback:function(t){a.$set(a.acaoEtapa,"queueId",t)},expression:"acaoEtapa.queueId"}}):a._e(),2===a.acaoEtapa.action?t("q-select",{staticClass:"full-width",attrs:{dense:"",outlined:"",options:a.usuarios,"option-label":"name","option-value":"id",label:"Usuário","map-options":"","emit-value":"",clearable:""},on:{input:function(t){a.acaoEtapa.nextStepId=null,a.acaoEtapa.queueId=null}},model:{value:a.acaoEtapa.userIdDestination,callback:function(t){a.$set(a.acaoEtapa,"userIdDestination",t)},expression:"acaoEtapa.userIdDestination"}}):a._e()],1)]),t("div",{staticClass:"row items-center q-mt-md"},[t("div",{staticClass:"col-xs-3 col-sm-2 col-md-1"},[t("q-btn",{attrs:{round:"",flat:""}},[t("q-icon",{attrs:{size:"2em",name:"mdi-emoticon-happy-outline"}}),t("q-tooltip",[a._v("\n              Emoji\n            ")]),t("q-menu",{attrs:{anchor:"top right",self:"bottom middle",offset:[5,40]}},[t("VEmojiPicker",{staticStyle:{width:"40vw"},attrs:{showSearch:!1,emojisByRow:20,labelSearch:"Localizar...",lang:"pt-BR"},on:{select:a.onInsertSelectEmoji}})],1)],1)],1),t("div",{staticClass:"col-xs-8 col-sm-10 col-md-11 q-pl-sm"},[t("label",{staticClass:"text-caption"},[a._v("Mensagem retorno:")]),t("textarea",{ref:"inputEnvioMensagem",staticClass:"q-pa-sm bg-white full-width",staticStyle:{"min-height":"10vh","max-height":"10vh"},attrs:{placeholder:"Digita a mensagem",autogrow:"",dense:"",outlined:""},domProps:{value:a.acaoEtapa.replyDefinition},on:{input:t=>a.acaoEtapa.replyDefinition=t.target.value}})])])]),t("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{flat:"",label:"Cancelar",color:"negative"}}),t("q-btn",{attrs:{flat:"",label:"Salvar",color:"primary"},on:{click:a.handleAcaoEtapa}})],1)],1)],1)},H=[];const K=+localStorage.getItem("userId");var W={name:"ModalAcaoEtapa",components:{VEmojiPicker:N["a"]},props:{modalAcaoEtapa:{type:Boolean,default:!1},acaoEtapaEdicao:{type:Object,default:()=>({id:null})},etapaAutoResposta:{type:Object,default:()=>({id:null})},filas:{type:Array,default:()=>[]},usuarios:{type:Array,default:()=>[]},autoReply:{type:Object,default:()=>{}}},data(){return{acaoEtapa:{stepReplyId:null,words:null,action:null,userId:K,queueId:null,userIdDestination:null,nextStepId:null,replyDefinition:null},optionsAcao:[{value:0,label:"Proxima Etapa"},{value:1,label:"Enviar para Fila"},{value:2,label:"Enviar para usuário"}]}},methods:{resetAcaoEtapa(){this.acaoEtapa={stepReplyId:null,words:null,action:null,userId:K,queueId:null,userIdDestination:null,nextStepId:null,replyDefinition:null}},abrirModal(){this.acaoEtapaEdicao.id?this.acaoEtapa={...this.acaoEtapaEdicao,userId:K}:this.resetAcaoEtapa()},fecharModal(){this.resetAcaoEtapa(),this.$emit("update:acaoEtapaEdicao",{id:null}),this.$emit("update:modalAcaoEtapa",!1)},async handleAcaoEtapa(){const a={...this.acaoEtapa,stepReplyId:this.etapaAutoResposta.id};if(a.id){const{data:t}=await h(a);this.$emit("acaoEtapa:editada",t),this.$q.notify({type:"info",progress:!0,position:"top",textColor:"black",message:"Ação editada!",actions:[{icon:"close",round:!0,color:"white"}]})}else{const{data:t}=await m(a);this.$emit("acaoEtapa:criada",t),this.$q.notify({type:"positive",progress:!0,position:"top",message:"Ação criada!",actions:[{icon:"close",round:!0,color:"white"}]})}this.fecharModal()},onInsertSelectEmoji(a){const t=this;var e=this.$refs.inputEnvioMensagem,o=e.selectionStart,s=e.selectionEnd,i=o,l=e.value;a.data&&(t.txtContent=this.acaoEtapa.replyDefinition,t.txtContent=l.substring(0,o)+a.data+l.substring(s,l.length),this.acaoEtapa.replyDefinition=t.txtContent,setTimeout((()=>{e.selectionStart=e.selectionEnd=i+a.data.length}),10))}}},X=W,Y=e("ddd8"),Z=Object(q["a"])(X,L,H,!1,null,"20fd2d30",null),aa=Z.exports;M()(Z,"components",{QDialog:C["a"],QCard:w["a"],QCardSection:I["a"],QInput:x["a"],QOptionGroup:$["a"],QSelect:Y["a"],QBtn:Q["a"],QIcon:U["a"],QTooltip:z["a"],QMenu:V["a"],QCardActions:j["a"]}),M()(Z,"directives",{ClosePopup:D["a"]});var ta=e("e2bb"),ea={name:"CadastroAutoReply",components:{ccFlow:ta["default"],ModalAutoResposta:_,ModalEtapaAutoResposta:J,ModalAcaoEtapa:aa},data(){return{autoRespostaSelecionado:{},modalAutoResposta:!1,etapaAutoRespostaEdicao:{},modalEtapaAutoResposta:!1,modalAcaoEtapa:!1,acaoEtapaEdicao:{},autoReply:{},tipoAutoResposta:[{value:"0",label:"Entrada (Criação do Ticket)"},{value:"1",label:"Encerramento (Resolução Ticket)"}],acaoEtapa:[{value:"0",label:"Próxima Etapa"},{value:"1",label:"Encaminhar para Fila"},{value:"2",label:"Ecaminhar para Usuário"}],pagination:{rowsPerPage:40,rowsNumber:0,lastIndex:0},params:{pageNumber:1,searchParam:null,hasMore:!0},loading:!1,columns:[{name:"expand",label:"",field:"expand",align:"left"},{name:"name",label:"Nome",field:"name",align:"left"},{name:"action",label:"Tipo",field:"action",align:"left",format:a=>this.tipoAutoResposta.find((t=>t.value==a)).label||""},{name:"isActive",label:"Status",field:"isActive",align:"center",format:a=>!0===a?"Ativo":"Inativo"},{name:"celularTeste",label:"Celular Teste",field:"celularTeste",align:"center"},{name:"acoes",label:"",field:"acoes",align:"center"}],columnsEtapas:[{name:"expand",label:"",field:"expand",align:"left"},{name:"id",label:"ID",field:"id",align:"center",sortable:!0,sort:(a,t,e,o)=>parseInt(a,10)-parseInt(t,10)},{name:"reply",label:"Mensagem",field:"reply",align:"left",classes:"ellipsis",style:"max-width: 400px;"},{name:"initialStep",label:"Etapa Inicial",sortable:!0,field:"initialStep",align:"left",format:a=>a?"Sim":""},{name:"acoes",label:"",field:"acoes",align:"center"}],columnsAcoes:[{name:"words",label:"Chave",field:"words",align:"left"},{name:"action",label:"Ação",field:"action",align:"left",format:a=>this.acaoEtapa.find((t=>t.value==a)).label},{name:"queueId",label:"Fila Destino",field:"queueId",align:"center",format:a=>a?this.filas.find((t=>t.id===a)).queue:""},{name:"userIdDestination",label:"Usuário Destino",field:"userIdDestination",align:"center",format:a=>a?this.usuarios.find((t=>t.id===a)).name:""},{name:"nextStepId",label:"ID Etapa destino",field:"nextStepId",align:"center"},{name:"acoes",label:"Ações",field:"acoes",align:"center"}],listaAutoResposta:[],filas:[],usuarios:[]}},methods:{autoRespostaCriada(a){const t=[...this.listaAutoResposta];t.push(a),this.listaAutoResposta=[...t]},autoRespostaEditada(a){let t=[...this.listaAutoResposta];t=t.filter((t=>t.id!==a.id)),t.push(a),this.listaAutoResposta=[...t]},async listarAutoReply(){const{data:a}=await n();this.listaAutoResposta=a.autoReply},async listarFilas(){const{data:a}=await Object(R["d"])({isActive:!0});this.filas=a.filter((a=>a.isActive))},editarAutoResposta(a){this.autoRespostaSelecionado=a,this.modalAutoResposta=!0},async deletarAutoResposta(a){this.$q.dialog({title:"Atenção!!",message:`Deseja realmente deletar a Auto Resposta "${a.name}"?`,cancel:{label:"Não",color:"primary",push:!0},ok:{label:"Sim",color:"negative",push:!0},persistent:!0}).onOk((()=>{this.loading=!0,c(a.id).then((t=>{let e=[...this.listaAutoResposta];e=e.filter((t=>t.id!==a.id)),this.listaAutoResposta=[...e],this.$q.notify({type:"positive",progress:!0,position:"top",message:`Auto Resposta ${a.name} deletada!`,actions:[{icon:"close",round:!0,color:"white"}]})})).catch((a=>{console.error(a),this.$notificarErro("Não é possível deletar o Chatbot",a)})),this.loading=!1}))},novaEtapa(a){this.autoReply=a,this.etapaAutoRespostaEdicao={},this.modalEtapaAutoResposta=!0},etapaAutoRespostaCriada(a){const t=[...this.listaAutoResposta],e=t.map((t=>(t.id===a.idAutoReply&&(Array.isArray(t.stepsReply)||(t.stepsReply=[]),t.stepsReply.push(a)),t)));this.listaAutoResposta=[...e]},etapaAutoRespostaEditada(a){const t=[...this.listaAutoResposta],e=t.map((t=>{if(t.id===a.idAutoReply){const e=t.stepsReply.findIndex((t=>t.id===a.id));e>-1&&(t.stepsReply[e]=a)}return t}));this.listaAutoResposta=[...e]},editarEtapaAutoResposta(a,t){this.autoReply=a,this.etapaAutoRespostaEdicao=t,this.modalEtapaAutoResposta=!0},deletarEtapaAutoResposta(a,t){const e={id:t.id,idAutoReply:a.id};this.$q.dialog({title:"Atenção!!",message:`Deseja realmente deletar a Etapa "ID: ${t.id}"?`,cancel:{label:"Não",color:"primary",push:!0},ok:{label:"Sim",color:"negative",push:!0},persistent:!0}).onOk((()=>{this.loading=!0,u(e).then((a=>{let e=[...this.listaAutoResposta];e=e.map((a=>{if(a.id===t.idAutoReply){const e=a.stepsReply.filter((a=>a.id!==t.id));a.stepsReply=e}return a})),this.listaAutoResposta=[...e],this.$q.notify({type:"positive",progress:!0,position:"top",message:`Etapa ${t.id} deletada!`,actions:[{icon:"close",round:!0,color:"white"}]})})).catch((a=>{console.error(a),this.$notificarErro("Não é possível deletar a etapa",a)})),this.loading=!1}))},criarAcaoEtapa(a,t){this.autoReply=a,this.etapaAutoRespostaEdicao=t,this.modalAcaoEtapa=!0},editarAcaoEtapa(a,t,e){this.autoReply=a,this.etapaAutoRespostaEdicao=t,this.acaoEtapaEdicao=e,this.modalAcaoEtapa=!0},deletarAcaoEtapa(a,t,e){this.autoReply=a,this.etapaAutoRespostaEdicao=t,this.$q.dialog({title:"Atenção!!",message:`Deseja realmente deletar a Ação de "Chave: ${e.words}"?`,cancel:{label:"Não",color:"primary",push:!0},ok:{label:"Sim",color:"negative",push:!0},persistent:!0}).onOk((()=>{this.loading=!0,f(e).then((a=>{const o=[...this.listaAutoResposta],s=o.map((a=>(a.id===this.autoReply.id&&a.stepsReply.forEach((a=>{if(a.id===e.stepReplyId){const t=a.stepsReplyAction.filter((a=>a.id!==e.id));a.stepsReplyAction=[...t]}})),a)));this.listaAutoResposta=[...s],this.$q.notify({type:"positive",progress:!0,position:"top",message:`Ação Etapa ${t.id} deletada!`,actions:[{icon:"close",round:!0,color:"white"}]})})).catch((a=>{console.error(a),this.$notificarErro("Não é possível deletar a ação da etapa",a)})),this.loading=!1}))},async listarUsuarios(){const{data:a}=await Object(E["f"])(this.params);this.usuarios=a.users},acaoEditada(a){const t=[...this.listaAutoResposta],e=t.map((t=>(t.id===this.autoReply.id&&t.stepsReply.forEach((t=>{if(t.id===a.stepReplyId){const e=t.stepsReplyAction.findIndex((t=>t.id===a.id));e&&(t.stepsReplyAction[e]=a)}})),t)));this.listaAutoResposta=[...e]},acaoCriada(a){const t=[...this.listaAutoResposta],e=t.map((t=>(t.id===this.autoReply.id&&t.stepsReply.forEach((t=>{t.id===a.stepReplyId&&(Array.isArray(t.stepsReplyAction)||(t.stepsReplyAction=[]),t.stepsReplyAction.push(a))})),t)));this.listaAutoResposta=[...e]}},mounted(){this.listarFilas(),this.listarUsuarios(),this.listarAutoReply()}},oa=ea,sa=e("eaac"),ia=e("bd08"),la=e("357e"),na=e("db86"),pa=Object(q["a"])(oa,o,s,!1,null,"8afc49ec",null);t["default"]=pa.exports;M()(pa,"components",{QCard:w["a"],QCardSection:I["a"],QTable:sa["a"],QBtn:Q["a"],QTr:ia["a"],QTh:la["a"],QTd:na["a"],QIcon:U["a"],QTooltip:z["a"]})}}]);
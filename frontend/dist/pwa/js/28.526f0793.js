(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{"076b":function(a,e,t){"use strict";t.r(e);var s=function(){var a=this,e=a._self._c;return e("div",[e("q-table",{staticClass:"my-sticky-dynamic q-ma-lg",attrs:{flat:"",bordered:"",square:"","hide-bottom":"",title:"Mensagens Rápidas",data:a.mensagensRapidas,columns:a.columns,loading:a.loading,"row-key":"id",pagination:a.pagination,"rows-per-page-options":[0]},on:{"update:pagination":function(e){a.pagination=e}},scopedSlots:a._u([{key:"top-right",fn:function(){return[e("q-btn",{attrs:{color:"primary",label:"Adicionar",rounded:""},on:{click:function(e){a.mensagemRapidaEmEdicao={},a.modalMensagemRapida=!0}}})]},proxy:!0},{key:"body-cell-isActive",fn:function(a){return[e("q-td",{staticClass:"text-center"},[e("q-icon",{attrs:{size:"24px",name:a.value?"mdi-check-circle-outline":"mdi-close-circle-outline",color:a.value?"positive":"negative"}})],1)]}},{key:"body-cell-acoes",fn:function(t){return[e("q-td",{staticClass:"text-center"},[e("q-btn",{attrs:{flat:"",round:"",icon:"edit"},on:{click:function(e){return a.editarMensagem(t.row)}}}),e("q-btn",{attrs:{flat:"",round:"",icon:"mdi-delete"},on:{click:function(e){return a.deletarMensagem(t.row)}}})],1)]}}])}),e("ModalMensagemRapida",{attrs:{modalMensagemRapida:a.modalMensagemRapida,mensagemRapidaEmEdicao:a.mensagemRapidaEmEdicao},on:{"update:modalMensagemRapida":function(e){a.modalMensagemRapida=e},"update:modal-mensagem-rapida":function(e){a.modalMensagemRapida=e},"update:mensagemRapidaEmEdicao":function(e){a.mensagemRapidaEmEdicao=e},"update:mensagem-rapida-em-edicao":function(e){a.mensagemRapidaEmEdicao=e},"mensagemRapida:criada":a.mensagemCriada,"mensagemRapida:editada":a.mensagemEditada}})],1)},i=[],n=function(){var a=this,e=a._self._c;return e("q-dialog",{attrs:{persistent:"",value:a.modalMensagemRapida},on:{hide:a.fecharModal,show:a.abrirModal}},[e("q-card",{staticClass:"q-pa-lg",style:a.$q.screen.width<500?"width: 95vw":"min-width: 700px; max-width: 700px"},[e("div",{staticClass:"text-h6"},[a._v(a._s(a.mensagemRapida.id?"Editar":"Criar")+" Mensagem Rápida "+a._s(a.mensagemRapida.id?`(ID: ${a.mensagemRapida.id})`:""))]),e("q-card-section",{staticClass:"q-pa-none"},[e("div",{staticClass:"row q-my-md"},[e("div",{staticClass:"col"},[e("q-input",{staticStyle:{width:"200px","margin-left":"62px"},attrs:{outlined:"",rounded:"",dense:"",label:"Chave"},model:{value:a.mensagemRapida.key,callback:function(e){a.$set(a.mensagemRapida,"key",e)},expression:"mensagemRapida.key"}}),e("p",{staticStyle:{"margin-left":"62px","font-size":"10px","margin-top":"3px"}},[a._v("\n            A chave é o atalho para pesquisa da mensagem pelos usuários.\n          ")])],1)]),e("div",{staticClass:"row items-center"},[e("div",{staticClass:"col-xs-3 col-sm-2 col-md-1"},[e("q-btn",{staticClass:"q-ml-sm",attrs:{round:"",flat:""}},[e("q-icon",{attrs:{size:"2em",name:"mdi-emoticon-happy-outline"}}),e("q-tooltip",[a._v("\n              Emoji\n            ")]),e("q-menu",{attrs:{anchor:"top right",self:"bottom middle",offset:[5,40]}},[e("VEmojiPicker",{staticStyle:{width:"40vw"},attrs:{showSearch:!1,emojisByRow:20,labelSearch:"Localizar...",lang:"pt-BR"},on:{select:a.onInsertSelectEmoji}})],1)],1)],1),e("div",{staticClass:"col-xs-8 col-sm-10 col-md-11 q-pl-sm"},[e("label",{staticClass:"text-caption"},[a._v("Mensagem:")]),e("textarea",{ref:"inputEnvioMensagem",staticClass:"q-pa-sm bg-white full-width rounded-all",staticStyle:{"min-height":"15vh","max-height":"15vh"},attrs:{placeholder:"Digite a mensagem",autogrow:"",dense:"",outlined:""},domProps:{value:a.mensagemRapida.message},on:{input:e=>a.mensagemRapida.message=e.target.value}})])])]),e("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{rounded:"",label:"Cancelar",color:"negative"}}),e("q-btn",{attrs:{rounded:"",label:"Salvar",color:"positive"},on:{click:a.handleMensagemRapida}})],1)],1)],1)},o=[],d=t("79b5"),m=t("1394"),l={name:"ModalMensagemRapida",components:{VEmojiPicker:d["a"]},props:{modalMensagemRapida:{type:Boolean,default:!1},mensagemRapidaEmEdicao:{type:Object,default:()=>({id:null,key:"",message:""})}},data(){return{mensagemRapida:{key:null,message:null}}},methods:{onInsertSelectEmoji(a){const e=this;var t=this.$refs.inputEnvioMensagem,s=t.selectionStart,i=t.selectionEnd,n=s,o=t.value;a.data&&(e.txtContent=this.mensagemRapida.message,e.txtContent=o.substring(0,s)+a.data+o.substring(i,o.length),this.mensagemRapida.message=e.txtContent,setTimeout((()=>{t.selectionStart=t.selectionEnd=n+a.data.length}),10))},fecharModal(){this.$emit("update:mensagemRapidaEmEdicao",{id:null}),this.$emit("update:modalMensagemRapida",!1)},abrirModal(){this.mensagemRapidaEmEdicao.id?this.mensagemRapida={...this.mensagemRapidaEmEdicao}:this.mensagemRapida={key:null,message:null}},async handleMensagemRapida(){this.loading=!0;try{if(this.mensagemRapida.id){const{data:a}=await Object(m["a"])(this.mensagemRapida);this.$emit("mensagemRapida:editada",{...this.mensagemRapida,...a}),this.$q.notify({type:"info",progress:!0,position:"top",textColor:"black",message:"Mensagem Rápida editada!",actions:[{icon:"close",round:!0,color:"white"}]})}else{const{data:a}=await Object(m["b"])(this.mensagemRapida);this.$emit("mensagemRapida:criada",a),this.$q.notify({type:"positive",progress:!0,position:"top",message:"Mensagem rápida criada!",actions:[{icon:"close",round:!0,color:"white"}]})}this.fecharModal()}catch(a){console.error(a)}this.loading=!1}}},c=l,r=t("2877"),p=t("24e8"),g=t("f09f"),u=t("a370"),h=t("27f9"),R=t("9c40"),f=t("0016"),b=t("05c0"),v=t("4e73"),y=t("4b7e"),M=t("7f67"),w=t("eebe"),E=t.n(w),q=Object(r["a"])(c,n,o,!1,null,"718667ee",null),C=q.exports;E()(q,"components",{QDialog:p["a"],QCard:g["a"],QCardSection:u["a"],QInput:h["a"],QBtn:R["a"],QIcon:f["a"],QTooltip:b["a"],QMenu:v["a"],QCardActions:y["a"]}),E()(q,"directives",{ClosePopup:M["a"]});var x={name:"MensagensRapidas",components:{ModalMensagemRapida:C},data(){return{loading:!1,mensagensRapidas:[],modalMensagemRapida:!1,mensagemRapidaEmEdicao:{},columns:[{name:"id",label:"#",field:"id",align:"left"},{name:"key",label:"Chave",field:"key",align:"left"},{name:"message",label:"Mensagem",field:"message",align:"left",classes:"ellipsis",style:"max-width: 400px;"},{name:"acoes",label:"Ações",field:"acoes",align:"center"}],pagination:{rowsPerPage:40,rowsNumber:0,lastIndex:0}}},methods:{async listarMensagensRapidas(){const{data:a}=await Object(m["d"])();this.mensagensRapidas=a},mensagemCriada(a){this.mensagensRapidas.unshift(a)},mensagemEditada(a){const e=[...this.mensagensRapidas],t=e.findIndex((e=>e.id===a.id));t>-1&&(e[t]=a),this.mensagensRapidas=[...e]},editarMensagem(a){this.mensagemRapidaEmEdicao={...a},this.modalMensagemRapida=!0},deletarMensagem(a){this.$q.dialog({title:"Atenção!!",message:`Deseja realmente deletar a mensagem de chave "${a.key}"?`,cancel:{label:"Não",color:"primary",push:!0},ok:{label:"Sim",color:"negative",push:!0},persistent:!0}).onOk((()=>{this.loading=!0,Object(m["c"])(a).then((e=>{let t=[...this.mensagensRapidas];t=t.filter((e=>e.id!==a.id)),this.mensagensRapidas=[...t],this.$q.notify({type:"positive",progress:!0,position:"top",message:"Mensagem deletada!",actions:[{icon:"close",round:!0,color:"white"}]})})),this.loading=!1}))}},mounted(){this.listarMensagensRapidas()}},k=x,j=t("eaac"),S=t("db86"),Q=Object(r["a"])(k,s,i,!1,null,"43f7e348",null);e["default"]=Q.exports;E()(Q,"components",{QTable:j["a"],QBtn:R["a"],QTd:S["a"],QIcon:f["a"]})}}]);
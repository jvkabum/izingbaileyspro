(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"435d":function(t,a,e){},43621:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t._self._c;return"super"===t.userProfile?a("div",[a("q-table",{staticClass:"my-sticky-dynamic q-ma-lg",attrs:{flat:"",bordered:"",square:"","hide-bottom":"",title:"Empresas",data:t.tenants,columns:t.columns,loading:t.loading,"row-key":"id",pagination:t.pagination,"rows-per-page-options":[0]},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-btn",{attrs:{rounded:"",color:"primary",label:"Adicionar"},on:{click:function(a){t.tenantEdicao={},t.modalTenant=!0}}})]},proxy:!0},{key:"body-cell-color",fn:function(e){return[a("q-td",{staticClass:"text-center"},[a("div",{staticClass:"q-pa-sm rounded-borders",style:`background: ${e.row.color}`},[t._v("\n          "+t._s(e.row.color)+"\n        ")])])]}},{key:"body-cell-isActive",fn:function(t){return[a("q-td",{staticClass:"text-center"},[a("q-icon",{attrs:{size:"24px",name:t.value?"mdi-check-circle-outline":"mdi-close-circle-outline",color:t.value?"positive":"negative"}})],1)]}},{key:"body-cell-acoes",fn:function(e){return[a("q-td",{staticClass:"text-center"},[a("q-btn",{staticStyle:{"margin-right":"10px"},attrs:{flat:"",round:"",icon:"edit"},on:{click:function(a){return t.editarTenant(e.row)}}}),a("q-btn",{attrs:{flat:"",round:"",icon:"delete"},on:{click:function(a){return t.deletarTenant(e.row)}}})],1)]}},{key:"body-cell-status",fn:function(e){return[a("q-td",{class:t.getColClass(e.row)},[t._v("\n      "+t._s(t.formatStatus(e.row.status))+"\n    ")])]}}],null,!1,2082736499)}),a("ModalTenant",{attrs:{modalTenant:t.modalTenant,tenantEdicao:t.tenantEdicao},on:{"update:modalTenant":function(a){t.modalTenant=a},"update:modal-tenant":function(a){t.modalTenant=a},"update:tenantEdicao":function(a){t.tenantEdicao=a},"update:tenant-edicao":function(a){t.tenantEdicao=a},"modal-tenant:criada":t.tenantCriada,"modal-tenant:editada":t.tenantEditada}})],1):t._e()},i=[],o=(e("14d9"),e("6320")),s=function(){var t=this,a=t._self._c;return a("q-dialog",{attrs:{persistent:"",value:t.modalTenant},on:{hide:t.fecharModal,show:t.abrirModal}},[a("q-card",{staticClass:"q-pa-lg",staticStyle:{width:"500px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v(t._s(t.tenantEdicao.id?"Editar":"Criar")+" Tenant")])]),a("q-card-section",[a("q-toggle",{attrs:{label:t.toggleStatus?"Ativo":"Inativo",color:"primary"},model:{value:t.toggleStatus,callback:function(a){t.toggleStatus=a},expression:"toggleStatus"}}),a("q-input",{staticClass:"row col",attrs:{square:"",outlined:"",label:"Nome"},model:{value:t.tenant.name,callback:function(a){t.$set(t.tenant,"name",a)},expression:"tenant.name"}}),a("q-input",{staticClass:"row col",attrs:{square:"",outlined:"",type:"number",label:"Usuários"},model:{value:t.tenant.maxUsers,callback:function(a){t.$set(t.tenant,"maxUsers",a)},expression:"tenant.maxUsers"}}),a("q-input",{staticClass:"row col",attrs:{square:"",outlined:"",type:"number",label:"Conexões"},model:{value:t.tenant.maxConnections,callback:function(a){t.$set(t.tenant,"maxConnections",a)},expression:"tenant.maxConnections"}})],1),a("q-card-actions",{staticClass:"q-mt-md",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-mr-md",attrs:{flat:"",label:"Cancelar",color:"negative"}}),a("q-btn",{attrs:{flat:"",label:"Salvar",color:"primary"},on:{click:t.validateAndHandleTenant}})],1)],1)],1)},l=[],r={name:"ModalTenant",props:{modalTenant:{type:Boolean,default:!1},tenantEdicao:{type:Object,default:()=>({id:null})}},data(){return{tenant:{id:null,status:"active",name:null,maxUsers:null,maxConnections:null,bmToken:null},toggleStatus:!1}},watch:{"tenant.status":function(t){this.toggleStatus="active"===t},toggleStatus:function(t){this.tenant.status=t?"active":"inactive"}},methods:{resetarTenant(){this.tenant={id:null,status:null,name:null,maxUsers:null,maxConnections:null,bmToken:null}},fecharModal(){this.resetarTenant(),this.$emit("update:tenantEdicao",{id:null}),this.$emit("update:modalTenant",!1)},abrirModal(){this.tenantEdicao.id?this.tenant={...this.tenantEdicao}:this.resetarTenant()},async handleTenant(){try{if(this.loading=!0,this.tenant.id){const{data:t}=await Object(o["b"])(this.tenant);this.$emit("modal-tenant:editada",t),this.$q.notify({type:"info",progress:!0,position:"top",textColor:"black",message:"Empresa editada!",actions:[{icon:"close",round:!0,color:"white"}]})}else{const{data:t}=await Object(o["e"])(this.tenant);this.$emit("modal-tenant:criada",t),this.$q.notify({type:"positive",progress:!0,position:"top",message:"Empresa criada!",actions:[{icon:"close",round:!0,color:"white"}]})}this.loading=!1,this.fecharModal()}catch(t){console.error(t),this.$notificarErro("Ocorreu um erro ao criar a Empresa",t)}},validateAndHandleTenant(){this.areRequiredFieldsFilled()?this.handleTenant():this.$q.notify({type:"negative",progress:!0,position:"top",message:"Preencha todos os campos obrigatórios!",actions:[{icon:"close",round:!0,color:"white"}]})},areRequiredFieldsFilled(){return this.tenant.name&&null!==this.tenant.maxUsers&&null!==this.tenant.maxConnections&&null!==this.tenant.status}}},c=r,d=e("2877"),u=e("24e8"),m=e("f09f"),p=e("a370"),f=e("9564"),h=e("27f9"),g=e("4b7e"),b=e("9c40"),v=e("7f67"),q=e("eebe"),y=e.n(q),x=Object(d["a"])(c,s,l,!1,null,"11327cf2",null),C=x.exports;y()(x,"components",{QDialog:u["a"],QCard:m["a"],QCardSection:p["a"],QToggle:f["a"],QInput:h["a"],QCardActions:g["a"],QBtn:b["a"]}),y()(x,"directives",{ClosePopup:v["a"]});var T={name:"Tenants",components:{ModalTenant:C},data(){return{userProfile:"user",tenantEdicao:{},modalTenant:!1,tenants:[],pagination:{rowsPerPage:40,rowsNumber:0,lastIndex:0},loading:!1,columns:[{name:"id",label:"#",field:"id",align:"left"},{name:"status",label:"Status",field:"status",align:"left",format:t=>this.formatStatus(t)},{name:"name",label:"Nome",field:"name",align:"center"},{name:"maxUsers",label:"Limite de Usuário",field:"maxUsers",align:"center"},{name:"maxConnections",label:"Limite de Conexão",field:"maxConnections",align:"center"},{name:"acoes",label:"Ações",field:"acoes",align:"center"}]}},methods:{getColClass(t){return"active"===t.status?"bg-active":"bg-inactive"},formatStatus(t){return"active"===t?"Ativo":"Inativo"},async listarTenants(){const{data:t}=await Object(o["g"])();this.tenants=t.filter((t=>1!==t.id))},tenantCriada(t){const a=[...this.tenants];a.push(t),this.tenants=[...a]},tenantEditada(t){const a=[...this.tenants],e=a.findIndex((a=>a.id===t.id));e>-1&&(a[e]=t),this.tenants=[...a]},editarTenant(t){this.tenantEdicao={...t},this.modalTenant=!0},deletarTenant(t){this.$q.dialog({title:"Atenção!!",message:`Deseja realmente deletar a Empresa "${t.id}"?`,cancel:{label:"Não",color:"primary",push:!0},ok:{label:"Sim",color:"negative",push:!0},persistent:!0}).onOk((()=>{this.loading=!0,Object(o["f"])(t).then((a=>{let e=[...this.tenants];e=e.filter((a=>a.id!==t.id)),this.tenants=[...e],this.$q.notify({type:"positive",progress:!0,position:"top",message:`Empresa ${t.id} deletada!`,actions:[{icon:"close",round:!0,color:"white"}]})})),this.loading=!1}))}},mounted(){this.userProfile=localStorage.getItem("profile"),this.listarTenants()}},w=T,k=(e("553b"),e("eaac")),E=e("db86"),S=e("0016"),$=Object(d["a"])(w,n,i,!1,null,"50a690ca",null);a["default"]=$.exports;y()($,"components",{QTable:k["a"],QBtn:b["a"],QTd:E["a"],QIcon:S["a"]})},"553b":function(t,a,e){"use strict";e("435d")}}]);
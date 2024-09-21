(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"088f":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e._self._c;return"admin"===e.userProfile?t("div",[t("q-card",{attrs:{bordered:""}},[t("q-card-section",[t("div",{staticClass:"text-h6 q-px-sm"},[e._v(" Relatório Resumo Atendimentos Usuários ")])]),t("q-card-section",{staticClass:"q-pt-none"},[t("fieldset",{staticClass:"rounded-all"},[t("legend",{staticClass:"q-px-sm"},[e._v("Filtros (Data Atendimentos)")]),t("div",{staticClass:"row q-gutter-md items-end"},[t("div",{staticClass:"col-grow"},[t("label",[e._v("Início")]),t("DatePick",{attrs:{dense:"",rounded:""},model:{value:e.pesquisa.startDate,callback:function(t){e.$set(e.pesquisa,"startDate",t)},expression:"pesquisa.startDate"}})],1),t("div",{staticClass:"col-grow"},[t("label",[e._v("Final")]),t("DatePick",{attrs:{dense:"",rounded:""},model:{value:e.pesquisa.endDate,callback:function(t){e.$set(e.pesquisa,"endDate",t)},expression:"pesquisa.endDate"}})],1),t("div",{staticClass:"col-grow text-center"},[t("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",label:"Gerar",icon:"refresh",rounded:""},on:{click:e.gerarRelatorio}}),t("q-btn",{staticClass:"q-mr-sm",attrs:{color:"black",rounded:"",icon:"print",label:"Imprimir"},on:{click:function(t){return e.printReport("tRelatorioResumoAtendimentosUsuarios")}}}),t("q-btn",{attrs:{color:"warning",label:"Excel",rounded:""},on:{click:function(t){return e.exportTable("tRelatorioResumoAtendimentosUsuarios")}}})],1)])])])],1),t("div",{staticClass:"row"},[t("div",{staticClass:"col-xs-12 q-mt-sm"},[t("div",{staticClass:"tableLarge q-ma-sm q-markup-table q-table__container q-table__card q-table--cell-separator q-table--flat q-table--bordered q-table--no-wrap",attrs:{id:"tRelatorioResumoAtendimentosUsuarios"}},[t("table",{staticClass:"q-pb-md q-table q-tabs--dense",attrs:{id:"tableRelatorioResumoAtendimentosUsuarios"}},[t("thead",[t("tr",e._l(e.bl_sintetico?e.columns.filter((t=>t.name==e.opcoesRelatorio.agrupamento)):e.columns,(function(a){return t("td",{key:a.name},[e._v("\n                "+e._s(a.label)+"\n              ")])})),0)]),t("tbody",[e.bl_sintetico?e._e():e._l(e.dadosResumo,(function(a){return t("tr",{key:a.number},e._l(e.columns,(function(o){return t("td",{key:o.name+"-"+a.id,class:o.class,style:o.style},[e._v("\n                  "+e._s(void 0!==o.format?o.format(a[o.field],a):a[o.field])+"\n                ")])})),0)}))],2)])])])]),t("ccPrintModelLandscape",{attrs:{id:"slotTableRelatorioResumoAtendimentosUsuarios",imprimirRelatorio:e.imprimir,title:"Relatório de Resumo Atendimentos Usuários",styleP:"\n    table { width: 100%; font-size: 10px; border-spacing: 1; border-collapse: collapse;  }\n    #tableReport tr td { border:1px solid #DDD; padding-left: 10px; padding-right: 10px;  }\n    #tableReport thead tr:nth-child(1) td { text-align: center; padding: 5px; font-weight: bold; color: #000; background: lightgrey; opacity: 1; }\n    #lineGroup { background: #f8f8f8; line-height: 30px; }\n    #quebraAgrupamentoRelatorio { border-bottom: 1px solid black !important; }\n    #st_nome, #st_tipo_atendimento, #st_status_faturamento, #st_convenio, #st_nome_profissional, #st_status, #st_nome_unidade, #st_nome_profissional { width: 200px; word-wrap: normal !important; white-space: normal !important; }\n    #dt_atendimento_unidade { width: 100px; text-align: center }\n    "},scopedSlots:e._u([{key:"body",fn:function(){return[t("table",{staticClass:"q-pb-md q-table q-tabs--dense"},[t("thead",[t("tr",e._l(e.bl_sintetico?e.columns.filter((t=>t.name==e.opcoesRelatorio.agrupamento)):e.columns,(function(a){return t("td",{key:a.name},[e._v("\n              "+e._s(a.label)+"\n            ")])})),0)]),t("tbody",[e.bl_sintetico?e._e():e._l(e.dadosResumo,(function(a){return t("tr",{key:a.number},e._l(e.columns,(function(o){return t("td",{key:o.name+"-"+a.id,class:o.class,style:o.style},[e._v("\n                "+e._s(void 0!==o.format?o.format(a[o.field],a):a[o.field])+"\n              ")])})),0)}))],2)])]},proxy:!0}],null,!1,1470921471)})],1):e._e()},n=[],s=a("b166"),i=a("ef06"),r=a("b09f"),l=a("1146"),d=a.n(l),m=a("ab52"),c={name:"RelatorioResumoAtendimentosUsuarios",components:{ccPrintModelLandscape:r["a"]},props:{moduloAtendimento:{type:Boolean,default:!1}},data(){return{userProfile:"user",data:null,bl_sintetico:!1,dadosResumo:[],columns:[{name:"name",label:"Nome",field:"name",align:"left",style:"width: 300px",format:e=>e||"Não Informado"},{name:"email",label:"E-Mail",field:"email",align:"left",style:"width: 300px",format:e=>e||"Não Informado"},{name:"qtd_pendentes",label:"Pendentes",field:"qtd_pendentes",align:"center",style:"width: 300px; text-align: center;"},{name:"qtd_em_atendimento",label:"Em Atendimento",field:"qtd_em_atendimento",align:"center",style:"width: 300px; text-align: center;"},{name:"qtd_resolvidos",label:"Resolvidos",field:"qtd_resolvidos",align:"center",style:"width: 300px; text-align: center;"},{name:"qtd_por_usuario",label:"Total",field:"qtd_por_usuario",align:"center",style:"width: 300px; text-align: center;"},{name:"menor_tempo_por_usuario",label:"Menor Tempo (Min)",field:"menor_tempo_por_usuario",align:"center",style:"width: 300px; text-align: center;",format:e=>this.$formatarValorMoeda(e,0)},{name:"maior_tempo_por_usuario",label:"Maior Tempo (Min)",field:"maior_tempo_por_usuario",align:"center",style:"width: 300px; text-align: center;",format:e=>this.$formatarValorMoeda(e,0)},{name:"tempo_medio_por_usuario",label:"Tempo Médio (Min)",field:"tempo_medio_por_usuario",style:"width: 300px; text-align: center;",align:"left",format:e=>this.$formatarValorMoeda(e,0)}],pesquisa:{startDate:Object(s["a"])(Object(i["a"])(new Date,{days:30}),"yyyy-MM-dd"),endDate:Object(s["a"])(new Date,"yyyy-MM-dd")},ExibirTabela:!0,imprimir:!1}},methods:{sortObject(e){return Object.keys(e).sort().reduce(((t,a)=>(t[a]=e[a],t)),{})},printReport(e){this.imprimir=!this.imprimir},exportTable(){const e=d.a.utils.table_to_sheet(document.getElementById("tableRelatorioResumoAtendimentosUsuarios"),{raw:!0});for(const a in e)"J"==a[0]&&(e[a].t="n",e[a].v=e[a].v.replace(/\./g,"").replace(",","."));const t=d.a.utils.book_new();d.a.utils.book_append_sheet(t,e,"Relatório Atendimentos"),d.a.writeFile(t,"Resumo Atendimentos.xlsx")},async gerarRelatorio(){const{data:e}=await Object(m["i"])(this.pesquisa);this.dadosResumo=e}},async mounted(){this.userProfile=localStorage.getItem("profile"),this.gerarRelatorio()}},u=c,p=(a("94b0"),a("2877")),b=a("f09f"),_=a("a370"),f=a("9c40"),g=a("2bb1"),q=a("eaac"),x=a("429b"),y=a("eebe"),h=a.n(y),R=Object(p["a"])(u,o,n,!1,null,"a2409c76",null);t["default"]=R.exports;h()(R,"components",{QCard:b["a"],QCardSection:_["a"],QBtn:f["a"],QMarkupTable:g["a"],QTable:q["a"],QTabs:x["a"]})},5605:function(e,t,a){},"94b0":function(e,t,a){"use strict";a("5605")}}]);
var D=Object.defineProperty,L=Object.defineProperties;var Q=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var p=(e,a,o)=>a in e?D(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o,h=(e,a)=>{for(var o in a||(a={}))E.call(a,o)&&p(e,o,a[o]);if(x)for(var o of x(a))$.call(a,o)&&p(e,o,a[o]);return e},_=(e,a)=>L(e,Q(a));import{h as j,E as O,b1 as P,G as F,b2 as K,i,aa as U,b0 as A,v as G,j as c,ay as f,b3 as J,J as T,u as H,a as W,p as X,m as C,o as Y,aq as Z,aw as g,ax as k,au as ee,ar as I,az as B,aE as te,aF as ae,aI as oe,as as ne}from"./vendor.e1205cde.20220705_155143.js";import{s as m,g as le}from"./index.234cda40.20220705_155143.js";import{_ as ie}from"./plugin-vue_export-helper.c05e49c3.20220705_155143.js";const ce={xs:8,sm:10,md:14,lg:20,xl:24};var se=j({name:"QChip",props:_(h(h({},O),P),{dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}}),emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:a,emit:o}){const{proxy:{$q:l}}=G(),s=F(e,l),r=K(e,ce),u=i(()=>e.selected===!0||e.icon!==void 0),v=i(()=>e.selected===!0?e.iconSelected||l.iconSet.chip.selected:e.icon),b=i(()=>e.iconRemove||l.iconSet.chip.remove),n=i(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),d=i(()=>{const t=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(t?` text-${t} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(n.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(s.value===!0?" q-chip--dark q-dark":"")}),y=i(()=>e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0});function M(t){t.keyCode===13&&S(t)}function S(t){e.disable||(o("update:selected",!e.selected),o("click",t))}function q(t){(t.keyCode===void 0||t.keyCode===13)&&(T(t),e.disable===!1&&(o("update:modelValue",!1),o("remove")))}function z(){const t=[];n.value===!0&&t.push(c("div",{class:"q-focus-helper"})),u.value===!0&&t.push(c(f,{class:"q-chip__icon q-chip__icon--left",name:v.value}));const V=e.label!==void 0?[c("div",{class:"ellipsis"},[e.label])]:void 0;return t.push(c("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},J(a.default,V))),e.iconRight&&t.push(c(f,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&t.push(c(f,_(h({class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:b.value},y.value),{onClick:q,onKeyup:q}))),t}return()=>{if(e.modelValue===!1)return;const t={class:d.value,style:r.value};return n.value===!0&&Object.assign(t,y.value,{onClick:S,onKeyup:M}),U("div",t,z(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[A,e.ripple]])}}});const w=["\u5FEB\u4E50\u7684","\u51B7\u9759\u7684","\u9189\u718F\u7684","\u6F47\u6D12\u7684","\u7CCA\u6D82\u7684","\u79EF\u6781\u7684","\u51B7\u9177\u7684","\u6DF1\u60C5\u7684","\u7C97\u66B4\u7684","\u6E29\u67D4\u7684","\u53EF\u7231\u7684","\u6109\u5FEB\u7684","\u4E49\u6C14\u7684","\u8BA4\u771F\u7684","\u5A01\u6B66\u7684","\u5E05\u6C14\u7684","\u4F20\u7EDF\u7684","\u6F47\u6D12\u7684","\u6F02\u4EAE\u7684","\u81EA\u7136\u7684","\u4E13\u4E00\u7684","\u542C\u8BDD\u7684","\u660F\u7761\u7684","\u72C2\u91CE\u7684","\u7B49\u5F85\u7684","\u641E\u602A\u7684","\u5E7D\u9ED8\u7684","\u9B41\u68A7\u7684","\u6D3B\u6CFC\u7684","\u5F00\u5FC3\u7684","\u9AD8\u5174\u7684","\u8D85\u5E05\u7684","\u7559\u80E1\u5B50\u7684","\u5766\u7387\u7684","\u76F4\u7387\u7684","\u8F7B\u677E\u7684","\u75F4\u60C5\u7684","\u5B8C\u7F8E\u7684","\u7CBE\u660E\u7684","\u65E0\u804A\u7684","\u6709\u9B45\u529B\u7684","\u4E30\u5BCC\u7684","\u7E41\u8363\u7684","\u9971\u6EE1\u7684","\u7099\u70ED\u7684","\u66B4\u8E81\u7684","\u78A7\u84DD\u7684","\u4FCA\u9038\u7684","\u82F1\u52C7\u7684","\u5065\u5FD8\u7684","\u6545\u610F\u7684","\u65E0\u5FC3\u7684","\u571F\u8C6A\u7684","\u6734\u5B9E\u7684","\u5174\u594B\u7684","\u5E78\u798F\u7684","\u6DE1\u5B9A\u7684","\u4E0D\u5B89\u7684","\u9614\u8FBE\u7684","\u5B64\u72EC\u7684","\u72EC\u7279\u7684","\u75AF\u72C2\u7684","\u65F6\u5C1A\u7684","\u843D\u540E\u7684","\u98CE\u8DA3\u7684","\u5FE7\u4F24\u7684","\u5927\u80C6\u7684","\u7231\u7B11\u7684","\u77EE\u5C0F\u7684","\u5065\u5EB7\u7684","\u5408\u9002\u7684","\u73A9\u547D\u7684","\u6C89\u9ED8\u7684","\u65AF\u6587\u7684","\u4EFB\u6027\u7684","\u7EC6\u5FC3\u7684","\u7C97\u5FC3\u7684","\u5927\u610F\u7684","\u751C\u751C\u7684","\u9177\u9177\u7684","\u5065\u58EE\u7684","\u82F1\u4FCA\u7684","\u9738\u6C14\u7684","\u9633\u5149\u7684","\u9ED8\u9ED8\u7684","\u5927\u529B\u7684","\u5B5D\u987A\u7684","\u5FE7\u8651\u7684","\u7740\u6025\u7684","\u7D27\u5F20\u7684","\u5584\u826F\u7684","\u51F6\u72E0\u7684","\u5BB3\u6015\u7684","\u91CD\u8981\u7684","\u5371\u673A\u7684","\u6B22\u559C\u7684","\u6B23\u6170\u7684","\u6EE1\u610F\u7684","\u8DF3\u8DC3\u7684","\u8BDA\u5FC3\u7684","\u79F0\u5FC3\u7684","\u5982\u610F\u7684","\u6021\u7136\u7684","\u5A07\u6C14\u7684","\u65E0\u5948\u7684","\u65E0\u8BED\u7684","\u6FC0\u52A8\u7684","\u6124\u6012\u7684","\u7F8E\u597D\u7684","\u611F\u52A8\u7684","\u6FC0\u60C5\u7684","\u6FC0\u6602\u7684","\u9707\u52A8\u7684","\u865A\u62DF\u7684","\u8D85\u7EA7\u7684","\u5BD2\u51B7\u7684","\u7CBE\u660E\u7684","\u660E\u7406\u7684","\u72B9\u8C6B\u7684","\u5FE7\u90C1\u7684","\u5BC2\u5BDE\u7684","\u594B\u6597\u7684","\u52E4\u594B\u7684","\u73B0\u4EE3\u7684","\u8FC7\u65F6\u7684","\u7A33\u91CD\u7684","\u70ED\u60C5\u7684","\u542B\u84C4\u7684","\u5F00\u653E\u7684","\u65E0\u8F9C\u7684","\u591A\u60C5\u7684","\u7EAF\u771F\u7684","\u62C9\u957F\u7684","\u70ED\u5FC3\u7684","\u4ECE\u5BB9\u7684","\u4F53\u8D34\u7684","\u98CE\u4E2D\u7684","\u66FE\u7ECF\u7684","\u8FFD\u5BFB\u7684","\u5112\u96C5\u7684","\u4F18\u96C5\u7684","\u5F00\u6717\u7684","\u5916\u5411\u7684","\u5185\u5411\u7684","\u6E05\u723D\u7684","\u6587\u827A\u7684","\u957F\u60C5\u7684","\u5E73\u5E38\u7684","\u5355\u8EAB\u7684","\u4F36\u4FD0\u7684","\u9AD8\u5927\u7684","\u61E6\u5F31\u7684","\u67D4\u5F31\u7684","\u7231\u7B11\u7684","\u4E50\u89C2\u7684","\u800D\u9177\u7684","\u9177\u70AB\u7684","\u795E\u52C7\u7684","\u5E74\u8F7B\u7684","\u5520\u53E8\u7684","\u7626\u7626\u7684","\u65E0\u60C5\u7684","\u5305\u5BB9\u7684","\u987A\u5FC3\u7684","\u7545\u5FEB\u7684","\u8212\u9002\u7684","\u9753\u4E3D\u7684","\u8D1F\u8D23\u7684","\u80CC\u540E\u7684","\u7B80\u5355\u7684","\u8C26\u8BA9\u7684","\u5F69\u8272\u7684","\u7F25\u7F08\u7684","\u6B22\u547C\u7684","\u751F\u52A8\u7684","\u590D\u6742\u7684","\u6148\u7965\u7684","\u4EC1\u7231\u7684","\u9B54\u5E7B\u7684","\u865A\u5E7B\u7684","\u6DE1\u7136\u7684","\u53D7\u4F24\u7684","\u96EA\u767D\u7684","\u9AD8\u9AD8\u7684","\u7CDF\u7CD5\u7684","\u987A\u5229\u7684","\u95EA\u95EA\u7684","\u7F9E\u6DA9\u7684","\u7F13\u6162\u7684","\u8FC5\u901F\u7684","\u4F18\u79C0\u7684","\u806A\u660E\u7684","\u542B\u7CCA\u7684","\u4FCF\u76AE\u7684","\u6DE1\u6DE1\u7684","\u575A\u5F3A\u7684","\u5E73\u6DE1\u7684","\u6B23\u559C\u7684","\u80FD\u5E72\u7684","\u7075\u5DE7\u7684","\u53CB\u597D\u7684","\u673A\u667A\u7684","\u673A\u7075\u7684","\u6B63\u76F4\u7684","\u8C28\u614E\u7684","\u4FED\u6734\u7684","\u6BB7\u52E4\u7684","\u865A\u5FC3\u7684","\u8F9B\u52E4\u7684","\u81EA\u89C9\u7684","\u65E0\u79C1\u7684","\u65E0\u9650\u7684","\u8E0F\u5B9E\u7684","\u8001\u5B9E\u7684","\u73B0\u5B9E\u7684","\u53EF\u9760\u7684","\u52A1\u5B9E\u7684","\u62FC\u640F\u7684","\u4E2A\u6027\u7684","\u7C97\u72B7\u7684","\u6D3B\u529B\u7684","\u6210\u5C31\u7684","\u52E4\u52B3\u7684","\u5355\u7EAF\u7684","\u843D\u5BDE\u7684","\u6734\u7D20\u7684","\u60B2\u51C9\u7684","\u5FE7\u5FC3\u7684","\u6D01\u51C0\u7684","\u6E05\u79C0\u7684","\u81EA\u7531\u7684","\u5C0F\u5DE7\u7684","\u5355\u8584\u7684","\u8D2A\u73A9\u7684","\u523B\u82E6\u7684","\u5E72\u51C0\u7684","\u58EE\u89C2\u7684","\u548C\u8C10\u7684","\u6587\u9759\u7684","\u8C03\u76AE\u7684","\u5BB3\u7F9E\u7684","\u5B89\u8BE6\u7684","\u81EA\u4FE1\u7684","\u7AEF\u5E84\u7684","\u575A\u5B9A\u7684","\u7F8E\u6EE1\u7684","\u8212\u5FC3\u7684","\u6E29\u6696\u7684","\u4E13\u6CE8\u7684","\u52E4\u6073\u7684","\u7F8E\u4E3D\u7684","\u817C\u8146\u7684","\u4F18\u7F8E\u7684","\u751C\u7F8E\u7684","\u751C\u871C\u7684","\u6574\u9F50\u7684","\u52A8\u4EBA\u7684","\u5178\u96C5\u7684","\u5C0A\u656C\u7684","\u8212\u670D\u7684","\u59A9\u5A9A\u7684","\u79C0\u4E3D\u7684","\u559C\u60A6\u7684","\u751C\u7F8E\u7684","\u5F6A\u58EE\u7684","\u5F3A\u5065\u7684","\u5927\u65B9\u7684","\u4FCA\u79C0\u7684","\u806A\u6167\u7684","\u8FF7\u4EBA\u7684","\u9676\u9189\u7684","\u60A6\u8033\u7684","\u52A8\u542C\u7684","\u660E\u4EAE\u7684","\u7ED3\u5B9E\u7684","\u9B41\u68A7\u7684","\u6807\u81F4\u7684","\u6E05\u8106\u7684","\u654F\u611F\u7684","\u5149\u4EAE\u7684","\u5927\u6C14\u7684","\u8001\u8FDF\u5230\u7684","\u77E5\u6027\u7684","\u51B7\u50B2\u7684","\u5446\u840C\u7684","\u91CE\u6027\u7684","\u9690\u5F62\u7684","\u7B11\u70B9\u4F4E\u7684","\u5FAE\u7B11\u7684","\u7B28\u7B28\u7684","\u96BE\u8FC7\u7684","\u6C89\u9759\u7684","\u706B\u661F\u4E0A\u7684","\u5931\u7720\u7684","\u5B89\u9759\u7684","\u7EAF\u60C5\u7684","\u8981\u51CF\u80A5\u7684","\u8FF7\u8DEF\u7684","\u70C2\u6F2B\u7684","\u54ED\u6CE3\u7684","\u8D24\u60E0\u7684","\u82D7\u6761\u7684","\u6E29\u5A49\u7684","\u53D1\u55F2\u7684","\u4F1A\u6492\u5A07\u7684","\u8D2A\u73A9\u7684","\u6267\u7740\u7684","\u772F\u772F\u773C\u7684","\u82B1\u75F4\u7684","\u60F3\u4EBA\u966A\u7684","\u773C\u775B\u5927\u7684","\u9AD8\u8D35\u7684","\u50B2\u5A07\u7684","\u5FC3\u7075\u7F8E\u7684","\u7231\u6492\u5A07\u7684","\u7EC6\u817B\u7684","\u5929\u771F\u7684","\u6015\u9ED1\u7684","\u611F\u6027\u7684","\u98D8\u9038\u7684","\u6015\u5B64\u72EC\u7684","\u5FD0\u5FD1\u7684","\u9AD8\u6311\u7684","\u50BB\u50BB\u7684","\u51B7\u8273\u7684","\u7231\u542C\u6B4C\u7684","\u8FD8\u5355\u8EAB\u7684","\u6015\u5B64\u5355\u7684","\u61F5\u61C2\u7684"],N=["\u5693\u8336","\u51C9\u9762","\u4FBF\u5F53","\u6BDB\u8C46","\u82B1\u751F","\u53EF\u4E50","\u706F\u6CE1","\u54C8\u5BC6\u74DC","\u91CE\u72FC","\u80CC\u5305","\u773C\u795E","\u7F18\u5206","\u96EA\u78A7","\u4EBA\u751F","\u725B\u6392","\u8682\u8681","\u98DE\u9E1F","\u7070\u72FC","\u6591\u9A6C","\u6C49\u5821","\u609F\u7A7A","\u5DE8\u4EBA","\u7EFF\u8336","\u81EA\u884C\u8F66","\u4FDD\u6E29\u676F","\u5927\u7897","\u58A8\u955C","\u9B54\u955C","\u714E\u997C","\u6708\u997C","\u6708\u4EAE","\u661F\u661F","\u829D\u9EBB","\u5564\u9152","\u73AB\u7470","\u5927\u53D4","\u5C0F\u4F19","\u54C8\u5BC6\u74DC","\u6570\u636E\u7EBF","\u592A\u9633","\u6811\u53F6","\u82B9\u83DC","\u9EC4\u8702","\u871C\u7C89","\u871C\u8702","\u4FE1\u5C01","\u897F\u88C5","\u5916\u5957","\u88D9\u5B50","\u5927\u8C61","\u732B\u54AA","\u6BCD\u9E21","\u8DEF\u706F","\u84DD\u5929","\u767D\u4E91","\u661F\u6708","\u5F69\u8679","\u5FAE\u7B11","\u6469\u6258","\u677F\u6817","\u9AD8\u5C71","\u5927\u5730","\u5927\u6811","\u7535\u706F\u80C6","\u7816\u5934","\u697C\u623F","\u6C34\u6C60","\u9E21\u7FC5","\u873B\u8713","\u7EA2\u725B","\u5496\u5561","\u673A\u5668\u732B","\u6795\u5934","\u5927\u8239","\u8BFA\u8A00","\u94A2\u7B14","\u523A\u732C","\u5929\u7A7A","\u98DE\u673A","\u5927\u70AE","\u51AC\u5929","\u6D0B\u8471","\u6625\u5929","\u590F\u5929","\u79CB\u5929","\u51AC\u65E5","\u822A\u7A7A","\u6BDB\u8863","\u8C4C\u8C46","\u9ED1\u7C73","\u7389\u7C73","\u773C\u775B","\u8001\u9F20","\u767D\u7F8A","\u5E05\u54E5","\u7F8E\u5973","\u5B63\u8282","\u9C9C\u82B1","\u670D\u9970","\u88D9\u5B50","\u767D\u5F00\u6C34","\u79C0\u53D1","\u5927\u5C71","\u706B\u8F66","\u6C7D\u8F66","\u6B4C\u66F2","\u821E\u8E48","\u8001\u5E08","\u5BFC\u5E08","\u65B9\u76D2","\u5927\u7C73","\u9EA6\u7247","\u6C34\u676F","\u6C34\u58F6","\u624B\u5957","\u978B\u5B50","\u81EA\u884C\u8F66","\u9F20\u6807","\u624B\u673A","\u7535\u8111","\u4E66\u672C","\u5947\u8FF9","\u8EAB\u5F71","\u9999\u70DF","\u5915\u9633","\u53F0\u706F","\u5B9D\u8D1D","\u672A\u6765","\u76AE\u5E26","\u94A5\u5319","\u5FC3\u9501","\u6545\u4E8B","\u82B1\u74E3","\u6ED1\u677F","\u753B\u7B14","\u753B\u677F","\u5B66\u59D0","\u5E97\u5458","\u7535\u6E90","\u997C\u5E72","\u5B9D\u9A6C","\u8FC7\u5BA2","\u5927\u767D","\u65F6\u5149","\u77F3\u5934","\u94BB\u77F3","\u6CB3\u9A6C","\u7280\u725B","\u897F\u725B","\u7EFF\u8349","\u62BD\u5C49","\u67DC\u5B50","\u5F80\u4E8B","\u5BD2\u98CE","\u8DEF\u4EBA","\u6A58\u5B50","\u8033\u673A","\u9E35\u9E1F","\u670B\u53CB","\u82D7\u6761","\u94C5\u7B14","\u94A2\u7B14","\u786C\u5E01","\u70ED\u72D7","\u5927\u4FA0","\u5FA1\u59D0","\u841D\u8389","\u6BDB\u5DFE","\u671F\u5F85","\u76FC\u671B","\u767D\u663C","\u9ED1\u591C","\u5927\u95E8","\u9ED1\u88E4","\u94A2\u94C1\u4FA0","\u54D1\u94C3","\u677F\u51F3","\u67AB\u53F6","\u8377\u82B1","\u4E4C\u9F9F","\u4ED9\u4EBA\u638C","\u886C\u886B","\u5927\u795E","\u8349\u4E1B","\u65E9\u6668","\u5FC3\u60C5","\u8309\u8389","\u6D41\u6C99","\u8717\u725B","\u6218\u6597\u673A","\u51A5\u738B\u661F","\u730E\u8C79","\u68D2\u7403","\u7BEE\u7403","\u4E50\u66F2","\u7535\u8BDD","\u7F51\u7EDC","\u4E16\u754C","\u4E2D\u5FC3","\u9C7C","\u9E21","\u72D7","\u8001\u864E","\u9E2D\u5B50","\u96E8","\u7FBD\u6BDB","\u7FC5\u8180","\u5916\u5957","\u706B","\u4E1D\u889C","\u4E66\u5305","\u94A2\u7B14","\u51B7\u98CE","\u516B\u5B9D\u7CA5","\u70E4\u9E21","\u5927\u96C1","\u97F3\u54CD","\u62DB\u724C","\u80E1\u841D\u535C","\u51B0\u68CD","\u5E3D\u5B50","\u83E0\u841D","\u86CB\u631E","\u9999\u6C34","\u6CE5\u7334\u6843","\u5410\u53F8","\u6EAA\u6D41","\u9EC4\u8C46","\u6A31\u6843","\u5C0F\u9E3D\u5B50","\u5C0F\u8774\u8776","\u7206\u7C73\u82B1","\u82B1\u5377","\u5C0F\u9E2D\u5B50","\u5C0F\u6D77\u8C5A","\u65E5\u8BB0\u672C","\u5C0F\u718A\u732B","\u5C0F\u61D2\u732A","\u5C0F\u61D2\u866B","\u8354\u679D","\u955C\u5B50","\u66F2\u5947","\u91D1\u9488\u83C7","\u5C0F\u677E\u9F20","\u5C0F\u867E\u7C73","\u9152\u7A9D","\u7D2B\u83DC","\u91D1\u9C7C","\u67DA\u5B50","\u679C\u6C41","\u767E\u8936\u88D9","\u9879\u94FE","\u5E06\u5E03\u978B","\u706B\u9F99\u679C","\u5947\u5F02\u679C","\u714E\u86CB","\u5507\u5F69","\u5C0F\u571F\u8C46","\u9AD8\u8DDF\u978B","\u6212\u6307","\u96EA\u7CD5","\u776B\u6BDB","\u94C3\u94DB","\u624B\u94FE","\u9999\u6C1B","\u7EA2\u9152","\u6708\u5149","\u9178\u5976","\u94F6\u8033\u6C64","\u5496\u5561\u8C46","\u5C0F\u871C\u8702","\u5C0F\u8682\u8681","\u8721\u70DB","\u68C9\u82B1\u7CD6","\u5411\u65E5\u8475","\u6C34\u871C\u6843","\u5C0F\u8774\u8776","\u5C0F\u523A\u732C","\u5C0F\u4E38\u5B50","\u6307\u7532\u6CB9","\u5EB7\u4E43\u99A8","\u7CD6\u8C46","\u85AF\u7247","\u53E3\u7EA2","\u8D85\u77ED\u88D9","\u4E4C\u51AC\u9762","\u51B0\u6DC7\u6DCB","\u68D2\u68D2\u7CD6","\u957F\u9888\u9E7F","\u8C46\u82BD","\u53D1\u7B8D","\u53D1\u5361","\u53D1\u5939","\u53D1\u5E26","\u94C3\u94DB","\u5C0F\u9992\u5934","\u5C0F\u7B3C\u5305","\u5C0F\u751C\u74DC","\u51AC\u74DC","\u9999\u83C7","\u5C0F\u5154\u5B50","\u542B\u7F9E\u8349","\u77ED\u9774","\u776B\u6BDB\u818F","\u5C0F\u8611\u83C7","\u8DF3\u8DF3\u7CD6","\u5C0F\u767D\u83DC","\u8349\u8393","\u67E0\u6AAC","\u6708\u997C","\u767E\u5408","\u7EB8\u9E64","\u5C0F\u5929\u9E45","\u4E91\u6735","\u8292\u679C","\u9762\u5305","\u6D77\u71D5","\u5C0F\u732B\u54AA","\u9F99\u732B","\u5507\u818F","\u978B\u57AB","\u7F8A","\u9ED1\u732B","\u767D\u732B","\u4E07\u5B9D\u8DEF","\u91D1\u6BDB","\u5C71\u6C34","\u97F3\u54CD"],re=w.length,ue=N.length,de=()=>{const e=Math.floor(Math.random()*re),a=Math.floor(Math.random()*ue);return w[e]+N[a]};const R=e=>(te("data-v-6e769a7a"),e=e(),ae(),e),he={class:"bee-chat-login"},me=R(()=>g("h4",null,"bee-chat",-1)),ge=R(()=>g("h5",null,"\u5F7C\u804A\xB7\u533F\u540D\u804A\u5929\u5BA4",-1)),ve={class:"nick-name"},be={style:{"text-align":"right","margin-top":"3em"}},_e={setup(e){const a=H(),o=W();X(()=>{m.disconnected&&m.connect()});let l=C(""),s=C("primary");const r=["primary","secondary","accent","dark","positive","negative","info","warning","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","amber","orange","deep-orange","brown","blue-grey"],u=()=>{const n=Math.floor(Math.random()*r.length);s.value=r[n],l.value=de()};u();const v=le(),b=()=>{const n={nickName:l.value,color:s.value};m.emit("checkName",l.value,d=>{d?o.notify({type:"warning",message:"\u624B\u6162\u4E86\uFF0C\u6362\u4E00\u4E2A\u5427"}):(localStorage.setItem("USER_INFO",n),m.emit("login",n,()=>{v.userInfo=n,a.replace("/")}))})};return(n,d)=>(Y(),Z("div",he,[me,ge,g("div",ve,[k(se,{size:"18px",color:I(s),"text-color":"white"},{default:ee(()=>[oe(" \u6635\u79F0\uFF1A"+ne(I(l)),1)]),_:1},8,["color"]),k(B,{icon:"refresh",color:"primary",outline:"",rounded:"",label:"\u6362\u4E00\u4E2A",onClick:u,stlye:"float:right;"})]),g("div",be,[k(B,{"icon-right":"send",color:"primary",size:"lg",class:"full-width",label:"\u5F00\u59CB\u804A\u5929",onClick:b})])]))}};var qe=ie(_e,[["__scopeId","data-v-6e769a7a"]]);export{qe as default};
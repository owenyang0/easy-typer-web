"use strict";(self.webpackChunkeasy_typer_web=self.webpackChunkeasy_typer_web||[]).push([[540],{5274:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(7294),o=n(412),a=n(6700),c=(0,a.WA)("theme"),i="light",l="dark",u=function(e){return e===l?l:i},s=function(e){(0,a.WA)("theme").set(u(e))},d=function(){var e=(0,a.LU)().colorMode,t=e.defaultMode,n=e.disableSwitch,d=e.respectPrefersColorScheme,f=(0,r.useState)(function(e){return o.Z.canUseDOM?u(document.documentElement.getAttribute("data-theme")):u(e)}(t)),m=f[0],v=f[1],h=(0,r.useCallback)((function(){v(i),s(i)}),[]),p=(0,r.useCallback)((function(){v(l),s(l)}),[]);return(0,r.useEffect)((function(){document.documentElement.setAttribute("data-theme",u(m))}),[m]),(0,r.useEffect)((function(){if(!n)try{var e=c.get();null!==e&&v(u(e))}catch(t){console.error(t)}}),[v]),(0,r.useEffect)((function(){n&&!d||window.matchMedia("(prefers-color-scheme: dark)").addListener((function(e){var t=e.matches;v(t?l:i)}))}),[]),{isDarkTheme:m===l,setLightTheme:h,setDarkTheme:p}},f=n(2924);var m=function(e){var t=d(),n=t.isDarkTheme,o=t.setLightTheme,a=t.setDarkTheme;return r.createElement(f.Z.Provider,{value:{isDarkTheme:n,setLightTheme:o,setDarkTheme:a}},e.children)};function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var p="docusaurus.tab.",b=function(){var e=(0,r.useState)({}),t=e[0],n=e[1],o=(0,r.useCallback)((function(e,t){(0,a.WA)(""+p+e).set(t)}),[]);return(0,r.useEffect)((function(){try{for(var e,t={},r=h((0,a._f)());!(e=r()).done;){var o=e.value;if(o.startsWith(p))t[o.substring(p.length)]=(0,a.WA)(o).get()}n(t)}catch(c){console.error(c)}}),[]),{tabGroupChoices:t,setTabGroupChoices:function(e,t){n((function(n){var r;return Object.assign({},n,((r={})[e]=t,r))})),o(e,t)}}},g=(0,a.WA)("docusaurus.announcement.dismiss"),E=(0,a.WA)("docusaurus.announcement.id"),w=function(){var e=(0,a.LU)().announcementBar,t=(0,r.useState)(!0),n=t[0],o=t[1],c=(0,r.useCallback)((function(){g.set("true"),o(!0)}),[]);return(0,r.useEffect)((function(){if(e){var t=e.id,n=E.get();"annoucement-bar"===n&&(n="announcement-bar");var r=t!==n;E.set(t),r&&g.set("false"),(r||"false"===g.get())&&o(!1)}}),[]),{isAnnouncementBarClosed:n,closeAnnouncementBar:c}},Z=n(9443);var k=function(e){var t=b(),n=t.tabGroupChoices,o=t.setTabGroupChoices,a=w(),c=a.isAnnouncementBarClosed,i=a.closeAnnouncementBar;return r.createElement(Z.Z.Provider,{value:{tabGroupChoices:n,setTabGroupChoices:o,isAnnouncementBarClosed:c,closeAnnouncementBar:i}},e.children)};function y(e){var t=e.children;return r.createElement(m,null,r.createElement(k,null,r.createElement(a.L5,null,t)))}},5525:function(e,t,n){var r=n(7462),o=n(3366),a=n(7294),c=n(4334),i=n(6742),l=n(4996),u=n(6550),s=n(6700),d=["activeBasePath","activeBaseRegex","to","href","label","activeClassName","prependBaseUrlToHref"],f=["items","position","className"],m=["className"],v=["items","className","position"],h=["className"],p=["mobile"];function b(e){var t=e.activeBasePath,n=e.activeBaseRegex,c=e.to,u=e.href,s=e.label,f=e.activeClassName,m=void 0===f?"navbar__link--active":f,v=e.prependBaseUrlToHref,h=(0,o.Z)(e,d),p=(0,l.Z)(c),b=(0,l.Z)(t),g=(0,l.Z)(u,{forcePrependBaseUrl:!0});return a.createElement(i.Z,(0,r.Z)({},u?{href:v?g:u}:Object.assign({isNavLink:!0,activeClassName:m,to:p},t||n?{isActive:function(e,t){return n?new RegExp(n).test(t.pathname):t.pathname.startsWith(b)}}:null),h),s)}function g(e){var t,n=e.items,i=e.position,l=e.className,u=(0,o.Z)(e,f),s=(0,a.useRef)(null),d=(0,a.useRef)(null),v=(0,a.useState)(!1),h=v[0],p=v[1];(0,a.useEffect)((function(){var e=function(e){s.current&&!s.current.contains(e.target)&&p(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),function(){document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[s]);var g=function(e,t){return void 0===t&&(t=!1),(0,c.Z)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return n?a.createElement("div",{ref:s,className:(0,c.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===i,"dropdown--right":"right"===i,"dropdown--show":h})},a.createElement(b,(0,r.Z)({className:g(l)},u,{onClick:u.to?void 0:function(e){return e.preventDefault()},onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),p(!h))}}),null!=(t=u.children)?t:u.label),a.createElement("ul",{ref:d,className:"dropdown__menu"},n.map((function(e,t){var c=e.className,i=(0,o.Z)(e,m);return a.createElement("li",{key:t},a.createElement(b,(0,r.Z)({onKeyDown:function(e){if(t===n.length-1&&"Tab"===e.key){e.preventDefault(),p(!1);var r=s.current.nextElementSibling;r&&r.focus()}},activeClassName:"dropdown__link--active",className:g(c,!0)},i)))})))):a.createElement(b,(0,r.Z)({className:g(l)},u))}function E(e){var t,n,i,l=e.items,d=e.className,f=(e.position,(0,o.Z)(e,v)),m=(0,a.useRef)(null),p=(0,u.TH)().pathname,g=(0,a.useState)((function(){var e;return null==(e=!(null!=l&&l.some((function(e){return(0,s.Mg)(e.to,p)}))))||e})),E=g[0],w=g[1],Z=function(e,t){return void 0===t&&(t=!1),(0,c.Z)("menu__link",{"menu__link--sublist":t},e)};if(!l)return a.createElement("li",{className:"menu__list-item"},a.createElement(b,(0,r.Z)({className:Z(d)},f)));var k=null!=(t=m.current)&&t.scrollHeight?(null==(n=m.current)?void 0:n.scrollHeight)+"px":void 0;return a.createElement("li",{className:(0,c.Z)("menu__list-item",{"menu__list-item--collapsed":E})},a.createElement(b,(0,r.Z)({role:"button",className:Z(d,!0)},f,{onClick:function(e){e.preventDefault(),w((function(e){return!e}))}}),null!=(i=f.children)?i:f.label),a.createElement("ul",{className:"menu__list",ref:m,style:{height:E?void 0:k}},l.map((function(e,t){var n=e.className,c=(0,o.Z)(e,h);return a.createElement("li",{className:"menu__list-item",key:t},a.createElement(b,(0,r.Z)({activeClassName:"menu__link--active",className:Z(n)},c,{onClick:f.onClick})))}))))}t.Z=function(e){var t=e.mobile,n=void 0!==t&&t,r=(0,o.Z)(e,p),c=n?E:g;return a.createElement(c,r)}},6400:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7462),o=n(3366),a=n(7294),c=n(5525),i=n(907),l=n(4334),u=n(6700),s=["docId","activeSidebarClassName","label","docsPluginId"];function d(e){var t,n,d=e.docId,f=e.activeSidebarClassName,m=e.label,v=e.docsPluginId,h=(0,o.Z)(e,s),p=(0,i.useActiveDocContext)(v),b=p.activeVersion,g=p.activeDoc,E=(0,u.J)(v).preferredVersion,w=(0,i.useLatestVersion)(v),Z=null!=(t=null!=b?b:E)?t:w,k=Z.docs.find((function(e){return e.id===d}));if(!k){var y=Z.docs.map((function(e){return e.id})).join("\n- ");throw new Error("DocNavbarItem: couldn't find any doc with id="+d+" in version "+Z.name+".\nAvailable docIds=\n- "+y)}return a.createElement(c.Z,(0,r.Z)({exact:!0},h,{className:(0,l.Z)(h.className,(n={},n[f]=g&&g.sidebar===k.sidebar,n)),label:null!=m?m:k.id,to:k.path}))}},9308:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7462),o=n(3366),a=n(7294),c=n(5525),i=n(907),l=n(6700),u=["mobile","docsPluginId","dropdownActiveClassDisabled","dropdownItemsBefore","dropdownItemsAfter"],s=function(e){return e.docs.find((function(t){return t.id===e.mainDocId}))};function d(e){var t,n,d=e.mobile,f=e.docsPluginId,m=e.dropdownActiveClassDisabled,v=e.dropdownItemsBefore,h=e.dropdownItemsAfter,p=(0,o.Z)(e,u),b=(0,i.useActiveDocContext)(f),g=(0,i.useVersions)(f),E=(0,i.useLatestVersion)(f),w=(0,l.J)(f),Z=w.preferredVersion,k=w.savePreferredVersionName;var y=null!=(t=null!=(n=b.activeVersion)?n:Z)?t:E,C=d?"Versions":y.label,N=d?void 0:s(y).path;return a.createElement(c.Z,(0,r.Z)({},p,{mobile:d,label:C,to:N,items:function(){var e=g.map((function(e){var t=(null==b?void 0:b.alternateDocVersions[e.name])||s(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:function(){return e===(null==b?void 0:b.activeVersion)},onClick:function(){k(e.name)}}})),t=[].concat(v,e,h);if(!(t.length<=1))return t}(),isActive:m?function(){return!1}:void 0}))}},7250:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7462),o=n(3366),a=n(7294),c=n(5525),i=n(907),l=n(6700),u=["label","to","docsPluginId"],s=function(e){return e.docs.find((function(t){return t.id===e.mainDocId}))};function d(e){var t,n=e.label,d=e.to,f=e.docsPluginId,m=(0,o.Z)(e,u),v=(0,i.useActiveVersion)(f),h=(0,l.J)(f).preferredVersion,p=(0,i.useLatestVersion)(f),b=null!=(t=null!=v?v:h)?t:p,g=null!=n?n:b.label,E=null!=d?d:s(b).path;return a.createElement(c.Z,(0,r.Z)({},m,{label:g,to:E}))}},8423:function(e,t,n){n.d(t,{Z:function(){return E}});var r=n(3366),o=n(7294),a=n(5525),c=n(7462),i=["width","height"],l=function(e){var t=e.width,n=void 0===t?20:t,a=e.height,l=void 0===a?20:a,u=(0,r.Z)(e,i);return o.createElement("svg",(0,c.Z)({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",width:n,height:l},u),o.createElement("path",{fill:"currentColor",d:"M19.753 10.909c-.624-1.707-2.366-2.726-4.661-2.726-.09 0-.176.002-.262.006l-.016-2.063 3.525-.607c.115-.019.133-.119.109-.231-.023-.111-.167-.883-.188-.976-.027-.131-.102-.127-.207-.109-.104.018-3.25.461-3.25.461l-.013-2.078c-.001-.125-.069-.158-.194-.156l-1.025.016c-.105.002-.164.049-.162.148l.033 2.307s-3.061.527-3.144.543c-.084.014-.17.053-.151.143.019.09.19 1.094.208 1.172.018.08.072.129.188.107l2.924-.504.035 2.018c-1.077.281-1.801.824-2.256 1.303-.768.807-1.207 1.887-1.207 2.963 0 1.586.971 2.529 2.328 2.695 3.162.387 5.119-3.06 5.769-4.715 1.097 1.506.256 4.354-2.094 5.98-.043.029-.098.129-.033.207l.619.756c.08.096.206.059.256.023 2.51-1.73 3.661-4.515 2.869-6.683zm-7.386 3.188c-.966-.121-.944-.914-.944-1.453 0-.773.327-1.58.876-2.156a3.21 3.21 0 011.229-.799l.082 4.277a2.773 2.773 0 01-1.243.131zm2.427-.553l.046-4.109c.084-.004.166-.01.252-.01.773 0 1.494.145 1.885.361.391.217-1.023 2.713-2.183 3.758zm-8.95-7.668a.196.196 0 00-.196-.145h-1.95a.194.194 0 00-.194.144L.008 16.916c-.017.051-.011.076.062.076h1.733c.075 0 .099-.023.114-.072l1.008-3.318h3.496l1.008 3.318c.016.049.039.072.113.072h1.734c.072 0 .078-.025.062-.076-.014-.05-3.083-9.741-3.494-11.04zm-2.618 6.318l1.447-5.25 1.447 5.25H3.226z"}))},u=n(2263),s=n(6700),d=["mobile","dropdownItemsBefore","dropdownItemsAfter"];function f(e){var t=e.mobile,n=e.dropdownItemsBefore,i=e.dropdownItemsAfter,f=(0,r.Z)(e,d),m=(0,u.default)().i18n,v=m.currentLocale,h=m.locales,p=m.localeConfigs,b=(0,s.l5)();function g(e){return p[e].label}var E=h.map((function(e){var t="pathname://"+b.createUrl({locale:e,fullyQualified:!1});return{isNavLink:!0,label:g(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===v?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),w=[].concat(n,E,i),Z=t?"Languages":g(v);return o.createElement(a.Z,(0,c.Z)({},f,{href:"#",mobile:t,label:o.createElement("span",null,o.createElement(l,{style:{verticalAlign:"text-bottom",marginRight:5}}),o.createElement("span",null,Z)),items:w}))}var m=function(){return null},v={searchWrapper:"searchWrapper_f8aU"};function h(e){return e.mobile?null:o.createElement("div",{className:v.searchWrapper},o.createElement(m,null))}var p=["type"],b={default:function(){return a.Z},localeDropdown:function(){return f},search:function(){return h},docsVersion:function(){return n(7250).Z},docsVersionDropdown:function(){return n(9308).Z},doc:function(){return n(6400).Z}},g=function(e){void 0===e&&(e="default");var t=b[e];if(!t)throw new Error("No NavbarItem component found for type="+e+".");return t()};function E(e){var t=e.type,n=(0,r.Z)(e,p),a=g(t);return o.createElement(a,n)}},2924:function(e,t,n){var r=n(7294).createContext(void 0);t.Z=r},9189:function(e,t,n){n.d(t,{Z:function(){return f}});var r=n(7462),o=n(7294),a=n(6700),c=n(2263),i=n(4334),l={toggle:"toggle_iYfV"},u=function(e){var t=e.icon,n=e.style;return o.createElement("span",{className:(0,i.Z)(l.toggle,l.dark),style:n},t)},s=function(e){var t=e.icon,n=e.style;return o.createElement("span",{className:(0,i.Z)(l.toggle,l.light),style:n},t)},d=(0,o.memo)((function(e){var t=e.className,n=e.icons,r=e.checked,a=e.disabled,c=e.onChange,l=(0,o.useState)(r),u=l[0],s=l[1],d=(0,o.useState)(!1),f=d[0],m=d[1],v=(0,o.useRef)(null);return o.createElement("div",{className:(0,i.Z)("react-toggle",t,{"react-toggle--checked":u,"react-toggle--focus":f,"react-toggle--disabled":a}),role:"button",tabIndex:-1,onClick:function(e){var t=v.current;if(t)return e.target!==t?(e.preventDefault(),t.focus(),void t.click()):void s(null==t?void 0:t.checked)}},o.createElement("div",{className:"react-toggle-track"},o.createElement("div",{className:"react-toggle-track-check"},n.checked),o.createElement("div",{className:"react-toggle-track-x"},n.unchecked)),o.createElement("div",{className:"react-toggle-thumb"}),o.createElement("input",{ref:v,checked:u,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:c,onFocus:function(){return m(!0)},onBlur:function(){return m(!1)}}))}));function f(e){var t=(0,a.LU)().colorMode.switchConfig,n=t.darkIcon,i=t.darkIconStyle,l=t.lightIcon,f=t.lightIconStyle,m=(0,c.default)().isClient;return o.createElement(d,(0,r.Z)({disabled:!m,icons:{checked:o.createElement(u,{icon:n,style:i}),unchecked:o.createElement(s,{icon:l,style:f})}},e))}},9443:function(e,t,n){var r=(0,n(7294).createContext)(void 0);t.Z=r},1839:function(e,t,n){var r=n(7294);t.Z=function(e){void 0===e&&(e=!0),(0,r.useEffect)((function(){return document.body.style.overflow=e?"hidden":"visible",function(){document.body.style.overflow="visible"}}),[e])}},5350:function(e,t,n){var r=n(7294),o=n(2924);t.Z=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error("`useThemeContext` is used outside of `Layout` Component. See https://docusaurus.io/docs/api/themes/configuration#usethemecontext.");return e}},944:function(e,t,n){var r=n(7294),o=n(9443);t.Z=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},3783:function(e,t,n){n.d(t,{D:function(){return c}});var r=n(7294),o=n(412),a=996,c={desktop:"desktop",mobile:"mobile"};t.Z=function(){var e=o.Z.canUseDOM;function t(){if(e)return window.innerWidth>a?c.desktop:c.mobile}var n=(0,r.useState)(t),i=n[0],l=n[1];return(0,r.useEffect)((function(){if(e)return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)};function n(){l(t())}}),[]),i}},6010:function(e,t,n){function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:function(){return o}})}}]);
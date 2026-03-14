const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Dashboard-DE-bk_w8.js","assets/react-core-Ch63GkDO.js","assets/vendor-DbUKHOh3.js","assets/useTheme-Cfdpicg9.js","assets/formatters-BJzg5a7H.js","assets/seasonHelpers-BKzrLjON.js","assets/EmptyState-Dgtqthrq.js","assets/charts-vendor-CaCYqJtw.js","assets/ScoresPanel-DNN1onwM.js","assets/SeasonalPanel--dv53B4h.js","assets/CommunityPanel-YkDwGBFQ.js","assets/FranchisePanel-BACRVpni.js"])))=>i.map(i=>d[i]);
import{r as s,j as f,b as C,u as v,d as E,L as P,C as S,S as N,U as L,G as M,e as D,f as I,N as $,h as F,E as T,H as z,i as R,k as _,l as q,m as B,R as G,Q as O}from"./react-core-Ch63GkDO.js";import{K as w,L as V,M as U}from"./vendor-DbUKHOh3.js";(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&r(e)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const Y="modulepreload",W=function(x){return"/malmetrics/"+x},A={},g=function(p,o,r){let t=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),a=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));t=Promise.allSettled(o.map(l=>{if(l=W(l),l in A)return;A[l]=!0;const m=l.endsWith(".css"),h=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=m?"stylesheet":Y,m||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),m)return new Promise((i,c)=>{d.addEventListener("load",i),d.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(e){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=e,window.dispatchEvent(a),!a.defaultPrevented)throw e}return t.then(e=>{for(const a of e||[])a.status==="rejected"&&n(a.reason);return p().catch(n)})},u=297,H=1.8,Z=.06,Q=({onClick:x,isRefreshing:p,text:o})=>{const r=s.useRef(u),t=s.useRef(!1),n=s.useRef(p),e=s.useRef(null),a=s.useRef([]);s.useEffect(()=>{n.current=p},[p]);const l=i=>{a.current.forEach(c=>{c&&(c.style.transform=`translate(-50%, -50%) rotate(${i}deg)`)})},m=()=>{if(t.current||n.current)r.current+=H,l(r.current),e.current=requestAnimationFrame(m);else{let i=r.current%360;i<0&&(i+=360);let c=u-i;if(c>180&&(c-=360),c<-180&&(c+=360),Math.abs(c)<.5){r.current=u,l(u);return}r.current=i+c*Z,l(r.current),e.current=requestAnimationFrame(m)}},h=()=>{t.current=!0,e.current&&cancelAnimationFrame(e.current),e.current=requestAnimationFrame(m)},d=()=>{t.current=!1,e.current&&cancelAnimationFrame(e.current),e.current=requestAnimationFrame(m)};return s.useEffect(()=>(l(u),()=>{e.current&&cancelAnimationFrame(e.current)}),[]),s.useEffect(()=>{e.current&&cancelAnimationFrame(e.current),e.current=requestAnimationFrame(m)},[p]),f.jsxs("div",{className:"flex w-full items-center justify-center relative",children:[f.jsx("style",{children:`
        .btn-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          cursor: pointer;
        }
        .btn-layer {
          position: absolute;
          border-radius: 12px;
          overflow: hidden;
        }
        .btn-glow {
          inset: -6px;
          border-radius: 16px;
          filter: blur(18px);
          opacity: 0.45;
          z-index: 0;
        }
        .btn-dark {
          inset: 0;
          z-index: 1;
        }
        .btn-white {
          inset: 2px;
          border-radius: 10px;
          filter: blur(2px);
          z-index: 2;
        }
        .btn-inner {
          position: absolute;
          inset: 3px;
          border-radius: 9px;
          background: linear-gradient(90deg, #5b3fcf 0%, #3ec6c6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          z-index: 3;
          transition: filter 0.2s;
        }
        .btn-wrapper:hover .btn-inner {
          filter: brightness(1.12);
        }
        .btn-label {
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          letter-spacing: 0.02em;
        }
      `}),f.jsxs("div",{className:"btn-wrapper",onMouseEnter:h,onMouseLeave:d,onClick:x,children:[f.jsx("div",{className:"btn-layer btn-glow",children:f.jsx("div",{ref:i=>a.current[0]=i,style:{position:"absolute",top:"50%",left:"50%",width:800,height:800,backgroundImage:"conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%)",transform:`translate(-50%, -50%) rotate(${u}deg)`}})}),f.jsx("div",{className:"btn-layer btn-dark",style:{inset:0,borderRadius:12},children:f.jsx("div",{ref:i=>a.current[1]=i,style:{position:"absolute",top:"50%",left:"50%",width:600,height:600,backgroundImage:"conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%)",filter:"brightness(1.3)",transform:`translate(-50%, -50%) rotate(${u}deg)`}})}),f.jsx("div",{className:"btn-layer btn-white",style:{inset:2,borderRadius:10,filter:"blur(2px)"},children:f.jsx("div",{ref:i=>a.current[2]=i,style:{position:"absolute",top:"50%",left:"50%",width:600,height:600,backgroundImage:"conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%)",filter:"brightness(1.4)",transform:`translate(-50%, -50%) rotate(${u}deg)`}})}),f.jsxs("div",{className:"btn-inner",children:[f.jsx(C,{size:18,className:`text-white transition-transform ${p?"animate-spin":""}`}),f.jsx("span",{className:"btn-label",children:o})]})]})]})},J=()=>{const{t:x}=v(),p=E(),[o,r]=s.useState(null),[t,n]=s.useState(!1),e=localStorage.getItem("mal_username");s.useEffect(()=>{e&&(async()=>{var d,i,c;try{const b=await fetch(`https://api.jikan.moe/v4/users/${e}`);if(!b.ok)throw new Error("Error en Jikan API");const y=await b.json();(c=(i=(d=y.data)==null?void 0:d.images)==null?void 0:i.jpg)!=null&&c.image_url&&r(y.data.images.jpg.image_url)}catch(b){console.error("No se pudo cargar la foto de perfil:",b)}})()},[e]);const a=async()=>{t||(n(!0),await p.invalidateQueries(),setTimeout(()=>{n(!1)},1e3))},l=()=>{localStorage.removeItem("mal_username"),localStorage.removeItem("mal_client_id"),window.location.reload()},m=[{to:"/",icon:P,label:x("nav.overview")},{to:"/seasons",icon:S,label:x("nav.seasons")},{to:"/scores",icon:N,label:x("nav.scores")},{to:"/community",icon:L,label:x("nav.community")},{to:"/franchises",icon:M,label:x("nav.franchises")}];return f.jsxs("aside",{className:"z-50 flex w-full flex-row items-center justify-around bg-white p-2 transition-colors duration-300 dark:bg-[#12122A] max-md:fixed max-md:bottom-0 max-md:border-t max-md:border-slate-200 dark:max-md:border-[#1E1E2E] md:relative md:my-6 md:ml-6 md:w-[260px] md:flex-col md:justify-start md:overflow-hidden md:rounded-xl md:border md:border-slate-200 md:shadow-sm dark:md:border-[#2D2D4E]",children:[f.jsxs("div",{className:"hidden w-full flex-col items-center border-b border-slate-200 p-4 dark:border-[#1E1E2E] md:flex",children:[f.jsx("div",{className:"mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#7C3AED] bg-slate-100 dark:bg-[#0D0D1A]",children:o?f.jsx("img",{src:o,alt:"Avatar",className:"h-full w-full object-cover"}):f.jsx(D,{size:28,className:"text-slate-400 dark:text-[#94A3B8]"})}),f.jsxs("div",{className:"mt-1 flex w-full flex-col items-center justify-center gap-1",children:[f.jsx("h2",{className:"truncate text-lg font-bold text-slate-800 dark:text-[#F1F5F9]",children:e||"Usuario"}),f.jsxs("button",{onClick:l,title:"Cerrar Sesión",className:"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#EF4444] dark:text-[#94A3B8] dark:hover:bg-[#1A1A2E] dark:hover:text-[#EF4444]",children:[f.jsx(I,{size:14}),f.jsx("span",{children:"Cerrar Sesión"})]})]})]}),f.jsx("nav",{className:"flex w-full flex-row justify-around md:mt-4 md:flex-col md:gap-1",children:m.map(({to:h,icon:d,label:i})=>f.jsxs($,{to:h,className:({isActive:c})=>`flex items-center gap-3 p-3 transition-colors duration-200 md:mx-4 md:rounded-lg md:px-4 md:py-3 ${c?"bg-slate-100 text-[#06B6D4] dark:bg-[#1E1E2E]":"text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-[#94A3B8] dark:hover:bg-[#1A1A2E] dark:hover:text-[#F1F5F9]"}`,children:[f.jsx(d,{size:24}),f.jsx("span",{className:"hidden font-medium md:block",children:i})]},h))}),f.jsx("div",{className:"mt-auto hidden w-full p-4 md:block",children:f.jsx(Q,{onClick:a,isRefreshing:t,text:x("actions.refresh")})})]})},X=()=>{const[x,p]=s.useState(()=>{if(typeof window<"u"){const o=localStorage.getItem("theme");return o?o==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches}return!0});return s.useEffect(()=>{const o=document.documentElement;x?(o.classList.add("dark"),localStorage.setItem("theme","dark")):(o.classList.remove("dark"),localStorage.setItem("theme","light"))},[x]),f.jsx(K,{children:f.jsxs("label",{className:"theme-switch",children:[f.jsx("input",{type:"checkbox",className:"theme-switch__checkbox",checked:x,onChange:()=>p(!x)}),f.jsxs("div",{className:"theme-switch__container",children:[f.jsx("div",{className:"theme-switch__clouds"}),f.jsx("div",{className:"theme-switch__stars-container",children:f.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 144 55",fill:"none",children:f.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z",fill:"currentColor"})})}),f.jsx("div",{className:"theme-switch__circle-container",children:f.jsx("div",{className:"theme-switch__sun-moon-container",children:f.jsxs("div",{className:"theme-switch__moon",children:[f.jsx("div",{className:"theme-switch__spot"}),f.jsx("div",{className:"theme-switch__spot"}),f.jsx("div",{className:"theme-switch__spot"})]})})})]})]})})},K=w.div`
  .theme-switch {
    --toggle-size: 11px;
    --container-width: 5.625em;
    --container-height: 2.5em;
    --container-radius: 6.25em;
    --container-light-bg: #3D7EAE;
    --container-night-bg: #1D1F2C;
    --circle-container-diameter: 3.375em;
    --sun-moon-diameter: 2.125em;
    --sun-bg: #ECCA2F;
    --moon-bg: #C4C9D1;
    --spot-color: #959DB1;
    --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
    --stars-color: #fff;
    --clouds-color: #F3FDFF;
    --back-clouds-color: #AACADF;
    --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
    --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
  }

  .theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: var(--toggle-size);
  }

  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background-color: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__container::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
    box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
    border-radius: var(--container-radius)
  }

  .theme-switch__checkbox {
    display: none;
  }

  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition: var(--circle-transition);
    -o-transition: var(--circle-transition);
    transition: var(--circle-transition);
    pointer-events: none;
  }

  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: var(--container-radius);
    background-color: var(--sun-bg);
    -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
    -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    overflow: hidden;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .theme-switch__moon {
    -webkit-transform: translateX(100%);
    -ms-transform: translateX(100%);
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: var(--moon-bg);
    border-radius: inherit;
    -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__spot {
    position: absolute;
    top: 0.75em;
    left: 0.312em;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--container-radius);
    background-color: var(--spot-color);
    -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
    box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
  }

  .theme-switch__spot:nth-of-type(2) {
    width: 0.375em;
    height: 0.375em;
    top: 0.937em;
    left: 1.375em;
  }

  .theme-switch__spot:nth-last-of-type(3) {
    width: 0.25em;
    height: 0.25em;
    top: 0.312em;
    left: 0.812em;
  }

  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
    box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
    -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }

  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  /* actions */

  .theme-switch__checkbox:checked + .theme-switch__container {
    background-color: var(--container-night-bg);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em)
  }

  .theme-switch__circle-container:hover {
    left: calc(var(--circle-container-offset) + 0.187em);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
    -webkit-transform: translate(0);
    -ms-transform: translate(0);
    transform: translate(0);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
    bottom: -4.062em;
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`,ff=()=>{const[x,p]=s.useState("online");return s.useEffect(()=>{const o=()=>p("offline"),r=()=>p("online"),t=()=>{p("error"),setTimeout(()=>p("online"),5e3)};return window.addEventListener("offline",o),window.addEventListener("online",r),window.addEventListener("mal-api-error",t),()=>{window.removeEventListener("offline",o),window.removeEventListener("online",r),window.removeEventListener("mal-api-error",t)}},[]),f.jsxs("div",{className:"flex items-center gap-2 rounded border border-slate-200 bg-slate-100 px-3 py-[5px] transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]",title:`Estado: ${x}`,children:[f.jsx("span",{className:"hidden text-sm font-medium text-slate-500 dark:text-[#94A3B8] sm:block",children:"API Status"}),f.jsxs("div",{className:"relative flex h-3 w-3 items-center justify-center",children:[x==="online"&&f.jsxs(f.Fragment,{children:[f.jsx("span",{className:"absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"}),f.jsx("span",{className:"relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"})]}),x==="offline"&&f.jsx("span",{className:"relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-500"}),x==="error"&&f.jsx("span",{className:"relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]"})]})]})},j=()=>{const{i18n:x}=v();return f.jsx("div",{className:"flex items-center",children:f.jsxs("select",{value:x.language||"es",onChange:p=>x.changeLanguage(p.target.value),className:"cursor-pointer rounded border border-slate-200 bg-slate-100 px-2 py-[5px] text-sm font-medium text-slate-800 transition-colors duration-300 hover:border-[#06B6D4] focus:border-[#06B6D4] focus:outline-none dark:border-[#1E1E2E] dark:bg-[#12122A] dark:text-[#F1F5F9]",children:[f.jsx("option",{value:"es",children:"ES Español"}),f.jsx("option",{value:"en",children:"EN English"}),f.jsx("option",{value:"pt",children:"PT Português"}),f.jsx("option",{value:"ja",children:"JA 日本語"}),f.jsx("option",{value:"zh",children:"ZH 中文"})]})})},pf=()=>{const x=F(),{t:p}=v(),o=()=>{switch(x.pathname){case"/":return p("nav.overview");case"/seasons":return p("nav.seasons");case"/scores":return p("nav.scores");case"/community":return p("nav.community");case"/franchises":return p("nav.franchises");default:return""}};return f.jsxs("header",{className:"relative flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A] sm:justify-end md:px-6",children:[f.jsx("h1",{className:"bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-xl font-bold text-transparent sm:pointer-events-none sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",children:o()}),f.jsxs("div",{className:"flex items-center gap-3 sm:gap-5",children:[f.jsx(ff,{}),f.jsx(X,{}),f.jsx(j,{})]})]})},xf=()=>f.jsx(ef,{className:"absolute inset-0 z-0 pointer-events-none",children:f.jsxs("div",{className:"container",children:[f.jsx("div",{id:"stars"}),f.jsx("div",{id:"stars2"}),f.jsx("div",{id:"stars3"})]})}),ef=w.div`
  .container {
    height: 100%;
    width: 100%;
    background: radial-gradient(ellipse at bottom, #150b26 0%, #090a0f 100%);
    overflow: hidden;
  }

  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff,
      904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff,
      1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff,
      1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff,
      1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff,
      1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff,
      34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff,
      1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff,
      1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff,
      473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff,
      1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff,
      1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff,
      440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff,
      126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff,
      1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff,
      1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff,
      89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff,
      554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff,
      638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff,
      507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff,
      1866px 1847px #fff, 1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff,
      1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff, 890px 607px #fff,
      787px 1235px #fff, 557px 524px #fff, 1582px 1285px #fff, 1725px 1366px #fff,
      952px 747px #fff, 251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff,
      1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff, 594px 510px #fff,
      1345px 1990px #fff, 1919px 1803px #fff, 1117px 966px #fff, 1629px 97px #fff,
      1046px 1196px #fff, 810px 1092px #fff, 722px 976px #fff, 406px 18px #fff,
      1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff, 564px 239px #fff,
      13px 1767px #fff, 1482px 1472px #fff, 1700px 347px #fff, 1362px 244px #fff,
      1141px 1708px #fff, 22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff,
      1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff, 1061px 478px #fff,
      18px 1409px #fff, 729px 1364px #fff, 264px 911px #fff, 677px 1442px #fff,
      123px 33px #fff, 1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff,
      918px 1536px #fff, 620px 948px #fff, 183px 646px #fff, 695px 687px #fff,
      881px 272px #fff, 1521px 1212px #fff, 1423px 1022px #fff, 1545px 1271px #fff,
      1393px 348px #fff, 685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff,
      736px 999px #fff, 673px 796px #fff, 469px 850px #fff, 1912px 142px #fff,
      1278px 664px #fff, 184px 1990px #fff, 1173px 1312px #fff, 782px 1879px #fff,
      323px 1035px #fff, 611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff,
      1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff, 1806px 1327px #fff,
      386px 575px #fff, 1550px 463px #fff, 148px 687px #fff, 651px 1683px #fff,
      1588px 1194px #fff, 1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff,
      1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff, 1859px 1809px #fff,
      1456px 388px #fff, 186px 1627px #fff, 1528px 1145px #fff, 171px 97px #fff,
      674px 1072px #fff, 676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff,
      1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff, 549px 652px #fff,
      1338px 74px #fff, 1749px 364px #fff, 931px 369px #fff, 383px 1428px #fff,
      1558px 389px #fff, 927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff,
      556px 643px #fff, 401px 275px #fff, 406px 1644px #fff, 1253px 1852px #fff,
      1599px 883px #fff, 744px 1721px #fff, 524px 1297px #fff, 1226px 1177px #fff,
      1679px 55px #fff, 874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff,
      1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff, 1163px 237px #fff,
      61px 223px #fff, 592px 456px #fff, 1844px 271px #fff, 1324px 1488px #fff,
      1373px 717px #fff, 1822px 709px #fff, 1464px 941px #fff, 1445px 1118px #fff,
      991px 1414px #fff, 1964px 1076px #fff, 108px 172px #fff, 641px 1722px #fff,
      1539px 427px #fff, 1697px 45px #fff, 1301px 1353px #fff, 1060px 329px #fff,
      967px 1396px #fff, 493px 301px #fff, 1228px 1406px #fff, 1211px 1653px #fff,
      444px 1822px #fff, 1746px 353px #fff, 1449px 381px #fff, 671px 887px #fff,
      650px 138px #fff, 30px 1839px #fff, 1094px 1405px #fff, 273px 796px #fff,
      1618px 1964px #fff, 1045px 1849px #fff, 1472px 1155px #fff, 1529px 1312px #fff,
      728px 448px #fff, 44px 1908px #fff, 691px 818px #fff, 254px 293px #fff,
      1981px 1133px #fff, 1307px 375px #fff, 196px 316px #fff, 1241px 1975px #fff,
      1138px 1706px #fff, 1769px 463px #fff, 1768px 1428px #fff, 1730px 590px #fff,
      1780px 523px #fff, 1862px 1526px #fff, 1613px 909px #fff, 1266px 1781px #fff,
      470px 352px #fff, 699px 1682px #fff, 1002px 614px #fff, 1209px 133px #fff,
      1842px 518px #fff, 1422px 1836px #fff, 1720px 1901px #fff, 470px 1788px #fff,
      1355px 1387px #fff, 146px 1162px #fff, 933px 80px #fff, 681px 1063px #fff,
      313px 1341px #fff, 740px 1498px #fff, 168px 1014px #fff, 345px 1355px #fff,
      1498px 1562px #fff, 1626px 1358px #fff, 890px 403px #fff, 663px 562px #fff,
      1481px 168px #fff, 22px 719px #fff, 774px 1041px #fff, 1899px 829px #fff,
      430px 158px #fff, 430px 361px #fff, 1592px 1334px #fff, 224px 323px #fff,
      1639px 1131px #fff, 7px 271px #fff, 1646px 1514px #fff, 1605px 1444px #fff,
      1820px 1665px #fff, 1549px 1641px #fff, 1609px 1377px #fff, 486px 1098px #fff,
      229px 613px #fff, 542px 1694px #fff, 318px 256px #fff, 1861px 918px #fff,
      889px 892px #fff, 442px 1524px #fff, 19px 422px #fff, 1935px 1908px #fff,
      828px 109px #fff, 862px 1248px #fff, 1275px 560px #fff, 906px 63px #fff,
      337px 1605px #fff, 1691px 918px #fff, 1414px 679px #fff, 1726px 749px #fff,
      1540px 1149px #fff, 1337px 1466px #fff, 446px 430px #fff, 676px 1616px #fff,
      840px 326px #fff, 976px 977px #fff, 1840px 642px #fff, 1273px 804px #fff,
      1071px 928px #fff, 1292px 1675px #fff, 29px 1148px #fff, 1585px 135px #fff,
      1007px 563px #fff, 1035px 78px #fff, 1174px 574px #fff, 120px 1304px #fff,
      845px 1292px #fff, 861px 540px #fff, 234px 232px #fff, 1940px 1367px #fff,
      759px 639px #fff, 1775px 1381px #fff, 906px 372px #fff, 1104px 1165px #fff,
      1524px 911px #fff, 1882px 330px #fff, 1389px 700px #fff, 300px 1629px #fff,
      220px 1614px #fff, 563px 140px #fff, 1611px 1586px #fff, 793px 1316px #fff,
      325px 1070px #fff, 1722px 1462px #fff, 1406px 1120px #fff, 1169px 1768px #fff,
      1956px 1053px #fff, 959px 1587px #fff, 585px 1566px #fff, 370px 204px #fff,
      1606px 1416px #fff, 443px 1606px #fff, 1499px 1102px #fff, 1943px 105px #fff,
      1121px 1594px #fff, 1512px 32px #fff, 871px 1425px #fff, 433px 100px #fff,
      294px 1471px #fff, 1688px 1755px #fff, 1666px 591px #fff, 1034px 300px #fff,
      734px 1178px #fff, 1342px 313px #fff, 1616px 1590px #fff, 1763px 1472px #fff,
      632px 1935px #fff, 1708px 872px #fff, 1871px 915px #fff, 1829px 1020px #fff,
      1599px 578px #fff, 42px 585px #fff, 1163px 1382px #fff, 1744px 1272px #fff,
      984px 1426px #fff, 1786px 1584px #fff, 1813px 379px #fff, 1867px 1127px #fff,
      97px 567px #fff, 626px 988px #fff, 1178px 79px #fff, 1703px 211px #fff,
      961px 1785px #fff, 110px 975px #fff, 953px 1941px #fff, 1027px 1790px #fff,
      1665px 107px #fff, 11px 964px #fff, 1718px 1147px #fff, 21px 1728px #fff,
      1358px 1922px #fff, 872px 65px #fff, 1191px 1635px #fff, 762px 681px #fff,
      1519px 1033px #fff, 906px 566px #fff, 1074px 657px #fff, 1093px 415px #fff,
      51px 198px #fff, 1075px 1418px #fff, 1547px 1070px #fff, 225px 920px #fff,
      850px 1974px #fff, 981px 595px #fff, 1425px 131px #fff, 460px 917px #fff,
      56px 495px #fff, 714px 428px #fff, 920px 493px #fff, 470px 1521px #fff,
      532px 821px #fff, 1905px 71px #fff, 883px 1501px #fff, 294px 196px #fff,
      381px 1999px #fff, 332px 793px #fff, 1246px 408px #fff, 233px 149px #fff,
      315px 231px #fff, 1594px 1302px #fff, 696px 1585px #fff, 791px 136px #fff,
      479px 199px #fff, 1627px 1413px #fff, 1824px 924px #fff, 1631px 342px #fff,
      1251px 1151px #fff, 284px 1781px #fff, 497px 1052px #fff, 204px 1161px #fff,
      646px 1499px #fff, 1762px 558px #fff, 854px 1833px #fff, 883px 945px #fff,
      44px 982px #fff, 1101px 834px #fff, 515px 1748px #fff, 1578px 1435px #fff,
      819px 1258px #fff, 776px 670px #fff, 115px 385px #fff, 1478px 434px #fff,
      885px 20px #fff, 192px 1513px #fff, 78px 1129px #fff, 1774px 1105px #fff,
      955px 1149px #fff, 1817px 1929px #fff, 1106px 1832px #fff, 1107px 1997px #fff,
      94px 23px #fff, 243px 982px #fff, 43px 1972px #fff, 1798px 673px #fff,
      1131px 1589px #fff, 841px 14px #fff, 826px 345px #fff, 687px 56px #fff,
      1084px 32px #fff, 1887px 1878px #fff, 153px 526px #fff, 1828px 253px #fff,
      1947px 1105px #fff, 886px 700px #fff, 1307px 1723px #fff, 1274px 651px #fff,
      1530px 837px #fff, 1699px 1637px #fff, 1703px 1331px #fff, 1929px 1557px #fff,
      1763px 737px #fff, 1118px 1680px #fff, 1545px 692px #fff, 1462px 1092px #fff,
      208px 1667px #fff, 1393px 859px #fff, 186px 1794px #fff, 351px 1199px #fff,
      642px 1995px #fff, 1061px 1726px #fff, 1708px 115px #fff, 1233px 1305px #fff,
      637px 1786px #fff, 1730px 603px #fff, 75px 1240px #fff, 1704px 1326px #fff,
      584px 346px #fff, 438px 1554px #fff, 561px 513px #fff, 1382px 225px #fff,
      467px 1674px #fff, 1403px 815px #fff, 1546px 1835px #fff, 127px 1119px #fff,
      276px 591px #fff, 688px 1458px #fff, 765px 646px #fff, 474px 984px #fff,
      171px 361px #fff, 94px 1480px #fff, 1962px 1666px #fff, 909px 1037px #fff,
      1725px 222px #fff, 253px 1355px #fff, 1892px 1901px #fff, 275px 1847px #fff,
      28px 1184px #fff, 1725px 1382px #fff, 882px 647px #fff, 1935px 1046px #fff,
      10px 344px #fff, 292px 1328px #fff, 127px 1352px #fff, 752px 929px #fff,
      1589px 384px #fff, 284px 1829px #fff, 381px 820px #fff, 1229px 1125px #fff,
      777px 429px #fff, 1811px 1499px #fff, 1573px 287px #fff, 295px 756px #fff,
      389px 616px #fff, 781px 41px #fff, 1092px 333px #fff, 794px 1588px #fff,
      386px 1847px #fff, 1802px 710px #fff, 662px 60px #fff, 640px 264px #fff,
      463px 746px #fff, 1859px 799px #fff, 763px 37px #fff, 639px 396px #fff,
      357px 1071px #fff, 1190px 1430px #fff, 1814px 257px #fff, 1382px 235px #fff,
      606px 1304px #fff, 1939px 1470px #fff, 1124px 349px #fff, 307px 1567px #fff,
      310px 1323px #fff, 1145px 922px #fff, 1196px 1922px #fff, 1647px 544px #fff,
      788px 1337px #fff, 257px 632px #fff, 1413px 414px #fff, 590px 620px #fff,
      582px 794px #fff, 1702px 1481px #fff, 1055px 53px #fff, 157px 346px #fff,
      50px 1901px #fff, 1038px 1369px #fff, 796px 1941px #fff, 215px 194px #fff,
      1567px 1538px #fff, 367px 800px #fff, 1044px 489px #fff, 1109px 1712px #fff,
      524px 327px #fff, 525px 1252px #fff, 1475px 1240px #fff, 529px 436px #fff,
      795px 834px #fff, 122px 1371px #fff, 79px 482px #fff, 520px 1249px #fff,
      336px 1878px #fff, 188px 944px #fff, 325px 1259px #fff, 1491px 1942px #fff,
      620px 1054px #fff, 1606px 1153px #fff, 1448px 502px #fff, 53px 1381px #fff,
      107px 1670px #fff, 1380px 618px #fff, 967px 1557px #fff, 1116px 1722px #fff,
      1174px 1044px #fff, 1805px 717px #fff, 663px 394px #fff, 1848px 1007px #fff,
      389px 802px #fff, 49px 392px #fff, 1650px 852px #fff, 1678px 1012px #fff,
      335px 1009px #fff, 1818px 1631px #fff, 1568px 742px #fff, 1162px 1991px #fff,
      52px 1190px #fff, 1401px 928px #fff, 119px 1549px #fff, 537px 1529px #fff,
      2px 1709px #fff, 122px 387px #fff, 543px 2px #fff, 27px 1971px #fff,
      507px 1377px #fff, 1362px 1080px #fff, 1031px 1544px #fff, 1631px 1174px #fff,
      1603px 312px #fff, 1626px 1422px #fff, 1430px 615px #fff, 1958px 1431px #fff,
      1946px 1412px #fff, 1848px 247px #fff, 984px 1808px #fff, 1396px 225px #fff,
      319px 717px #fff, 1252px 875px #fff, 1619px 156px #fff, 951px 1971px #fff,
      386px 355px #fff, 1406px 1151px #fff, 273px 1538px #fff, 844px 1570px #fff,
      947px 151px #fff, 1363px 525px #fff, 209px 307px #fff, 1923px 1718px #fff,
      993px 1741px #fff, 1513px 353px #fff, 1353px 61px #fff, 664px 352px #fff,
      1382px 359px #fff, 1487px 1707px #fff, 657px 1045px #fff, 1107px 490px #fff,
      1834px 1176px #fff, 837px 1438px #fff, 1947px 448px #fff, 1196px 333px #fff,
      151px 555px #fff, 18px 992px #fff, 458px 748px #fff, 1801px 890px #fff,
      1093px 1012px #fff, 315px 1101px #fff, 194px 323px #fff, 754px 292px #fff,
      1737px 7px #fff, 40px 840px #fff, 1170px 805px #fff, 176px 1753px #fff,
      805px 1148px #fff, 1578px 1271px #fff, 367px 1494px #fff, 363px 1111px #fff,
      1955px 243px #fff, 1451px 1093px #fff, 375px 617px #fff, 1223px 720px #fff,
      1178px 13px #fff, 1456px 865px #fff, 1440px 49px #fff, 186px 1569px #fff,
      320px 1853px #fff, 300px 539px #fff, 1559px 509px #fff, 1985px 1108px #fff,
      1588px 828px #fff, 525px 1432px #fff, 831px 363px #fff, 141px 281px #fff,
      1319px 402px #fff, 40px 456px #fff, 1955px 478px #fff, 1758px 818px #fff,
      1924px 688px #fff, 1030px 953px #fff, 1982px 210px #fff, 917px 1401px #fff,
      1051px 1837px #fff, 1045px 463px #fff, 1744px 573px #fff, 529px 1530px #fff,
      542px 469px #fff, 1982px 324px #fff, 1902px 1422px #fff, 1968px 782px #fff,
      1666px 1561px #fff, 955px 304px #fff, 323px 778px #fff, 272px 443px #fff,
      485px 581px #fff, 1353px 1058px #fff, 1257px 131px #fff, 434px 98px #fff,
      1587px 1953px #fff, 1749px 68px #fff, 1984px 839px #fff, 1518px 183px #fff,
      1071px 855px #fff, 1662px 1994px #fff, 1111px 106px #fff, 1954px 838px #fff;
    animation: animStar 50s linear infinite;
  }
  #stars:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff,
      904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff,
      1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff,
      1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff,
      1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff,
      1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff,
      34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff,
      1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff,
      1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff,
      473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff,
      1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff,
      1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff,
      440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff,
      126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff,
      1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff,
      1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff,
      89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff,
      554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff,
      638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff,
      507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff,
      1866px 1847px #fff, 1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff,
      1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff, 890px 607px #fff,
      787px 1235px #fff, 557px 524px #fff, 1582px 1285px #fff, 1725px 1366px #fff,
      952px 747px #fff, 251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff,
      1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff, 594px 510px #fff,
      1345px 1990px #fff, 1919px 1803px #fff, 1117px 966px #fff, 1629px 97px #fff,
      1046px 1196px #fff, 810px 1092px #fff, 722px 976px #fff, 406px 18px #fff,
      1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff, 564px 239px #fff,
      13px 1767px #fff, 1482px 1472px #fff, 1700px 347px #fff, 1362px 244px #fff,
      1141px 1708px #fff, 22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff,
      1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff, 1061px 478px #fff,
      18px 1409px #fff, 729px 1364px #fff, 264px 911px #fff, 677px 1442px #fff,
      123px 33px #fff, 1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff,
      918px 1536px #fff, 620px 948px #fff, 183px 646px #fff, 695px 687px #fff,
      881px 272px #fff, 1521px 1212px #fff, 1423px 1022px #fff, 1545px 1271px #fff,
      1393px 348px #fff, 685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff,
      736px 999px #fff, 673px 796px #fff, 469px 850px #fff, 1912px 142px #fff,
      1278px 664px #fff, 184px 1990px #fff, 1173px 1312px #fff, 782px 1879px #fff,
      323px 1035px #fff, 611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff,
      1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff, 1806px 1327px #fff,
      386px 575px #fff, 1550px 463px #fff, 148px 687px #fff, 651px 1683px #fff,
      1588px 1194px #fff, 1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff,
      1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff, 1859px 1809px #fff,
      1456px 388px #fff, 186px 1627px #fff, 1528px 1145px #fff, 171px 97px #fff,
      674px 1072px #fff, 676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff,
      1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff, 549px 652px #fff,
      1338px 74px #fff, 1749px 364px #fff, 931px 369px #fff, 383px 1428px #fff,
      1558px 389px #fff, 927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff,
      556px 643px #fff, 401px 275px #fff, 406px 1644px #fff, 1253px 1852px #fff,
      1599px 883px #fff, 744px 1721px #fff, 524px 1297px #fff, 1226px 1177px #fff,
      1679px 55px #fff, 874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff,
      1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff, 1163px 237px #fff,
      61px 223px #fff, 592px 456px #fff, 1844px 271px #fff, 1324px 1488px #fff,
      1373px 717px #fff, 1822px 709px #fff, 1464px 941px #fff, 1445px 1118px #fff,
      991px 1414px #fff, 1964px 1076px #fff, 108px 172px #fff, 641px 1722px #fff,
      1539px 427px #fff, 1697px 45px #fff, 1301px 1353px #fff, 1060px 329px #fff,
      967px 1396px #fff, 493px 301px #fff, 1228px 1406px #fff, 1211px 1653px #fff,
      444px 1822px #fff, 1746px 353px #fff, 1449px 381px #fff, 671px 887px #fff,
      650px 138px #fff, 30px 1839px #fff, 1094px 1405px #fff, 273px 796px #fff,
      1618px 1964px #fff, 1045px 1849px #fff, 1472px 1155px #fff, 1529px 1312px #fff,
      728px 448px #fff, 44px 1908px #fff, 691px 818px #fff, 254px 293px #fff,
      1981px 1133px #fff, 1307px 375px #fff, 196px 316px #fff, 1241px 1975px #fff,
      1138px 1706px #fff, 1769px 463px #fff, 1768px 1428px #fff, 1730px 590px #fff,
      1780px 523px #fff, 1862px 1526px #fff, 1613px 909px #fff, 1266px 1781px #fff,
      470px 352px #fff, 699px 1682px #fff, 1002px 614px #fff, 1209px 133px #fff,
      1842px 518px #fff, 1422px 1836px #fff, 1720px 1901px #fff, 470px 1788px #fff,
      1355px 1387px #fff, 146px 1162px #fff, 933px 80px #fff, 681px 1063px #fff,
      313px 1341px #fff, 740px 1498px #fff, 168px 1014px #fff, 345px 1355px #fff,
      1498px 1562px #fff, 1626px 1358px #fff, 890px 403px #fff, 663px 562px #fff,
      1481px 168px #fff, 22px 719px #fff, 774px 1041px #fff, 1899px 829px #fff,
      430px 158px #fff, 430px 361px #fff, 1592px 1334px #fff, 224px 323px #fff,
      1639px 1131px #fff, 7px 271px #fff, 1646px 1514px #fff, 1605px 1444px #fff,
      1820px 1665px #fff, 1549px 1641px #fff, 1609px 1377px #fff, 486px 1098px #fff,
      229px 613px #fff, 542px 1694px #fff, 318px 256px #fff, 1861px 918px #fff,
      889px 892px #fff, 442px 1524px #fff, 19px 422px #fff, 1935px 1908px #fff,
      828px 109px #fff, 862px 1248px #fff, 1275px 560px #fff, 906px 63px #fff,
      337px 1605px #fff, 1691px 918px #fff, 1414px 679px #fff, 1726px 749px #fff,
      1540px 1149px #fff, 1337px 1466px #fff, 446px 430px #fff, 676px 1616px #fff,
      840px 326px #fff, 976px 977px #fff, 1840px 642px #fff, 1273px 804px #fff,
      1071px 928px #fff, 1292px 1675px #fff, 29px 1148px #fff, 1585px 135px #fff,
      1007px 563px #fff, 1035px 78px #fff, 1174px 574px #fff, 120px 1304px #fff,
      845px 1292px #fff, 861px 540px #fff, 234px 232px #fff, 1940px 1367px #fff,
      759px 639px #fff, 1775px 1381px #fff, 906px 372px #fff, 1104px 1165px #fff,
      1524px 911px #fff, 1882px 330px #fff, 1389px 700px #fff, 300px 1629px #fff,
      220px 1614px #fff, 563px 140px #fff, 1611px 1586px #fff, 793px 1316px #fff,
      325px 1070px #fff, 1722px 1462px #fff, 1406px 1120px #fff, 1169px 1768px #fff,
      1956px 1053px #fff, 959px 1587px #fff, 585px 1566px #fff, 370px 204px #fff,
      1606px 1416px #fff, 443px 1606px #fff, 1499px 1102px #fff, 1943px 105px #fff,
      1121px 1594px #fff, 1512px 32px #fff, 871px 1425px #fff, 433px 100px #fff,
      294px 1471px #fff, 1688px 1755px #fff, 1666px 591px #fff, 1034px 300px #fff,
      734px 1178px #fff, 1342px 313px #fff, 1616px 1590px #fff, 1763px 1472px #fff,
      632px 1935px #fff, 1708px 872px #fff, 1871px 915px #fff, 1829px 1020px #fff,
      1599px 578px #fff, 42px 585px #fff, 1163px 1382px #fff, 1744px 1272px #fff,
      984px 1426px #fff, 1786px 1584px #fff, 1813px 379px #fff, 1867px 1127px #fff,
      97px 567px #fff, 626px 988px #fff, 1178px 79px #fff, 1703px 211px #fff,
      961px 1785px #fff, 110px 975px #fff, 953px 1941px #fff, 1027px 1790px #fff,
      1665px 107px #fff, 11px 964px #fff, 1718px 1147px #fff, 21px 1728px #fff,
      1358px 1922px #fff, 872px 65px #fff, 1191px 1635px #fff, 762px 681px #fff,
      1519px 1033px #fff, 906px 566px #fff, 1074px 657px #fff, 1093px 415px #fff,
      51px 198px #fff, 1075px 1418px #fff, 1547px 1070px #fff, 225px 920px #fff,
      850px 1974px #fff, 981px 595px #fff, 1425px 131px #fff, 460px 917px #fff,
      56px 495px #fff, 714px 428px #fff, 920px 493px #fff, 470px 1521px #fff,
      532px 821px #fff, 1905px 71px #fff, 883px 1501px #fff, 294px 196px #fff,
      381px 1999px #fff, 332px 793px #fff, 1246px 408px #fff, 233px 149px #fff,
      315px 231px #fff, 1594px 1302px #fff, 696px 1585px #fff, 791px 136px #fff,
      479px 199px #fff, 1627px 1413px #fff, 1824px 924px #fff, 1631px 342px #fff,
      1251px 1151px #fff, 284px 1781px #fff, 497px 1052px #fff, 204px 1161px #fff,
      646px 1499px #fff, 1762px 558px #fff, 854px 1833px #fff, 883px 945px #fff,
      44px 982px #fff, 1101px 834px #fff, 515px 1748px #fff, 1578px 1435px #fff,
      819px 1258px #fff, 776px 670px #fff, 115px 385px #fff, 1478px 434px #fff,
      885px 20px #fff, 192px 1513px #fff, 78px 1129px #fff, 1774px 1105px #fff,
      955px 1149px #fff, 1817px 1929px #fff, 1106px 1832px #fff, 1107px 1997px #fff,
      94px 23px #fff, 243px 982px #fff, 43px 1972px #fff, 1798px 673px #fff,
      1131px 1589px #fff, 841px 14px #fff, 826px 345px #fff, 687px 56px #fff,
      1084px 32px #fff, 1887px 1878px #fff, 153px 526px #fff, 1828px 253px #fff,
      1947px 1105px #fff, 886px 700px #fff, 1307px 1723px #fff, 1274px 651px #fff,
      1530px 837px #fff, 1699px 1637px #fff, 1703px 1331px #fff, 1929px 1557px #fff,
      1763px 737px #fff, 1118px 1680px #fff, 1545px 692px #fff, 1462px 1092px #fff,
      208px 1667px #fff, 1393px 859px #fff, 186px 1794px #fff, 351px 1199px #fff,
      642px 1995px #fff, 1061px 1726px #fff, 1708px 115px #fff, 1233px 1305px #fff,
      637px 1786px #fff, 1730px 603px #fff, 75px 1240px #fff, 1704px 1326px #fff,
      584px 346px #fff, 438px 1554px #fff, 561px 513px #fff, 1382px 225px #fff,
      467px 1674px #fff, 1403px 815px #fff, 1546px 1835px #fff, 127px 1119px #fff,
      276px 591px #fff, 688px 1458px #fff, 765px 646px #fff, 474px 984px #fff,
      171px 361px #fff, 94px 1480px #fff, 1962px 1666px #fff, 909px 1037px #fff,
      1725px 222px #fff, 253px 1355px #fff, 1892px 1901px #fff, 275px 1847px #fff,
      28px 1184px #fff, 1725px 1382px #fff, 882px 647px #fff, 1935px 1046px #fff,
      10px 344px #fff, 292px 1328px #fff, 127px 1352px #fff, 752px 929px #fff,
      1589px 384px #fff, 284px 1829px #fff, 381px 820px #fff, 1229px 1125px #fff,
      777px 429px #fff, 1811px 1499px #fff, 1573px 287px #fff, 295px 756px #fff,
      389px 616px #fff, 781px 41px #fff, 1092px 333px #fff, 794px 1588px #fff,
      386px 1847px #fff, 1802px 710px #fff, 662px 60px #fff, 640px 264px #fff,
      463px 746px #fff, 1859px 799px #fff, 763px 37px #fff, 639px 396px #fff,
      357px 1071px #fff, 1190px 1430px #fff, 1814px 257px #fff, 1382px 235px #fff,
      606px 1304px #fff, 1939px 1470px #fff, 1124px 349px #fff, 307px 1567px #fff,
      310px 1323px #fff, 1145px 922px #fff, 1196px 1922px #fff, 1647px 544px #fff,
      788px 1337px #fff, 257px 632px #fff, 1413px 414px #fff, 590px 620px #fff,
      582px 794px #fff, 1702px 1481px #fff, 1055px 53px #fff, 157px 346px #fff,
      50px 1901px #fff, 1038px 1369px #fff, 796px 1941px #fff, 215px 194px #fff,
      1567px 1538px #fff, 367px 800px #fff, 1044px 489px #fff, 1109px 1712px #fff,
      524px 327px #fff, 525px 1252px #fff, 1475px 1240px #fff, 529px 436px #fff,
      795px 834px #fff, 122px 1371px #fff, 79px 482px #fff, 520px 1249px #fff,
      336px 1878px #fff, 188px 944px #fff, 325px 1259px #fff, 1491px 1942px #fff,
      620px 1054px #fff, 1606px 1153px #fff, 1448px 502px #fff, 53px 1381px #fff,
      107px 1670px #fff, 1380px 618px #fff, 967px 1557px #fff, 1116px 1722px #fff,
      1174px 1044px #fff, 1805px 717px #fff, 663px 394px #fff, 1848px 1007px #fff,
      389px 802px #fff, 49px 392px #fff, 1650px 852px #fff, 1678px 1012px #fff,
      335px 1009px #fff, 1818px 1631px #fff, 1568px 742px #fff, 1162px 1991px #fff,
      52px 1190px #fff, 1401px 928px #fff, 119px 1549px #fff, 537px 1529px #fff,
      2px 1709px #fff, 122px 387px #fff, 543px 2px #fff, 27px 1971px #fff,
      507px 1377px #fff, 1362px 1080px #fff, 1031px 1544px #fff, 1631px 1174px #fff,
      1603px 312px #fff, 1626px 1422px #fff, 1430px 615px #fff, 1958px 1431px #fff,
      1946px 1412px #fff, 1848px 247px #fff, 984px 1808px #fff, 1396px 225px #fff,
      319px 717px #fff, 1252px 875px #fff, 1619px 156px #fff, 951px 1971px #fff,
      386px 355px #fff, 1406px 1151px #fff, 273px 1538px #fff, 844px 1570px #fff,
      947px 151px #fff, 1363px 525px #fff, 209px 307px #fff, 1923px 1718px #fff,
      993px 1741px #fff, 1513px 353px #fff, 1353px 61px #fff, 664px 352px #fff,
      1382px 359px #fff, 1487px 1707px #fff, 657px 1045px #fff, 1107px 490px #fff,
      1834px 1176px #fff, 837px 1438px #fff, 1947px 448px #fff, 1196px 333px #fff,
      151px 555px #fff, 18px 992px #fff, 458px 748px #fff, 1801px 890px #fff,
      1093px 1012px #fff, 315px 1101px #fff, 194px 323px #fff, 754px 292px #fff,
      1737px 7px #fff, 40px 840px #fff, 1170px 805px #fff, 176px 1753px #fff,
      805px 1148px #fff, 1578px 1271px #fff, 367px 1494px #fff, 363px 1111px #fff,
      1955px 243px #fff, 1451px 1093px #fff, 375px 617px #fff, 1223px 720px #fff,
      1178px 13px #fff, 1456px 865px #fff, 1440px 49px #fff, 186px 1569px #fff,
      320px 1853px #fff, 300px 539px #fff, 1559px 509px #fff, 1985px 1108px #fff,
      1588px 828px #fff, 525px 1432px #fff, 831px 363px #fff, 141px 281px #fff,
      1319px 402px #fff, 40px 456px #fff, 1955px 478px #fff, 1758px 818px #fff,
      1924px 688px #fff, 1030px 953px #fff, 1982px 210px #fff, 917px 1401px #fff,
      1051px 1837px #fff, 1045px 463px #fff, 1744px 573px #fff, 529px 1530px #fff,
      542px 469px #fff, 1982px 324px #fff, 1902px 1422px #fff, 1968px 782px #fff,
      1666px 1561px #fff, 955px 304px #fff, 323px 778px #fff, 272px 443px #fff,
      485px 581px #fff, 1353px 1058px #fff, 1257px 131px #fff, 434px 98px #fff,
      1587px 1953px #fff, 1749px 68px #fff, 1984px 839px #fff, 1518px 183px #fff,
      1071px 855px #fff, 1662px 1994px #fff, 1111px 106px #fff, 1954px 838px #fff;
    animation: animStar 50s linear infinite;
  }

  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff,
      661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff,
      1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff,
      1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff,
      286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff,
      1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff,
      1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff,
      939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff,
      1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff,
      804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff,
      1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff,
      1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff,
      820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff, 1286px 522px #fff,
      955px 659px #fff, 428px 1805px #fff, 237px 557px #fff, 1689px 1058px #fff,
      636px 1882px #fff, 1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff,
      302px 252px #fff, 827px 1765px #fff, 620px 123px #fff, 207px 748px #fff,
      1454px 1234px #fff, 1967px 1790px #fff, 542px 33px #fff, 742px 1214px #fff,
      255px 1402px #fff, 74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff,
      534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff, 1796px 120px #fff,
      1409px 1263px #fff, 1627px 995px #fff, 969px 710px #fff, 1674px 676px #fff,
      1832px 759px #fff, 1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff,
      886px 239px #fff, 778px 150px #fff, 1767px 430px #fff, 765px 1259px #fff,
      1189px 877px #fff, 444px 1629px #fff, 1560px 324px #fff, 1952px 1097px #fff,
      712px 1173px #fff, 541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff,
      784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff, 1821px 174px #fff,
      221px 1795px #fff, 1004px 456px #fff, 1298px 941px #fff, 274px 387px #fff,
      174px 376px #fff, 1491px 258px #fff, 1489px 1946px #fff, 1134px 1382px #fff,
      1289px 1145px #fff, 464px 358px #fff, 1249px 1842px #fff, 1665px 831px #fff,
      1982px 84px #fff, 541px 774px #fff, 1994px 523px #fff, 762px 1644px #fff,
      1730px 867px #fff, 1951px 1287px #fff, 911px 1691px #fff, 1454px 725px #fff,
      1287px 1940px #fff, 70px 564px #fff, 1980px 638px #fff, 1674px 1774px #fff,
      1720px 116px #fff, 1747px 182px #fff, 1040px 450px #fff, 1795px 375px #fff,
      857px 1471px #fff, 1326px 1730px #fff, 915px 274px #fff, 1224px 358px #fff,
      1808px 60px #fff, 43px 1870px #fff, 1810px 1536px #fff, 1564px 1719px #fff,
      731px 1388px #fff, 1953px 1967px #fff, 1744px 1119px #fff, 794px 1384px #fff,
      959px 714px #fff, 18px 1932px #fff, 1358px 1437px #fff, 355px 939px #fff,
      1355px 1648px #fff, 608px 719px #fff, 383px 758px #fff, 1164px 1681px #fff,
      1045px 253px #fff, 424px 1279px #fff, 1899px 359px #fff, 379px 488px #fff,
      214px 465px #fff, 179px 905px #fff, 830px 1993px #fff, 448px 1077px #fff,
      1880px 1354px #fff, 1973px 347px #fff, 745px 1025px #fff, 788px 1007px #fff,
      1377px 883px #fff, 6px 290px #fff, 1312px 407px #fff, 1398px 622px #fff,
      1405px 339px #fff, 1198px 1709px #fff, 988px 1226px #fff, 87px 1459px #fff,
      1113px 1698px #fff, 997px 732px #fff, 708px 331px #fff, 1876px 1112px #fff,
      1729px 1797px #fff, 719px 703px #fff, 1295px 522px #fff, 758px 1061px #fff,
      1309px 1014px #fff, 1327px 1365px #fff, 854px 1317px #fff, 531px 1001px #fff,
      1751px 1040px #fff, 1354px 190px #fff, 800px 1538px #fff, 88px 1455px #fff,
      668px 39px #fff, 1379px 41px #fff, 892px 524px #fff, 54px 649px #fff,
      1289px 730px #fff, 727px 488px #fff, 181px 842px #fff, 1230px 64px #fff,
      3px 857px #fff, 292px 1201px #fff, 1343px 673px #fff, 1096px 1412px #fff,
      1520px 292px #fff, 104px 1683px #fff, 934px 1387px #fff, 314px 739px #fff;
    animation: animStar 100s linear infinite;
  }
  #stars2:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff,
      661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff,
      1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff,
      1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff,
      286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff,
      1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff,
      1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff,
      939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff,
      1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff,
      804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff,
      1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff,
      1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff,
      820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff, 1286px 522px #fff,
      955px 659px #fff, 428px 1805px #fff, 237px 557px #fff, 1689px 1058px #fff,
      636px 1882px #fff, 1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff,
      302px 252px #fff, 827px 1765px #fff, 620px 123px #fff, 207px 748px #fff,
      1454px 1234px #fff, 1967px 1790px #fff, 542px 33px #fff, 742px 1214px #fff,
      255px 1402px #fff, 74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff,
      534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff, 1796px 120px #fff,
      1409px 1263px #fff, 1627px 995px #fff, 969px 710px #fff, 1674px 676px #fff,
      1832px 759px #fff, 1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff,
      886px 239px #fff, 778px 150px #fff, 1767px 430px #fff, 765px 1259px #fff,
      1189px 877px #fff, 444px 1629px #fff, 1560px 324px #fff, 1952px 1097px #fff,
      712px 1173px #fff, 541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff,
      784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff, 1821px 174px #fff,
      221px 1795px #fff, 1004px 456px #fff, 1298px 941px #fff, 274px 387px #fff,
      174px 376px #fff, 1491px 258px #fff, 1489px 1946px #fff, 1134px 1382px #fff,
      1289px 1145px #fff, 464px 358px #fff, 1249px 1842px #fff, 1665px 831px #fff,
      1982px 84px #fff, 541px 774px #fff, 1994px 523px #fff, 762px 1644px #fff,
      1730px 867px #fff, 1951px 1287px #fff, 911px 1691px #fff, 1454px 725px #fff,
      1287px 1940px #fff, 70px 564px #fff, 1980px 638px #fff, 1674px 1774px #fff,
      1720px 116px #fff, 1747px 182px #fff, 1040px 450px #fff, 1795px 375px #fff,
      857px 1471px #fff, 1326px 1730px #fff, 915px 274px #fff, 1224px 358px #fff,
      1808px 60px #fff, 43px 1870px #fff, 1810px 1536px #fff, 1564px 1719px #fff,
      731px 1388px #fff, 1953px 1967px #fff, 1744px 1119px #fff, 794px 1384px #fff,
      959px 714px #fff, 18px 1932px #fff, 1358px 1437px #fff, 355px 939px #fff,
      1355px 1648px #fff, 608px 719px #fff, 383px 758px #fff, 1164px 1681px #fff,
      1045px 253px #fff, 424px 1279px #fff, 1899px 359px #fff, 379px 488px #fff,
      214px 465px #fff, 179px 905px #fff, 830px 1993px #fff, 448px 1077px #fff,
      1880px 1354px #fff, 1973px 347px #fff, 745px 1025px #fff, 788px 1007px #fff,
      1377px 883px #fff, 6px 290px #fff, 1312px 407px #fff, 1398px 622px #fff,
      1405px 339px #fff, 1198px 1709px #fff, 988px 1226px #fff, 87px 1459px #fff,
      1113px 1698px #fff, 997px 732px #fff, 708px 331px #fff, 1876px 1112px #fff,
      1729px 1797px #fff, 719px 703px #fff, 1295px 522px #fff, 758px 1061px #fff,
      1309px 1014px #fff, 1327px 1365px #fff, 854px 1317px #fff, 531px 1001px #fff,
      1751px 1040px #fff, 1354px 190px #fff, 800px 1538px #fff, 88px 1455px #fff,
      668px 39px #fff, 1379px 41px #fff, 892px 524px #fff, 54px 649px #fff,
      1289px 730px #fff, 727px 488px #fff, 181px 842px #fff, 1230px 64px #fff,
      3px 857px #fff, 292px 1201px #fff, 1343px 673px #fff, 1096px 1412px #fff,
      1520px 292px #fff, 104px 1683px #fff, 934px 1387px #fff, 314px 739px #fff;
  }

  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow:
      200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff,
      899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff,
      254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff,
      1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff,
      829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff,
      1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff,
      1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff,
      811px 977px #fff, 1931px 673px #fff, 1734px 978px #fff, 1772px 1567px #fff,
      1197px 1400px #fff, 764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff,
      1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff, 235px 1082px #fff,
      299px 1086px #fff, 1017px 1602px #fff, 1950px 626px #fff, 1306px 132px #fff,
      1358px 1618px #fff, 1873px 1718px #fff, 1447px 940px #fff, 1888px 1195px #fff,
      1704px 1765px #fff, 872px 1357px #fff, 1555px 1120px #fff, 250px 1415px #fff,
      450px 415px #fff, 492px 901px #fff, 170px 1641px #fff, 56px 1129px #fff,
      627px 1514px #fff, 1221px 500px #fff, 324px 1895px #fff, 1397px 1775px #fff,
      1966px 598px #fff, 1550px 763px #fff, 326px 1605px #fff, 261px 969px #fff,
      890px 281px #fff, 736px 544px #fff, 589px 1262px #fff, 1581px 368px #fff,
      1900px 1132px #fff, 1914px 585px #fff, 1864px 1517px #fff, 241px 217px #fff,
      859px 787px #fff, 996px 1729px #fff, 741px 121px #fff, 418px 414px #fff,
      142px 967px #fff, 387px 896px #fff, 703px 562px #fff, 968px 1136px #fff,
      1682px 332px #fff, 1287px 846px #fff, 256px 1427px #fff, 1885px 432px #fff,
      1739px 1458px #fff, 345px 1769px #fff, 1140px 1612px #fff, 192px 1921px #fff,
      920px 471px #fff, 834px 881px #fff, 917px 1803px #fff, 466px 1266px #fff,
      483px 1108px #fff, 689px 986px #fff, 1279px 786px #fff, 458px 910px #fff,
      1250px 870px #fff, 785px 1654px #fff, 1543px 1757px #fff, 287px 1272px #fff;
    animation: animStar 150s linear infinite;
  }
  #stars3:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow:
      200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff,
      899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff,
      254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff,
      1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff,
      829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff,
      1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff,
      1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff,
      811px 977px #fff, 1931px 673px #fff, 1734px 978px #fff, 1772px 1567px #fff,
      1197px 1400px #fff, 764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff,
      1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff, 235px 1082px #fff,
      299px 1086px #fff, 1017px 1602px #fff, 1950px 626px #fff, 1306px 132px #fff,
      1358px 1618px #fff, 1873px 1718px #fff, 1447px 940px #fff, 1888px 1195px #fff,
      1704px 1765px #fff, 872px 1357px #fff, 1555px 1120px #fff, 250px 1415px #fff,
      450px 415px #fff, 492px 901px #fff, 170px 1641px #fff, 56px 1129px #fff,
      627px 1514px #fff, 1221px 500px #fff, 324px 1895px #fff, 1397px 1775px #fff,
      1966px 598px #fff, 1550px 763px #fff, 326px 1605px #fff, 261px 969px #fff,
      890px 281px #fff, 736px 544px #fff, 589px 1262px #fff, 1581px 368px #fff,
      1900px 1132px #fff, 1914px 585px #fff, 1864px 1517px #fff, 241px 217px #fff,
      859px 787px #fff, 996px 1729px #fff, 741px 121px #fff, 418px 414px #fff,
      142px 967px #fff, 387px 896px #fff, 703px 562px #fff, 968px 1136px #fff,
      1682px 332px #fff, 1287px 846px #fff, 256px 1427px #fff, 1885px 432px #fff,
      1739px 1458px #fff, 345px 1769px #fff, 1140px 1612px #fff, 192px 1921px #fff,
      920px 471px #fff, 834px 881px #fff, 917px 1803px #fff, 466px 1266px #fff,
      483px 1108px #fff, 689px 986px #fff, 1279px 786px #fff, 458px 910px #fff,
      1250px 870px #fff, 785px 1654px #fff, 1543px 1757px #fff, 287px 1272px #fff;
  }

  @keyframes animStar {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }
`,k=({label:x,placeholder:p,description:o,type:r,value:t,onChange:n,required:e})=>f.jsx(tf,{children:f.jsxs("div",{className:"input__container",children:[f.jsx("label",{className:"input__label",children:x}),f.jsx("input",{placeholder:p,className:"input",type:r,value:t,onChange:n,required:e}),f.jsx("p",{className:"input__description",children:o})]})}),tf=w.div`
  width: 100%;

  .input__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: rgba(255, 255, 255, 0.3);
    padding: 15px;
    border-radius: 20px;
    position: relative;
  }

  .input__container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(25px);
    border-radius: 20px;
    background-color: #e499ff;
    background-image: radial-gradient(at 47% 69%, hsla(17,62%,65%,1) 0px, transparent 50%),
                      radial-gradient(at 9% 32%, hsla(222,75%,60%,1) 0px, transparent 50%);
  }

  .input__label {
    display: block;
    margin-left: 0.4em;
    color: #000;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: bold;
  }

  .input__description {
    font-size: 0.6em;
    font-weight: bold;
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
  }

  .input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0.6em;
    padding-left: 0.9em;
    border-radius: 20px;
    background: #fff;
    color: #000;
    transition: background 300ms, color 300ms;
  }

  .input:hover, .input:focus {
    background: rgb(0, 0, 0);
    color: #fff;
  }
`,of=({onLogin:x})=>{const{t:p}=v(),[o,r]=s.useState(""),[t,n]=s.useState(""),e=a=>{a.preventDefault(),o.trim()&&t.trim()&&(localStorage.setItem("mal_username",o.trim()),localStorage.setItem("mal_client_id",t.trim()),x())};return f.jsxs("div",{className:"relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-12 transition-colors duration-300",children:[f.jsx(xf,{}),f.jsx("div",{className:"absolute right-6 top-6 z-10 flex items-center gap-4",children:f.jsx(j,{})}),f.jsxs("div",{className:"z-10 w-full max-w-sm p-6",children:[f.jsxs("div",{className:"mb-10 flex flex-col items-center text-center",children:[f.jsx("h1",{className:"text-5xl font-black tracking-tight text-[#F1F5F9] drop-shadow-lg",children:"malmetrics"}),f.jsx("p",{className:"mt-3 text-sm font-medium text-[#94A3B8]",children:p("login.subtitle")})]}),f.jsxs("form",{onSubmit:e,className:"flex w-full flex-col gap-8",children:[f.jsx(k,{label:p("login.username_label"),placeholder:p("login.username_placeholder"),description:p("login.username_desc","What do you want to call yourself?"),type:"text",value:o,onChange:a=>r(a.target.value),required:!0}),f.jsx(k,{label:p("login.client_id_label"),placeholder:p("login.client_id_placeholder"),description:p("login.client_id_desc","Your secret API connection string"),type:"password",value:t,onChange:a=>n(a.target.value),required:!0}),f.jsx("button",{type:"submit",className:"mt-2 w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95",children:p("login.submit")})]}),f.jsxs("div",{className:"mt-10 flex flex-col items-center gap-2 text-center text-sm",children:[f.jsx("span",{className:"font-medium text-[#94A3B8]",children:p("login.help_text")}),f.jsxs("a",{href:"https://Afard-max.github.io/malmetrics-docs/",target:"_blank",rel:"noreferrer",className:"flex items-center gap-1 font-bold text-[#06B6D4] transition-colors hover:text-[#7C3AED] hover:underline",children:[f.jsx(T,{size:14}),p("login.help_link")]})]})]})]})},sf=s.lazy(()=>g(()=>import("./Dashboard-DE-bk_w8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(x=>({default:x.Dashboard}))),nf=s.lazy(()=>g(()=>import("./ScoresPanel-DNN1onwM.js"),__vite__mapDeps([8,1,2,3,6,7])).then(x=>({default:x.ScoresPanel}))),af=s.lazy(()=>g(()=>import("./SeasonalPanel--dv53B4h.js"),__vite__mapDeps([9,1,2,3,5,4,7])).then(x=>({default:x.SeasonalPanel}))),rf=s.lazy(()=>g(()=>import("./CommunityPanel-YkDwGBFQ.js"),__vite__mapDeps([10,1,2,3,4,6,7])).then(x=>({default:x.CommunityPanel}))),cf=s.lazy(()=>g(()=>import("./FranchisePanel-BACRVpni.js"),__vite__mapDeps([11,1,2,7,3,4])).then(x=>({default:x.FranchisePanel}))),lf=()=>{const[x,p]=s.useState(!1);return s.useEffect(()=>{const o=localStorage.getItem("mal_username"),r=localStorage.getItem("mal_client_id");o&&r&&p(!0)},[]),x?f.jsx(z,{children:f.jsxs("div",{className:"flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#0D0D1A] dark:to-[#1A0A2E] dark:text-[#F1F5F9]",children:[f.jsx(pf,{}),f.jsxs("div",{className:"relative flex flex-1 overflow-hidden",children:[f.jsx(J,{}),f.jsx("main",{className:"flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6",children:f.jsx(s.Suspense,{fallback:f.jsx("div",{className:"flex h-full w-full items-center justify-center p-8 font-mono text-sm opacity-70",children:"Cargando módulo..."}),children:f.jsxs(R,{children:[f.jsx(_,{path:"/",element:f.jsx(sf,{})}),f.jsx(_,{path:"/seasons",element:f.jsx(af,{})}),f.jsx(_,{path:"/scores",element:f.jsx(nf,{})}),f.jsx(_,{path:"/community",element:f.jsx(rf,{})}),f.jsx(_,{path:"/franchises",element:f.jsx(cf,{})})]})})})]})]})}):f.jsx(of,{onLogin:()=>p(!0)})},df={na:"N/D"},mf={overview:"Resumen",seasons:"Temporadas",scores:"Mis Puntajes",community:"Comunidad",franchises:"Franquicias"},uf={completed:"Completado",watching:"Viendo",plan_to_watch:"Planeo Ver",on_hold:"En Pausa",dropped:"Abandonado"},hf={total_episodes:"Episodios Totales",avg_score:"Puntaje Promedio",top_genre:"Género Principal",top_studio:"Estudio Principal",total_days:"Días Totales"},_f={winter:"Invierno",spring:"Primavera",summer:"Verano",fall:"Otoño",evolution:"Evolución",most_productive:"Temporada más productiva",least_active:"Temporada menos activa",completed_animes:"animes completados",best_scored:"Mejor puntuado",worst_scored:"Menor puntuado",current_airing:"Emisión Actual (Ranking por Popularidad)"},gf={cover:"Portada",title:"Título",mal_score:"Score MAL",members:"Miembros",list_status:"Estado (Lista)",anime:"Anime",my_status:"Mi Estado"},bf={log_scale_note:"Eje Y: Log₁₀(n+1)",most_frequent:"★ Más frecuente",average:"Promedio",personal_score:"Puntaje Personal",community_score:"Puntaje Comunidad",animes:"Animes",linear_scale:"Escala Lineal",log_scale:"Escala Logarítmica",quantity:"Cantidad",score:"Puntaje"},vf={rate_limit:"Rate limit — reintentando…",unauthorized:"Sesión expirada. Verifica tu Client ID.",forbidden:"Acceso denegado por la API de MAL.",not_found:"Recurso no encontrado.",no_internet:"Sin conexión a internet"},wf={refresh:"Actualizar datos",search_placeholder:"Buscar franquicia o anime...",in_my_list:"✓ En mi lista",missing_from_list:"Falta en lista"},yf={no_anime:"No se encontraron animes.",suggestion:"Agrega animes a tu lista en MyAnimeList.net"},Af={all:"Todos",completed_only:"Solo Completados",watching_only:"Solo Viendo"},kf={mean:"Media",median:"Mediana",mode:"Moda",std_dev:"Desviación estándar",min:"Mínimo",max:"Máximo",metrics:"Métricas"},jf={discrepancy:"Análisis de Discrepancia",top_airing:"Top 20 Global (Emisión Actual)",top_all_time:"Top 10 Histórico MAL",personal:"Personal",community:"Comunidad"},Cf={no_relations:"La obra seleccionada no tiene secuelas ni precuelas registradas en la base de datos.",unknown:"Desconocido",download_png:"Descargar PNG (Alta Resolución)",download_svg:"Descargar SVG (Vectorial)",export_pdf:"Exportar PDF (Auto-encuadre)",close_graph:"Cerrar Grafo",mapping_connections:"Mapeando conexiones topológicas...",querying_api:"Consultando matriz en la API de MAL",select_seed:"Seleccione un Nodo Semilla",personal:"Personal",global:"Global",status:"Estado",episodes:"Episodios"},Ef={title:"Bienvenido a MALmetrics",subtitle:"Ingresa tus credenciales para renderizar el dashboard",username_label:"Usuario de MyAnimeList",username_placeholder:"ej. TuNombreDeUsuario",client_id_label:"Client ID (API)",client_id_placeholder:"Cadena alfanumérica",submit:"Acceder al Dashboard",help_text:"¿No sabes cómo obtener tu Client ID?",help_link:"Lee el manual de 3 pasos aquí",username_desc:"El nombre público de tu perfil",client_id_desc:"Tu llave secreta de conexión a la API"},Pf={common:df,nav:mf,status:uf,kpi:hf,seasons:_f,table:gf,charts:bf,errors:vf,actions:wf,empty:yf,filters:Af,stats:kf,community:jf,franchise:Cf,login:Ef},Sf={na:"N/A"},Nf={overview:"Overview",seasons:"Seasons",scores:"My Scores",community:"Community",franchises:"Franchises"},Lf={completed:"Completed",watching:"Watching",plan_to_watch:"Plan to Watch",on_hold:"On Hold",dropped:"Dropped"},Mf={total_episodes:"Total Episodes",avg_score:"Average Score",top_genre:"Top Genre",top_studio:"Top Studio",total_days:"Total Days"},Df={winter:"Winter",spring:"Spring",summer:"Summer",fall:"Fall",evolution:"Evolution",most_productive:"Most Productive Season",least_active:"Least Active Season",completed_animes:"completed animes",best_scored:"Best Scored",worst_scored:"Worst Scored",current_airing:"Currently Airing (Popularity Ranking)"},If={cover:"Cover",title:"Title",mal_score:"MAL Score",members:"Members",list_status:"Status (List)",anime:"Anime",my_status:"My Status"},$f={log_scale_note:"Y-Axis: Log₁₀(n+1)",most_frequent:"★ Most frequent",average:"Average",personal_score:"Personal Score",community_score:"Community Score",animes:"Animes",linear_scale:"Linear Scale",log_scale:"Logarithmic Scale",quantity:"Quantity",score:"Score"},Ff={rate_limit:"Rate limit — retrying…",unauthorized:"Session expired. Check your Client ID.",forbidden:"Access denied by MAL API.",not_found:"Resource not found.",no_internet:"No internet connection"},Tf={refresh:"Refresh data",search_placeholder:"Search franchise or anime...",in_my_list:"✓ In my list",missing_from_list:"Missing from list"},zf={no_anime:"No anime found.",suggestion:"Add anime to your list on MyAnimeList.net"},Rf={all:"All",completed_only:"Completed Only",watching_only:"Watching Only"},qf={mean:"Mean",median:"Median",mode:"Mode",std_dev:"Standard Deviation",min:"Minimum",max:"Maximum",metrics:"Metrics"},Bf={discrepancy:"Discrepancy Analysis",top_airing:"Global Top 20 (Currently Airing)",top_all_time:"MAL All-Time Top 10",personal:"Personal",community:"Community"},Gf={no_relations:"The selected work has no sequels or prequels registered in the database.",unknown:"Unknown",download_png:"Download PNG (High Resolution)",download_svg:"Download SVG (Vector)",export_pdf:"Export PDF (Auto-framing)",close_graph:"Close Graph",mapping_connections:"Mapping topological connections...",querying_api:"Querying MAL API matrix",select_seed:"Select a Seed Node",personal:"Personal",global:"Global",status:"Status",episodes:"Episodes"},Of={title:"Welcome to MALmetrics",subtitle:"Enter your credentials to render the dashboard",username_label:"MyAnimeList Username",username_placeholder:"e.g. YourUsername",username_desc:"What do you want to call yourself?",client_id_label:"Client ID (API)",client_id_placeholder:"Alphanumeric string",client_id_desc:"Your secret API connection string",submit:"Access Dashboard",help_text:"Don't know how to get your Client ID?",help_link:"Read the 3-step manual here"},Vf={common:Sf,nav:Nf,status:Lf,kpi:Mf,seasons:Df,table:If,charts:$f,errors:Ff,actions:Tf,empty:zf,filters:Rf,stats:qf,community:Bf,franchise:Gf,login:Of},Uf={na:"なし"},Yf={overview:"概要",seasons:"シーズン",scores:"スコア",community:"コミュニティ",franchises:"シリーズ"},Wf={completed:"完了",watching:"視聴中",plan_to_watch:"視聴予定",on_hold:"一時停止",dropped:"ドロップ"},Hf={total_episodes:"総エピソード数",avg_score:"平均スコア",top_genre:"トップジャンル",top_studio:"トップスタジオ",total_days:"合計日数"},Zf={winter:"冬",spring:"春",summer:"夏",fall:"秋",evolution:"進化",most_productive:"最も生産的なシーズン",least_active:"最も活動の少ないシーズン",completed_animes:"視聴完了アニメ",best_scored:"最高評価",worst_scored:"最低評価",current_airing:"現在放送中（人気ランキング）"},Qf={cover:"カバー",title:"タイトル",mal_score:"MALスコア",members:"メンバー",list_status:"ステータス（リスト）",anime:"アニメ",my_status:"マイステータス"},Jf={log_scale_note:"Y軸: Log₁₀(n+1)",most_frequent:"★ 最多",average:"平均",personal_score:"マイスコア",community_score:"コミュニティスコア",animes:"作品",linear_scale:"線形スケール",log_scale:"対数スケール",quantity:"数量",score:"スコア"},Xf={rate_limit:"レート制限 — 再試行中…",unauthorized:"セッション期限切れ。Client IDを確認してください。",forbidden:"MAL APIによるアクセス拒否。",not_found:"リソースが見つかりません。",no_internet:"インターネット接続がありません"},Kf={refresh:"データを更新",search_placeholder:"シリーズやアニメを検索...",in_my_list:"✓ リストに追加済み",missing_from_list:"リストにありません"},fp={no_anime:"アニメが見つかりません。",suggestion:"MyAnimeList.netでリストにアニメを追加してください"},pp={all:"すべて",completed_only:"完了のみ",watching_only:"視聴中のみ"},xp={mean:"平均値",median:"中央値",mode:"最頻値",std_dev:"標準偏差",min:"最小値",max:"最大値",metrics:"メトリクス"},ep={discrepancy:"乖離分析",top_airing:"グローバル トップ20 (現在放送中)",top_all_time:"MAL 歴代トップ10",personal:"個人",community:"コミュニティ"},tp={no_relations:"選択した作品には、データベースに登録されている続編や前日譚がありません。",unknown:"不明",download_png:"PNGをダウンロード（高解像度）",download_svg:"SVGをダウンロード（ベクター）",export_pdf:"PDFをエクスポート（自動フレーミング）",close_graph:"グラフを閉じる",mapping_connections:"トポロジー接続をマッピング中...",querying_api:"MAL APIマトリックスを照会中",select_seed:"シードノードを選択してください",personal:"個人",global:"グローバル",status:"ステータス",episodes:"エピソード"},op={title:"MALmetricsへようこそ",subtitle:"ダッシュボードを表示するには認証情報を入力してください",username_label:"MyAnimeListユーザー名",username_placeholder:"例: YourUsername",client_id_label:"クライアントID（API）",client_id_placeholder:"英数字の文字列",submit:"ダッシュボードにアクセス",help_text:"クライアントIDの取得方法がわかりませんか？",help_link:"3ステップのマニュアルはこちら",username_desc:"公開プロフィール名",client_id_desc:"API接続用のシークレットキー"},sp={common:Uf,nav:Yf,status:Wf,kpi:Hf,seasons:Zf,table:Qf,charts:Jf,errors:Xf,actions:Kf,empty:fp,filters:pp,stats:xp,community:ep,franchise:tp,login:op},np={na:"N/D"},ap={overview:"Visão Geral",seasons:"Temporadas",scores:"Minhas Notas",community:"Comunidade",franchises:"Franquias"},rp={completed:"Concluído",watching:"Assistindo",plan_to_watch:"Planejo Assistir",on_hold:"Em Espera",dropped:"Abandonado"},ip={total_episodes:"Episódios Totais",avg_score:"Nota Média",top_genre:"Gênero Principal",top_studio:"Estúdio Principal",total_days:"Dias Totais"},cp={winter:"Inverno",spring:"Primavera",summer:"Verão",fall:"Outono",evolution:"Evolução",most_productive:"Temporada mais produtiva",least_active:"Temporada menos ativa",completed_animes:"animes concluídos",best_scored:"Melhor avaliado",worst_scored:"Pior avaliado",current_airing:"Em Transmissão (Ranking de Popularidade)"},lp={cover:"Capa",title:"Título",mal_score:"Score MAL",members:"Membros",list_status:"Status (Lista)",anime:"Anime",my_status:"Meu Status"},dp={log_scale_note:"Eixo Y: Log₁₀(n+1)",most_frequent:"★ Mais frequente",average:"Média",personal_score:"Nota Pessoal",community_score:"Nota da Comunidade",animes:"Animes",linear_scale:"Escala Linear",log_scale:"Escala Logarítmica",quantity:"Quantidade",score:"Pontuação"},mp={rate_limit:"Limite de taxa — tentando novamente…",unauthorized:"Sessão expirada. Verifique seu Client ID.",forbidden:"Acesso negado pela API do MAL.",not_found:"Recurso não encontrado.",no_internet:"Sem conexão com a internet"},up={refresh:"Atualizar dados",search_placeholder:"Buscar franquia ou anime...",in_my_list:"✓ Na minha lista",missing_from_list:"Ausente da lista"},hp={no_anime:"Nenhum anime encontrado.",suggestion:"Adicione animes à sua lista no MyAnimeList.net"},_p={all:"Todos",completed_only:"Apenas Concluídos",watching_only:"Apenas Assistindo"},gp={mean:"Média",median:"Mediana",mode:"Moda",std_dev:"Desvio Padrão",min:"Mínimo",max:"Máximo",metrics:"Métricas"},bp={discrepancy:"Análise de Discrepância",top_airing:"Top 20 Global (Em Transmissão)",top_all_time:"Top 10 Histórico MAL",personal:"Pessoal",community:"Comunidade"},vp={no_relations:"A obra selecionada não possui sequências ou prequelas registradas no banco de dados.",unknown:"Desconhecido",download_png:"Baixar PNG (Alta Resolução)",download_svg:"Baixar SVG (Vetorial)",export_pdf:"Exportar PDF (Enquadramento Automático)",close_graph:"Fechar Grafo",mapping_connections:"Mapeando conexões topológicas...",querying_api:"Consultando matriz na API do MAL",select_seed:"Selecione um Nó Semente",personal:"Pessoal",global:"Global",status:"Status",episodes:"Episódios"},wp={title:"Bem-vindo ao MALmetrics",subtitle:"Insira suas credenciais para carregar o dashboard",username_label:"Nome de usuário do MyAnimeList",username_placeholder:"ex: SeuUsuário",client_id_label:"Client ID (API)",client_id_placeholder:"String alfanumérica",submit:"Acessar Dashboard",help_text:"Não sabe como obter seu Client ID?",help_link:"Leia o manual em 3 passos aqui",username_desc:"O nome público do seu perfil",client_id_desc:"Sua chave secreta de conexão à API"},yp={common:np,nav:ap,status:rp,kpi:ip,seasons:cp,table:lp,charts:dp,errors:mp,actions:up,empty:hp,filters:_p,stats:gp,community:bp,franchise:vp,login:wp},Ap={na:"无"},kp={overview:"概览",seasons:"季度",scores:"我的评分",community:"社区",franchises:"系列"},jp={completed:"已完成",watching:"观看中",plan_to_watch:"计划观看",on_hold:"搁置",dropped:"弃坑"},Cp={total_episodes:"总集数",avg_score:"平均分",top_genre:"最爱类型",top_studio:"最爱工作室",total_days:"总天数"},Ep={winter:"冬季",spring:"春季",summer:"夏季",fall:"秋季",evolution:"演变",most_productive:"最多产的季度",least_active:"最不活跃的季度",completed_animes:"部已完成动漫",best_scored:"最高分",worst_scored:"最低分",current_airing:"当前播出（人气排名）"},Pp={cover:"封面",title:"标题",mal_score:"MAL评分",members:"成员",list_status:"状态 (列表)",anime:"动漫",my_status:"我的状态"},Sp={log_scale_note:"Y轴: Log₁₀(n+1)",most_frequent:"★ 最频繁",average:"平均",personal_score:"个人评分",community_score:"社区评分",animes:"部动漫",linear_scale:"线性刻度",log_scale:"对数刻度",quantity:"数量",score:"评分"},Np={rate_limit:"速率限制 — 重试中…",unauthorized:"会话已过期。请检查您的 Client ID。",forbidden:"被 MAL API 拒绝访问。",not_found:"找不到资源。",no_internet:"无网络连接"},Lp={refresh:"刷新数据",search_placeholder:"搜索系列或动漫...",in_my_list:"✓ 在我的列表中",missing_from_list:"不在列表中"},Mp={no_anime:"未找到动漫。",suggestion:"请在 MyAnimeList.net 上将动漫添加到您的列表中"},Dp={all:"全部",completed_only:"仅已完成",watching_only:"仅观看中"},Ip={mean:"平均数",median:"中位数",mode:"众数",std_dev:"标准差",min:"最小值",max:"最大值",metrics:"指标"},$p={discrepancy:"差异分析",top_airing:"全球前20名 (当前播出)",top_all_time:"MAL 历史前10名",personal:"个人",community:"社区"},Fp={no_relations:"所选作品在数据库中没有注册的续集或前传。",unknown:"未知",download_png:"下载PNG（高分辨率）",download_svg:"下载SVG（矢量）",export_pdf:"导出PDF（自动排版）",close_graph:"关闭图表",mapping_connections:"正在映射拓扑连接...",querying_api:"正在查询MAL API矩阵",select_seed:"选择一个种子节点",personal:"个人",global:"全局",status:"状态",episodes:"集数"},Tp={title:"欢迎使用 MALmetrics",subtitle:"输入您的凭据以加载仪表盘",username_label:"MyAnimeList 用户名",username_placeholder:"例如：YourUsername",client_id_label:"客户端 ID（API）",client_id_placeholder:"字母数字字符串",submit:"进入仪表盘",help_text:"不知道如何获取客户端 ID？",help_link:"点击此处阅读三步指南",username_desc:"您的公开个人资料名称",client_id_desc:"您的专属 API 连接密钥"},zp={common:Ap,nav:kp,status:jp,kpi:Cp,seasons:Ep,table:Pp,charts:Sp,errors:Np,actions:Lp,empty:Mp,filters:Dp,stats:Ip,community:$p,franchise:Fp,login:Tp},Rp={es:{translation:Pf},en:{translation:Vf},ja:{translation:sp},pt:{translation:yp},zh:{translation:zp}},qp=localStorage.getItem("mal_dashboard_lang")||"es";V.use(q).init({resources:Rp,lng:qp,fallbackLng:"es",interpolation:{escapeValue:!1}});const Bp=new U({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:!1}}});B.createRoot(document.getElementById("root")).render(f.jsx(G.StrictMode,{children:f.jsx(O,{client:Bp,children:f.jsx(lf,{})})}));

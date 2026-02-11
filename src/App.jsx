import { useState, useEffect, useCallback } from "react";

const IMG = {
  leBandit: "data:image/jpeg;base64,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",
  goldTractor: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCACMAFQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDn7d41LYfkjGG4/XpS3LEeWCCMKBVI96ckrp9xiB6dvyrRXR18+li7ZgPOm7lepFWLk+bDHIyqGyVOBiqEVzsfcYxn1Xj9Ks+as0IUPtCkn519fcVXNZalxkuWwIHBGxmU+xq5Eb5sgASAf3hUFurh9yAOM/wMDV6WcNAi4KnzBx0PFZud5WsVBu5VN2CCJYRx1ANQGSzY9GQ+4pt4R9rlweNxpttGsrsXyVVSxA6mtOUOdt2J0eEIUWcDnKtnoahNsCcvcIV9jkmo7uFEkBQHawDDPUVFFCJXxkKAMkntRrsJy1tY0z9nwoyMAY78UVlywiN8A7gRkEd6KLyDmFuYtlyyIMjtn3quRjOe3rVuVJpJDIvPQcVXMMuNxQgf3iQAfz601JPYymrDBVuB5HiMSLuzzwM1T6Ng8GtbTsxW+8EqZHCZB5x1NFk9xQXMyxZWgVFaWMux+6ucYHqa6W10JZbFnDyK5HyKTkVS021klvGRic7snccnGPWt65v0tr2GBSMDhhXjY7ESclTpHRZpWjuef6hugnKvFGSOORg1Vjugm4CLG4YOG/xrqfF2nASidB8snOfeuSli8plwQT7V3YWrGrTUupjKTTuidpknIyWXauOQKZHKkZbknIx0psNtNONyRsRnqBQbO4X/AJYv/wB811WY+Z72HyTI5XtgY6UVH9nmOT5b5+lFO0h3l2IbdtsqljlRyRnGcDOKhmuPMlLSsWc9eOn+FOJ5PJ/Ee1VZVKvz35qHpsc07k4ZXHBBq6JJorRdoDxkna4z8p7g1m21vNcSEQLuZRuPOMCr9jfSW2RgMjH542HBxQmQm0auia5eafdmaQNPAQBIGGdoPQg9q0Ly+mactGFLMfmfOSfp6VzFxdT33+jwqdi8JEvRQPX/ABNWbO3WdjFuljlVQcds9/6VzypQU3UW5vSq8ujO+h/4m2hmJx+9jHH9K4i9sZInclTjtxV/w7fy2uspHNMywRg+aC3y+gzWrqzC4lfyJFijbkNKDz9F6/niuCiqlCq4xV09TRuMkYNrta2RGK/KpIBPfNPkEaDIbH+6xqO40u5ILQTwzn+6vB/AGslnkDEFMEcEEYINeopOTuh86OgitWZAZJpAx7B+lFc950lFV7wudHVw+ELkn5sKPdqvjwlapEftJRlAyc9BVrUp7+3ldWkbafukcA1hQXN/dnYFeSXuM8D6noBXkU3iaq5lJWNVFJXbVjK1PSLayvI47S4dreVlDO3Rc9u361JNoDRuCTlDwDHnn2x2NaUllM1m4lIaMLiR1XtntnrWdfX9vYW7fZboLLCyqbeRX3ue5U9Av1966aVSo/df9eZyzjFK6NOx06O18pRCjSyHCQnnt1b39u31rO1aWeO5eU2y288R2F4kIR1PQ/UdK0/Dl5DM41CVgj4I8sruJ/3fQUXlrJq1w0jyiFXbds279wGAFwD+OKmNWTnyyKcFy3RzUE7QyebG6mRhkkjO0/41ajvrjJZ/3i9TkYP51rnw1abPOF7MQcA/IvJzgADtzxit3T/B1pBFi6llnY/eUHYo9uOTXVJ3ehlc5uORZIwykEHnNR3EEVxKkk2AeFdz6ep+n8qteJNPGi3wWyIW3mTzNjHJQjg/gazJLxWtHBxvYbcevvQ4uxeqSZsN4NnzxsI9QRRVOw8Sz21okEssxMY2qVGcr2/worgf1tdUbLlavdHS6ZqcOqQfZ7nBfHB9f/r1m31pPp10JYSRg8EdGHcGsDTZzFdqARyMcfSuvtb1L6L7PPySODSnSlhpc8PhfQ1jqvIeky3lsJIGDMCDtbsR2PpVW4+x7Q11pxJj6Ztw+PoRmr2laFaxoLp2laWQcEOVCj8Op+tZupX6Q3nk22y99fM4KHOMAjr0zXoRTlqjk5byajqWbNDfSebbReWh6ylS5H0UcZ+tY/iy0ul1HSPstlNGGfc8kmCzvn+LHYKPpya0Y7rfG5kgjE44BXcM/wBazNXkmjhV5PlSQkbUGM49e5H1pxim7IUYOckjodMurW71Py4mVo4nJOP4nPIPuODz6iqviDxRPaTbNNjWQRnDyNypPoB3+tZEFvcaVqFvNcoUicYLo2RsbgnI6YyDWfqH7tvIONyMQw+nFXOKi9C6tNRl7rujat7O58WtJfSMtrH/AKvBBbBHZRxx7+9cddQzWt28UgYsjFQShG4diM9jXovhKHZobPHMDPLuIBORH2HHbOMn1qXxJCosDO0hEwYMOclQcbgD6Z5+tKUm0TKcp2j2PPY7S8lXclpMy+u3GfzorpmuWkO8kknnJorC9TyOj2Ee5zcT7bhDuHDDtWjDLHP5kZEj+X8reX1BxVC4UKEZRjHB4rU0e2a5g1C4jyXaQqoHfCj+projKMo3ehpTXvcrZBZG7MgS3EqswJUqSuMHrmp7NWgu5fPkG/YTvVgcHPXNSWUEztcxSIVMIXarZXCEcZH1Bqu021GikjBj3EbR0Kk9qrn5o3Co24J6amzBrEMcReYSBVAzIUO0++azL68nujHMkTLBtOAw5OepPpxU5+yNZpCGjRYyAyu2VUA8H9BTbyO8jnhtHRmhnfYZD93GM8471yRruSUoL7yY01H3i9p+rxi1V5TuKQiLbjJbBOePyrAvniu76S4khQO/O0k4x07EfmM/SrkOmWtw2owbtiW7gF93IyoJOfz/ACqy+kNmzVm8wKD8y/xnb1rqbi+ovq3Ndpr+mU7HVY9GvfN2MUEZQomOG4+Vv55our24vLiFp2z8rYHpuGf/AK34VWlUXtuCti0StIVWYgbRg45x3zxg0kqNDOgfZkH7ygjNSrKSSYo0oxejuaNu2YEPsKKhtm/cJ9KKGtS2Zcjlo2UZBNXtIuNQgiS3tbiLYMnbJADz9Rg/jWW6sjFW6itvQYwZRwWYjCqoySfYVzSdoW3LcU/eYf2jf2epS3ZjtvPmiWN1LMVBHcDv+feqd3c3N/OZLpoy23A8tNoxn689TW7ceH7+4naVrZlQnOC65/LNQy6NJvSGGFknAJxL8gcegPQnpVU7RadtTGXIlo9TJszeLYtaIbbyctuBh3Ft3Xkn+VT2c2pWn2YMY7iO2BCRuxAPPBJ7kDgelSy219p6tNLZyRqgyxYrjH51Vl1aWTHlxrEe/O7+launB9DON5fCTx/bVmvJEMKC8bMgaPee/Gcgdz2qOM3mmCEWty4RG3LDJ8ydMHjrjnsaji1O4X7zRP8AVMU4z3F1L/qN744CHt7DrRyx2sOUZR1Zbu9aub6S2glhghXzAx8vJJPPrUWqxbHVunGadaaPqFxOZPs7hoyP3ZGD+OeB+PNX9ZsbowAm1kBQc7SG4/CsHHkkuRaF05x6sxI7wIm3aD+NFUd3tRW1ps20GOjqAzdz3rq/At5ZxS3ZuJoYpiFWPewXI5zjPvise7lgkTbhsjjis1oYTn5dw9zUwc5LVWMZR5lY9jMse3PmJt9dwrF1bVtMiTZcXVuqDkhmBJ/DrXmn2WDtEB+NOW0gHSJa15WZLDy7nXXviDw9dWe15jI7KUx5TEgdjyODXGC6XA65HerKwRjoij8Kd5S+g/KnZrZm0Kbh1KwuVJ6Vp+H9UtrPUg90hMbr5YYjIQkj5j9Bmq3lLSGJcc0WfVlSTkrM9YtHtfs6C1lieMdCjhs++fWor+aCKENLNEmDwWcCvKvJiB+6tSxW1u0g3IoPrjNRJaanN7F9yXXHhbVp2sSkkLENlCMZI5x+NFXxaQoAF2gUVh7VGybSsYhzQcYH61MzZgUYFQV1Rdx3HrThTBUgqikxwp2KQU4UDuJikxTqRjgUhNkiQo0TMWAI7UxVXP1NMRizhTwDWhHax4yQT9TXPUqqG5JW809cgUVppbwbf9Sn5UVy/W6f8oj/2Q==",
  mines: "data:image/jpeg;base64,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",
  slide: "data:image/jpeg;base64,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",
  snakes: "data:image/jpeg;base64,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",
  chicken: "data:image/jpeg;base64,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",
  olympus: "data:image/jpeg;base64,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",
};

const GAMES = [
  { name: "Gates of Olympus", img: IMG.olympus, tag: "Popular" },
  { name: "Mines", img: IMG.mines, tag: "Stake Original" },
  { name: "Chicken", img: IMG.chicken, tag: "Stake Original" },
  { name: "Le Bandit", img: IMG.leBandit, tag: "Slots" },
  { name: "Gold Digger", img: IMG.goldTractor, tag: "Slots" },
  { name: "Slide", img: IMG.slide, tag: "Stake Original" },
  { name: "Snakes", img: IMG.snakes, tag: "Stake Original" },
];

const PRIZES = {1:400,2:200,3:140,4:60,5:60,6:60,7:50,8:50,9:50,10:50};
const TOTAL_POOL = Object.values(PRIZES).reduce((a,b)=>a+b,0);
const fmt = n=>"$"+Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});

const SAMPLE = Array.from({length:20},(_,i)=>{
  const names=["ki****26","SirMo****rma","je****520","ra****99","de****ak","vi****sh","gu****ep","sa****11","pr****ik","am****77","ro****42","su****nd","ma****jj","ha****19","ni****88","aj****kr","pa****lv","di****33","sh****an","ta****06"];
  const wagers=[21705.9,16034.1,7386.19,5200,4100.5,3800,3200.75,2900,2500,2100.3,1950,1820.5,1700,1580.25,1420,1300,1180.75,1050,980.5,870];
  return {rank:i+1,user:names[i],wagered:wagers[i]};
});

// ─── SECURITY: SHA-256 hash (kept for reference only — JWT is used now) ───
async function hashStr(str){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
const ADMIN_HASH = "41c991eb6a66242c0454191244278183ce58cf4a6bcd372f799e4b9cc01886af";

// ─── FINAL: Vite ENV + API Base ───
const API_URL_ENV = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) || "";
const API_BASE = API_URL_ENV
  ? API_URL_ENV.replace(/\/+$/, "").endsWith("/api")
    ? API_URL_ENV.replace(/\/+$/, "")
    : API_URL_ENV.replace(/\/+$/, "") + "/api"
  : "http://localhost:5000/api";
const IS_PROD = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.MODE === "production";
if (IS_PROD && !API_URL_ENV) {
  throw new Error("VITE_API_URL is required in production. Set it in hosting env.");
}
const api = (p) => API_BASE + p;

// ─── SECURITY: Anti-inspect (DEV only — production mein disabled) ───
if(typeof window!=="undefined"&&!IS_PROD){
  const block=e=>e.preventDefault();
  document.addEventListener("contextmenu",block);
  document.addEventListener("keydown",e=>{
    if(e.key==="F12"||(e.ctrlKey&&e.shiftKey&&["I","J","C"].includes(e.key))||(e.ctrlKey&&(e.key==="u"||e.key==="s")))e.preventDefault();
  });
}

// ─── SECURITY: Rate limiter ───
const rateLimit=(()=>{
  const map=new Map();
  return (key,maxPerMin=2)=>{
    const now=Date.now();const arr=map.get(key)||[];
    const recent=arr.filter(t=>now-t<60000);
    if(recent.length>=maxPerMin)return false;
    recent.push(now);map.set(key,recent);return true;
  };
})();

// ─── SECURITY: Input sanitizer ───
const sanitize=s=>s.replace(/[<>"'&\\;(){}]/g,"").trim().slice(0,30);

// ─── API-READY: Change this URL when backend is ready ───
// ─── FIX #2: Proper CSV parser (handles commas in names, quotes) ───
function parseCSVText(text){
  const lines=[];let cur="",inQ=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c==='"'){if(inQ&&text[i+1]==='"'){cur+='"';i++}else inQ=!inQ}
    else if(c==="\n"&&!inQ){lines.push(cur);cur=""}
    else if(c==="\r"&&!inQ){}
    else cur+=c;
  }
  if(cur.trim())lines.push(cur);
  return lines.map(line=>{
    const cols=[];let f="",q=false;
    for(let i=0;i<line.length;i++){
      const c=line[i];
      if(c==='"'){if(q&&line[i+1]==='"'){f+='"';i++}else q=!q}
      else if(c===","&&!q){cols.push(f.trim());f=""}
      else f+=c;
    }
    cols.push(f.trim());return cols;
  });
}

// ─── API URL: Backend lagao toh yahan URL daalo ───
// ─── API helper: api("/leaderboard") → full URL ───

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');
@keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,40px)}}
@keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 15px rgba(34,211,238,0.3)}50%{box-shadow:0 0 30px rgba(34,211,238,0.6)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0e17;overflow-x:hidden}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0e17}::-webkit-scrollbar-thumb{background:#8b5cf644;border-radius:3px}
input:focus{border-color:#8b5cf6!important;box-shadow:0 0 0 3px rgba(139,92,246,0.15)!important}
.fi{animation:fadeUp 0.6s ease forwards}.glow{animation:glow 2s ease-in-out infinite}
@media(max-width:768px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}
@media(min-width:769px){.show-mobile{display:none!important}}
`;

const sty={
  card:{background:"rgba(15,20,35,0.8)",border:"1px solid rgba(139,92,246,0.15)",borderRadius:"20px",padding:"32px",marginBottom:"24px",backdropFilter:"blur(10px)"},
  pill:{padding:"10px 24px",borderRadius:"50px",background:"rgba(15,20,35,0.9)",border:"1px solid rgba(139,92,246,0.2)",fontSize:"13px",fontWeight:700,color:"#a78bfa",letterSpacing:"1px"},
  input:{width:"100%",padding:"16px 18px",borderRadius:"12px",border:"1px solid rgba(139,92,246,0.2)",background:"rgba(10,14,23,0.8)",color:"#e2e8f0",fontSize:"15px",fontWeight:600,outline:"none",boxSizing:"border-box",minHeight:"48px"},
  btn:{width:"100%",padding:"16px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",color:"#fff",fontSize:"16px",fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",marginTop:"12px",minHeight:"52px"},
};

function useIsMobile(){
  const[m,setM]=useState(typeof window!=="undefined"&&window.innerWidth<769);
  useEffect(()=>{const h=()=>setM(window.innerWidth<769);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  return m;
}

function Nav({page,setPage,isMobile}){
  if(isMobile)return null;
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,14,23,0.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(139,92,246,0.15)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"70px"}}>
      <div onClick={()=>{setPage("home");window.scrollTo(0,0)}} style={{fontSize:"24px",fontWeight:800,letterSpacing:"3px",background:"linear-gradient(135deg,#a78bfa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",cursor:"pointer",userSelect:"none",fontFamily:"Orbitron,sans-serif"}}>BADSHAH<span style={{fontSize:"13px",color:"#64748b",marginLeft:"8px",fontWeight:500,letterSpacing:"2px",fontFamily:"Rajdhani"}}>ANALYTICS</span></div>
      <div style={{display:"flex",gap:"8px"}}>
        {[["home","Home"],["leaderboard","Leaderboard"],["bonuses","Bonuses"]].map(([k,l])=>(
          <button key={k} style={{padding:"10px 22px",borderRadius:"10px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:700,letterSpacing:"1px",background:page===k?"linear-gradient(135deg,#8b5cf6,#6d28d9)":"transparent",color:page===k?"#fff":"#94a3b8",textTransform:"uppercase",minHeight:"44px"}} onClick={()=>setPage(k)}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

function BottomNav({page,setPage}){
  const tabs=[["home","Home","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"],["leaderboard","Board","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"],["bonuses","Bonus","M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4"]];
  return(
    <div className="show-mobile" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:"rgba(10,14,23,0.95)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(139,92,246,0.15)",display:"none",justifyContent:"space-around",padding:"8px 0 12px",paddingBottom:"max(12px, env(safe-area-inset-bottom))"}}>
      {tabs.map(([k,l,path])=>(
        <button key={k} onClick={()=>{setPage(k);window.scrollTo(0,0)}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"8px 16px",minHeight:"48px",minWidth:"48px"}}>
          <svg width="24" height="24" fill="none" stroke={page===k?"#8b5cf6":"#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={path}/></svg>
          <span style={{fontSize:"11px",fontWeight:700,color:page===k?"#a78bfa":"#64748b",letterSpacing:"1px"}}>{l}</span>
        </button>
      ))}
    </div>
  );
}

function Stats({data}){
  const tw=data.reduce((a,b)=>a+b.wagered,0);
  const items=[{v:fmt(TOTAL_POOL),l:"Weekly Prize Pool"},{v:fmt(tw),l:"Total Wagered"},{v:data.filter(d=>PRIZES[d.rank]).length+"",l:"Winners"},{v:data.length+"",l:"Participants"}];
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"12px",padding:"0 16px 40px",maxWidth:"900px",margin:"0 auto",position:"relative",zIndex:1}}>
      {items.map((it,i)=>(
        <div key={i} style={{...sty.card,padding:"20px",textAlign:"center"}} className="fi">
          <div style={{fontSize:"24px",fontWeight:800,background:"linear-gradient(135deg,#22d3ee,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{it.v}</div>
          <div style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"}}>{it.l}</div>
        </div>
      ))}
    </div>
  );
}

function GameShowcase(){
  return(
    <div style={{position:"relative",zIndex:1,padding:"20px 16px 50px",maxWidth:"1000px",margin:"0 auto"}}>
      <div style={{fontSize:"12px",color:"#64748b",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"20px",fontWeight:700,textAlign:"center"}}>Popular Games on Stake</div>
      <div style={{display:"flex",gap:"14px",paddingBottom:"10px",justifyContent:"center",flexWrap:"wrap"}}>
        {GAMES.map((g,i)=>(
          <div key={i} style={{width:"110px",textAlign:"center"}} className="fi">
            <div style={{width:"110px",height:"110px",borderRadius:"16px",overflow:"hidden",border:"2px solid rgba(139,92,246,0.2)",position:"relative"}}>
              <img src={g.img} alt={g.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",bottom:"6px",left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.7)",padding:"2px 8px",borderRadius:"6px",fontSize:"9px",color:"#a78bfa",fontWeight:700,whiteSpace:"nowrap"}}>{g.tag}</div>
            </div>
            <div style={{fontSize:"11px",color:"#94a3b8",marginTop:"8px",fontWeight:600}}>{g.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Platforms(){
  return(
    <div style={{display:"flex",justifyContent:"center",gap:"10px",marginBottom:"30px",flexWrap:"wrap"}}>
      {["Stake.com","Stake.ac","Stake.bet"].map(p=><div key={p} style={sty.pill}>{p}</div>)}
    </div>
  );
}

function Home({setPage}){
  return(
    <div>
      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"60px 16px 50px",background:"radial-gradient(ellipse at center top,rgba(139,92,246,0.12) 0%,transparent 60%)"}}>
        <div style={{fontSize:"clamp(36px,8vw,68px)",fontWeight:900,letterSpacing:"4px",lineHeight:1.1,background:"linear-gradient(135deg,#fff 0%,#a78bfa 50%,#22d3ee 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"16px",textTransform:"uppercase",fontFamily:"Orbitron,sans-serif"}}>BADSHAH<br/>ANALYTICS</div>
        <p style={{fontSize:"16px",color:"#94a3b8",maxWidth:"480px",margin:"0 auto 28px",lineHeight:1.6}}>India's #1 Stake Affiliate — Weekly Leaderboards, Exclusive Bonuses & Rewards</p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setPage("leaderboard")} style={{padding:"16px 36px",borderRadius:"14px",border:"none",background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",color:"#fff",fontSize:"15px",fontWeight:800,letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase",minHeight:"52px"}}>VIEW LEADERBOARD</button>
          <button onClick={()=>setPage("bonuses")} style={{padding:"16px 36px",borderRadius:"14px",border:"2px solid rgba(139,92,246,0.3)",background:"transparent",color:"#a78bfa",fontSize:"15px",fontWeight:800,letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase",minHeight:"52px"}}>CLAIM BONUSES</button>
        </div>
      </div>
      <Stats data={data}/>
      <GameShowcase/>
      <Platforms/>
      <div style={{textAlign:"center",padding:"0 16px 60px",position:"relative",zIndex:1}}>
        <div style={{...sty.card,maxWidth:"460px",margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:"11px",color:"#64748b",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"12px",fontWeight:700}}>Referral Code</div>
          <div style={{fontSize:"clamp(36px,8vw,48px)",fontWeight:900,fontFamily:"Orbitron,sans-serif",background:"linear-gradient(135deg,#22d3ee,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"8px"}}>BAD200</div>
          <p style={{fontSize:"13px",color:"#64748b",marginTop:"12px"}}>Sign up with this code to unlock all bonuses & join the leaderboard</p>
        </div>
      </div>
    </div>
  );
}

function Leaderboard({data,isMobile}){
  const top3=data.slice(0,3);const rest=data.slice(3);
  const pc={1:["rgba(255,215,0,0.15)","rgba(255,215,0,0.3)","#FFD700","1st"],2:["rgba(192,192,192,0.1)","rgba(192,192,192,0.2)","#C0C0C0","2nd"],3:["rgba(205,127,50,0.1)","rgba(205,127,50,0.2)","#CD7F32","3rd"]};
  return(
    <div style={{position:"relative",zIndex:1,padding:"30px 16px 100px",maxWidth:"1000px",margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:"30px",padding:"32px 16px",borderRadius:"20px",background:"radial-gradient(ellipse at center,rgba(34,211,238,0.08) 0%,rgba(10,14,23,0.9) 70%)",border:"1px solid rgba(34,211,238,0.15)"}} className="glow">
        <div style={{fontSize:"clamp(40px,10vw,72px)",fontWeight:900,color:"#22d3ee",textShadow:"0 0 40px rgba(34,211,238,0.4)",lineHeight:1}}>${TOTAL_POOL.toLocaleString()}</div>
        <div style={{fontSize:"16px",fontWeight:700,color:"#94a3b8",letterSpacing:"4px",textTransform:"uppercase",marginTop:"8px"}}>Weekly Leaderboard</div>
      </div>
      <Platforms/>
      <Stats data={data}/>
      <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:isMobile?"10px":"16px",marginBottom:"40px",flexWrap:"wrap",padding:"0 8px"}}>
        {[2,1,3].map(r=>{const d=top3[r-1];if(!d)return null;const[bg,bd,c,lbl]=pc[r];
          return(<div key={r} style={{flex:"1",minWidth:isMobile?"100px":"180px",maxWidth:"260px",background:bg,border:"2px solid "+bd,borderRadius:"20px",padding:r===1?"28px 14px":"20px 14px",textAlign:"center",transform:r===1?"scale(1.05)":"scale(1)",order:r===1?0:r===2?-1:1}} className="fi">
            <div style={{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg,"+c+","+c+"88)",display:"flex",alignItems:"center",justifyContent:"center",margin:"-32px auto 10px",fontSize:"16px",fontWeight:900,color:"#0a0e17",boxShadow:"0 0 20px "+c+"44"}}>{r}</div>
            <div style={{fontSize:isMobile?"13px":"16px",fontWeight:700,color:"#e2e8f0",marginBottom:"4px",wordBreak:"break-all"}}>{d.user}</div>
            <div style={{fontSize:"12px",color:"#64748b",marginBottom:"6px"}}>Wagered: {fmt(d.wagered)}</div>
            <div style={{fontSize:isMobile?"20px":"24px",fontWeight:900,color:c,textShadow:"0 0 15px "+c+"44"}}>{fmt(PRIZES[r])}</div>
          </div>)}
        )}
      </div>
      {rest.length>0&&!isMobile&&(
        <div style={{overflowX:"auto",borderRadius:"16px",border:"1px solid rgba(139,92,246,0.1)",background:"rgba(15,20,35,0.5)"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 6px"}}>
            <thead><tr>{["Rank","User","Wagered","Prize"].map(h=><th key={h} style={{padding:"12px 16px",fontSize:"11px",fontWeight:700,color:"#64748b",letterSpacing:"2px",textTransform:"uppercase",textAlign:"left"}}>{h}</th>)}</tr></thead>
            <tbody>{rest.map(d=>(
              <tr key={d.rank} style={{background:"rgba(15,20,35,0.6)"}}>
                <td style={{padding:"14px 16px",fontWeight:800,color:"#a78bfa",fontSize:"15px"}}>#{d.rank}</td>
                <td style={{padding:"14px 16px",fontWeight:600,color:"#e2e8f0"}}>{d.user}</td>
                <td style={{padding:"14px 16px",fontWeight:600,color:"#94a3b8"}}>{fmt(d.wagered)}</td>
                <td style={{padding:"14px 16px",fontWeight:800,color:PRIZES[d.rank]?"#22d3ee":"#334155",fontSize:"15px"}}>{PRIZES[d.rank]?fmt(PRIZES[d.rank]):"\u2014"}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {rest.length>0&&isMobile&&(
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {rest.map(d=>(
            <div key={d.rank} style={{...sty.card,padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0"}}>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(139,92,246,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#a78bfa",fontSize:"14px"}}>#{d.rank}</div>
                <div>
                  <div style={{fontWeight:700,color:"#e2e8f0",fontSize:"14px"}}>{d.user}</div>
                  <div style={{fontSize:"12px",color:"#64748b"}}>{fmt(d.wagered)}</div>
                </div>
              </div>
              <div style={{fontWeight:800,color:PRIZES[d.rank]?"#22d3ee":"#334155",fontSize:"15px"}}>{PRIZES[d.rank]?fmt(PRIZES[d.rank]):"\u2014"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Bonuses(){
  const[username,setUsername]=useState("");const[bonusType,setBonusType]=useState("35");
  const[submitted,setSubmitted]=useState(false);const[cooldown,setCooldown]=useState(false);
  const[error,setError]=useState("");const[loading,setLoading]=useState(false);
  const[requestId,setRequestId]=useState("");
  const handleSubmit=async()=>{
    setError("");
    const clean=sanitize(username);
    if(!clean||clean.length<3){setError("Username must be at least 3 characters");return;}
    if(cooldown){setError("Please wait before submitting again");return;}
    if(!rateLimit("bonus_req",2)){setError("Too many requests. Try again in 1 minute.");return;}
    setLoading(true);
    try{
      const res=await fetch(api("/bonus/request"),{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:clean,bonusType})
      });
      const data=await res.json();
      if(!res.ok){setError(data.error||"Request failed");setLoading(false);return;}
      setRequestId(data.requestId||"");
      setSubmitted(true);setCooldown(true);setUsername("");
      setTimeout(()=>setCooldown(false),30000);
      setTimeout(()=>{setSubmitted(false);setRequestId("")},8000);
    }catch(e){
      setError("Server connection failed. Try again later.");
    }
    setLoading(false);
  };
  return(
    <div style={{position:"relative",zIndex:1,padding:"30px 16px 100px",maxWidth:"1000px",margin:"0 auto"}}>
      <div style={{fontSize:"clamp(28px,6vw,36px)",fontWeight:800,textAlign:"center",marginBottom:"8px",letterSpacing:"2px",textTransform:"uppercase"}}>Exclusive <span style={{color:"#22d3ee"}}>Bonuses</span></div>
      <div style={{width:"60px",height:"4px",borderRadius:"2px",background:"linear-gradient(90deg,#8b5cf6,#22d3ee)",margin:"0 auto 32px"}}/>
      <div style={sty.card} className="fi">
        <div style={{display:"flex",gap:"20px",flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:"240px"}}>
            <div style={{display:"inline-block",padding:"6px 14px",borderRadius:"8px",background:"rgba(139,92,246,0.2)",color:"#a78bfa",fontWeight:700,fontSize:"12px",marginBottom:"14px"}}>NEW USER BONUS</div>
            <div style={{fontSize:"clamp(22px,5vw,28px)",fontWeight:800,marginBottom:"8px"}}><span style={{color:"#22d3ee"}}>$35</span> Free Bonus</div>
            <p style={{color:"#94a3b8",fontSize:"14px",marginBottom:"16px"}}>+ $5/day reload for 7 days (Total $35 extra!)</p>
            {[["1","Sign up on Stake with code BAD200 and deposit $35"],["2","Complete 1x wager ($35 wager required)"],["3","Submit your username below and wait for bonus"],["4","Receive $5/day reload for 7 consecutive days"]].map(([n,t])=>(
              <div key={n} style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                <div style={{width:"26px",height:"26px",borderRadius:"50%",background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:800,flexShrink:0,color:"#fff"}}>{n}</div>
                <div style={{fontSize:"14px",color:"#cbd5e1",lineHeight:1.5}}>{t}</div>
              </div>
            ))}
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"12px",padding:"14px",display:"flex",gap:"10px",alignItems:"center",marginTop:"14px"}}>
              <div style={{fontSize:"13px",color:"#fca5a5",fontWeight:600}}>WARNING: DO NOT withdraw until your bonus is set!</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
            <img src={IMG.olympus} alt="" style={{width:"90px",height:"90px",borderRadius:"14px",border:"2px solid rgba(139,92,246,0.2)"}}/>
            <img src={IMG.mines} alt="" style={{width:"90px",height:"90px",borderRadius:"14px",border:"2px solid rgba(139,92,246,0.2)"}}/>
          </div>
        </div>
      </div>
      <div style={sty.card} className="fi">
        <div style={{display:"flex",gap:"20px",flexWrap:"wrap",alignItems:"center"}}>
          <div style={{flex:1,minWidth:"240px"}}>
            <div style={{display:"inline-block",padding:"6px 14px",borderRadius:"8px",background:"rgba(34,211,238,0.2)",color:"#22d3ee",fontWeight:700,fontSize:"12px",marginBottom:"14px"}}>DEPOSIT BONUS</div>
            <div style={{fontSize:"clamp(22px,5vw,28px)",fontWeight:800,marginBottom:"8px"}}><span style={{color:"#22d3ee"}}>200%</span> Deposit Bonus</div>
            <p style={{color:"#94a3b8",fontSize:"14px",marginBottom:"16px"}}>Use code <strong style={{color:"#a78bfa"}}>BAD200</strong> while signing up!</p>
            <div style={{display:"inline-block",padding:"14px 28px",borderRadius:"12px",background:"linear-gradient(135deg,rgba(34,211,238,0.15),rgba(139,92,246,0.15))",border:"1px solid rgba(34,211,238,0.2)"}}>
              <span style={{fontSize:"11px",color:"#64748b",letterSpacing:"2px",display:"block"}}>REFERRAL CODE</span>
              <span style={{fontSize:"24px",fontWeight:900,fontFamily:"Orbitron,sans-serif",color:"#22d3ee",letterSpacing:"6px"}}>BAD200</span>
            </div>
          </div>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
            <img src={IMG.chicken} alt="" style={{width:"90px",height:"90px",borderRadius:"14px",border:"2px solid rgba(34,211,238,0.2)"}}/>
            <img src={IMG.leBandit} alt="" style={{width:"90px",height:"90px",borderRadius:"14px",border:"2px solid rgba(34,211,238,0.2)"}}/>
          </div>
        </div>
      </div>
      <div style={{...sty.card,textAlign:"center"}} className="fi">
        <div style={{fontSize:"11px",color:"#64748b",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"14px",fontWeight:700}}>Available On</div>
        <Platforms/>
        <p style={{fontSize:"12px",color:"#475569"}}>18+ | Gamble Responsibly</p>
      </div>
      <div style={{...sty.card,border:"1px solid rgba(34,211,238,0.15)",marginTop:"24px"}} className="fi">
        <div style={{fontSize:"20px",fontWeight:800,marginBottom:"4px"}}>Request Your <span style={{color:"#22d3ee"}}>Bonus</span></div>
        <p style={{color:"#64748b",fontSize:"13px",marginBottom:"18px"}}>Submit your Stake username to claim</p>
        <div style={{marginBottom:"12px"}}>
          <label style={{fontSize:"11px",color:"#64748b",letterSpacing:"2px",fontWeight:700,display:"block",marginBottom:"6px",textTransform:"uppercase"}}>Bonus Type</label>
          <div style={{display:"flex",gap:"8px"}}>
            {[["35","$35 Bonus"],["200","200% Bonus"]].map(([v,l])=>(
              <button key={v} onClick={()=>setBonusType(v)} style={{flex:1,padding:"14px",borderRadius:"10px",border:bonusType===v?"2px solid #8b5cf6":"1px solid rgba(139,92,246,0.2)",background:bonusType===v?"rgba(139,92,246,0.15)":"rgba(10,14,23,0.5)",color:bonusType===v?"#a78bfa":"#64748b",fontWeight:700,fontSize:"14px",cursor:"pointer",minHeight:"48px"}}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={{fontSize:"11px",color:"#64748b",letterSpacing:"2px",fontWeight:700,display:"block",marginBottom:"6px",textTransform:"uppercase"}}>Stake Username</label>
          <input style={sty.input} placeholder="Enter your Stake username..." value={username} onChange={e=>setUsername(e.target.value)} maxLength={30}/>
        </div>
        {error&&<div style={{marginTop:"8px",fontSize:"13px",color:"#f87171",fontWeight:600}}>{error}</div>}
        <button style={{...sty.btn,opacity:(cooldown||loading)?0.5:1}} onClick={handleSubmit} disabled={cooldown||loading}>
          {loading?"Sending...":cooldown?"Please wait 30s...":submitted?"Request Sent!":"SUBMIT REQUEST"}
        </button>
        {submitted&&<div style={{marginTop:"12px",padding:"12px 16px",borderRadius:"10px",background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.2)",fontSize:"13px",color:"#22d3ee",fontWeight:600}}>
          Request submitted! Bonus will be set within 24hrs.
          {requestId&&<div style={{fontSize:"11px",color:"#64748b",marginTop:"4px"}}>Request ID: {requestId}</div>}
        </div>}
      </div>
    </div>
  );
}

function Admin({sheetUrl,setSheetUrl,onFetch}){
  const[open,setOpen]=useState(false);const[pin,setPin]=useState("");const[auth,setAuth]=useState(false);const[err,setErr]=useState("");
  const[token,setToken]=useState("");const[tab,setTab]=useState("data");const[bonusReqs,setBonusReqs]=useState([]);const[loadingReqs,setLoadingReqs]=useState(false);
  const tog={position:"fixed",bottom:"80px",right:"16px",width:"48px",height:"48px",borderRadius:"50%",background:"rgba(15,20,35,0.9)",border:"1px solid rgba(139,92,246,0.3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:201,fontSize:"18px",color:"#64748b"};
  const pnl={position:"fixed",bottom:"140px",right:"16px",width:"min(380px,calc(100vw - 32px))",maxHeight:"70vh",overflowY:"auto",background:"rgba(10,14,23,0.98)",border:"1px solid rgba(139,92,246,0.2)",borderRadius:"16px",padding:"24px",zIndex:201,boxShadow:"0 20px 60px rgba(0,0,0,0.5)"};
  const tryAuth=async()=>{
    try{
      const res=await fetch(api("/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin})});
      const data=await res.json();
      if(data.success){setAuth(true);setToken(data.token);setErr("")}
      else{setErr(data.error||"Wrong PIN");setPin("")}
    }catch(e){setErr("Server connection failed");setPin("")}
  };
  const updateSource=async()=>{
    if(token){
      try{
        await fetch(api("/admin/update-source"),{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({sheetUrl})});
      }catch(e){}
    }
    onFetch();
  };
  const fetchBonusReqs=async()=>{
    if(!token)return;
    setLoadingReqs(true);
    try{
      const res=await fetch(api("/admin/bonus-requests"),{headers:{"Authorization":"Bearer "+token}});
      const data=await res.json();
      if(data.success)setBonusReqs(data.data||[]);
    }catch(e){}
    setLoadingReqs(false);
  };
  const updateBonusStatus=async(requestId,status)=>{
    if(!token)return;
    try{
      await fetch(api("/admin/bonus-status"),{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({requestId,status})});
      fetchBonusReqs();
    }catch(e){}
  };
  if(!open)return<div style={tog} onClick={()=>setOpen(true)}>G</div>;
  if(!auth)return(<><div style={tog} onClick={()=>setOpen(false)}>X</div><div style={pnl}><div style={{fontSize:"18px",fontWeight:700,color:"#e2e8f0",marginBottom:"14px"}}>Admin Access</div><input type="password" style={sty.input} placeholder="Enter PIN" value={pin} onChange={e=>setPin(e.target.value)} maxLength={8} onKeyDown={e=>e.key==="Enter"&&tryAuth()}/>{err&&<div style={{color:"#f87171",fontSize:"12px",marginTop:"6px"}}>{err}</div>}<button style={sty.btn} onClick={tryAuth}>UNLOCK</button></div></>);
  return(<><div style={tog} onClick={()=>{setOpen(false);setAuth(false);setPin("");setToken("")}}>X</div><div style={pnl}>
    <div style={{fontSize:"18px",fontWeight:700,color:"#e2e8f0",marginBottom:"4px"}}>Admin Panel</div>
    <p style={{fontSize:"11px",color:"#22d3ee",marginBottom:"14px"}}>Secure mode (JWT) — {API_BASE}</p>
    <div style={{display:"flex",gap:"6px",marginBottom:"16px"}}>
      {[["data","Data Source"],["bonus","Bonus Requests"]].map(([k,l])=>(
        <button key={k} onClick={()=>{setTab(k);if(k==="bonus")fetchBonusReqs()}} style={{flex:1,padding:"10px",borderRadius:"8px",border:tab===k?"2px solid #8b5cf6":"1px solid rgba(139,92,246,0.2)",background:tab===k?"rgba(139,92,246,0.15)":"transparent",color:tab===k?"#a78bfa":"#64748b",fontWeight:700,fontSize:"12px",cursor:"pointer"}}>{l}</button>
      ))}
    </div>
    {tab==="data"&&<>
      <label style={{fontSize:"11px",color:"#64748b",letterSpacing:"1px",fontWeight:700,display:"block",marginBottom:"6px"}}>GOOGLE SHEET URL</label>
      <input style={sty.input} placeholder="Paste published CSV URL..." value={sheetUrl} onChange={e=>setSheetUrl(e.target.value)}/>
      <p style={{fontSize:"10px",color:"#475569",marginTop:"4px",marginBottom:"10px"}}>Columns: rank, user, wagered. Publish as CSV.</p>
      <button style={sty.btn} onClick={updateSource}>FETCH DATA</button>
    </>}
    {tab==="bonus"&&<>
        <button onClick={fetchBonusReqs} style={{...sty.btn,marginTop:0,marginBottom:"12px",padding:"10px",fontSize:"12px"}}>{loadingReqs?"Loading...":"REFRESH"}</button>
        {bonusReqs.length===0&&<p style={{color:"#64748b",fontSize:"13px",textAlign:"center"}}>No bonus requests yet</p>}
        {bonusReqs.map(r=>(
          <div key={r.id} style={{padding:"12px",borderRadius:"10px",background:"rgba(15,20,35,0.6)",border:"1px solid rgba(139,92,246,0.1)",marginBottom:"8px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
              <span style={{color:"#e2e8f0",fontWeight:700,fontSize:"14px"}}>{r.username}</span>
              <span style={{padding:"3px 10px",borderRadius:"6px",fontSize:"10px",fontWeight:700,background:r.status==="approved"?"rgba(34,197,94,0.2)":r.status==="rejected"?"rgba(239,68,68,0.2)":"rgba(234,179,8,0.2)",color:r.status==="approved"?"#22c55e":r.status==="rejected"?"#ef4444":"#eab308"}}>{r.status.toUpperCase()}</span>
            </div>
            <div style={{fontSize:"11px",color:"#64748b",marginBottom:"8px"}}>{r.bonusType==="35"?"$35 Bonus":"200% Bonus"} • {new Date(r.timestamp).toLocaleString()}</div>
            {r.status==="pending"&&<div style={{display:"flex",gap:"6px"}}>
              <button onClick={()=>updateBonusStatus(r.id,"approved")} style={{flex:1,padding:"8px",borderRadius:"8px",border:"none",background:"rgba(34,197,94,0.2)",color:"#22c55e",fontWeight:700,fontSize:"11px",cursor:"pointer"}}>APPROVE</button>
              <button onClick={()=>updateBonusStatus(r.id,"rejected")} style={{flex:1,padding:"8px",borderRadius:"8px",border:"none",background:"rgba(239,68,68,0.2)",color:"#ef4444",fontWeight:700,fontSize:"11px",cursor:"pointer"}}>REJECT</button>
            </div>}
          </div>
        ))}
    </>}
  </div></>);
}

export default function App(){
  const isMobile=useIsMobile();
  const[page,setPage]=useState("home");const[data,setData]=useState(SAMPLE);const[sheetUrl,setSheetUrl]=useState("");
  // FIX F3: Admin hidden in production — triple-tap bottom-right corner or type "badshah" to reveal
  const[showAdmin,setShowAdmin]=useState(!IS_PROD);
  useEffect(()=>{
    if(!IS_PROD)return;
    let keys="";
    const handler=e=>{keys+=e.key.toLowerCase();if(keys.includes("badshah")){setShowAdmin(true);keys=""}if(keys.length>20)keys=""};
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  },[]);
  const fetchSheet=useCallback(async()=>{
    try{
      const res=await fetch(api("/leaderboard"));
      const json=await res.json();
      if(json.success&&json.data.length>0)setData(json.data);
    }catch(e){console.log("Leaderboard fetch failed:",e)}
  },[]);
  return(
    <div style={{minHeight:"100vh",background:"#0a0e17",color:"#e2e8f0",fontFamily:"Rajdhani,Segoe UI,sans-serif",position:"relative"}}>
      <style>{CSS}</style>
      <div style={{position:"fixed",top:"-20%",right:"-10%",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none",zIndex:0,animation:"float1 15s ease-in-out infinite"}}/>
      <div style={{position:"fixed",bottom:"-20%",left:"-10%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.06) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none",zIndex:0,animation:"float2 18s ease-in-out infinite"}}/>
      <Nav page={page} setPage={setPage} isMobile={isMobile}/>
      {isMobile&&<div style={{textAlign:"center",padding:"12px 0",background:"rgba(10,14,23,0.9)",borderBottom:"1px solid rgba(139,92,246,0.1)"}}>
        <span onClick={()=>{setPage("home");window.scrollTo(0,0)}} style={{fontSize:"20px",fontWeight:800,letterSpacing:"3px",background:"linear-gradient(135deg,#a78bfa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",cursor:"pointer",fontFamily:"Orbitron,sans-serif"}}>BADSHAH</span>
      </div>}
      {page==="home"&&<Home setPage={setPage}/>}
      {page==="leaderboard"&&<Leaderboard data={data} isMobile={isMobile}/>}
      {page==="bonuses"&&<Bonuses/>}
      <footer style={{position:"relative",zIndex:1,textAlign:"center",padding:"30px 16px 100px",borderTop:"1px solid rgba(139,92,246,0.1)",marginTop:"30px"}}>
        <div style={{fontSize:"18px",fontWeight:800,fontFamily:"Orbitron,sans-serif",background:"linear-gradient(135deg,#a78bfa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"10px",display:"inline-block"}}>BADSHAH ANALYTICS</div>
        <p style={{fontSize:"12px",color:"#475569"}}>18+ | Gamble Responsibly | Not affiliated with Stake.com</p>
        <p style={{fontSize:"12px",color:"#475569",marginTop:"4px"}}>2025 Badshah Analytics. All rights reserved.</p>
      </footer>
      {showAdmin&&<Admin sheetUrl={sheetUrl} setSheetUrl={setSheetUrl} onFetch={fetchSheet}/>}
      <BottomNav page={page} setPage={setPage}/>
    </div>
  );
}

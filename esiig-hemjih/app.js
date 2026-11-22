const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d'),W=1000,H=640;
const rnd=(a,b)=>a+Math.random()*(b-a),lerp=(a,b,k)=>a+(b-a)*k,frac=x=>x-Math.floor(x),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
function resize(){const r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1;cv.width=Math.round(r.width*d);cv.height=Math.round(r.width*H/W*d);}
window.addEventListener('resize',resize);
const F=(w,s)=>`${w} ${s}px Nunito, system-ui, sans-serif`;

// ---------- cute characters ----------
function eyes(x1,x2,y,r,mood){
  if(mood==='squeeze'){ctx.strokeStyle='#2b2533';ctx.lineWidth=r*.7;ctx.lineCap='round';
    for(const x of [x1,x2]){const d=x===x1?1:-1;ctx.beginPath();ctx.moveTo(x-r*d,y-r);ctx.lineTo(x+r*.6*d,y);ctx.lineTo(x-r*d,y+r);ctx.stroke();}return;}
  if(mood==='tired'){ctx.strokeStyle='#2b2533';ctx.lineWidth=r*.6;ctx.lineCap='round';for(const x of [x1,x2]){ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x+r,y);ctx.stroke();}return;}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x1,y,r,0,7);ctx.arc(x2,y,r,0,7);ctx.fill();
  ctx.fillStyle='#2b2533';const pr=mood==='shock'?r*.38:r*.55;ctx.beginPath();ctx.arc(x1+r*.15,y+r*.1,pr,0,7);ctx.arc(x2+r*.15,y+r*.1,pr,0,7);ctx.fill();
}
function mouth(x,y,w,mood){ctx.strokeStyle='#2b2533';ctx.lineWidth=Math.max(1.2,w*.28);ctx.lineCap='round';ctx.beginPath();
  if(mood==='shock'||mood==='O'){ctx.fillStyle='#8a3048';ctx.ellipse(x,y+w*.2,w*.45,w*.6,0,0,7);ctx.fill();return;}
  if(mood==='sad'||mood==='sick')ctx.arc(x,y+w*.9,w*.75,Math.PI*1.2,Math.PI*1.8);
  else if(mood==='meh'){ctx.moveTo(x-w*.6,y+w*.2);ctx.quadraticCurveTo(x-w*.2,y-w*.2,x,y+w*.2);ctx.quadraticCurveTo(x+w*.2,y+w*.6,x+w*.6,y+w*.2);}
  else ctx.arc(x,y-w*.1,w*.7,.25,Math.PI-.25);
  ctx.stroke();}
function bact(x,y,s,a,mood){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(s,s);
  const g=ctx.createLinearGradient(0,-7,0,7);g.addColorStop(0,'#8fdcaa');g.addColorStop(1,'#43ad6e');
  ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(-14,-7.5,28,15,7.5);ctx.fill();ctx.strokeStyle='#2e8a55';ctx.lineWidth=1.5;ctx.stroke();
  ctx.strokeStyle='#2e8a55';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-14,0);ctx.quadraticCurveTo(-19,-4,-22,1);ctx.stroke();
  eyes(2,9,-1.5,2.9,mood);mouth(5.5,3,2.6,mood==='shock'?'O':mood);ctx.restore();}
function virus(x,y,s,a,mood){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(s,s);
  ctx.strokeStyle='#e0607a';ctx.fillStyle='#e0607a';ctx.lineWidth=1.8;
  for(let i=0;i<9;i++){const k=i/9*6.28;ctx.beginPath();ctx.moveTo(Math.cos(k)*8,Math.sin(k)*8);ctx.lineTo(Math.cos(k)*13,Math.sin(k)*13);ctx.stroke();ctx.beginPath();ctx.arc(Math.cos(k)*13.5,Math.sin(k)*13.5,2,0,7);ctx.fill();}
  const g=ctx.createRadialGradient(-3,-3,1,0,0,10);g.addColorStop(0,'#ffc0cd');g.addColorStop(1,'#ec6f8b');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,9.5,0,7);ctx.fill();
  eyes(-3,3,-1.2,2.4,mood);mouth(0,3,2.2,mood==='shock'?'O':mood);ctx.restore();}
function dust(x,y,s,a,mood){ctx.save();ctx.translate(x,y);ctx.rotate(a*.3);ctx.scale(s,s);
  ctx.fillStyle='#b9aca2';for(const [dx,dy,r] of [[-5,1,6],[3,-3,7],[5,4,5.5],[-1,5,5]]){ctx.beginPath();ctx.arc(dx,dy,r,0,7);ctx.fill();}
  ctx.fillStyle='#2b2533';ctx.beginPath();ctx.arc(-2,0,1.4,0,7);ctx.arc(4,0,1.4,0,7);ctx.fill();ctx.restore();}
function germ(p){const f=p.type==='bact'?bact:p.type==='virus'?virus:dust;f(p.x,p.y,p.s||1,p.rot||0,p.mood||'happy');}
function pickType(){const r=Math.random();return r<.45?'dust':r<.75?'bact':'virus';}
function pill(text,px,py,lx,ly,col){ctx.font=F(800,17);const w=ctx.measureText(text).width+36;
  if(px!=null){ctx.setLineDash([3,4]);ctx.strokeStyle='#a08a96';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(lx+w/2,ly+16);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=col||'#f07895';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,5,0,7);ctx.fill();ctx.stroke();}
  ctx.save();ctx.shadowColor='rgba(107,58,72,.18)';ctx.shadowBlur=10;ctx.shadowOffsetY=2;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(lx,ly,w,32,16);ctx.fill();ctx.restore();
  ctx.strokeStyle='#f8cdd7';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(lx,ly,w,32,16);ctx.stroke();
  ctx.fillStyle=col||'#f07895';ctx.beginPath();ctx.arc(lx+15,ly+16,5,0,7);ctx.fill();
  ctx.fillStyle='#2b2533';ctx.textAlign='left';ctx.fillText(text,lx+26,ly+22);return w;}
function bg(c1,c2){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(233,217,205,.45)';for(let y=12;y<H;y+=26)for(let x=12+(y%52?13:0);x<W;x+=26){ctx.beginPath();ctx.arc(x,y,1.3,0,7);ctx.fill();}}
function wrap(text,x,y,maxW,lh){const words=text.split(' ');let line='',yy=y;for(const w of words){const tl=line?line+' '+w:w;if(ctx.measureText(tl).width>maxW&&line){ctx.fillText(line,x,yy);line=w;yy+=lh;}else line=tl;}ctx.fillText(line,x,yy);return yy;}
function cilium(bx,by,len,p,amp,dir){let a0,curv;
  if(p<.3){a0=lerp(.6,-1,ease(p/.3))*amp;curv=0;}else{const q=(p-.3)/.7;a0=lerp(-1,.6,q)*amp;curv=-1.5*Math.sin(Math.PI*q)*amp;}
  ctx.beginPath();ctx.moveTo(bx,by);let x=bx,y=by;for(let i=1;i<=6;i++){const a=a0+curv*i/6;x+=Math.sin(a)*len/6*dir;y-=Math.cos(a)*len/6;ctx.lineTo(x,y);}ctx.stroke();}

let t=0,S={},scene=0,slow=false;

// ---------- SCENES ----------
const SC=[];
function wrapC(text,cx,y,maxW,lh){ctx.textAlign='center';const words=String(text).split(' ');let line='',yy=y;for(const w of words){const tl=line?line+' '+w:w;if(ctx.measureText(tl).width>maxW&&line){ctx.fillText(line,cx,yy);line=w;yy+=lh;}else line=tl;}ctx.fillText(line,cx,yy);ctx.textAlign='left';return yy;}
function card(x,y,w,h,r,fill,stroke){ctx.save();ctx.shadowColor='rgba(107,58,72,.13)';ctx.shadowBlur=18;ctx.shadowOffsetY=4;ctx.fillStyle=fill||'#fff';ctx.beginPath();ctx.roundRect(x,y,w,h,r||24);ctx.fill();ctx.restore();
  if(stroke!==false){ctx.strokeStyle=stroke||'#f4dbe1';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,r||24);ctx.stroke();}}
function caption(txt,k,total){ctx.font=F(900,24);const w=Math.min(900,ctx.measureText(txt).width+90);const x=W/2-w/2;card(x,18,w,58,29);
  if(k!=null){ctx.fillStyle='#f07895';ctx.beginPath();ctx.arc(x+30,47,18,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,18);ctx.textAlign='center';ctx.fillText(k,x+30,54);}
  ctx.fillStyle='#2b2533';ctx.font=F(900,24);ctx.textAlign='left';ctx.fillText(txt,x+(k!=null?60:30),56);}
let seed=7;const sr=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};

// ---- specimen worlds (µm) ----
const MEAS=[72,84,66,90,78];// units at ×400 (2.5 µm)
const ONION=(()=>{seed=11;const cells=[];const H0=58;
  let x=0;MEAS.forEach((u,i)=>{cells.push({x,y:-H0/2,w:u*2.5,h:H0,id:i});x+=u*2.5;});
  for(let k=1;k<4;k++)cells.push({x,y:-H0/2,w:150+sr()*90,h:H0});
  for(const row of [-3,-2,-1,1,2,3]){let xx=-400+sr()*120;while(xx<1400){const w=150+sr()*110;cells.push({x:xx,y:row*H0-H0/2,w,h:H0});xx+=w;}}
  let xx=-400;while(xx<0){const w=150+sr()*90;cells.push({x:xx-w,y:-H0/2,w,h:H0});xx+=w;if(xx>-50)break;}
  cells.forEach(c=>{c.nx=c.x+c.w*(.3+sr()*.4);c.ny=c.y+c.h*(.35+sr()*.3);});return cells;})();
const MEASX=(()=>{const a=[];let x=0;MEAS.forEach(u=>{a.push(x);x+=u*2.5;});return a;})();
function drawOnion(X,Y,ppu){for(const c of ONION){const x=X(c.x),y=Y(c.y),w=c.w*ppu,h=c.h*ppu;if(x>W+50||x+w<-50||y>H+50||y+h<-50)continue;
  ctx.fillStyle='rgba(255,236,200,.55)';ctx.strokeStyle='#c9a45a';ctx.lineWidth=Math.max(1,ppu*1.6);ctx.beginPath();ctx.roundRect(x,y,w,h,Math.min(6,ppu*4));ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(185,140,90,.55)';ctx.beginPath();ctx.ellipse(X(c.nx),Y(c.ny),Math.max(1.5,9*ppu),Math.max(1.2,7*ppu),0,0,7);ctx.fill();}}
const ELO=(()=>{seed=5;const cells=[];for(let r=-4;r<=4;r++){let x=-260+(r%2)*35;while(x<300){cells.push({x,y:r*30-15,w:70,h:30});x+=70;}}
  const chl=[];for(const c of cells)for(let k=0;k<10;k++){const side=k%4;let px,py;if(side<2){px=c.x+6+sr()*(c.w-12);py=side?c.y+5:c.y+c.h-5;}else{px=side===2?c.x+5:c.x+c.w-5;py=c.y+6+sr()*(c.h-12);}chl.push({x:px,y:py,a:sr()*3});}
  return{cells,chl:chl.filter(p=>!(Math.abs(p.x+22.5)<14&&Math.abs(p.y)<12))};})();
function drawElodea(X,Y,ppu){for(const c of ELO.cells){ctx.fillStyle='rgba(214,240,200,.5)';ctx.strokeStyle='#7fae5e';ctx.lineWidth=Math.max(1,ppu*1.2);ctx.beginPath();ctx.rect(X(c.x),Y(c.y),c.w*ppu,c.h*ppu);ctx.fill();ctx.stroke();}
  const ch=(x,y,a)=>{ctx.fillStyle='#4f9a3e';ctx.beginPath();ctx.ellipse(X(x),Y(y),2.5*ppu,1.5*ppu,a,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.ellipse(X(x)-.6*ppu,Y(y)-.4*ppu,1*ppu,.5*ppu,a,0,7);ctx.fill();};
  for(const p of ELO.chl)ch(p.x,p.y,p.a);ch(-22.5,-3,0);}
// ---- microscope field ----
const GW=440;
function graticule(cx,cy,zoom,gc,col){const u=GW/100*zoom;ctx.strokeStyle=col||'#2b2533';ctx.fillStyle=col||'#2b2533';ctx.lineWidth=1.6;ctx.font=F(800,Math.min(16,12*Math.sqrt(zoom)));ctx.textAlign='center';
  ctx.beginPath();ctx.moveTo(cx+(0-gc)*u,cy);ctx.lineTo(cx+(100-gc)*u,cy);ctx.stroke();
  for(let i=0;i<=100;i++){const x=cx+(i-gc)*u;if(x<-10||x>W+10)continue;const L=i%10===0?22:i%5===0?14:8;ctx.beginPath();ctx.moveTo(x,cy);ctx.lineTo(x,cy-L*Math.min(zoom,2));ctx.stroke();if(i%10===0)ctx.fillText(i,x,cy-28*Math.min(zoom,2));}ctx.textAlign='left';}
function stageScale(X,cy,ppu,off){const y=cy+3;ctx.fillStyle='rgba(111,156,240,.13)';ctx.fillRect(X(off-60),y,1120*ppu,46);
  ctx.strokeStyle='#3f6fd0';ctx.fillStyle='#3f6fd0';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(X(off),y);ctx.lineTo(X(off+1000),y);ctx.stroke();ctx.font=F(800,13);ctx.textAlign='center';
  for(let i=0;i<=100;i++){const x=X(off+i*10);if(x<-10||x>W+10)continue;const L=i%10===0?24:i%5===0?16:10;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+L);ctx.stroke();if(i%10===0&&(ppu*100>26))ctx.fillText(i,x,y+40);}ctx.textAlign='left';}
function scope(cx,cy,r,o){const zoom=o.zoom||1,ppu=GW/100/o.upu*zoom,gc=o.gc==null?50:o.gc,px=o.panX||0,py=o.panY||0;
  const X=wx=>cx+(wx-px)*ppu,Y=wy=>cy+(wy-py)*ppu;
  ctx.save();ctx.shadowColor='rgba(43,37,51,.35)';ctx.shadowBlur=30;ctx.fillStyle='#2b2533';ctx.beginPath();ctx.arc(cx,cy,r+12,0,7);ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.clip();
  const g=ctx.createRadialGradient(cx,cy,r*.1,cx,cy,r);g.addColorStop(0,'#fffdf5');g.addColorStop(1,'#efe4c6');ctx.fillStyle=g;ctx.fillRect(cx-r,cy-r,2*r,2*r);
  if(o.spec==='onion')drawOnion(X,Y,ppu);if(o.spec==='elodea')drawElodea(X,Y,ppu);
  if(o.stage)stageScale(X,cy,ppu,o.sOff||0);
  if(o.hl)o.hl(X,ppu,gc);
  if(o.grat!==false)graticule(cx,cy,zoom,gc);
  const vg=ctx.createRadialGradient(cx,cy,r*.75,cx,cy,r);vg.addColorStop(0,'rgba(43,37,51,0)');vg.addColorStop(1,'rgba(43,37,51,.28)');ctx.fillStyle=vg;ctx.fillRect(cx-r,cy-r,2*r,2*r);
  ctx.restore();return{X,ppu};}
function hlUnit(cx,cy,zoom,gc,u,col,lab){const x=cx+(u-gc)*GW/100*zoom;ctx.fillStyle=col;ctx.globalAlpha=.25;ctx.fillRect(x-5,cy-200,10,400);ctx.globalAlpha=1;
  if(lab){ctx.font=F(900,16);const w=ctx.measureText(lab).width+20;ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x-w/2,cy+58,w,28,14);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(lab,x,cy+78);ctx.textAlign='left';}}
function panel(x,y,w,h){card(x,y,w,h,26);}
function bigLine(txt,x,y,size,col,weight){ctx.font=F(weight||900,size);ctx.fillStyle=col||'#2b2533';ctx.fillText(txt,x,y);}

// 1. Ruler zoom
SC.push({nav:'Шугам',title:'Шугамаар эсийг хэмжиж болох уу?',
html:'<p>Шугамын хамгийн жижиг хуваарь <b>1 мм = 1000 мкм</b>. Харин сонгины эс ≈ 200 мкм. Тиймээс 1 мм-ийн дотор ≈5 эс багтана: шугам хэтэрхий «бүдүүн».</p><p>Бидэнд <b>микроскопын «шугам»</b> буюу хэмжээст хуваарь хэрэгтэй.</p>',
talk:'Шугам хэрэглээд эсийг хэмжиж болох уу?',
ctrls:[['↺ Дахин',()=>SC[scene].init()]],
init(){S={z:1};},update(dt){S.z=Math.min(5,S.z+dt*S.z*.45);},
draw(){bg('#fff8f3','#fdf0f0');const s=160*S.z,cm=2.45,X=mm=>500+(mm-cm)*s,ppu=s/1000;
  // cells strip (µm world: x mm*1000)
  ctx.save();ctx.beginPath();ctx.roundRect(20,110,960,330,26);ctx.clip();ctx.fillStyle='#fffaf0';ctx.fillRect(20,110,960,330);
  const XU=um=>X(um/1000),YU=um=>275+um*ppu;
  seed=3;const rows=Math.ceil(170/(58*ppu))+1;
  for(let r=-rows;r<=rows;r++){seed=100+r*7;let xx=-200+sr()*150;while(xx<6000){const w=160+sr()*100;const x=XU(xx);if(x<1000&&x+w*ppu>0){ctx.fillStyle='rgba(255,236,200,.7)';ctx.strokeStyle='#c9a45a';ctx.lineWidth=Math.max(.6,ppu*1.6);ctx.beginPath();ctx.rect(x,YU(r*58-29),w*ppu,58*ppu);ctx.fill();ctx.stroke();
      if(ppu>.25){ctx.fillStyle='rgba(185,140,90,.55)';ctx.beginPath();ctx.ellipse(x+w*ppu*.5,YU(r*58),9*ppu,7*ppu,0,0,7);ctx.fill();}}xx+=w;}}
  ctx.restore();ctx.strokeStyle='#f4dbe1';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(20,110,960,330,26);ctx.stroke();
  // ruler
  card(20,470,960,140,22,'#fff7d6','#ecd58a');
  ctx.save();ctx.beginPath();ctx.roundRect(20,470,960,140,22);ctx.clip();ctx.strokeStyle='#6b5b2a';ctx.fillStyle='#6b5b2a';
  for(let mm=0;mm<=6;mm+=.5){const x=X(mm);ctx.lineWidth=mm%1?1.5:2.5;ctx.beginPath();ctx.moveTo(x,470);ctx.lineTo(x,470+(mm%1?24:44));ctx.stroke();if(mm%1===0){ctx.font=F(900,22);ctx.textAlign='center';ctx.fillText(mm,x,540);}}
  ctx.font=F(800,16);ctx.textAlign='left';ctx.fillText('мм',X(6)+16,540);ctx.restore();
  // 1 mm bracket
  if(S.z>2.2){const x1=X(2),x2=X(3);ctx.strokeStyle='#f07895';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x1,455);ctx.lineTo(x1,445);ctx.lineTo(x2,445);ctx.lineTo(x2,455);ctx.stroke();
    ctx.globalAlpha=.12;ctx.fillStyle='#f07895';ctx.fillRect(x1,110,x2-x1,335);ctx.globalAlpha=1;}
  caption(S.z<2.2?'Шугамаар эсийг хэмжиж болох уу?':'1 мм дотор ≈ 5 эс багтана → шугам хэтэрхий бүдүүн!');
}});

// 2. Units ladder
const LAD=[['м','1 м','хүн ≈ 1.7 м','#6f9cf0'],['мм','10⁻³ м','шавьж ≈ 1–10 мм','#ec9a5f'],['мкм','10⁻⁶ м','улаан эс ≈ 7 мкм · бактери 1–5 мкм','#f07895'],['нм','10⁻⁹ м','вирус 20–300 нм · мембран ≈ 7 нм','#9a6ac9']];
const CONV=[['2.5 мм = ? мкм','2.5 × 1000 = 2 500 мкм'],['7 мкм = ? нм','7 × 1000 = 7 000 нм'],['300 нм = ? мкм','300 ÷ 1000 = 0.3 мкм']];
function ladIcon(i,cx,cy){
  if(i===0){ctx.fillStyle='#fde6da';ctx.beginPath();ctx.arc(cx,cy-22,16,0,7);ctx.fill();ctx.fillStyle='#6f9cf0';ctx.beginPath();ctx.roundRect(cx-16,cy-4,32,40,12);ctx.fill();eyes(cx-6,cx+6,cy-23,3,'happy');}
  if(i===1){ctx.fillStyle='#8a5a3a';for(const [dx,r] of [[-18,9],[0,11],[20,13]]){ctx.beginPath();ctx.arc(cx+dx,cy,r,0,7);ctx.fill();}ctx.strokeStyle='#8a5a3a';ctx.lineWidth=2.5;for(const d of [-1,0,1]){ctx.beginPath();ctx.moveTo(cx+d*8,cy);ctx.lineTo(cx+d*14,cy+22);ctx.moveTo(cx+d*8,cy);ctx.lineTo(cx+d*14,cy-22);ctx.stroke();}eyes(cx-23,cx-15,cy-2,2.4,'happy');}
  if(i===2){const g=ctx.createRadialGradient(cx-18,cy,2,cx-18,cy,20);g.addColorStop(0,'#ffb3b8');g.addColorStop(.5,'#f2737e');g.addColorStop(1,'#d9465a');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx-18,cy,19,0,7);ctx.fill();bact(cx+22,cy,1.2,0,'happy');}
  if(i===3){virus(cx,cy,1.8,0,'happy');}}
SC.push({nav:'Нэгж',title:'Нэгж хувиргах: ×1000-ын шат',subs:10,live:true,
html:'<p>м → мм → мкм → нм: <b>том → жижиг ×1000</b>, <b>жижиг → том ÷1000</b>.</p><ul><li>1 мм = 1000 мкм</li><li>1 мкм = 1000 нм</li></ul>',
talk:'Өсгөлт гэж юу вэ? 1 мм = ? мкм. Гэрлийн микроскопын нарийвчлал хэд вэ?',
ctrls:[],init(){S={sub:0};},update(){},
draw(){bg('#fff8f3','#fdf0f0');const n=Math.min(4,S.sub+1);
  for(let i=0;i<4;i++){const x=30+i*240,y=110;ctx.globalAlpha=i<n?1:.18;card(x,y,210,250,26);
    ctx.fillStyle=LAD[i][3];ctx.font=F(900,54);ctx.textAlign='center';ctx.fillText(LAD[i][0],x+105,y+70);
    ctx.font=F(800,18);ctx.fillStyle='#7a7282';ctx.fillText(LAD[i][1],x+105,y+100);
    ctx.fillStyle='#fff4f6';ctx.beginPath();ctx.arc(x+105,y+158,38,0,7);ctx.fill();ladIcon(i,x+105,y+158);
    ctx.fillStyle='#2b2533';ctx.font=F(800,15);wrapC(LAD[i][2],x+105,y+222,190,19);ctx.globalAlpha=1;
    if(i<3&&i+1<n){ctx.textAlign='center';ctx.font=F(900,14);ctx.fillStyle='#f07895';ctx.fillText('×1000',x+225,y+100);ctx.font=F(900,22);ctx.fillText('→',x+225,y+122);ctx.fillStyle='#9a8f9e';ctx.fillText('←',x+225,y+152);ctx.font=F(900,14);ctx.fillText('÷1000',x+225,y+172);}}
  ctx.textAlign='left';
  if(S.sub>=4){const q=Math.floor((S.sub-4)/2),rev=(S.sub-4)%2===1;card(130,400,740,200,30);
    ctx.font=F(800,18);ctx.fillStyle='#c2486a';ctx.textAlign='center';ctx.fillText(`Дасгал ${q+1} / 3`,500,440);
    ctx.font=F(900,50);ctx.fillStyle='#2b2533';ctx.fillText(CONV[q][0],500,505);
    if(rev){ctx.font=F(900,34);ctx.fillStyle='#2f8a52';ctx.fillText(CONV[q][1]+' ✓',500,565);}ctx.textAlign='left';}
  else caption('Нэгжийн шат: дарааллаар нь гаргая');
}});

// 3. Two scales
function microscope(x,y,hl){
  ctx.lineCap='round';ctx.lineJoin='round';
  ctx.fillStyle='#e9e4f6';ctx.strokeStyle='#9a8fc0';ctx.lineWidth=3;
  ctx.beginPath();ctx.roundRect(x+20,y+400,200,34,14);ctx.fill();ctx.stroke();// base
  ctx.beginPath();ctx.moveTo(x+170,y+400);ctx.bezierCurveTo(x+230,y+330,x+220,y+170,x+150,y+120);ctx.lineTo(x+132,y+150);ctx.bezierCurveTo(x+185,y+190,x+190,y+320,x+140,y+400);ctx.closePath();ctx.fill();ctx.stroke();// arm
  ctx.fillStyle=hl==='stage'?'#cfe0ff':'#f1edf9';ctx.beginPath();ctx.roundRect(x+20,y+300,170,18,6);ctx.fill();ctx.stroke();// stage
  ctx.fillStyle='rgba(111,156,240,.55)';ctx.beginPath();ctx.roundRect(x+40,y+292,120,8,3);ctx.fill();// slide
  ctx.fillStyle='#f1edf9';ctx.beginPath();ctx.roundRect(x+85,y+230,40,50,8);ctx.fill();ctx.stroke();// objective
  ctx.beginPath();ctx.moveTo(x+80,y+232);ctx.lineTo(x+60,y+100);ctx.lineTo(x+100,y+90);ctx.lineTo(x+130,y+230);ctx.closePath();ctx.fill();ctx.stroke();// tube
  ctx.fillStyle=hl==='ocular'?'#ffe0e8':'#f1edf9';ctx.beginPath();ctx.save();ctx.translate(x+70,y+70);ctx.rotate(-.2);ctx.roundRect(-18,-40,36,60,8);ctx.restore();ctx.fill();ctx.stroke();// ocular
  ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x+62,y+33,15,5,-.2,0,7);ctx.fill();ctx.stroke();
  if(hl==='ocular'){ctx.strokeStyle='#f07895';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x+70,y+60,44,0,7);ctx.stroke();}
  if(hl==='stage'){ctx.strokeStyle='#3f6fd0';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x+100,y+296,90,26,0,0,7);ctx.stroke();}
  ctx.lineCap='butt';}
SC.push({nav:'Хоёр хуваарь',title:'Окулярын ба объективын хуваарь',live:true,
html:'<ul><li><b>Окулярын хуваарь</b> (eyepiece graticule): окулярт байна, 100 хуваарьтай, <b>нэгжгүй</b>.</li><li><b>Объективын хуваарь</b> (stage micrometer): тавцан дээрх шилэн дээр, <b>1 мм = 100 хуваарь</b>, 1 хуваарь = 0.01 мм = <b>10 мкм</b>.</li><li>Өсгөлт сольход <b>окулярын хуваарь томордоггүй</b>, объект (объективын хуваарь) томорно. Тиймээс дахин тохируулна.</li></ul>',
talk:'Өсгөлтийг сольход аль хуваарь томорч байна вэ? Яагаад?',
ctrls:[['Окулярын хуваарь',(b)=>{S.g=!S.g;b.classList.toggle('on',S.g);},'on'],['Объективын хуваарь',(b)=>{S.st=!S.st;b.classList.toggle('on',S.st);},'on'],['🔍 Өсгөлт ×100 / ×400',()=>{S.mag=S.mag===100?400:100;S.flash=3;}]],
init(){S={g:true,st:true,mag:100,upu:10,flash:0};},
update(dt){S.upu=lerp(S.upu,1000/S.mag,dt*3);S.flash=Math.max(0,S.flash-dt);},
draw(){bg('#fff8f3','#fdf0f0');microscope(30,120,S.g&&!S.st?'ocular':!S.g&&S.st?'stage':null);
  pill('Окуляр: окулярын хуваарь',100,180,20,64,'#f07895');pill('Тавцан: объективын хуваарь',150,420,40,580,'#3f6fd0');
  scope(640,330,265,{upu:S.upu,grat:S.g,stage:S.st,sOff:-200});
  card(820,24,160,52,26);ctx.font=F(900,24);ctx.fillStyle='#2b2533';ctx.textAlign='center';ctx.fillText('×'+S.mag,900,59);ctx.textAlign='left';
  if(S.g)pill('Окулярын хуваарь (нэгжгүй)',470,300,690,92,'#2b2533');
  if(S.st)pill('Объективын хуваарь: 1 хуваарь = 10 мкм',560,345,560,560,'#3f6fd0');
  if(S.flash>0){ctx.globalAlpha=Math.min(1,S.flash);pill('Окулярын хуваарь томордоггүй — объект томорно!',null,null,350,20,'#f07895');ctx.globalAlpha=1;}
}});

// 4. Calibration
const PRAC=[[25,10],[50,20]];
SC.push({nav:'Тохируулга',title:'Тохируулга: нэг хуваарийн утга',subs:8,live:true,
html:'<ol><li>Хоёр хуваарийг давхцуулна.</li><li>0-ийг 0-тэй тааруулна.</li><li>Дахин давхцах цэгийг олно: <b>40 окуляр = 10 объектив</b>.</li><li>10 × 10 мкм = 100 мкм → <b>1 окуляр = 100 ÷ 40 = 2.5 мкм</b>.</li></ol>',
talk:'25 окуляр = 10 объектив бол нэг окулярын хуваарь хэд вэ? 50 = 20 бол?',
ctrls:[],init(){S={sub:0,off:-125+37,upu:2.5};},
update(dt){const p=S.sub>=4?Math.floor((S.sub-4)/2):-1;const tOff=-50*S.upu+(S.sub===0?37:0);S.off=lerp(S.off,tOff,dt*2.5);const tu=p>=0?PRAC[p][1]*10/PRAC[p][0]:2.5;S.upu=lerp(S.upu,tu,dt*3);},
draw(){bg('#fff8f3','#fdf0f0');const cx=360,cy=330;const p=S.sub>=4?Math.floor((S.sub-4)/2):-1,rev=p>=0&&(S.sub-4)%2===1;
  const ep=p>=0?PRAC[p][0]:40,ob=p>=0?PRAC[p][1]:10;
  scope(cx,cy,280,{upu:S.upu,stage:true,sOff:S.off,panX:0,hl:(X,ppu,gc)=>{if(S.sub>=1&&S.sub!==0){hlUnit(cx,cy,1,gc,0,'#43ad6e',S.sub>=2?'0':null);}if(S.sub>=2){hlUnit(cx,cy,1,gc,ep,'#f07895',`${ep} = ${ob}`);}}});
  panel(680,110,300,470);ctx.textAlign='left';
  const steps=['Хоёр хуваарийг давхцуул','0-ийг 0-тэй тааруул','Дахин давхцах цэгийг ол','Нэг хуваарийн утгыг тооцоол'];
  if(p<0){steps.forEach((s,i)=>{const on=i<=S.sub;ctx.fillStyle=on?'#f07895':'#f2dfe4';ctx.beginPath();ctx.arc(712,150+i*58,15,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,15);ctx.textAlign='center';ctx.fillText(i+1,712,155+i*58);ctx.textAlign='left';
      ctx.fillStyle=on?'#2b2533':'#c9bfc9';ctx.font=F(800,17);wrap(s,736,156+i*58,230,20);});
    if(S.sub>=3){ctx.fillStyle='#fff4f6';ctx.beginPath();ctx.roundRect(696,390,268,170,20);ctx.fill();
      bigLine('10 × 10 мкм = 100 мкм',712,430,20,'#3f6fd0');bigLine('1 окуляр =',712,475,20,'#2b2533',800);bigLine('100 ÷ 40 = 2.5 мкм',712,520,28,'#c2486a');}}
  else{bigLine(`Дасгал ${p+1} / 2`,706,150,18,'#c2486a',800);bigLine(`${ep} окуляр`,706,205,32,'#2b2533');bigLine(`= ${ob} объектив`,706,250,32,'#3f6fd0');
    bigLine(`(${ob} × 10 мкм = ${ob*10} мкм)`,706,290,17,'#7a7282',800);bigLine('1 окуляр = ?',706,360,30,'#2b2533');
    if(rev){bigLine(`${ob*10} ÷ ${ep} = ${ob*10/ep} мкм ✓`,706,420,28,'#2f8a52');}}
  caption(p<0?['1. Хоёр хуваарийг давхцуул','2. 0-ийг 0-тэй тааруул','3. Дахин давхцах цэгийг ол','4. Нэг хуваарийн утга'][Math.min(3,S.sub)]:'Дасгал: нэг окулярын хуваарь хэд вэ?');
}});

// 5. Measuring
SC.push({nav:'Хэмжилт',title:'Хэмжилт: сонгины эс',subs:11,live:true,
html:'<ol><li>×400-д тохируулга хий (1 хуваарь = 2.5 мкм).</li><li>Объективын хуваарийг сонгины бэлдмэлээр соль.</li><li>5 эсийн уртыг окулярын хуваариар хэмж.</li><li>Хуваарийн тоо × 2.5 = мкм.</li><li>Дундаж ба хүрээг бич.</li></ol>',
talk:'Яагаад ганц биш 5 эс хэмжиж дундажилдаг вэ?',
ctrls:[['🌿 Хлоропласт (элодей)',(b)=>{S.elo=!S.elo;b.classList.toggle('on',S.elo);}]],
init(){S={sub:0,pan:MEASX[0]+125,elo:false};},
update(dt){const i=Math.min(4,Math.floor(S.sub/2));S.pan=lerp(S.pan,MEASX[i]+125,dt*3);},
draw(){bg('#fff8f3','#fdf0f0');const cx=350,cy=330;
  if(S.elo){scope(cx,cy,280,{upu:2.5,spec:'elodea',panX:0,panY:0});
    // inset zoom
    const ix=830,iy=320,ir=135;scope(ix,iy,ir,{upu:2.5,spec:'elodea',panX:-22.5,panY:-3,zoom:6,gc:41});
    pill('Хлоропласт',ix,iy-8,ix-60,iy+ir+24,'#4f9a3e');
    card(690,40,280,96,24);bigLine('2 хуваарь × 2.5 мкм',708,80,20,'#2b2533');bigLine('= 5 мкм',708,118,28,'#2f8a52');
    ctx.strokeStyle='#4f9a3e';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx+(41-50)*4.4,cy-3*1.76,16,0,7);ctx.stroke();
    caption('Хлоропластыг хэмжих');return;}
  const i=Math.min(4,Math.floor(S.sub/2)),done=S.sub>=10?5:Math.floor((S.sub+1)/2);
  scope(cx,cy,280,{upu:2.5,spec:'onion',panX:S.pan,hl:(X,ppu,gc)=>{if(S.sub<10){const c=ONION[i];ctx.strokeStyle='#f07895';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(X(c.x),cy+(c.y)*ppu,c.w*ppu,c.h*ppu,6);ctx.stroke();
    if(S.sub%2===1){ctx.fillStyle='#f07895';ctx.font=F(900,18);ctx.textAlign='center';const w=ctx.measureText(MEAS[i]+' хуваарь').width+24;const xm=X(c.x+c.w/2);ctx.beginPath();ctx.roundRect(xm-w/2,cy+70,w,30,15);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(MEAS[i]+' хуваарь',xm,cy+91);ctx.textAlign='left';}}}});
  panel(670,40,310,560);bigLine('×400 · 1 хуваарь = 2.5 мкм',690,80,16,'#7a7282',800);
  ctx.font=F(900,17);ctx.fillStyle='#c2486a';ctx.fillText('Эс',692,122);ctx.fillText('Хуваарь',760,122);ctx.fillText('мкм',880,122);
  for(let k=0;k<5;k++){const y=160+k*52,cur=k===i&&S.sub<10;if(cur){ctx.fillStyle='#fff1f4';ctx.beginPath();ctx.roundRect(682,y-30,286,44,12);ctx.fill();}
    ctx.font=F(900,22);ctx.fillStyle='#2b2533';ctx.fillText(k+1,700,y);ctx.fillStyle=k<done?'#2b2533':'#d9cfd8';ctx.fillText(k<done?MEAS[k]:'…',772,y);ctx.fillStyle=k<done?'#3f6fd0':'#d9cfd8';ctx.fillText(k<done?MEAS[k]*2.5:'…',880,y);}
  if(S.sub>=10){const v=MEAS.map(u=>u*2.5),avg=v.reduce((a,b)=>a+b,0)/5;ctx.fillStyle='#e4f6e9';ctx.beginPath();ctx.roundRect(682,430,286,150,18);ctx.fill();
    bigLine('Дундаж',700,470,18,'#2f8a52',800);bigLine(avg+' мкм',800,472,28,'#2f8a52');bigLine('Хүрээ',700,520,18,'#2f8a52',800);bigLine(Math.min(...v)+'–'+Math.max(...v)+' мкм',800,522,24,'#2f8a52');
    bigLine(`${avg} мкм (${Math.min(...v)}–${Math.max(...v)})`,700,565,17,'#7a7282',800);}
  caption(S.sub>=10?'Дундаж ба хүрээг бичнэ':`Эс ${i+1}: ${S.sub%2?MEAS[i]+' × 2.5 = '+MEAS[i]*2.5+' мкм':'хэдэн хуваарь вэ?'}`);
}});

// 6. Error when magnification changes
SC.push({nav:'Алдаа',title:'Өсгөлт сольвол юу болох вэ?',subs:4,live:true,
html:'<p>×100-д тохируулсан утга (1 хуваарь = 10 мкм)-аар ×400-д хэмжвэл үр дүн <b>4 дахин том</b> гарна. Өсгөлт бүрт <b>дахин тохируулна</b>.</p>',
talk:'×100-д тохируулаад ×400-д хэмжвэл юу болох вэ?',
ctrls:[],init(){S={sub:0,upu:10};},update(dt){S.upu=lerp(S.upu,S.sub===0?10:2.5,dt*2.5);},
draw(){bg('#fff8f3','#fdf0f0');const cx=350,cy=330;
  scope(cx,cy,280,{upu:S.upu,stage:S.sub===0,spec:S.sub>0?'onion':null,panX:S.sub>0?MEASX[0]+125:0,sOff:-50*S.upu});
  panel(670,110,310,470);
  bigLine('×100-д тохируулсан:',690,155,18,'#7a7282',800);bigLine('1 хуваарь = 10 мкм',690,192,24,'#3f6fd0');
  if(S.sub>=1){bigLine('×400-д эс =',690,250,18,'#7a7282',800);bigLine('72 хуваарь',690,288,28,'#2b2533');}
  if(S.sub>=2){ctx.fillStyle='#ffe9ec';ctx.beginPath();ctx.roundRect(684,315,282,110,18);ctx.fill();bigLine('✗ 72 × 10 = 720 мкм',698,355,22,'#c2384f');bigLine('4 дахин том!',698,398,26,'#c2384f');}
  if(S.sub>=3){ctx.fillStyle='#e4f6e9';ctx.beginPath();ctx.roundRect(684,440,282,125,18);ctx.fill();bigLine('Дахин тохируулбал:',698,472,16,'#2f8a52',800);bigLine('1 хуваарь = 2.5 мкм',698,502,20,'#2f8a52');bigLine('✓ 72 × 2.5 = 180 мкм',698,545,22,'#2f8a52');}
  caption(['×100-д тохируулга хийлээ','Өсгөлтийг ×400 болголоо','Хуучин утгаар бодвол…','Өсгөлт бүрт дахин тохируул!'][S.sub],S.sub+1);
}});

// 7. True / False
const TF=[['Нэг эс хэмжихэд хангалттай.',0,'Олон эсийн дундажийг авна.'],['Окулярын хуваарь нэгжгүй тул тохируулна.',1,'Тохируулснаар нэг хуваарийн утгыг мэднэ.'],['Өсгөлт бүрт дахин тохируулна.',1,'Объект томорно, окулярын хуваарь томордоггүй.'],['Олон эс хэмжиж дундажилна.',1,'Хэмжилт найдвартай болно.'],['Нэг тохируулга бүх өсгөлтөд хүчинтэй.',0,'Өсгөлт бүрт өөр утгатай.'],['Окулярын хуваарь мкм-ээр тэмдэглэгдсэн.',0,'Нэгжгүй, зөвхөн тоо.']];
SC.push({nav:'Үнэн/худал',title:'Үнэн үү, худал уу?',subs:12,live:true,quizT:true,
html:'<p>Үнэн бол гараа өргө ✋, худал бол суу 🪑.</p>',talk:'Яагаад үнэн/худал вэ? Нэг сурагчаар тайлбарлуул.',
ctrls:[],init(){S={sub:0};},update(){},
draw(){bg('#fff8f3','#fdf0f0');const q=Math.floor(S.sub/2),rev=S.sub%2===1,t=TF[q];
  ctx.font=F(900,20);ctx.fillStyle='#c2486a';ctx.textAlign='center';ctx.fillText(`${q+1} / ${TF.length}`,W/2,80);
  ctx.font=F(900,44);ctx.fillStyle='#2b2533';wrapC(t[0],W/2,180,820,54);
  for(let j=0;j<2;j++){const x=170+j*360,ok=(j===0)===(t[1]===1);ctx.globalAlpha=rev&&!ok?.3:1;card(x,300,300,170,30,rev&&ok?(j?'#ffe9ec':'#e4f6e9'):'#fff',rev&&ok?(j?'#f39aab':'#7cc792'):undefined);
    ctx.font=F(900,56);ctx.textAlign='center';ctx.fillText(j?'🪑':'✋',x+150,380);ctx.font=F(900,32);ctx.fillStyle=j?'#c2384f':'#2f8a52';ctx.fillText(j?'Худал':'Үнэн',x+150,440);ctx.fillStyle='#2b2533';ctx.globalAlpha=1;}
  if(rev){ctx.font=F(800,22);ctx.fillStyle='#7a7282';wrapC('💡 '+t[2],W/2,540,800,28);}ctx.textAlign='left';}});

// 8. Team quiz (MCQ)
const QUIZ=[['1 мм = ? мкм',['10','100','1000','10 000'],2,'1 мм = 1000 мкм.'],['Объективын хуваарь хаана байдаг вэ?',['Окулярт','Шилэн дээр (тавцан)','Гэрэлд','Линзэнд'],1,'Тавцан дээрх шилэн дээр байдаг.'],['40 окуляр = 100 мкм бол 1 окуляр?',['2.5 мкм','4 мкм','40 мкм','0.4 мкм'],0,'100 ÷ 40 = 2.5 мкм.'],['Өсгөлт солигдоход?',['Дахин тохируулна','Хэвээр','Хуваарь томорно','Хэмжихгүй'],0,'Өсгөлт бүрт дахин тохируулна.'],['Эс 12 хуваарь × 2.5 мкм = ?',['30 мкм','14.5 мкм','4.8 мкм','300 мкм'],0,'12 × 2.5 = 30 мкм.'],['Найдвартай хэмжилт?',['Олон эсийн дундаж','Нэг эс','Таамаг','Хамгийн том'],0,'Олон эсийн дундаж ± хүрээ.']];
const OCOL=['#6f9cf0','#f07895','#5fa070','#ec9a5f'];
SC.push({nav:'Сорилт',title:'Багийн сорилт',quiz:true,subs:12,
html:'<p>Team vs Team · Peer Check · Duel (30 с) · Save Your Team. Зөв хариулт +10, Peer Check +10/+5, багийн зөв хариулт +20.</p>',talk:'Асуулт гармагц Space = 30 секундын цаг.',
ctrls:[],init(){S={sub:0,timer:0,tOn:false};},onPlay(){if(S.sub%2===0){S.tOn=true;S.timer=30;}},
update(dt){if(S.tOn){S.timer-=dt;if(S.timer<=0){S.timer=0;S.tOn=false;}}},
draw(){bg('#fff8f3','#fdf0f0');const qi=Math.floor(S.sub/2),rev=S.sub%2===1,q=QUIZ[qi];
  ctx.font=F(900,20);ctx.fillStyle='#c2486a';ctx.textAlign='center';ctx.fillText(`Асуулт ${qi+1} / ${QUIZ.length}`,W/2,74);
  ctx.font=F(900,40);ctx.fillStyle='#2b2533';wrapC(q[0],W/2,130,820,48);
  for(let j=0;j<4;j++){const x=60+(j%2)*450,y=200+Math.floor(j/2)*170,ok=j===q[2];ctx.save();ctx.globalAlpha=rev&&!ok?.3:1;
    card(x,y,430,145,28,rev&&ok?'#e4f6e9':'#fff',rev&&ok?'#5fb37a':undefined);
    ctx.fillStyle=OCOL[j];ctx.beginPath();ctx.arc(x+58,y+72,36,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,36);ctx.textAlign='center';ctx.fillText('ABCD'[j],x+58,y+85);
    ctx.textAlign='left';ctx.fillStyle='#2b2533';ctx.font=F(900,28);wrap(q[1][j],x+112,y+82,300,32);
    if(rev&&ok){ctx.fillStyle='#43ad6e';ctx.font=F(900,40);ctx.fillText('✓',x+380,y+56);}ctx.restore();}
  if(rev){ctx.font=F(800,20);ctx.fillStyle='#2f8a52';wrapC('💡 '+q[3],W/2,568,860,26);}
  if(S.tOn){const k=S.timer/30;ctx.lineWidth=9;ctx.strokeStyle='#f6d3dc';ctx.beginPath();ctx.arc(915,70,38,0,7);ctx.stroke();ctx.strokeStyle='#f07895';ctx.beginPath();ctx.arc(915,70,38,-Math.PI/2,-Math.PI/2+6.283*k);ctx.stroke();
    ctx.fillStyle='#2b2533';ctx.font=F(900,28);ctx.textAlign='center';ctx.fillText(Math.ceil(S.timer),915,80);}ctx.textAlign='left';}});

// 9. Summary
const KEY=[['Нэгж','мм → мкм → нм','×1000','#ec9a5f'],['Окуляр','окулярын хуваарь','нэгжгүй','#f07895'],['Объектив','объективын хуваарь','бодит: 1 хуваарь = 10 мкм','#3f6fd0'],['Тохируулга','нэг хуваарийн утга','өсгөлт бүрт','#5fa070']];
SC.push({nav:'Дүгнэлт',title:'Өнөөдрийн гол санаа',subs:4,live:true,
html:'<p>Нэгж: мм → мкм → нм (×1000) · Окуляр: нэгжгүй · Объектив: бодит хуваарь · Тохируулга: өсгөлт бүрт.</p>',talk:'Сум бүрийг өөрийн үгээр тайлбарлаж чадах уу? (Exit ticket: тохируулга… хэмжилт… миний асуулт…)',
ctrls:[],init(){S={sub:0};},update(){},
draw(){bg('#fff8f3','#fdf0f0');caption('Энэ 4-ийг санавал хангалттай!');
  for(let i=0;i<4;i++){if(i>S.sub)continue;const x=70+(i%2)*440,y=120+Math.floor(i/2)*240;card(x,y,420,210,30);
    ctx.fillStyle=KEY[i][3];ctx.beginPath();ctx.arc(x+60,y+70,38,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,30);ctx.textAlign='center';ctx.fillText(i+1,x+60,y+81);ctx.textAlign='left';
    bigLine(KEY[i][0],x+120,y+68,34,'#2b2533');bigLine(KEY[i][1],x+120,y+102,18,'#7a7282',800);bigLine(KEY[i][2],x+40,y+170,26,KEY[i][3]);}}});

const TN={
'Шугам':{how:'Space дармагц шугам томорч эсүүд харагдана. «Шугам хэрэглээд эсийг хэмжиж болох уу?» гэж асууж таамаглал сонсоно. ↺ = дахин.',ans:'Үгүй. Шугамын хамгийн жижиг хуваарь 1 мм = 1000 мкм, харин сонгины эс ≈ 200 мкм. Микроскопын «шугам» хэрэгтэй.'},
'Нэгж':{how:'→ дарах бүрт нэгжийн карт нэг нэгээр гарна (м, мм, мкм, нм). Дараа нь 3 дасгал: → асуулт, → хариу.',ans:'Слайд 4: 1) зураг / бодит · 2) 1 мм = 1000 мкм · 3) гэрлийн микроскопын нарийвчлал ≈ 200 нм. Дасгал: 2 500 мкм · 7 000 нм · 0.3 мкм.'},
'Хоёр хуваарь':{how:'1 = окулярын хуваарь асаах/унтраах, 2 = объективын хуваарь асаах/унтраах (микроскопын зураг дээр байрлал нь тодорно). 3 = өсгөлт ×100 ↔ ×400: объективын хуваарь томорч, окулярынх хэвээр үлдэнэ.',ans:'Зөвхөн объективын хуваарь (объект) томорно. Окулярын хуваарь окулярт байдаг тул хэмжээ нь өөрчлөгдөхгүй. Тиймээс өсгөлт бүрт тохируулна.'},
'Тохируулга':{how:'→ дарах бүрт: 1) хоёр хуваарь → 2) 0 тааруулах (хуваарь гулсаж ирнэ) → 3) 40 = 10 давхцал → 4) тооцоо. Дараа нь слайд 8-ын 2 дасгал: → асуулт, → хариу.',ans:'40 окуляр = 10 объектив = 100 мкм → 1 окуляр = 2.5 мкм. Дасгал: 25 = 10 → 4 мкм; 50 = 20 → 4 мкм.'},
'Хэмжилт':{how:'→ дарах бүрт: эс тодорно → хуваарийн тоо гарна → дараагийн эс рүү шилжинэ. 5 эсийн дараа дундаж, хүрээ гарна. 1 = хлоропласт (элодей) харах.',ans:'Дундаж 195 мкм (165–225 мкм). Олон эс, санамсаргүй сонголт, дундаж ± хүрээ (слайд 10). Хлоропласт: 2 хуваарь × 2.5 = 5 мкм (слайд 14-2).'},
'Алдаа':{how:'→ дарах бүрт: ×100 тохируулга → ×400 болох → буруу тооцоо → зөв тооцоо.',ans:'4 дахин том гарна (слайд 14-1). Хуваарь давхцахгүй бол тавцанг хөдөлгөж хамгийн тод давхцал олно (14-4). Эсүүд 60–90 мкм бол дундаж ± хүрээгээр илэрхийлнэ (14-3).'},
'Үнэн/худал':{how:'→ дарах бүрт: өгүүлбэр → хариу. Сурагчид үнэн бол гараа өргөж, худал бол сууна.',ans:'1) Худал 2) Үнэн 3) Үнэн 4) Үнэн 5) Худал 6) Худал'},
'Сорилт':{how:'→ дарах бүрт: асуулт → хариу. Асуулт гармагц Space = 30 секундын цаг.',ans:'1) C 1000 · 2) B шилэн дээр · 3) A 2.5 мкм · 4) A дахин тохируулна · 5) A 30 мкм · 6) A олон эсийн дундаж'},
'Дүгнэлт':{how:'→ дарах бүрт гол санаа нэг нэгээр гарна. Дараа нь exit ticket, гэрийн даалгавар (слайд 28–29).',ans:'Слайд 15: Нэгж: мм → мкм → нм (×1000) · Окуляр: нэгжгүй · Объектив: бодит хуваарь · Тохируулга: өсгөлт бүрт.'}
};
const ORDER=SC.map(s=>s.nav);

// ---------- UI ----------
let MODE=location.hash==='#bagsh'?'teacher':'screen';let IN_FRAME=false;try{IN_FRAME=window.top!==window;}catch(e){IN_FRAME=true;}const IS_PROJ=location.hash==='#delgets';
document.body.className=MODE;
let playing=false,blankOn=false,titleOn=true;
const ch=('BroadcastChannel' in window)?new BroadcastChannel('es-hemjih-hicheel'):null;
function state(){return{type:'state',scene,sub:S&&S.sub||0,playing,on:[...document.querySelectorAll('#ctrls button')].map(b=>b.classList.contains('on'))};}
function send(){if(ch&&MODE==='screen')ch.postMessage(state());}
function stepLabel(){const s=SC[scene];if(!s.subs)return`${scene+1} / ${SC.length}`;return `${scene+1} / ${SC.length} · ${(S.sub||0)+1}/${s.subs}`;}
function notesHTML(i){const s=SC[i],n=TN[s.nav]||{};return `<h2>${i+1}. ${s.title}</h2><h3>🎬 Юу хийх вэ</h3><p>${n.how||''}</p><h3>📖 Гол санаа</h3>${s.html}${s.talk?`<h3>💬 Ярилцах асуулт</h3><p>${s.talk}</p>`:''}<h3>✅ Хариу</h3><p>${n.ans||''}</p>`;}
function go(i){scene=clamp(i,0,SC.length-1);slow=false;playing=false;const s=SC[scene];s.init();
  $('chip').innerHTML=`<i>${scene+1}</i>${s.nav}`;$('chip').style.display=s.quiz?'none':'';
  const c=$('ctrls');c.innerHTML='';s.ctrls.forEach(([lab,fn,cls],k)=>{const b=document.createElement('button');b.textContent=`${k+1} ${lab}`;b.dataset.l=lab;if(cls)b.className=cls.replace('big','');b.onclick=()=>{fn(b);if(!playing)setPlay(true);send();};c.appendChild(b);});
  $('notes').innerHTML=notesHTML(scene);upd();send();}
function upd(){[...$('dots').children].forEach((b,j)=>{b.classList.toggle('on',j===scene);b.classList.toggle('done',j<scene);});$('pos').textContent=stepLabel();$('bPlay').textContent=SC[scene].quiz?'⏱':playing?'⏸':'▶';}
function setPlay(v){if(SC[scene].quiz){SC[scene].onPlay();send();return;}playing=v;upd();send();}
function next(){const s=SC[scene];if(s.subs&&S.sub<s.subs-1){S.sub++;S.tOn=false;S.timer=0;upd();send();}else if(scene<SC.length-1)go(scene+1);}
function prev(){const s=SC[scene];if(s.subs&&S.sub>0){S.sub--;S.tOn=false;S.timer=0;upd();send();}else if(scene>0)go(scene-1);}
function ctrl(k){const b=$('ctrls').children[k];if(b)b.click();}
function toggleBlank(){blankOn=!blankOn;$('blank').classList.toggle('on',blankOn);}
function fsTip(){const el=$('toast');el.innerHTML='Бүтэн дэлгэц болохгүй байна.<br><b>Mac:</b> Control + Command + F &nbsp;·&nbsp; <b>Windows:</b> F11';el.classList.add('on');clearTimeout(fsTip.t);fsTip.t=setTimeout(()=>el.classList.remove('on'),5000);}
function toggleFS(){try{if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return;}
  if(!document.fullscreenEnabled||!document.documentElement.requestFullscreen){fsTip();return;}
  document.documentElement.requestFullscreen().then(()=>setTimeout(resize,80)).catch(fsTip);}catch(e){fsTip();}}
let tchSeen=0,frameC=null;
function sendFrame(){if(!ch||Date.now()-tchSeen>5000)return;if(!frameC){frameC=document.createElement('canvas');frameC.width=640;frameC.height=410;}const g=frameC.getContext('2d');g.drawImage(cv,0,0,640,410);if(blankOn){g.fillStyle='#1d1a22';g.fillRect(0,0,640,410);}try{ch.postMessage({type:'frame',url:frameC.toDataURL('image/jpeg',.72)});}catch(e){}}
function exec(m){tchSeen=Date.now();if(m.cmd==='go')go(m.i);if(m.cmd==='next')next();if(m.cmd==='prev')prev();if(m.cmd==='play')setPlay(!playing);if(m.cmd==='ctrl')ctrl(m.k);if(m.cmd==='blank')toggleBlank();if(m.cmd==='hello')send();}
let tchOnMsg=null;function toTeacher(){MODE='teacher';document.body.className='teacher';$('start').classList.remove('on');try{history.replaceState(null,'','#bagsh');}catch(e){}initTeacher();if(ch&&tchOnMsg)ch.onmessage=tchOnMsg;}
function toScreen(){MODE='screen';document.body.className='screen';try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}if(ch)ch.onmessage=e=>{if(e.data&&e.data.cmd)exec(e.data);};resize();}
function initScreen(){
  SC.forEach((s,i)=>{const b=document.createElement('button');b.textContent=i+1;b.title=s.nav;b.onclick=()=>go(i);$('dots').appendChild(b);});
  $('bPrev').onclick=prev;$('bNext').onclick=next;$('bPlay').onclick=()=>setPlay(!playing);
  $('bNotes').onclick=()=>$('notes').classList.toggle('on');$('fs').onclick=toggleFS;
  $('bTeacher').onclick=toTeacher;
  async function openProjector(){
    const url=location.href.split('#')[0]+'#delgets';
    const w=window.open(url,'es_projector','popup=yes,width=1280,height=800');
    if(!w||IN_FRAME){if(w)try{w.close();}catch(e){}const el=$('toast');el.innerHTML='Шинэ цонх нээгдсэнгүй. Хуудсыг <b>татаж авсан файлаас</b> Chrome дээр нээгээд дахин оролдоорой.';el.classList.add('on');setTimeout(()=>el.classList.remove('on'),7000);return;}
    try{if('getScreenDetails' in window){const sd=await getScreenDetails();const other=sd.screens.find(x=>x!==sd.currentScreen);
      if(other){w.moveTo(other.availLeft,other.availTop);w.resizeTo(other.availWidth,other.availHeight);}}}catch(e){}
    toTeacher();}
  $('sProj').onclick=openProjector;
  $('sSingle').onclick=()=>$('start').classList.remove('on');
  if(IS_PROJ){$('fsclick').classList.add('on');$('fsclick').onclick=()=>{$('fsclick').classList.remove('on');toggleFS();};}
  else $('start').classList.add('on');
  document.addEventListener('keydown',e=>{if(MODE!=='screen')return;const k=e.key;
    if(['ArrowRight','PageDown','Enter'].includes(k)){e.preventDefault();next();}
    else if(['ArrowLeft','PageUp'].includes(k)){e.preventDefault();prev();}
    else if(k===' '){e.preventDefault();if(SC[scene].nav==='Ханиалга'&&!e.repeat){ctrl(0);}else setPlay(!playing);}
    else if(k>='1'&&k<='5')ctrl(+k-1);
    else if(k==='b'||k==='B'||k==='.')toggleBlank();
    else if(k==='t'||k==='T'){titleOn=!titleOn;$('chip').classList.toggle('hide',!titleOn);}
    else if(k==='n'||k==='N')$('notes').classList.toggle('on');
    else if(k==='f'||k==='F')toggleFS();});
  let idle;const wake=()=>{$('bar').classList.remove('idle');clearTimeout(idle);idle=setTimeout(()=>{if(!$('bar').matches(':hover'))$('bar').classList.add('idle');},2500);};
  ['mousemove','mousedown','touchstart'].forEach(ev=>document.addEventListener(ev,wake));wake();
  if(ch)ch.onmessage=e=>{if(e.data&&e.data.cmd)exec(e.data);};
  document.addEventListener('fullscreenchange',()=>setTimeout(resize,60));window.addEventListener('resize',()=>setTimeout(resize,30));
  let last=performance.now();
  function loop(now){if(MODE!=='screen'){last=now;requestAnimationFrame(loop);return;}let dt=Math.min(.05,(now-last)/1000);last=now;if(slow)dt*=.25;
    if(playing||SC[scene].quiz||SC[scene].live){t+=dt;SC[scene].update(dt);}
    const k=cv.width/W;ctx.setTransform(k,0,0,k,0,0);ctx.clearRect(0,0,W,H);SC[scene].draw();requestAnimationFrame(loop);}
  resize();go(0);requestAnimationFrame(loop);setInterval(send,1500);setInterval(sendFrame,220);
}
let teacherInit=false;
function initTeacher(){if(teacherInit){return;}teacherInit=true;
  // ----- teacher remote -----
  const post=m=>{if(ch)ch.postMessage(m);};let st=null,lastSeen=0;
  const tnav=$('tnav');SC.forEach((s,i)=>{const b=document.createElement('button');b.textContent=`${i+1}. ${s.nav}`;b.onclick=()=>{post({cmd:'go',i});if(Date.now()-lastSeen>4000){st={type:'state',scene:i,sub:0,playing:false,on:[]};render();}};tnav.appendChild(b);});
  $('tPrev').onclick=()=>post({cmd:'prev'});$('tNext').onclick=()=>post({cmd:'next'});$('tPlay').onclick=()=>post({cmd:'play'});
  $('bReopen').onclick=()=>{const w=window.open(location.href.split('#')[0]+'#delgets','es_projector','popup=yes,width=1280,height=800');if(w&&'getScreenDetails' in window){getScreenDetails().then(sd=>{const o=sd.screens.find(x=>x!==sd.currentScreen);if(o){w.moveTo(o.availLeft,o.availTop);w.resizeTo(o.availWidth,o.availHeight);}}).catch(()=>{});}};
  $('bBack').onclick=toScreen;
  let shown=-1;
  function render(){if(!st)return;const s=SC[st.scene],n=TN[s.nav]||{};
    [...tnav.children].forEach((b,j)=>b.classList.toggle('on',j===st.scene));
    {const sb=st.sub||0;let nx;if(s.subs&&sb<s.subs-1)nx=`${s.nav}: ${sb+2}-р алхам`;else nx=st.scene<SC.length-1?`${st.scene+2}. ${SC[st.scene+1].nav}`:'Төгсгөл';$('nextup').innerHTML=`Дараагийнх ▸ <b>${nx}</b>`;}
    $('tPlay').textContent=s.quiz?'⏱ 30 секундын цаг':st.playing?'⏸ Зогсоох':'▶ Тоглуулах';
    const sb=st.sub||0;$('tpos').textContent=s.subs?`${st.scene+1} / ${SC.length} · ${sb+1}/${s.subs}`:`${st.scene+1} / ${SC.length}`;
    const tc=$('tctrls');if(shown!==st.scene){tc.innerHTML='';s.ctrls.forEach(([lab],k)=>{const b=document.createElement('button');b.textContent=`${k+1} ${lab}`;b.onclick=()=>post({cmd:'ctrl',k});tc.appendChild(b);});
      const bl=document.createElement('button');bl.textContent='⬛ Дэлгэц харлуулах';bl.onclick=()=>post({cmd:'blank'});tc.appendChild(bl);
      $('tHow').innerHTML=`<p>${n.how||''}</p>`;$('tHtml').innerHTML=s.html;$('tTalk').innerHTML=`<p>${s.talk||'—'}</p>`;
      let ans=`<p>${n.ans||''}</p>`;$('tAns').innerHTML=ans;shown=st.scene;}
    [...tc.children].forEach((b,k)=>{if(st.on[k]!==undefined)b.classList.toggle('on',st.on[k]);});}
  if(ch)ch.onmessage=tchOnMsg=e=>{const d=e.data;if(!d)return;if(d.type==='state'){st=d;lastSeen=Date.now();render();}if(d.type==='frame'){lastSeen=Date.now();$('pimg').src=d.url;$('pph').style.display='none';}};
  let t0=Date.now();$('bClock').onclick=()=>t0=Date.now();setInterval(()=>{const sec=Math.floor((Date.now()-t0)/1000);$('clock').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');},500);
  setInterval(()=>{const ok=Date.now()-lastSeen<4000;if(!ok){$('pph').style.display='grid';$('pimg').removeAttribute('src');}$('status').textContent=ok?'Дэлгэцтэй холбогдсон ✓':'Дэлгэц олдсонгүй';$('status').classList.toggle('ok',ok);$('help').style.display=ok?'none':'block';post({cmd:'hello'});},1000);
  st={type:'state',scene:0,sub:0,playing:false,on:[]};render();
  document.addEventListener('keydown',e=>{if(MODE!=='teacher')return;const k=e.key;if(['ArrowRight','PageDown','Enter'].includes(k)){e.preventDefault();post({cmd:'next'});}else if(['ArrowLeft','PageUp'].includes(k)){e.preventDefault();post({cmd:'prev'});}
    else if(k===' '){e.preventDefault();if(st&&SC[st.scene].nav==='Ханиалга')post({cmd:'ctrl',k:0});else post({cmd:'play'});}else if(k>='1'&&k<='5')post({cmd:'ctrl',k:+k-1});else if(k==='b'||k==='B'||k==='.')post({cmd:'blank'});});
  post({cmd:'hello'});
  if(!ch)$('status').textContent='Энэ хөтөч холболтыг дэмжихгүй';
}

if(MODE==='screen')initScreen();else{initScreen();toTeacher();}
if(IN_FRAME){const n=document.querySelector('.snote');if(n)n.innerHTML='⚠ Проектор горим зөвхөн <b>татаж авсан файлыг Chrome-оор</b> нээхэд ажиллана. Энд «Энэ дэлгэцээр л үзүүлэх»-ийг ашиглана уу.';}

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
// 1. What comes in with air
SC.push({nav:'Агаар',title:'Бид юу амьсгалдаг вэ?',
html:`<p>Бид өдөрт <b>10 000 гаруй литр</b> агаар амьсгалдаг. Энэ нь <b>20 литрийн 500 хувин</b>-тай тэнцэнэ!</p>
<p>Агаар цэвэр харагдавч дотор нь нүдэнд үл үзэгдэх жижигхэн зочид бий:</p><ul><li><b>Тоос</b>: шороо, утааны жижиг хэсгүүд</li><li><b>Нян (бактери)</b>: нүдэнд харагдахгүй жижигхэн амьд биес. Зарим нь өвчин үүсгэнэ.</li><li><b>Вирус</b>: нянгаас ч жижиг, эсэд орж үржиж өвчин үүсгэнэ.</li></ul>
<div class="like"><b>🔎 Яг л...</b>Хамар бол бидний биеийн <b>агаар цэвэршүүлэгч</b>. Тэр агаарыг уушги руу явуулахаас өмнө шүүдэг.</div>`,
talk:'Эдгээр нь уушгинд шууд хүрвэл юу болох вэ? Бие яаж хамгаалдаг бол?',
ctrls:[['+ Тоос',()=>S.burst('dust')],['+ Нян',()=>S.burst('bact')],['+ Вирус',()=>S.burst('virus')]],
init(){S={parts:[],sp:0,n:0,burst(tp){for(let i=0;i<8;i++)S.parts.push(mkIn(tp));}};},
update(dt){S.sp-=dt;if(S.sp<=0){S.sp=.22;S.parts.push(mkIn(pickType()));}
  const NX=588,NY=352;
  for(const p of S.parts){const dx=NX-p.x,dy=NY-p.y,d=Math.hypot(dx,dy);p.x+=dx/d*p.v*dt;p.y+=dy/d*p.v*dt+Math.sin(t*3+p.w)*.7;p.rot=Math.sin(t*2+p.w)*.3;
    if(d<60)p.s=Math.max(.2,d/60);if(d<10){p.dead=true;S.n++;}}
  S.parts=S.parts.filter(p=>!p.dead);},
draw(){bg('#eef5ff','#fdf3ee');
  // air swirls
  ctx.strokeStyle='rgba(111,156,240,.28)';ctx.lineWidth=4;ctx.setLineDash([14,14]);ctx.lineDashOffset=-t*40;
  for(const y0 of [140,260,420,540]){ctx.beginPath();ctx.moveTo(20,y0);ctx.bezierCurveTo(250,y0,420,(y0+352)/2,575,352);ctx.stroke();}ctx.setLineDash([]);
  head(790,300,1);
  for(const p of S.parts)germ(p);
  // legend
  ctx.save();ctx.shadowColor='rgba(107,58,72,.14)';ctx.shadowBlur=14;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(24,512,400,104,24);ctx.fill();ctx.restore();
  dust(70,552,1.6,0,'happy');bact(205,552,1.4,0,'happy');virus(335,552,1.4,0,'happy');
  ctx.font=F(800,17);ctx.fillStyle='#2b2533';ctx.textAlign='center';ctx.fillText('Тоос',70,598);ctx.fillText('Нян (бактери)',205,598);ctx.fillText('Вирус',335,598);ctx.textAlign='left';
  pill(`Хамар руу орсон: ${S.n}`,null,null,700,40);
}});
function mkIn(tp){return{type:tp,x:rnd(-60,-10),y:rnd(60,560),v:rnd(110,170),w:rnd(0,6),s:1,mood:'happy'};}
function head(cx,cy,mood){
  // ear
  ctx.fillStyle='#fde2d4';ctx.strokeStyle='#efc9b6';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx+178,cy+15,24,34,0,0,7);ctx.fill();ctx.stroke();
  const g=ctx.createLinearGradient(0,cy-220,0,cy+220);g.addColorStop(0,'#fff0e6');g.addColorStop(1,'#fbdccb');
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,190,215,0,0,7);ctx.fill();ctx.stroke();
  // hair
  ctx.save();ctx.beginPath();ctx.ellipse(cx,cy,190,215,0,0,7);ctx.clip();ctx.fillStyle='#6b4a3a';ctx.beginPath();ctx.moveTo(cx-220,cy-260);ctx.lineTo(cx+220,cy-260);ctx.lineTo(cx+220,cy+40);
  ctx.quadraticCurveTo(cx+150,cy-40,cx+120,cy-110);ctx.quadraticCurveTo(cx+40,cy-90,cx-20,cy-130);ctx.quadraticCurveTo(cx-100,cy-100,cx-200,cy-120);ctx.closePath();ctx.fill();ctx.restore();
  // nose
  ctx.fillStyle='#fde6da';ctx.beginPath();ctx.moveTo(cx-172,cy-50);ctx.quadraticCurveTo(cx-250,cy+40,cx-220,cy+70);ctx.quadraticCurveTo(cx-195,cy+82,cx-160,cy+72);ctx.lineTo(cx-150,cy-50);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#efc9b6';ctx.beginPath();ctx.moveTo(cx-174,cy-48);ctx.quadraticCurveTo(cx-250,cy+40,cx-220,cy+70);ctx.quadraticCurveTo(cx-195,cy+82,cx-162,cy+72);ctx.stroke();
  ctx.fillStyle='#c97a86';ctx.beginPath();ctx.ellipse(cx-200,cy+60,9,5,-.2,0,7);ctx.fill();
  // face
  ctx.strokeStyle='#2b2533';ctx.lineWidth=4;ctx.lineCap='round';
  if(mood===1){ctx.beginPath();ctx.arc(cx-90,cy-20,14,Math.PI*1.15,Math.PI*1.85);ctx.stroke();}
  ctx.fillStyle='rgba(255,143,171,.4)';ctx.beginPath();ctx.ellipse(cx-100,cy+30,22,12,0,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(cx-150,cy+112,14,.3,Math.PI-.6);ctx.stroke();
}

// 2. Sticky mucus
SC.push({nav:'Салст',title:'1-р хамгаалалт: наалдамхай салст',
html:`<p>Хамрын хөндий, цагаан мөгөөрсөн хоолой, бронхийн дотор талыг <b>хучуур эд</b> бүрхдэг. Түүнд <b>хоёр төрлийн эс</b> нэг баг болж ажиллана:</p><ul><li><b>Салст бүрхүүлэгч эс</b>: наалдамхай <b>салст</b> ялгаруулна (зурагт ягаан аяга хэлбэртэй эс).</li><li><b>Сормууст эс</b>: гадаргуудаа олон сормуустай (дараагийн алхамд).</li></ul><p>Салст <b>наалдамхай</b> тул тоос, нян, вирус хүрмэгц наалдаж баригдана. Бидний «нус» гэдэг чинь салст юм.</p>
<div class="like"><b>🔎 Яг л...</b>ялаа барьдаг наалдамхай тууз шиг. Хүрсэн бүхэн наалдаад үлдэнэ.</div>`,
talk:'Хамрын дотор яагаад үргэлж чийгтэй байдаг вэ? Хуурай байвал юу болох вэ?',
ctrls:[['+ Тоос',()=>S.burst('dust')],['+ Нян',()=>S.burst('bact')],['+ Вирус',()=>S.burst('virus')],['↺ Дахин',()=>SC[scene].init()]],
init(){S={parts:[],drops:[],sp:0,stuck:0,pass:0,burst(tp){for(let i=0;i<8;i++)S.parts.push(mk2(tp));}};},
update(dt){S.sp-=dt;if(S.sp<=0){S.sp=.35;S.parts.push(mk2(pickType()));}
  if(Math.random()<dt*2.2){const gx=GOB2[Math.floor(Math.random()*GOB2.length)];const top=Math.random()<.5;S.drops.push({x:gx+rnd(-6,6),y:top?110:530,vy:top?30:-30,a:1});}
  for(const d of S.drops){d.y+=d.vy*dt;d.a-=dt*.7;}S.drops=S.drops.filter(d=>d.a>0);
  for(const p of S.parts){if(p.st)continue;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot=Math.sin(t*3+p.w)*.3;
    const topE=140+5*Math.sin(p.x*.02+t),botE=500+5*Math.sin(p.x*.02+t+2);
    if(p.y<topE+8){p.st='top';p.y=rnd(118,topE);p.mood='shock';S.stuck++;}
    else if(p.y>botE-8){p.st='bot';p.y=rnd(botE,522);p.mood='shock';S.stuck++;}
    if(p.x>W+30){p.dead=true;S.pass++;}}
  S.parts=S.parts.filter(p=>!p.dead);if(S.parts.length>160)S.parts.splice(0,S.parts.length-160);},
draw(){bg('#eef5ff','#f7fbff');
  for(const top of [true,false]){const y0=top?0:530,h=110;
    const g=ctx.createLinearGradient(0,y0,0,y0+h);g.addColorStop(top?0:1,'#f6c9d3');g.addColorStop(top?1:0,'#fde5ea');ctx.fillStyle=g;ctx.fillRect(0,y0,W,h);
    ctx.strokeStyle='#efb3c1';ctx.lineWidth=1.5;for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x,y0+h);ctx.stroke();}
    for(const gx of GOB2){ctx.fillStyle='#ece6f8';ctx.strokeStyle='#aa9bd4';ctx.lineWidth=2;ctx.beginPath();
      if(top){ctx.moveTo(gx-6,8);ctx.bezierCurveTo(gx-8,40,gx-22,50,gx-20,96);ctx.lineTo(gx-8,110);ctx.lineTo(gx+8,110);ctx.lineTo(gx+20,96);ctx.bezierCurveTo(gx+22,50,gx+8,40,gx+6,8);}
      else{ctx.moveTo(gx-6,632);ctx.bezierCurveTo(gx-8,600,gx-22,590,gx-20,544);ctx.lineTo(gx-8,530);ctx.lineTo(gx+8,530);ctx.lineTo(gx+20,544);ctx.bezierCurveTo(gx+22,590,gx+8,600,gx+6,632);}
      ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='rgba(176,206,98,.8)';for(let k=0;k<5;k++){ctx.beginPath();ctx.arc(gx+((k*7)%13)-6,top?60+k*8:580-k*8,4.5,0,7);ctx.fill();}}
  }
  // mucus layers
  ctx.fillStyle='rgba(185,218,110,.72)';
  ctx.beginPath();ctx.moveTo(0,110);for(let x=0;x<=W;x+=10)ctx.lineTo(x,140+5*Math.sin(x*.02+t));ctx.lineTo(W,110);ctx.fill();
  ctx.beginPath();ctx.moveTo(0,530);for(let x=0;x<=W;x+=10)ctx.lineTo(x,500+5*Math.sin(x*.02+t+2));ctx.lineTo(W,530);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.45)';for(let i=0;i<14;i++){const x=(i*73)%W;ctx.beginPath();ctx.arc(x,124+(i%3)*4,3,0,7);ctx.arc(x+30,512+(i%3)*4,2.5,0,7);ctx.fill();}
  for(const d of S.drops){ctx.fillStyle=`rgba(160,200,90,${d.a})`;ctx.beginPath();ctx.arc(d.x,d.y,5,0,7);ctx.fill();}
  // airflow
  ctx.strokeStyle='rgba(111,156,240,.25)';ctx.lineWidth=4;for(let r=0;r<4;r++){const y=200+r*80;for(let i=0;i<6;i++){const x=frac((i*190+r*60+t*110)/1140)*1140-70;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+50,y);ctx.lineTo(x+40,y-8);ctx.moveTo(x+50,y);ctx.lineTo(x+40,y+8);ctx.stroke();}}
  for(const p of S.parts)germ(p);
  pill('Наалдамхай салст',600,512,640,566,'#8fbf4a');
  pill('Салст бүрхүүлэгч эс',GOB2[1],552,GOB2[1]-80,586,'#aa9bd4');
  pill(`Наалдсан: ${S.stuck}  ·  Цааш гарсан: ${S.pass}`,null,null,380,168);
}});
const GOB2=[120,330,540,750,930];
function mk2(tp){return{type:tp,x:-20,y:rnd(180,460),vx:rnd(110,160),vy:rnd(40,95)*(Math.random()<.5?-1:1),w:rnd(0,6),s:1.1,mood:'happy'};}

// 3. Cilia escalator
const CT=450,CL=62,MB3=CT-CL+6;
SC.push({nav:'Салстын шат',title:'2-р хамгаалалт: «салстын шат»',
html:`<p><b>Сормууст эсийн</b> гадаргуу дээр нүдэнд үл үзэгдэх жижигхэн <b>үс шиг сормуус</b> олон бий.</p><ul><li>Сормуус бүгд нэг зүг рүү <b>тасралтгүй</b> цохилж, наалдсан тоос, нянтай салстыг <b>хоолой руу</b> түлхэнэ.</li><li>Цагаан мөгөөрсөн хоолой, бронхид салст <b>доороос дээш</b>, хамарт <b>хойш</b> хоолой руу зөөгдөнө.</li><li>Хоолойд ирсэн салстыг бид мэдэлгүй <b>залгидаг</b>, ходоодны хүчил нянг устгана. Ингэснээр <b>цулцан цэвэр</b> үлдэнэ.</li></ul>
<div class="like"><b>🔎 Яг л...</b>хөдөлгөөнт шат (эскалатор) шиг. Салстыг ачаатай нь тасралтгүй хоолой руу зөөнө.</div>`,
talk:'«Сормуусыг зогсоох»-ыг дараад ажигла. Сормуус гэмтвэл юу болох вэ? (Сойзгүй загвар шиг)',
ctrls:[['🐢 Удаашруулах',(b)=>{slow=!slow;b.classList.toggle('on',slow);}],['⛔ Сормуусыг зогсоох',(b)=>{S.stop=!S.stop;b.classList.toggle('on',S.stop);}],['+ Нян нэмэх',()=>{for(let i=0;i<8;i++)S.parts.push(mk3());}]],
init(){S={parts:[],off:0,sp:0,gulp:0,stop:false,amp:1,spd:55,thick:62,pops:[]};for(let i=0;i<14;i++){const p=mk3();p.st=1;p.x=rnd(100,W);p.df=Math.random();p.mood='shock';S.parts.push(p);}},
update(dt){S.amp=lerp(S.amp,S.stop?0:1,dt*3);S.spd=lerp(S.spd,S.stop?0:55,dt*3);S.thick=lerp(S.thick,S.stop?120:62,dt*.25);S.off+=S.spd*dt;
  S.sp-=dt;if(S.sp<=0){S.sp=.7;S.parts.push(mk3());}
  for(const p of S.parts){if(!p.st){p.y+=p.vy*dt;p.x-=10*dt;p.rot=Math.sin(t*3+p.w)*.3;if(p.y>=MB3-S.thick+8){p.st=1;p.df=rnd(.1,.9);p.mood='shock';}continue;}
    p.x-=S.spd*dt;p.y=MB3-S.thick+8+p.df*(S.thick-18)+3*Math.sin(p.x*.03+t);if(p.x<70){p.dead=true;S.gulp++;S.pops.push({x:60,y:p.y,a:1});}}
  for(const q of S.pops)q.a-=dt*1.5;S.pops=S.pops.filter(q=>q.a>0);
  S.parts=S.parts.filter(p=>!p.dead);if(S.parts.length>120)S.parts.splice(0,S.parts.length-120);},
draw(){bg('#eef5ff','#f7fbff');
  const mt=MB3-S.thick;
  // cells
  const g=ctx.createLinearGradient(0,CT,0,H);g.addColorStop(0,'#fde8ed');g.addColorStop(1,'#f6cfd8');ctx.fillStyle=g;ctx.fillRect(0,CT,W,H-CT);
  for(let i=0,x=-10;x<W+70;i++,x+=70){ctx.strokeStyle='#e7aebc';ctx.lineWidth=1.6;ctx.beginPath();ctx.roundRect(x+1,CT,68,260,[10,10,0,0]);ctx.stroke();
    if(i%5===3){const cx=x+35;ctx.fillStyle='#ece6f8';ctx.strokeStyle='#aa9bd4';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-8,H);ctx.bezierCurveTo(cx-10,CT+120,cx-28,CT+90,cx-24,CT+14);ctx.lineTo(cx-9,CT);ctx.lineTo(cx+9,CT);ctx.lineTo(cx+24,CT+14);ctx.bezierCurveTo(cx+28,CT+90,cx+10,CT+120,cx+8,H);ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(176,206,98,.85)';for(let k=0;k<6;k++){ctx.beginPath();ctx.arc(cx+((k*9)%17)-8,CT+20+k*12,5,0,7);ctx.fill();}}
    else{const nx=x+35,ny=CT+95;const ng=ctx.createRadialGradient(nx-4,ny-6,1,nx,ny,18);ng.addColorStop(0,'#c4a9e6');ng.addColorStop(1,'#7c5aa8');ctx.fillStyle=ng;ctx.beginPath();ctx.ellipse(nx,ny,13,18,0,0,7);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(nx-4,ny-6,3,0,7);ctx.fill();
      ctx.strokeStyle='#6f5c99';ctx.lineWidth=2.6;ctx.lineCap='round';for(let j=0;j<8;j++){const bx=x+8+j*7.6;cilium(bx,CT,CL,frac(t*1.4-bx*.004),S.amp,1);}}}
  // watery + mucus
  ctx.fillStyle='rgba(170,210,240,.35)';ctx.fillRect(0,MB3,W,CT-MB3);
  ctx.fillStyle='rgba(185,218,110,.75)';ctx.beginPath();ctx.moveTo(0,MB3);for(let x=0;x<=W;x+=10)ctx.lineTo(x,mt+5*Math.sin((x+S.off)*.025));ctx.lineTo(W,MB3);ctx.fill();
  ctx.fillStyle='rgba(120,160,60,.35)';for(let i=0;i<14;i++){const x=frac((i*83-S.off)/(W+80))*(W+80)-40;ctx.beginPath();ctx.ellipse(x,mt+14+(i%4)*(S.thick-26)/4,16,3,0,0,7);ctx.fill();}
  // throat on left
  ctx.fillStyle='#fde3cb';ctx.strokeStyle='#eba16c';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(-30,mt-60,90,CT-mt+60,[0,30,30,0]);ctx.fill();ctx.stroke();
  ctx.fillStyle='#c97a3a';ctx.font=F(900,26);ctx.textAlign='center';ctx.fillText('↓',22,mt+40);ctx.textAlign='left';
  for(const q of S.pops){ctx.strokeStyle=`rgba(240,120,149,${q.a})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,(1-q.a)*20+4,0,7);ctx.stroke();}
  for(const p of S.parts)germ(p);
  // direction arrow
  ctx.strokeStyle='#8fbf4a';ctx.fillStyle='#8fbf4a';ctx.lineWidth=5;ctx.lineCap='round';const ay=mt-36;ctx.beginPath();ctx.moveTo(560,ay);ctx.lineTo(380,ay);ctx.stroke();ctx.beginPath();ctx.moveTo(366,ay);ctx.lineTo(386,ay-12);ctx.lineTo(386,ay+12);ctx.fill();
  ctx.font=F(900,19);ctx.fillStyle='#5f8c2a';ctx.fillText('Салст залгиур руу зөөгдөнө',580,ay+7);
  pill('Сормуус',350,CT-30,240,CT+60-8+60,'#6f5c99');
  pill('Салст',860,mt+22,860,mt-110,'#8fbf4a');
  pill(`Залгиур руу: ${S.gulp}`,null,null,80,24,'#eba16c');
  ctx.font=F(800,16);ctx.fillStyle='#9a6a42';ctx.fillText('Залгина → ходоодны хүчил устгана',80,82);
  if(S.stop&&S.thick>80)pill('⚠ Салст хуримтлагдаж байна!',null,null,640,24,'#e0607a');
}});
function mk3(){return{type:Math.random()<.6?'bact':(Math.random()<.5?'virus':'dust'),x:rnd(250,W+20),y:-20,vy:rnd(60,100),w:rnd(0,6),s:1.15,mood:'happy',st:0};}

// ===== NEW: Runny nose =====
const CT4=430;
SC.push({nav:'Нус',title:'Нус яагаад гоождог вэ?',
html:`<p>Ханиад хүрэхэд нус гоождог. Энэ бол <b>бие вирустай тэмцэж байгаагийн шинж</b>.</p>
<ul><li>Вирус хамрын эсэд орно.</li><li>Эсүүд <b>«Аюул!»</b> гэж дохио өгнө.</li><li>Салст бүрхүүлэгч эсүүд <b>маш их салст</b> гаргана.</li><li>Цусны судас томорч хавдана, тиймээс <b>хамар битүүрнэ</b>.</li><li>Их хэмжээний салст вирусыг <b>угааж гадагшлуулна</b>. Энэ бол нус.</li></ul>
<div class="like"><b>🔎 Яг л...</b>гал сөнөөгчид усаар шүршиж галыг унтраадаг шиг бие салстаар вирусыг угааж гаргадаг.</div>
<div class="did"><b>💡 Мэдсэн үү?</b>Нус шар, ногоон болох нь вирус, нянтай тэмцэж буй <b>цагаан эсүүдийн</b> өнгө.</div>`,
talk:'Нус гоожих нь муу зүйл үү, сайн зүйл үү? Яагаад?',
ctrls:[['▶ Дахин үзэх',()=>SC[scene].init(),'big'],['🐢 Удаашруулах',(b)=>{slow=!slow;b.classList.toggle('on',slow);}]],
init(){S={time:0,vir:[],drips:[],drops:[],th:24,spd:0,vr:7,
  cells:Array.from({length:9},(_,i)=>({x:70+i*104,w:104,gob:i%3===1,sick:0}))};},
update(dt){S.time+=dt;const T=S.time;
  if(T>2.5&&!S.sent){S.sent=true;for(let i=0;i<9;i++)S.vir.push({x:rnd(200,950),y:rnd(120,200),st:'fall',w:rnd(0,6)});}
  if(T>4.6&&!S.entered){S.entered=true;[3,5,7].forEach(ci=>{const v=S.vir.find(v=>(v.st==='stuck'||v.st==='fall')&&v.target==null);if(v){v.target=ci;v.st='enter';}});}
  if(T>7&&!S.released){S.released=true;S.cells.forEach((c,i)=>{if(c.sick>.5)for(let k=0;k<3;k++)S.vir.push({x:c.x+c.w/2+rnd(-25,25),y:CT4-8,st:'up',w:rnd(0,6)});});}
  const alarm=T>5.5&&T<14.5,flush=T>9&&T<15;
  S.th=lerp(S.th,alarm?135:24,dt*(alarm?.6:.5));S.spd=lerp(S.spd,flush?170:0,dt*1.5);S.vr=lerp(S.vr,alarm?19:7,dt*.8);
  for(const c of S.cells){if(T>13)c.sick=Math.max(0,c.sick-dt*.4);
    if(c.gob&&Math.random()<dt*(alarm?6:.8))S.drops.push({x:c.x+c.w/2+rnd(-8,8),y:CT4,a:1});}
  for(const d of S.drops){d.y-=40*dt;d.a-=dt*.8;}S.drops=S.drops.filter(d=>d.a>0);
  const top=x=>CT4-S.th+5*Math.sin(x*.03+t*2);
  for(const v of S.vir){v.rot=Math.sin(t*2+v.w)*.35;
    if(v.st==='fall'){v.y+=120*dt;if(v.y>=top(v.x)+10){v.st='stuck';v.df=rnd(.15,.75);}}
    else if(v.st==='stuck'){v.x-=S.spd*dt;v.y=top(v.x)+10+v.df*Math.max(6,S.th-24);if(v.x<40){v.st='drip';v.vy=0;}}
    else if(v.st==='enter'){const c=S.cells[v.target];v.x=lerp(v.x,c.x+c.w/2,dt*3);v.y+=Math.max(70,(CT4+40-v.y)*1.2)*dt;if(v.y>CT4+40){v.st='in';c.sick=1;}}
    else if(v.st==='up'){v.y-=60*dt;if(v.y<CT4-20){v.st='stuck';v.df=rnd(.2,.8);}}
    else if(v.st==='drip'){v.vy+=500*dt;v.y+=v.vy*dt;v.x=lerp(v.x,30,dt*4);if(v.y>H+20)v.st='gone';}}
  S.vir=S.vir.filter(v=>v.st!=='gone'&&v.st!=='in');
  if(S.spd>40&&Math.random()<dt*S.spd/40)S.drips.push({x:rnd(24,40),y:CT4-S.th*.5,vy:0,r:rnd(7,11)});
  for(const d of S.drips){d.vy+=520*dt;d.y+=d.vy*dt;}S.drips=S.drips.filter(d=>d.y<H+20);},
draw(){bg('#eef5ff','#f7fbff');const T=S.time;
  // vessels
  ctx.fillStyle='#fdeee6';ctx.fillRect(0,CT4,W,H-CT4);
  const vy=600;ctx.strokeStyle='#e45a6c';ctx.lineCap='round';ctx.lineWidth=S.vr*2;ctx.beginPath();ctx.moveTo(60,vy);ctx.bezierCurveTo(300,vy-20,600,vy+20,W+20,vy);ctx.stroke();
  ctx.strokeStyle='#ff9aa8';ctx.lineWidth=S.vr*.7;ctx.beginPath();ctx.moveTo(60,vy-S.vr*.4);ctx.bezierCurveTo(300,vy-20-S.vr*.4,600,vy+20-S.vr*.4,W+20,vy-S.vr*.4);ctx.stroke();
  // cells
  for(const c of S.cells){const sk=c.sick;
    const g=ctx.createLinearGradient(0,CT4,0,CT4+150);g.addColorStop(0,c.gob?'#efe8fb':`rgb(253,${Math.round(lerp(232,196,sk))},${Math.round(lerp(237,200,sk))})`);g.addColorStop(1,c.gob?'#ddd2f3':`rgb(246,${Math.round(lerp(207,160,sk))},${Math.round(lerp(216,170,sk))})`);
    ctx.fillStyle=g;ctx.strokeStyle=c.gob?'#aa9bd4':'#e7aebc';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(c.x+2,CT4,c.w-4,150,[16,16,8,8]);ctx.fill();ctx.stroke();
    const cx=c.x+c.w/2;
    if(c.gob){ctx.fillStyle='rgba(176,206,98,.85)';for(let k=0;k<5;k++){ctx.beginPath();ctx.arc(cx-20+k*10,CT4+22+(k%2)*10,6,0,7);ctx.fill();}}
    else{ctx.strokeStyle='#6f5c99';ctx.lineWidth=2.4;for(let j=0;j<9;j++){const bx=c.x+12+j*10;cilium(bx,CT4,26,frac(t*1.4-bx*.004),1,1);}}
    const md=sk>.5?'shock':'happy';eyes(cx-14,cx+14,CT4+78,6,md);mouth(cx,CT4+94,6,sk>.5?'O':(c.gob&&T>5.5&&T<14.5?'meh':'happy'));
    ctx.fillStyle='rgba(255,143,171,.5)';ctx.beginPath();ctx.ellipse(cx-28,CT4+92,8,4.5,0,0,7);ctx.ellipse(cx+28,CT4+92,8,4.5,0,0,7);ctx.fill();
    if(sk>.5){ctx.fillStyle='#e0506a';ctx.beginPath();ctx.arc(cx+30,CT4+40,14,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,20);ctx.textAlign='center';ctx.fillText('!',cx+30,CT4+47);ctx.textAlign='left';}}
  // nostril zone
  ctx.fillStyle='#fde3cb';ctx.fillRect(0,CT4,64,H-CT4);ctx.strokeStyle='#eba16c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(64,CT4);ctx.lineTo(64,H);ctx.stroke();
  // mucus
  ctx.fillStyle='rgba(185,218,110,.78)';ctx.beginPath();ctx.moveTo(0,CT4);for(let x=0;x<=W;x+=10)ctx.lineTo(x,CT4-S.th+5*Math.sin(x*.03+t*2));ctx.lineTo(W,CT4);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.45)';for(let i=0;i<12;i++){const x=frac((i*91-t*S.spd)/(W+60))*(W+60)-30;ctx.beginPath();ctx.ellipse(x,CT4-S.th*.5+(i%3)*8,14,3,0,0,7);ctx.fill();}
  for(const d of S.drops){ctx.fillStyle=`rgba(160,200,90,${d.a})`;ctx.beginPath();ctx.arc(d.x,d.y,6,0,7);ctx.fill();}
  for(const d of S.drips){ctx.fillStyle='rgba(175,210,100,.9)';ctx.beginPath();ctx.moveTo(d.x,d.y-d.r*1.8);ctx.quadraticCurveTo(d.x+d.r,d.y,d.x,d.y+d.r);ctx.quadraticCurveTo(d.x-d.r,d.y,d.x,d.y-d.r*1.8);ctx.fill();}
  for(const v of S.vir)virus(v.x,v.y,1.25,v.rot,v.st==='stuck'||v.st==='drip'?'shock':'happy');
  // labels
  if(S.vr>12)pill('Судас хавдана → хамар битүүрнэ',500,600-S.vr,560,560-S.vr-40,'#e45a6c');
  if(S.spd>60)pill('Нус гоожно 💧',36,CT4-S.th*.3,90,CT4-S.th-70,'#8fbf4a');
  // caption
  const steps=['Хамар тайван — нимгэн салст','Вирус орж ирлээ!','Эсүүд «Аюул!» гэж дохио өгнө','Салст их гарч, судас хавдана','Олон салст вирусыг угааж гаргана → нус','Вирус угаагдаж, хамар эдгэрлээ ✨'];
  const k=T<2.5?0:T<4.6?1:T<6.8?2:T<9?3:T<15?4:5;
  ctx.save();ctx.shadowColor='rgba(107,58,72,.16)';ctx.shadowBlur=14;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(170,22,660,58,29);ctx.fill();ctx.restore();
  ctx.fillStyle='#f07895';ctx.beginPath();ctx.arc(200,51,19,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,19);ctx.textAlign='center';ctx.fillText(k+1,200,58);
  ctx.fillStyle='#2b2533';ctx.font=F(900,23);ctx.textAlign='left';ctx.fillText(steps[k],232,59);
  for(let i=0;i<6;i++){ctx.fillStyle=i<=k?'#f07895':'#f6d3dc';ctx.beginPath();ctx.arc(440+i*24,100,6,0,7);ctx.fill();}
}});

// ===== NEW: Winter =====
const CT5=520,MB5=CT5-48;
SC.push({nav:'Сэргийлэх',title:'Сэргийлэх: тамхи, утаа',
html:`<p>Сормуус, салстыг гэмтээдэг зүйлсийг товчоор асааж ажигла:</p><ul><li><b>🚬 Тамхи</b> (электрон тамхи ч мөн): утаа <b>сормуусыг саажуулж</b>, салст хуримтлагдана. Тиймээс тамхичин өглөө ханиалгадаг.</li><li><b>🌫 Утаа</b>: нүүрсний утаа ч сормуусыг гэмтээнэ.</li><li><b>😷 Маск</b> нь тоос, нян, вирусыг хамарт хүрэхээс өмнө барина.</li></ul>
<div class="did"><b>🛡 Халдвараас сэргийлэх 4 дадал</b>1) <strong>Ханиалгах ёс зүй</strong>: тохойгоороо халхлах<br>2) <strong>Маск</strong>: өвчтэй үед, бохир агаарт<br>3) <strong>Агааржуулалт</strong>: анги, гэрийг өдөрт хэд хэдэн удаа<br>4) <strong>Вакцин</strong>: БЦЖ (сүрьеэ), томуу, пневмококк</div>`,
talk:'Танай ангид эдгээр 4 дадлын аль нь хамгийн их хэрэгтэй вэ?',
ctrls:[['☀️ Зун',(b)=>{setMode('summer',b);},'r on'],['❄️ Өвөл',(b)=>{setMode('winter',b);},'r'],['🌫 Утаа',(b)=>{S.smog=!S.smog;b.classList.toggle('on',S.smog);S.hit=0;S.out=0;}],['🚬 Тамхи',(b)=>{S.tob=!S.tob;b.classList.toggle('on',S.tob);S.hit=0;S.out=0;}],['😷 Маск',(b)=>{S.mask=!S.mask;b.classList.toggle('on',S.mask);S.hit=0;S.out=0;}]],
init(){S={mode:'summer',smog:false,mask:false,cil:1.4,th:62,vir:[],sp:0,hit:0,out:0,off:0,snow:Array.from({length:70},()=>({x:rnd(0,W),y:rnd(0,210),v:rnd(20,45),r:rnd(1.5,3.5)})),
  sick:Array.from({length:16},()=>0),smogP:[]};},
update(dt){const w=S.mode==='winter';let P=w?{cil:.5,th:30,spawn:2.2,pass:.45}:{cil:1.4,th:62,spawn:.8,pass:.04};
  if(w&&S.mask)P={cil:1.0,th:52,spawn:1.1,pass:.14};if(S.mask&&!w)P={cil:1.4,th:62,spawn:.4,pass:.03};if(S.smog){P.cil*=.55;P.pass=Math.min(.8,P.pass+.22);}if(S.tob){P.cil*=.22;P.th+=34;P.pass=Math.min(.85,P.pass+.28);}
  S.cil=lerp(S.cil,P.cil,dt*2);S.th=lerp(S.th,P.th,dt*1.2);S.off+=50*S.cil*dt;
  S.sp-=dt;if(S.sp<=0){S.sp=1/P.spawn;S.vir.push({x:rnd(120,W),y:258,st:'fall',w:rnd(0,6)});}
  if(S.smog&&Math.random()<dt*8)S.smogP.push({x:rnd(80,W),y:225,st:'fall',w:rnd(0,6)});
  const top=x=>MB5-S.th+4*Math.sin((x+S.off)*.025);
  for(const v of S.vir.concat(S.smogP)){v.rot=Math.sin(t*2+v.w)*.35;
    if(v.st==='fall'){v.y+=90*dt;v.x-=8*dt;if(v.y>=top(v.x)+6){v.st='stuck';v.df=rnd(.15,.8);v.tt=0;}}
    else if(v.st==='stuck'){v.x-=50*S.cil*dt;v.y=top(v.x)+6+v.df*Math.max(4,S.th-16);v.tt+=dt;
      if(!v.rolled&&v.tt>1.2&&v.smogless!==true){v.rolled=true;if(S.vir.includes(v)&&Math.random()<P.pass)v.st='pass';}
      if(v.x<10){v.st='gone';if(S.vir.includes(v))S.out++;}}
    else if(v.st==='pass'){v.y+=60*dt;if(v.y>CT5+10){v.st='gone';S.hit++;const i=clamp(Math.floor((v.x+10)/70),0,15);S.sick[i]=Math.min(1,S.sick[i]+.4);}}}
  S.vir=S.vir.filter(v=>v.st!=='gone');S.smogP=S.smogP.filter(v=>v.st!=='gone');if(S.smogP.length>120)S.smogP.splice(0,20);
  for(let i=0;i<16;i++)S.sick[i]=Math.max(0,S.sick[i]-dt*.06);
  for(const s of S.snow){s.y+=s.v*dt;s.x+=Math.sin(t+s.r)*8*dt;if(s.y>210){s.y=-5;s.x=rnd(0,W);}}},
draw(){const w=S.mode==='winter';
  // outside strip
  const g=ctx.createLinearGradient(0,0,0,210);
  if(w){g.addColorStop(0,'#dbe4ef');g.addColorStop(1,'#f3f6fb');}else{g.addColorStop(0,'#bfe3ff');g.addColorStop(1,'#eaf7ff');}
  ctx.fillStyle=g;ctx.fillRect(0,0,W,210);
  if(!w){ctx.save();ctx.translate(900,62);ctx.rotate(t*.3);ctx.strokeStyle='#ffd35c';ctx.lineWidth=5;ctx.lineCap='round';for(let i=0;i<10;i++){ctx.rotate(.628);ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(54,0);ctx.stroke();}ctx.restore();
    ctx.fillStyle='#ffd35c';ctx.beginPath();ctx.arc(900,62,32,0,7);ctx.fill();eyes(890,910,58,4,'happy');mouth(900,70,5,'happy');}
  ctx.fillStyle=w?'#ffffff':'#bfe6b0';ctx.beginPath();ctx.moveTo(0,210);ctx.quadraticCurveTo(200,140,420,190);ctx.quadraticCurveTo(650,150,820,185);ctx.quadraticCurveTo(920,165,W,180);ctx.lineTo(W,210);ctx.fill();
  ctx.fillStyle=w?'#e3ecf7':'#a5d897';ctx.beginPath();ctx.moveTo(0,210);ctx.quadraticCurveTo(300,170,560,200);ctx.quadraticCurveTo(800,180,W,205);ctx.lineTo(W,210);ctx.fill();
  if(w){ctx.fillStyle='#fff';for(const s of S.snow){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill();}}
  if(S.smog){ctx.fillStyle='rgba(120,108,98,.38)';ctx.fillRect(0,0,W,210);for(let i=0;i<8;i++){const x=frac((i*140+t*20)/1100)*1100-60;const gg=ctx.createRadialGradient(x,120,0,x,120,90);gg.addColorStop(0,'rgba(90,80,72,.35)');gg.addColorStop(1,'rgba(90,80,72,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(x,120,90,0,7);ctx.fill();}}
  ctx.font=F(900,24);
  const tag=(txt,x,col)=>{const ww=ctx.measureText(txt).width+30;ctx.save();ctx.shadowColor='rgba(0,0,0,.1)';ctx.shadowBlur=10;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(x,22,ww,46,23);ctx.fill();ctx.restore();ctx.fillStyle=col;ctx.fillText(txt,x+15,54);return ww;};
  let x0=22;x0+=tag(w?'🌡 −25°C':'🌡 +22°C',x0,w?'#3f6fd0':'#e0703a')+10;x0+=tag(w?'💧 Хуурай':'💧 Чийглэг',x0,'#3f8fb0')+10;
  if(S.mask)tag(SC[scene].nav==='Өвөл'?'🧣 Ороолт / маск':'😷 Маск',x0,'#9a6ac9');
  // divider
  ctx.fillStyle='#fff';ctx.fillRect(0,210,W,4);
  const lg=ctx.createLinearGradient(0,214,0,MB5);lg.addColorStop(0,w?'#eef3fa':'#eef7ff');lg.addColorStop(1,'#fbfdff');ctx.fillStyle=lg;ctx.fillRect(0,214,W,MB5-214);
  ctx.font=F(800,16);ctx.fillStyle='#7a7282';ctx.fillText('🔍 Хамрын дотор томруулж харвал',20,240);
  // cells
  const cg=ctx.createLinearGradient(0,CT5,0,H);cg.addColorStop(0,'#fde8ed');cg.addColorStop(1,'#f6cfd8');ctx.fillStyle=cg;ctx.fillRect(0,CT5,W,H-CT5);
  for(let i=0;i<16;i++){const x=i*70-10,sk=S.sick[i];
    if(sk>.05){ctx.fillStyle=`rgba(240,90,110,${sk*.45})`;ctx.fillRect(x+1,CT5,68,H-CT5);}
    ctx.strokeStyle='#e7aebc';ctx.lineWidth=1.6;ctx.beginPath();ctx.roundRect(x+1,CT5,68,200,[10,10,0,0]);ctx.stroke();
    const cx=x+35;eyes(cx-10,cx+10,CT5+60,4.5,sk>.4?'squeeze':S.cil<.8?'tired':'happy');mouth(cx,CT5+72,4.5,sk>.4?'sick':S.cil<.8?'meh':'happy');
    ctx.strokeStyle='#6f5c99';ctx.lineWidth=2.4;ctx.lineCap='round';for(let j=0;j<8;j++){const bx=x+8+j*7.6;cilium(bx,CT5,46,frac(t*S.cil-bx*.004),Math.min(1,.4+S.cil*.5),1);}}
  ctx.fillStyle='rgba(170,210,240,.35)';ctx.fillRect(0,MB5,W,CT5-MB5);
  const dry=S.tob?0:clamp((62-S.th)/32,0,1);
  ctx.fillStyle=`rgba(${Math.round(lerp(185,214,dry))},${Math.round(lerp(218,214,dry))},${Math.round(lerp(110,170,dry))},.8)`;
  ctx.beginPath();ctx.moveTo(0,MB5);for(let x=0;x<=W;x+=10)ctx.lineTo(x,MB5-S.th+4*Math.sin((x+S.off)*.025));ctx.lineTo(W,MB5);ctx.fill();
  if(dry>.5){ctx.strokeStyle='rgba(150,140,110,.5)';ctx.lineWidth=1.5;for(let i=0;i<10;i++){const x=frac((i*97-S.off)/(W+60))*(W+60)-30,y=MB5-S.th*.5;ctx.beginPath();ctx.moveTo(x,y-5);ctx.lineTo(x+6,y);ctx.lineTo(x+2,y+5);ctx.stroke();}}
  for(const v of S.smogP){ctx.fillStyle='#5e5249';ctx.beginPath();ctx.arc(v.x,v.y,3,0,7);ctx.fill();}
  for(const v of S.vir)virus(v.x,v.y,1.1,v.rot,v.st==='stuck'?'shock':'happy');
  if(S.tob&&S.cil<.5)pill('🚬 Сормуус саажлаа, салст хуримтлагдана',560,CT5-20,430,CT5-150,'#8a6248');else if(S.cil<.8)pill('❄ Сормуус удааширлаа',600,CT5-20,640,CT5-130,'#6f5c99');
  if(dry>.5)pill('Салст хатаж нимгэрлээ',300,MB5-S.th*.5,250,MB5-S.th-70,'#b5a86a');
  ctx.font=F(900,18);
  const box=(txt,y,col)=>{const ww=ctx.measureText(txt).width+28;ctx.save();ctx.shadowColor='rgba(0,0,0,.1)';ctx.shadowBlur=10;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(W-ww-20,y,ww,38,19);ctx.fill();ctx.restore();ctx.fillStyle=col;ctx.fillText(txt,W-ww-6,y+26);};
  box(`🦠 Эсэд хүрсэн вирус: ${S.hit}`,230,'#e0506a');box(`✅ Зөөгдөж гарсан: ${S.out}`,276,'#3c9a62');
}});
function setMode(m,b){S.mode=m;S.hit=0;S.out=0;b.parentNode.querySelectorAll('.r').forEach(x=>x.classList.toggle('on',x===b));}

// 4. Pneumonia
const ALV=[[500,250,58],[398,318,58],[602,318,58],[352,442,58],[500,422,60],[648,442,58],[500,560,52]];
SC.push({nav:'Үрэвсэл',title:'Хамгаалалт давагдвал: уушгины үрэвсэл, сүрьеэ',
html:`<p>Хамгаалалт суларвал (ханиад, тамхи, утаа) нян, вирус уушгины гүн рүү нэвтэрнэ.</p><ul><li>Тэнд <b>үржиж олширно</b>. Уушгины тэр хэсэг улайж хавдана. Үүнийг <b>уушгины үрэвсэл</b> гэнэ. Шинж нь халуурах, ханиалгах, амьсгаадах. <b>Эмчид даруй хандах</b> хэрэгтэй.</li><li>Салст нянтай холилдож <b>цэр</b> болно. Цэр нь нян, вирус үржих тохиромжтой орчин болдог.</li></ul>
<div class="did"><b>🫁 Сүрьеэ</b>Сүрьеэгийн бактериар үүсч, <b>ханиалгаар агаараар</b> тархана. 2 долоо хоногоос дээш ханиалгах, жин буурах, шөнө хөлрөх нь шинж тэмдэг. Эрт илрүүлж, <b>эмийг бүрэн дуусгах</b> нь маш чухал.</div>`,
talk:'3 долоо хоног ханиалгасан хүн юу хийх ёстой вэ?',
ctrls:[['🦠 Нян нэвтрүүлэх',()=>{for(let i=0;i<4;i++)S.bs.push(mk4());}],['↺ Дахин',()=>SC[scene].init()]],
init(){S={bs:[],inf:ALV.map(()=>0),fl:ALV.map(()=>0),start:1.2};},
update(dt){if(S.start>0){S.start-=dt;if(S.start<=0)for(let i=0;i<3;i++)S.bs.push(mk4());}
  const cnt=ALV.map(()=>0);for(const b of S.bs)if(b.st==='in')cnt[b.a]++;
  const add=[];
  for(const b of S.bs){
    if(b.st==='go'){b.s2+=150*dt;const P=b.path;let L=0,i=1;for(;i<P.length;i++){const seg=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(L+seg>=b.s2){const k=(b.s2-L)/seg;b.x=lerp(P[i-1][0],P[i][0],k);b.y=lerp(P[i-1][1],P[i][1],k);break;}L+=seg;}
      if(i>=P.length){b.st='in';b.vx=rnd(-30,30);b.vy=rnd(-30,30);b.div=rnd(1.5,2.6);}b.rot=Math.atan2(1,0)*0;continue;}
    const [cx,cy,r]=ALV[b.a];b.vx+=rnd(-60,60)*dt;b.vy+=rnd(-60,60)*dt;b.vx=clamp(b.vx,-35,35);b.vy=clamp(b.vy,-35,35);b.x+=b.vx*dt;b.y+=b.vy*dt;
    const dx=b.x-cx,dy=b.y-cy,d=Math.hypot(dx,dy);if(d>r-16){b.x=cx+dx/d*(r-16);b.y=cy+dy/d*(r-16);b.vx*=-1;b.vy*=-1;}
    b.rot=Math.sin(t*2+b.w)*.4;b.div-=dt;
    if(b.div<=0){b.div=rnd(1.8,3);if(cnt[b.a]<13&&S.bs.length+add.length<100){add.push({...b,x:b.x+8,y:b.y+4,w:rnd(0,6),div:rnd(1.8,3)});cnt[b.a]++;}
      else if(Math.random()<.35){const nb=ALV.findIndex((_,j)=>j!==b.a&&Math.hypot(ALV[j][0]-cx,ALV[j][1]-cy)<140&&cnt[j]<4);if(nb>=0){b.a=nb;b.x=ALV[nb][0];b.y=ALV[nb][1];}}}}
  S.bs=S.bs.concat(add);
  for(let i=0;i<ALV.length;i++){S.inf[i]=lerp(S.inf[i],Math.min(1,cnt[i]/10),dt*.8);S.fl[i]=lerp(S.fl[i],S.inf[i]*.72,dt*.3);}
  for(const b of S.bs)b.mood=S.inf[b.a]>.5?'happy':'happy';},
draw(){bg('#fff6f3','#fdeef0');
  // bronchiole
  ctx.strokeStyle='#d98a9d';ctx.lineCap='round';
  for(const [cx,cy] of ALV){ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(500,150);ctx.quadraticCurveTo(500,(150+cy)/2,cx,cy);ctx.stroke();}
  ctx.fillStyle='#e3f3e6';ctx.strokeStyle='#6aa57a';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(480,-20,40,180,14);ctx.fill();ctx.stroke();
  for(let y=6;y<150;y+=16){ctx.strokeStyle='#9fd0aa';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(484,y);ctx.quadraticCurveTo(500,y+6,516,y);ctx.stroke();}
  ctx.font=F(800,16);ctx.fillStyle='#4f8a5e';ctx.fillText('Бронхиол',530,40);
  let maxI=0,maxA=0,maxF=0,maxFa=0;
  ALV.forEach(([cx,cy,r],i)=>{const inf=S.inf[i],fl=S.fl[i];if(inf>maxI){maxI=inf;maxA=i;}if(fl>maxF){maxF=fl;maxFa=i;}
    if(inf>.15){const pr=r+18+6*Math.sin(t*4+i);const gg=ctx.createRadialGradient(cx,cy,r*.6,cx,cy,pr);gg.addColorStop(0,`rgba(240,90,110,${inf*.55})`);gg.addColorStop(1,'rgba(240,90,110,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(cx,cy,pr,0,7);ctx.fill();}
    const g=ctx.createRadialGradient(cx-r*.35,cy-r*.4,4,cx,cy,r);
    g.addColorStop(0,`rgb(255,${Math.round(lerp(243,214,inf))},${Math.round(lerp(246,214,inf))})`);g.addColorStop(1,`rgb(${Math.round(lerp(246,236,inf))},${Math.round(lerp(188,110,inf))},${Math.round(lerp(203,125,inf))})`);
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
    if(fl>.02){ctx.save();ctx.beginPath();ctx.arc(cx,cy,r-2,0,7);ctx.clip();const fy=cy+r-2*r*fl+3*Math.sin(t*2+i);
      ctx.fillStyle='rgba(206,210,92,.88)';ctx.fillRect(cx-r,fy,2*r,2*r);ctx.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<4;k++){ctx.beginPath();ctx.arc(cx-r*.5+k*r*.33,fy+12+(k%2)*8,3,0,7);ctx.fill();}ctx.restore();}
    ctx.strokeStyle=inf>.4?'#e0506a':'#e8798f';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.beginPath();ctx.ellipse(cx-r*.42,cy-r*.45,r*.18,r*.1,-.6,0,7);ctx.fill();
    const md=inf<.3?'happy':inf<.65?'meh':'sick';
    if(md==='sick')eyes(cx-14,cx+14,cy-10,5,'squeeze');else eyes(cx-14,cx+14,cy-10,5.5,md==='meh'?'happy':'happy');
    ctx.fillStyle='rgba(255,143,171,.5)';ctx.beginPath();ctx.ellipse(cx-26,cy+2,8,4.5,0,0,7);ctx.ellipse(cx+26,cy+2,8,4.5,0,0,7);ctx.fill();
    mouth(cx,cy+6,5,md);
    if(md!=='happy'){ctx.fillStyle='#8cc8f5';ctx.beginPath();ctx.moveTo(cx+r*.55,cy-r*.55);ctx.quadraticCurveTo(cx+r*.55+7,cy-r*.3,cx+r*.55,cy-r*.25);ctx.quadraticCurveTo(cx+r*.55-7,cy-r*.3,cx+r*.55,cy-r*.55);ctx.fill();}
  });
  for(const b of S.bs)bact(b.x,b.y,.95,b.rot,'happy');
  pill(`Нян: ${S.bs.length}`,null,null,20,20,'#43ad6e');
  if(maxI>.45){const [cx,cy,r]=ALV[maxA];pill('Үрэвслийн голомт',cx+r*.7,cy-r*.7,cx>500?cx+30:cx-250,cy-r-60,'#e0506a');}
  if(maxF>.3){const [cx,cy,r]=ALV[maxFa];pill('Цэр = салст + нян',cx,cy+r-12,cx>500?cx+40:cx-240,cy+r+12,'#b9b83a');}
  if(S.bs.length===0)pill('«Нян нэвтрүүлэх» товчийг дар',null,null,560,90,'#43ad6e');
}});
function mk4(){const a=Math.floor(Math.random()*ALV.length),[cx,cy]=ALV[a];const path=[[500,-20],[500,150],[lerp(500,cx,.5),lerp(150,cy,.5)+10],[cx,cy]];return{a,path,s2:0,st:'go',x:500,y:-20,w:rnd(0,6),rot:0};}

// 5. Cough
const MOUTH=[330,182];
SC.push({nav:'Ханиалга',title:'3-р хамгаалалт: ханиалга, найтаах',
html:`<p>Ханиалга бол амьсгалын замыг цэвэрлэх <b>рефлекс</b>. Уушгинаас агаар маш хүчтэй, хурдан гарна.</p><ul><li><b>Цэр</b> (нян, вирус, үхсэн эс агуулсан салст) гадагшилж <b>уушги цэвэрлэгдэнэ</b>.</li><li><b>Найтаах</b> нь хамрыг ингэж цэвэрлэдэг.</li><li>Өвчний үед салст ихсэж, ханиалгаар гадагшилна. Ингэснээр халдвар <b>суурьшихаас сэргийлнэ</b>.</li><li>Гэхдээ дусалд нян, вирус байдаг тул <b>халдвар тараана</b>.</li></ul>
<div class="like"><b>🔎 Яг л...</b>тоос сорогчийг урвуугаар нь ажиллуулахтай адил. Хог нь гадагшаа үлээгдэнэ.</div>
<div class="did"><b>✋ Ханиалгах ёс зүй</b>Тохойгоороо халхал. Алгаараа таглавал вирус гарт үлдэж, хаалганы бариул, утсаар дамжина.</div>`,
talk:'Ханиалгыг заавал дарах ёстой юу? Яагаад?',
ctrls:[['💨 Ханиах!',()=>cough(),'big'],['💪 Тохойгоор таглах',(b)=>{S.cover=!S.cover;b.classList.toggle('on',S.cover);}],['↺ Дахин',()=>SC[scene].init()]],
init(){S={blobs:[],drops:[],ct:0,cover:false,hits:0,clean:0};
  for(let i=0;i<16;i++){const L=Math.random()<.5;const cx=L?248:412;const a=rnd(0,6.28),rr=Math.sqrt(Math.random());S.blobs.push({x:cx+Math.cos(a)*rr*50,y:505+Math.sin(a)*rr*72,r:rnd(9,13),w:rnd(0,6),st:0});}},
update(dt){if(S.ct>0)S.ct-=dt;
  for(const b of S.blobs){if(b.st===1){b.s2+=700*dt;const P=b.path;let L=0,i=1;for(;i<P.length;i++){const seg=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(L+seg>=b.s2){const k=(b.s2-L)/seg;b.x=lerp(P[i-1][0],P[i][0],k);b.y=lerp(P[i-1][1],P[i][1],k);break;}L+=seg;}
      if(i>=P.length){b.dead=true;for(let k=0;k<9;k++)S.drops.push({x:MOUTH[0]+10,y:MOUTH[1],vx:rnd(260,520),vy:rnd(-140,60),a:1,r:rnd(3,6),stop:false});}}}
  S.blobs=S.blobs.filter(b=>!b.dead);
  for(const d of S.drops){if(d.stop){d.a-=dt*.8;continue;}d.vy+=160*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;
    if(S.cover&&d.x>MOUTH[0]+30){d.stop=true;d.x=MOUTH[0]+30+rnd(0,12);}
    if(Math.hypot(d.x-840,d.y-190)<72){d.a=0;S.hits++;}if(d.y>H||d.x>W)d.a=0;}
  S.drops=S.drops.filter(d=>d.a>0);},
draw(){bg('#eef5ff','#fdf3ee');
  const shake=S.ct>0?Math.sin(t*60)*4*S.ct:0;ctx.save();ctx.translate(shake,0);
  const sick=S.blobs.length>0;
  // body
  ctx.fillStyle='#cfe0ff';ctx.strokeStyle='#a9c2f2';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(170,300,320,340,[90,90,0,0]);ctx.fill();ctx.stroke();
  // trachea + lungs
  ctx.fillStyle='#e3f3e6';ctx.strokeStyle='#6aa57a';ctx.beginPath();ctx.roundRect(314,240,32,200,12);ctx.fill();ctx.stroke();
  ctx.lineWidth=14;ctx.strokeStyle='#6aa57a';ctx.lineCap='round';ctx.beginPath();ctx.moveTo(330,430);ctx.lineTo(280,460);ctx.moveTo(330,430);ctx.lineTo(380,460);ctx.stroke();
  for(const [cx,f] of [[248,-1],[412,1]]){const g=ctx.createRadialGradient(cx-20,470,6,cx,505,90);g.addColorStop(0,'#fff0f3');g.addColorStop(1,sick?'#f3a9b8':'#f8c3cf');ctx.fillStyle=g;ctx.strokeStyle='#e8798f';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx,505,62,86,0,0,7);ctx.fill();ctx.stroke();
    eyes(cx-12,cx+12,488,4.5,sick?'tired':'happy');mouth(cx,500,4.5,sick?'meh':'happy');}
  for(const b of S.blobs){ctx.fillStyle='rgba(206,210,92,.92)';ctx.strokeStyle='#a9a92e';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(b.x,b.y+Math.sin(t*3+b.w)*1.5,b.r,0,7);ctx.fill();ctx.stroke();
    ctx.fillStyle='#43ad6e';ctx.beginPath();ctx.ellipse(b.x-3,b.y,3.5,2,.5,0,7);ctx.ellipse(b.x+3,b.y+3,3.5,2,-.4,0,7);ctx.fill();}
  // head
  ctx.fillStyle='#fde6da';ctx.strokeStyle='#efc9b6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(330,140,92,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#6b4a3a';ctx.beginPath();ctx.arc(330,140,92,Math.PI*1.05,Math.PI*1.95);ctx.quadraticCurveTo(330,90,240,120);ctx.fill();
  const cough=S.ct>0;
  eyes(300,360,140,7,cough?'squeeze':sick?'tired':'happy');
  ctx.fillStyle='rgba(255,143,171,.45)';ctx.beginPath();ctx.ellipse(282,166,13,7,0,0,7);ctx.ellipse(378,166,13,7,0,0,7);ctx.fill();
  if(cough){ctx.fillStyle='#8a3048';ctx.beginPath();ctx.ellipse(330,184,16,13,0,0,7);ctx.fill();}else mouth(330,178,8,sick?'meh':'happy');
  // elbow cover
  if(S.cover){ctx.lineCap='round';ctx.strokeStyle='#b9a6e3';ctx.lineWidth=46;ctx.beginPath();ctx.moveTo(470,330);ctx.lineTo(392,190);ctx.lineTo(250,175);ctx.stroke();
    ctx.strokeStyle='#cbbcf0';ctx.lineWidth=34;ctx.beginPath();ctx.moveTo(470,330);ctx.lineTo(392,190);ctx.lineTo(250,175);ctx.stroke();}
  ctx.restore();
  // drops
  for(const d of S.drops){ctx.fillStyle=`rgba(150,190,90,${d.a*.85})`;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,7);ctx.fill();}
  // friend
  const worried=S.hits>6;
  ctx.fillStyle='#ffd9c9';ctx.strokeStyle='#f0b8a0';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(740,280,200,360,[80,80,0,0]);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fde6da';ctx.strokeStyle='#efc9b6';ctx.beginPath();ctx.arc(840,190,72,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#3d2c26';ctx.beginPath();ctx.arc(840,190,72,Math.PI*1.1,Math.PI*1.9);ctx.quadraticCurveTo(840,150,770,170);ctx.fill();
  eyes(816,864,195,6,worried?'shock':'happy');mouth(840,222,7,worried?'sad':'happy');
  if(worried){ctx.fillStyle='#8cc8f5';ctx.beginPath();ctx.moveTo(900,150);ctx.quadraticCurveTo(910,172,900,178);ctx.quadraticCurveTo(890,172,900,150);ctx.fill();}
  ctx.font=F(800,16);ctx.fillStyle='#7a7282';ctx.textAlign='center';ctx.fillText('Найз',840,300);ctx.textAlign='left';
  if(!sick)pill('Уушги цэвэрлэгдлээ ✨',null,null,175,594,'#43ad6e');
  else pill(`Цэр: ${S.blobs.length}`,null,null,175,594,'#b9b83a');
  if(worried)pill('Халдвар дамжих эрсдэл!',null,null,690,40,'#e0506a');
  else if(S.cover&&S.drops.some(d=>d.stop))pill('Дусал тохойд үлдлээ ✓',null,null,560,40,'#43ad6e');
}});
function cough(){if(SC[scene].nav!=='Ханиалга')return;S.ct=.9;const out=S.blobs.filter(()=>Math.random()<.55);if(!out.length&&S.blobs.length)out.push(S.blobs[0]);
  for(const b of out){b.st=1;b.s2=0;b.path=[[b.x,b.y],[b.x<330?280:380,460],[330,430],[330,250],MOUTH];}}

// 6. Summary + quiz
const NODES=[[30,60,'Тоос, нян, вирус агаартай орж ирнэ','g'],[275,60,'Наалдамхай салст тэднийг баривчилна','m'],[520,60,'Сормуус салстыг хоолой руу түлхэнэ','c'],[765,60,'Залгина эсвэл нус нийнэ','h'],
 [275,370,'Давагдвал: нян үржиж үрэвсэл, цэр үүснэ','i'],[520,370,'Ханиалга цэрийг гадагшлуулна','k'],[765,370,'Сэргийлэх: тамхигүй, маск, вакцин','e']];
SC.push({nav:'Дүгнэлт',title:'Дүгнэлт ба «Дөрвөн булан»',quiz:true,subs:13,
html:'<p>Хамгаалалтын гинжин хэлхээ: тоос, нян орж ирнэ → салст баривчилна → сормуус хоолой руу түлхэнэ → залгина / нус нийнэ. Давагдвал үрэвсэл, цэр → ханиалга гадагшлуулна → сэргийлэх.</p>',talk:'«Дөрвөн булан»: асуулт гарахад 10 секунд бодоод хариултынхаа буланд оч.',ctrls:[],init(){S={sub:0,timer:0,tOn:false};},onPlay(){if(S.sub>0&&S.sub%2===1){S.tOn=true;S.timer=10;}},
update(dt){if(S.tOn){S.timer-=dt;if(S.timer<=0){S.timer=0;S.tOn=false;}}},
draw(){if(S.sub>0){drawQuiz();return;}bg('#fff7f4','#fdf0f2');
  const arrow=(x1,y1,x2,y2,dash)=>{ctx.strokeStyle='#f0a3b4';ctx.lineWidth=4;ctx.setLineDash(dash?[8,8]:[10,8]);ctx.lineDashOffset=-t*30;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);
    const a=Math.atan2(y2-y1,x2-x1);ctx.fillStyle='#f0a3b4';ctx.beginPath();ctx.moveTo(x2+6*Math.cos(a),y2+6*Math.sin(a));ctx.lineTo(x2-12*Math.cos(a-.5),y2-12*Math.sin(a-.5));ctx.lineTo(x2-12*Math.cos(a+.5),y2-12*Math.sin(a+.5));ctx.fill();};
  arrow(237,165,268,165);arrow(482,165,513,165);arrow(727,165,758,165);arrow(378,272,378,362,true);arrow(482,475,513,475);arrow(727,475,758,475);
  ctx.font=F(800,15);ctx.fillStyle='#c2486a';ctx.fillText('хамгаалалт давагдвал',392,322);
  NODES.forEach(([x,y,txt,ic],i)=>{const bob=Math.sin(t*2+i)*3;
    ctx.save();ctx.shadowColor='rgba(107,58,72,.14)';ctx.shadowBlur=16;ctx.shadowOffsetY=4;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(x,y+bob,205,210,26);ctx.fill();ctx.restore();
    ctx.strokeStyle=ic==='i'?'#f6b0bd':'#f8d6de';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y+bob,205,210,26);ctx.stroke();
    const cx=x+102,cy=y+62+bob;
    ctx.fillStyle='#fff4f6';ctx.beginPath();ctx.arc(cx,cy,42,0,7);ctx.fill();
    if(ic==='g'){dust(cx-22,cy+8,1.2,0,'happy');bact(cx+4,cy-10,1.1,0,'happy');virus(cx+20,cy+16,1,0,'happy');}
    if(ic==='m'){ctx.fillStyle='rgba(185,218,110,.9)';ctx.beginPath();ctx.ellipse(cx,cy+6,36,24,0,0,7);ctx.fill();bact(cx,cy+4,1.2,0,'shock');}
    if(ic==='c'){ctx.strokeStyle='#6f5c99';ctx.lineWidth=2.6;ctx.lineCap='round';for(let j=0;j<8;j++)cilium(cx-28+j*8,cy+26,40,frac(t*1.4-j*.08),1,1);}
    if(ic==='h'){eyes(cx-12,cx+12,cy-6,6,'happy');mouth(cx,cy+8,8,'happy');ctx.fillStyle='rgba(255,143,171,.5)';ctx.beginPath();ctx.ellipse(cx-24,cy+8,8,4.5,0,0,7);ctx.ellipse(cx+24,cy+8,8,4.5,0,0,7);ctx.fill();}
    if(ic==='i'){const g=ctx.createRadialGradient(cx,cy,10,cx,cy,40);g.addColorStop(0,'#f5a3b0');g.addColorStop(1,'#e0506a');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,34,0,7);ctx.fill();eyes(cx-11,cx+11,cy-6,4.5,'squeeze');mouth(cx,cy+6,4.5,'sick');bact(cx+24,cy+24,.8,0,'happy');}
    if(ic==='k'){ctx.fillStyle='rgba(206,210,92,.9)';for(let k=0;k<5;k++){ctx.beginPath();ctx.arc(cx-18+k*10+Math.sin(t*3+k)*2,cy-10+(k%2)*16,7+(k%3),0,7);ctx.fill();}ctx.font=F(900,22);ctx.fillStyle='#7a9be8';ctx.fillText('💨',cx-36,cy+30);}
    if(ic==='e'){ctx.strokeStyle='#b9a6e3';ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx+28,cy+30);ctx.lineTo(cx+8,cy-6);ctx.lineTo(cx-30,cy-10);ctx.stroke();ctx.fillStyle='#43ad6e';ctx.font=F(900,24);ctx.fillText('✓',cx+16,cy-14);}
    ctx.fillStyle='#f07895';ctx.beginPath();ctx.arc(x+22,y+22+bob,13,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,14);ctx.textAlign='center';ctx.fillText(i+1,x+22,y+27+bob);
    ctx.fillStyle='#2b2533';ctx.font=F(800,16.5);wrapC(txt,cx,y+134+bob,180,21);ctx.textAlign='left';});
}});
const CORNER=['Цонхны булан','Хаалганы булан','Самбарын булан','Арын булан'];
const OCOL=['#6f9cf0','#f07895','#5fa070','#ec9a5f'];
function drawQuiz(){bg('#fff7f4','#fdf0f2');const qi=Math.floor((S.sub-1)/2),rev=(S.sub-1)%2===1,q=QUIZ[qi];
  ctx.font=F(900,20);ctx.fillStyle='#c2486a';ctx.textAlign='center';ctx.fillText(`Асуулт ${qi+1} / ${QUIZ.length}`,W/2,74);
  ctx.font=F(900,40);ctx.fillStyle='#2b2533';wrapC(q[0],W/2,130,820,48);
  for(let j=0;j<4;j++){const x=60+(j%2)*450,y=200+Math.floor(j/2)*170,ok=j===q[2];
    ctx.save();ctx.globalAlpha=rev&&!ok?.35:1;ctx.shadowColor='rgba(107,58,72,.14)';ctx.shadowBlur=16;ctx.shadowOffsetY=4;
    ctx.fillStyle=rev&&ok?'#e4f6e9':'#fff';ctx.beginPath();ctx.roundRect(x,y,430,145,28);ctx.fill();ctx.restore();
    ctx.save();ctx.globalAlpha=rev&&!ok?.35:1;ctx.strokeStyle=rev&&ok?'#5fb37a':'#f6d3dc';ctx.lineWidth=rev&&ok?5:2;ctx.beginPath();ctx.roundRect(x,y,430,145,28);ctx.stroke();
    ctx.fillStyle=OCOL[j];ctx.beginPath();ctx.arc(x+58,y+72,36,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font=F(900,36);ctx.textAlign='center';ctx.fillText('ABCD'[j],x+58,y+85);
    ctx.textAlign='left';ctx.fillStyle='#2b2533';ctx.font=F(900,27);wrap(q[1][j],x+112,y+68,300,32);
    ctx.font=F(800,15);ctx.fillStyle='#9a8f9e';ctx.fillText('📍 '+CORNER[j],x+112,y+124);
    if(rev&&ok){ctx.fillStyle='#43ad6e';ctx.font=F(900,40);ctx.fillText('✓',x+380,y+56);}ctx.restore();}
  if(rev){ctx.font=F(800,20);ctx.fillStyle='#2f8a52';ctx.textAlign='center';wrapC('💡 '+q[3],W/2,568,860,26);}
  if(S.tOn||(!rev&&S.timer===0&&S.started)){}
  if(S.tOn){const k=S.timer/10;ctx.lineWidth=9;ctx.strokeStyle='#f6d3dc';ctx.beginPath();ctx.arc(915,70,38,0,7);ctx.stroke();ctx.strokeStyle='#f07895';ctx.beginPath();ctx.arc(915,70,38,-Math.PI/2,-Math.PI/2+6.283*k);ctx.stroke();
    ctx.fillStyle='#2b2533';ctx.font=F(900,30);ctx.textAlign='center';ctx.fillText(Math.ceil(S.timer),915,81);}
  ctx.textAlign='left';}
function wrapC(text,cx,y,maxW,lh){ctx.textAlign='center';const words=text.split(' ');let line='',yy=y;for(const w of words){const tl=line?line+' '+w:w;if(ctx.measureText(tl).width>maxW&&line){ctx.fillText(line,cx,yy);line=w;yy+=lh;}else line=tl;}ctx.fillText(line,cx,yy);}

const QUIZ=[
 ['Салстын гол үүрэг?',['Хий солилцох','Тоос, нянг наалдуулах','Хоол задлах','Цус шүүх'],1,'Салст наалдамхай тул тоос, нян, вирусыг баривчилна.'],
 ['Сормууст эс юу хийдэг вэ?',['Салст үйлдвэрлэх','Салстыг хоолой руу түлхэх','O₂ шингээх','Нян устгах'],1,'Салстыг салст бүрхүүлэгч эс гаргадаг. Сормууст эс түүнийг хоолой руу түлхэнэ.'],
 ['Тамхи сормусанд хэрхэн нөлөөлөх вэ?',['Хурдасгана','Саажуулна','Нөлөөгүй','Олшруулна'],1,'Тамхины утаа сормуусыг саажуулж, салст хуримтлагдана.'],
 ['Сүрьеэ юугаар тархах вэ?',['Ус','Ханиалгаар агаараар','Хоол','Шавж'],1,'Сүрьеэгийн бактери ханиалгах үед дуслаар агаараар тархана.'],
 ['Цэрэнд юу агуулагдах вэ?',['Зөвхөн ус','Нян, вирус, үхсэн эс','Глюкоз','Хүчилтөрөгч'],1,'Цэр бол нян, вирус, үхсэн эс агуулсан салст.'],
 ['Ханиалгах зөв арга?',['Гараараа','Тохойгоороо халхлах','Халхлахгүй','Бусад руу'],1,'Тохойгоороо халхлавал вирус гарт үлдэхгүй, бусдад дамжихгүй.']
];
function quizHTML(){return `<p>Хамгаалалтын гинжин хэлхээг зурагнаас дахин нэг харцгаая. Дараа нь «Дөрвөн булан»-ы асуултад хариулаарай:</p>`+QUIZ.map((q,i)=>`<div class="q" data-i="${i}"><div class="qt">${i+1}. ${q[0]}</div><div class="opts">${q[1].map((o,j)=>`<button data-j="${j}">${'ABCD'[j]}) ${o}</button>`).join('')}</div><div class="ex">${q[3]}</div></div>`).join('')+
 `<p style="margin-top:10px">Оноо: <span class="score" id="score">0 / ${QUIZ.length}</span></p><div class="talk"><b>📺 Нэмэлт бичлэг (удирдамжаас)</b><span><a href="http://www.youtube.com/watch?v=xWpWn8W5nlA">Бичлэг 1</a> · <a href="http://www.youtube.com/watch?v=miEEluVlemQ">Бичлэг 2</a></span></div>`;}
function bindQuiz(){let sc=0;document.querySelectorAll('.q').forEach(qd=>{const q=QUIZ[+qd.dataset.i];let done=false;
  qd.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{if(done)return;done=true;const j=+b.dataset.j;
    qd.querySelectorAll('.opts button')[q[2]].classList.add('ok');if(j!==q[2])b.classList.add('no');else sc++;
    qd.querySelector('.ex').style.display='block';$('score').textContent=`${sc} / ${QUIZ.length}`;});});}

const TN={
'Агаар':{how:'Space дарж тоглуул. 1–3 товчоор тоос, нян, вирус нэм. «Тэд хаашаа явж байна?» гэж асуу.',ans:'Хамар руу, тэндээс амьсгалын зам руу. Бие нь салст, сормуус, ханиалгаар хамгаалагддаг (энэ хичээлийн гол санаа).'},
'Салст':{how:'Space. Нян, вирус хананы ногоон салстад наалдахыг харуул. Ягаан аяга хэлбэртэй эс = салст бүрхүүлэгч эс. 1–3 товчоор нэм.',ans:'Салст байнга чийгтэй байж тоос, нянг наалдуулна. Хуурай бол наалдуулж чадахгүй, хамгаалалт сулрна (слайд 14-3).'},
'Салстын шат':{how:'Space. Желе/сойзны загварын дараа үзүүл. 1 = удаашруулж сормууст цохилтыг харуул. 2 = сормуусыг зогсоож «сойзгүй» загвартай харьцуул.',ans:'Салст хуримтлагдаж, нян үржинэ. Тамхи, бохир агаар сормуусыг ингэж гэмтээдэг.'},
'Нус':{how:'Space дармагц 6 шаттай түүх өөрөө явна (дээд талд шат бүр бичигдэнэ). 1 = дахин эхлүүлэх, 2 = удаашруулах.',ans:'Сайн тал: бие вирусыг угааж гаргаж байна. Гэхдээ нус, найтаалгаар бусдад халдааж болно.'},
'Үрэвсэл':{how:'Space. Нян цулцанд орж үржиж, цулцан улайж, цэр хуримтлагдана. 1 = нэмж нян нэвтрүүлэх, 2 = дахин.',ans:'Эмчид үзүүлж, сүрьеэгийн шинжилгээ өгөх (слайд 14-4). 2 долоо хоногоос дээш ханиалгах нь сүрьеэгийн шинж байж болно.'},
'Ханиалга':{how:'1 (эсвэл Space) = ханиах. Эхлээд халхлахгүй ханиалгаж, найзын царайг харуул. Дараа нь 2 = тохойгоор халхлахыг асааж, 3 = дахин эхлүүлээд ханиалга.',ans:'Үгүй. Ханиалга замыг цэвэрлэнэ, харин шалтгааныг нь эмчлэх хэрэгтэй (слайд 17).'},
'Сэргийлэх':{how:'1 Зун → 2 Өвөл: тоолуурыг харьцуул. 3 Утаа, 4 Тамхи: сормуус саажина. 5 Маск: хамгаалалт сайжирна.',ans:'Тамхичин өглөө ханиалгадаг нь шөнө хуримтлагдсан салстыг гаргах гэж (слайд 14-2). Хүйтэн хуурай агаарт салст хатаж, хамгаалалт сулрна (14-3).'},
'Дүгнэлт':{how:'→ дарах бүрт: дүгнэлтийн зураг → Асуулт 1 → хариу → Асуулт 2 … Асуулт гармагц Space = 10 секундын цаг. Сурагчид хариултынхаа буланд очно.',ans:'Бүх асуултын зөв хариулт: B.'}
};
{const base=SC.find(x=>x.nav==='Сэргийлэх');
SC.push({...base,nav:'Өвөл',title:'Яагаад өвөл ханиад их хүрдэг вэ?',
html:`<div class="myth"><b>❗ Анхаар</b>Хүйтэн өөрөө ханиад үүсгэдэггүй. Ханиадыг <b>вирус</b> үүсгэдэг. Харин хүйтэн нь бидний <b>хамгаалагчдыг сулруулдаг</b>.</div>
<ul><li>Хүйтэн, хуурай агаар <b>салстыг хатааж</b>, <b>сормуусыг удаашруулна</b>.</li><li>Хамар хөрөхөд хамгаалалт сулардаг, харин ханиадны вирус хүйтэн хамарт <b>сайн үрждэг</b>.</li><li>Вирус хүйтэн, хуурай агаарт <b>удаан амьд үлддэг</b>.</li><li>Өвөл бид цонх хаалттай өрөөнд <b>ойрхон</b> байдаг тул вирус амархан дамжина.</li></ul>
<div class="like"><b>🧣 Юу хийх вэ?</b>Хамраа ороолт, маскаар дулаан байлгах, өрөөгөө агааржуулах, гараа угаах.</div>`,
talk:'Зун, өвлийн «Эсэд хүрсэн вирус» тоолуурыг харьцуул. Яагаад ялгаатай байна вэ?',
ctrls:[['☀️ Зун',(b)=>{setMode('summer',b);},'r on'],['❄️ Өвөл',(b)=>{setMode('winter',b);},'r'],['🧣 Ороолт / маск',(b)=>{S.mask=!S.mask;b.classList.toggle('on',S.mask);S.hit=0;S.out=0;}]]});}
TN['Өвөл']={how:'1 Зун: Space дарж хэсэг ажиглуул. 2 Өвөл: цас орж, салст хатаж, сормуус удааширна. «Эсэд хүрсэн вирус» тоолуурыг харьцуул. 3 Ороолт/маск: хамгаалалт сайжирна.',ans:'Хүйтэн хуурай агаарт салст хатаж, сормуус удааширдаг тул вирус эсэд амархан хүрнэ. Мөн өвөл хүмүүс битүү өрөөнд ойрхон байдаг. Ханиадыг хүйтэн биш, вирус үүсгэдэг.'};
TN['Сэргийлэх']={how:'Space. 4 Тамхи: сормуус саажиж, салст хуримтлагдана. 3 Утаа: нүүрсний утаа. 5 Маск: вирус багасна. Хүсвэл 2 Өвөл-тэй хослуул.',ans:'Тамхичин өглөө ханиалгадаг нь шөнө хуримтлагдсан салстыг гаргах гэж (слайд 14-2). 4 дадал: ханиалгах ёс зүй, маск, агааржуулалт, вакцин.'};
const ORDER=['Агаар','Салст','Салстын шат','Нус','Өвөл','Үрэвсэл','Ханиалга','Сэргийлэх','Дүгнэлт'];
SC.sort((a,b)=>ORDER.indexOf(a.nav)-ORDER.indexOf(b.nav));
// ---------- UI ----------
let MODE=location.hash==='#bagsh'?'teacher':'screen';let IN_FRAME=false;try{IN_FRAME=window.top!==window;}catch(e){IN_FRAME=true;}const IS_PROJ=location.hash==='#delgets';
document.body.className=MODE;
let playing=false,blankOn=false,titleOn=true;
const ch=('BroadcastChannel' in window)?new BroadcastChannel('salst-sormuus-hicheel'):null;
function state(){return{type:'state',scene,sub:S&&S.sub||0,playing,on:[...document.querySelectorAll('#ctrls button')].map(b=>b.classList.contains('on'))};}
function send(){if(ch&&MODE==='screen')ch.postMessage(state());}
function stepLabel(){const s=SC[scene];if(!s.subs)return`${scene+1} / ${SC.length}`;const sb=S.sub||0;return sb===0?'Дүгнэлтийн зураг':`Асуулт ${Math.floor((sb-1)/2)+1}${(sb-1)%2?' · хариу':''}`;}
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
    const w=window.open(url,'salst_projector','popup=yes,width=1280,height=800');
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
    if(playing||SC[scene].quiz){t+=dt;SC[scene].update(dt);}
    const k=cv.width/W;ctx.setTransform(k,0,0,k,0,0);ctx.clearRect(0,0,W,H);SC[scene].draw();requestAnimationFrame(loop);}
  resize();go(0);requestAnimationFrame(loop);setInterval(send,1500);setInterval(sendFrame,220);
}
let teacherInit=false;
function initTeacher(){if(teacherInit){return;}teacherInit=true;
  // ----- teacher remote -----
  const post=m=>{if(ch)ch.postMessage(m);};let st=null,lastSeen=0;
  const tnav=$('tnav');SC.forEach((s,i)=>{const b=document.createElement('button');b.textContent=`${i+1}. ${s.nav}`;b.onclick=()=>{post({cmd:'go',i});if(Date.now()-lastSeen>4000){st={type:'state',scene:i,sub:0,playing:false,on:[]};render();}};tnav.appendChild(b);});
  $('tPrev').onclick=()=>post({cmd:'prev'});$('tNext').onclick=()=>post({cmd:'next'});$('tPlay').onclick=()=>post({cmd:'play'});
  $('bReopen').onclick=()=>{const w=window.open(location.href.split('#')[0]+'#delgets','salst_projector','popup=yes,width=1280,height=800');if(w&&'getScreenDetails' in window){getScreenDetails().then(sd=>{const o=sd.screens.find(x=>x!==sd.currentScreen);if(o){w.moveTo(o.availLeft,o.availTop);w.resizeTo(o.availWidth,o.availHeight);}}).catch(()=>{});}};
  $('bBack').onclick=toScreen;
  let shown=-1;
  function render(){if(!st)return;const s=SC[st.scene],n=TN[s.nav]||{};
    [...tnav.children].forEach((b,j)=>b.classList.toggle('on',j===st.scene));
    {const sb=st.sub||0;let nx;if(s.subs&&sb<s.subs-1){nx=sb===0?'Асуулт 1':((sb-1)%2===0?`Асуулт ${Math.floor((sb-1)/2)+1}-ийн хариу`:`Асуулт ${Math.floor((sb-1)/2)+2}`);}else nx=st.scene<SC.length-1?`${st.scene+2}. ${SC[st.scene+1].nav}`:'Төгсгөл';$('nextup').innerHTML=`Дараагийнх ▸ <b>${nx}</b>`;}
    $('tPlay').textContent=s.quiz?'⏱ 10 секундын цаг':st.playing?'⏸ Зогсоох':'▶ Тоглуулах';
    const sb=st.sub||0;$('tpos').textContent=s.subs?(sb===0?'Дүгнэлтийн зураг':`Асуулт ${Math.floor((sb-1)/2)+1}${(sb-1)%2?' · хариу харагдаж байна':' · хариу нуугдсан'}`):`${st.scene+1} / ${SC.length}`;
    const tc=$('tctrls');if(shown!==st.scene){tc.innerHTML='';s.ctrls.forEach(([lab],k)=>{const b=document.createElement('button');b.textContent=`${k+1} ${lab}`;b.onclick=()=>post({cmd:'ctrl',k});tc.appendChild(b);});
      const bl=document.createElement('button');bl.textContent='⬛ Дэлгэц харлуулах';bl.onclick=()=>post({cmd:'blank'});tc.appendChild(bl);
      $('tHow').innerHTML=`<p>${n.how||''}</p>`;$('tHtml').innerHTML=s.html;$('tTalk').innerHTML=`<p>${s.talk||'—'}</p>`;
      let ans=`<p>${n.ans||''}</p>`;if(s.quiz)ans+='<ul>'+QUIZ.map((q,i)=>`<li>${i+1}. ${q[0]} → <b>B) ${q[1][q[2]]}</b></li>`).join('')+'</ul>';$('tAns').innerHTML=ans;shown=st.scene;}
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

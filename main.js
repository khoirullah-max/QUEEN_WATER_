(function(){
  var root=document.documentElement, nav=document.getElementById('nav');

  // Tema terang/gelap (ingat pilihan pengunjung)
  try{var t=localStorage.getItem('qw-theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
    var next=dark?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem('qw-theme',next)}catch(e){}
  });

  // Navigasi: latar saat scroll, menu mobile, tautan aktif
  function onScroll(){nav.classList.toggle('solid',window.scrollY>40)}
  onScroll();addEventListener('scroll',onScroll,{passive:true});
  var burger=document.getElementById('burger');
  function setMenu(o){nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)}
  burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
  document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  var links=document.querySelectorAll('#menu a');
  var no=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})
  })},{rootMargin:'-45% 0px -50% 0px'});
  ['tentang','layanan','alur','pesan','lokasi'].forEach(function(id){no.observe(document.getElementById(id))});

  // Garis proses terisi saat terlihat
  var steps=document.getElementById('steps');
  new IntersectionObserver(function(es,o){if(es[0].isIntersecting){steps.classList.add('go');o.disconnect()}},{threshold:.3}).observe(steps);

  // Form pesan -> WhatsApp
  var NOMOR='6282338876512', f=document.getElementById('order');
  var qty=f.elements.qty;
  f.querySelectorAll('.stepper button').forEach(function(b){b.addEventListener('click',function(){
    qty.value=Math.min(99,Math.max(1,(parseInt(qty.value,10)||1)+parseInt(b.dataset.d,10)))
  })});
  var wrap=document.getElementById('alamatWrap');
  f.addEventListener('change',function(){
    var antar=f.elements.mode.value==='antar';
    wrap.hidden=!antar;f.elements.alamat.required=antar;
  });
  f.elements.alamat.required=true;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=f.elements,antar=d.mode.value==='antar';
    var msg='Halo Queen Water, saya ingin pesan air isi ulang.\n'+
      'Nama: '+d.nama.value.trim()+'\n'+
      'Jumlah: '+qty.value+' galon\n'+
      'Cara terima: '+(antar?'Diantar':'Ambil sendiri')+'\n'+
      (antar?'Alamat: '+d.alamat.value.trim()+'\n':'')+
      (d.catatan.value.trim()?'Catatan: '+d.catatan.value.trim()+'\n':'')+
      'Terima kasih.';
    window.open('https://wa.me/'+NOMOR+'?text='+encodeURIComponent(msg),'_blank','noopener');
  });

  // Efek tambahan: gelembung, tilt, muncul saat scroll
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bub=document.querySelector('.bubbles');
  if(bub&&!reduce){for(var i=0;i<16;i++){var b=document.createElement('b'),z=8+Math.random()*28;
    b.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;--dx:'+(Math.random()*80-40)+'px;animation-duration:'+(9+Math.random()*12)+'s;animation-delay:-'+Math.random()*15+'s';
    bub.appendChild(b)}}
  var art=document.querySelector('.hero-art'),arch=document.querySelector('.arch');
  if(art&&!reduce&&matchMedia('(hover:hover)').matches){
    art.addEventListener('pointermove',function(e){var r=art.getBoundingClientRect();
      arch.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');
      arch.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*10+'deg')});
    art.addEventListener('pointerleave',function(){arch.style.setProperty('--ry','0deg');arch.style.setProperty('--rx','0deg')});
  }
  root.classList.add('js');
  var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');rio.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('h2,.lead,.vals li,.card,.steps li,.panel,.order,.map').forEach(function(el,i){
    el.classList.add('rv');el.style.transitionDelay=(i%4)*80+'ms';rio.observe(el)});
})();

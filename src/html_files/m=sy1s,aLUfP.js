try{
var s_lBb=function(a){this.Wj=a};

}catch(e){_DumpException(e)}
try{
s_a("aLUfP");

var s_Ym=function(a){s_G.call(this,a.Ka);var b=this;this.window=a.service.window.get();this.wa=this.Wj();this.oa=window.orientation;this.ka=function(){var c=b.Wj(),d=b.N$a()&&90===Math.abs(window.orientation)&&b.oa===-1*window.orientation;b.oa=window.orientation;if(c!==b.wa||d){b.wa=c;d=s_e(b.Wd);for(var e=d.next();!e.done;e=d.next()){e=e.value;var f=new s_lBb(c);try{e(f)}catch(g){s_ca(g)}}}};this.Wd=new Set;this.window.addEventListener("resize",this.ka);this.N$a()&&this.window.addEventListener("orientationchange",
this.ka)};s_q(s_Ym,s_G);s_Ym.nb=s_G.nb;s_Ym.Ea=function(){return{service:{window:s_kj}}};s_Ym.prototype.addListener=function(a){this.Wd.add(a)};s_Ym.prototype.removeListener=function(a){this.Wd.delete(a)};
s_Ym.prototype.Wj=function(){if(s_mBb()){var a=s_bh(this.window);a=new s_Vg(a.width,Math.round(a.width*this.window.innerHeight/this.window.innerWidth))}else a=this.Zb()||(s_ma()?s_mBb():this.window.visualViewport)?s_bh(this.window):new s_Vg(this.window.innerWidth,this.window.innerHeight);return a.height<a.width};s_Ym.prototype.destroy=function(){this.window.removeEventListener("resize",this.ka);this.window.removeEventListener("orientationchange",this.ka)};
var s_mBb=function(){return s_ma()&&s_8e.DB()&&!navigator.userAgent.includes("GSA")};s_Ym.prototype.Zb=function(){return s_nBb};s_Ym.prototype.N$a=function(){return"orientation"in window};var s_nBb=!1;s_lj(s_cLa,s_Ym);

s_nBb=!0;

s_b();

}catch(e){_DumpException(e)}
// Google Inc.

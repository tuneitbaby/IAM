﻿/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function n(a,c,h,e,q,n,u,w){var x=a.config,r=new CKEDITOR.style(u),g=q.split(";");q=[];for(var m={},d=0;d<g.length;d++){var l=g[d];if(l){var l=l.split("/"),v={},p=g[d]=l[0];v[h]=q[d]=l[1]||p;m[p]=new CKEDITOR.style(u,v);m[p]._.definition.name=p}else g.splice(d--,1)}a.ui.addRichCombo(c,{label:e.label,title:e.panelTitle,toolbar:"styles,"+w,allowedContent:r,requiredContent:r,contentTransformations:[[{element:"font",check:"span",left:function(b){return!!b.attributes.size||!!b.attributes.align||
!!b.attributes.face},right:function(b){var a=" x-small small medium large x-large xx-large 48px".split(" ");b.name="span";b.attributes.size&&(b.styles["font-size"]=a[b.attributes.size],delete b.attributes.size);b.attributes.align&&(b.styles["text-align"]=b.attributes.align,delete b.attributes.align);b.attributes.face&&(b.styles["font-family"]=b.attributes.face,delete b.attributes.face)}}]],panel:{css:[CKEDITOR.skin.getPath("editor")].concat(x.contentsCss),multiSelect:!1,attributes:{"aria-label":e.panelTitle}},
init:function(){this.startGroup(e.panelTitle);for(var b=0;b<g.length;b++){var a=g[b];this.add(a,m[a].buildPreview(),a)}},onClick:function(b){a.focus();a.fire("saveSnapshot");var c=this.getValue(),h=m[b];if(c&&b!=c){var e=m[c],f=a.getSelection().getRanges()[0];if(f.collapsed){var g=a.elementPath(),k=g.contains(function(a){return e.checkElementRemovable(a)});if(k){var d=f.checkBoundaryOfElement(k,CKEDITOR.START),l=f.checkBoundaryOfElement(k,CKEDITOR.END);if(d&&l){for(d=f.createBookmark();g=k.getFirst();)g.insertBefore(k);
k.remove();f.moveToBookmark(d)}else d||l?f.moveToPosition(k,d?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_END):(f.splitElement(k),f.moveToPosition(k,CKEDITOR.POSITION_AFTER_END)),t(f,g.elements.slice(),k);a.getSelection().selectRanges([f])}}else a.removeStyle(e)}a[c==b?"removeStyle":"applyStyle"](h);a.fire("saveSnapshot")},onRender:function(){a.on("selectionChange",function(b){var c=this.getValue();b=b.data.path.elements;for(var d=0,e;d<b.length;d++){e=b[d];for(var f in m)if(m[f].checkElementMatch(e,
!0,a)){f!=c&&this.setValue(f);return}}this.setValue("",n)},this)},refresh:function(){a.activeFiUniversityr.check(r)||this.setState(CKEDITOR.TRISTATE_DISABLED)}})}function t(a,c,h){var e=c.pop();if(e){if(h)return t(a,c,e.equals(h)?null:h);h=e.clone();a.insertNode(h);a.moveToPosition(h,CKEDITOR.POSITION_AFTER_START);t(a,c)}}CKEDITOR.plugins.add("font",{requires:"richcombo",lang:"af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
init:function(a){var c=a.config;n(a,"Font","family",a.lang.font,c.font_names,c.font_defaultLabel,c.font_style,30);n(a,"FontSize","size",a.lang.font.fontSize,c.fontSize_sizes,c.fontSize_defaultLabel,c.fontSize_style,40)}})})();CKEDITOR.config.font_names="Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";
CKEDITOR.config.font_defaultLabel="";CKEDITOR.config.font_style={element:"span",styles:{"font-family":"#(family)"},overrides:[{element:"font",attributes:{face:null}}]};CKEDITOR.config.fontSize_sizes="8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";CKEDITOR.config.fontSize_defaultLabel="";CKEDITOR.config.fontSize_style={element:"span",styles:{"font-size":"#(size)"},overrides:[{element:"font",attributes:{size:null}}]};
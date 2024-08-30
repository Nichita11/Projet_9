function wrap(el,wrapper){if(el&&el.parentNode){el.parentNode.insertBefore(wrapper,el);wrapper.appendChild(el)}}
function fadeIn(el,time){el.style.display="block";el.style.opacity=0;var last=+new Date();var tick=function(){el.style.opacity=+el.style.opacity+(new Date()-last)/time;last=+new Date();if(+el.style.opacity<1){(window.requestAnimationFrame&&requestAnimationFrame(tick))||setTimeout(tick,16)}};tick()}
const mauGalleryV2=(htmlEl,options)=>{const optionsDefaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0,};const tagsCollection=[];const org_html=htmlEl.innerHTML;const new_html="<div class='gallery-items-row row'>"+org_html+"</div>";htmlEl.innerHTML=new_html;const html=`<div class="modal fade" id="${
    options.lightboxId ? options.lightboxId : "galleryLightbox"
  }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              options.navigation || optionsDefaults.navigation
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" ></span>'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              options.navigation || optionsDefaults.navigation
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" ></span>'
                            }
                        </div>
                    </div>
                </div>
            </div>`;const template=document.createElement("template");template.innerHTML=html;htmlEl.append(template.content.firstChild);Array.from(document.getElementsByClassName("gallery-item")).map((el)=>{if(el.tagName==="IMG"){el.classList.add("img-fluid")}
if(options.columns.constructor===Number){const template=document.createElement("template");template.innerHTML=`<div class='item-column mb-4 col-${Math.ceil(
        12 / options.columns
      )}'></div>`;wrap(el,template.content.firstChild)}else if(options.columns.constructor===Object){let columnClasses="";if(options.columns.xs){columnClasses+=` col-${Math.ceil(12 / options.columns.xs)}`}
if(options.columns.sm){columnClasses+=` col-sm-${Math.ceil(12 / options.columns.sm)}`}
if(options.columns.md){columnClasses+=` col-md-${Math.ceil(12 / options.columns.md)}`}
if(options.columns.lg){columnClasses+=` col-lg-${Math.ceil(12 / options.columns.lg)}`}
if(options.columns.xl){columnClasses+=` col-xl-${Math.ceil(12 / options.columns.xl)}`}
const template=document.createElement("template");template.innerHTML=`<div class='item-column mb-4${columnClasses}'></div>`;wrap(el,template.content.firstChild)}else{console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`)}
let theTag=el.dataset.galleryTag;if(options.showTags&&theTag!==undefined&&tagsCollection.indexOf(theTag)===-1){tagsCollection.push(theTag)}});let tagItems='<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';tagsCollection.map((tag)=>{tagItems+=`<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${tag}">${tag}</span></li>`});const tagsRow=`<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;if(options.tagsPosition==="bottom"){const template=document.createElement("template");template.innerHTML=tagsRow;document.getElementsByClassName("gallery")[0].append(template.content.firstChild)}else if(options.tagsPosition==="top"){const template=document.createElement("template");template.innerHTML=tagsRow;document.getElementsByClassName("gallery")[0].prepend(template.content.firstChild)}else{console.error(`Unknown tags position: ${options.tagsPosition}`)}
fadeIn(htmlEl,500);const template2=document.createElement("template");template2.innerHTML='<div class="modal-backdrop fade show" style="display:none"></div>';document.body.append(template2.content.firstChild);const htmlModal=document.querySelector("#"+options.lightboxId);const htmlModalBackdrop=document.getElementsByClassName("modal-backdrop")[0];Array.from(document.getElementsByClassName("gallery-item")).map((el)=>{el.addEventListener("click",()=>{if(el.tagName==="IMG"){const modalImg=document.getElementsByClassName("lightboxImage")[0];modalImg.src=el.src;htmlModal.classList.add("show");htmlModal.style.display="block";htmlModal.ariaModal=!0;htmlModal.ariaHidden=undefined;htmlModalBackdrop.style.display="block"}})});const htmlModalContent=document.getElementsByClassName("modal-content")[0];htmlModalContent.addEventListener("click",(e)=>{e.stopPropagation()});htmlModal.addEventListener("click",(e)=>{htmlModalBackdrop.style.display="none";htmlModal.classList.remove("show");htmlModal.style.display="none";htmlModal.ariaModal=undefined;htmlModal.ariaHidden=!0});Array.from(document.getElementsByClassName("nav-link")).map((el)=>{el.addEventListener("click",()=>{if(!el.classList.contains("active")){const removeActive=document.getElementsByClassName("active-tag")[0];removeActive.classList.remove("active","active-tag");removeActive.parentElement.classList.add("active");el.classList.add("active","active-tag");el.parentElement.classList.remove("active");const tag=el.dataset.imagesToggle;Array.from(document.getElementsByClassName("gallery-item")).map((img)=>{img.parentElement.style.display="none";if(tag==="all"){fadeIn(img.parentElement,300)}else if(tag===img.dataset.galleryTag){fadeIn(img.parentElement,300)}})}})});document.getElementsByClassName("mg-prev")[0].addEventListener("click",()=>{const tag=document.getElementsByClassName("active-tag")[0].dataset.imagesToggle;const imgs=Array.from(document.querySelectorAll("[data-gallery-tag]")).filter((el)=>{if(tag==="all"){return!0}else if(el.dataset.galleryTag===tag){return!0}
return!1});let index;const currentImg=document.getElementsByClassName("lightboxImage")[0];imgs.find((el,key)=>{if(el.src===currentImg.src){index=key;return!0}
return!1});currentImg.src=imgs.at(index-1).src;console.log(imgs.at(index-1))});document.getElementsByClassName("mg-next")[0].addEventListener("click",()=>{const tag=document.getElementsByClassName("active-tag")[0].dataset.imagesToggle;const imgs=Array.from(document.querySelectorAll("[data-gallery-tag]")).filter((el)=>{if(tag==="all"){return!0}else if(el.dataset.galleryTag===tag){return!0}
return!1});let index;const currentImg=document.getElementsByClassName("lightboxImage")[0];imgs.find((el,key)=>{if(el.src===currentImg.src){index=key;return!0}
return!1});currentImg.src=imgs.length===index+1?imgs.at(index+1-imgs.length).src:imgs.at(index+1).src});return}
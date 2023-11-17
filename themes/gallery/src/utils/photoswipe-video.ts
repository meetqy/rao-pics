"use client";

import type PhotoSwipeLightbox from "photoswipe/dist/types/lightbox/lightbox";
import type Content from "photoswipe/dist/types/slide/content";

interface VideoContent extends Content {
  videoElement: HTMLVideoElement;
}

const initLightboxVideoPlugin = (lightbox: PhotoSwipeLightbox) => {
  lightbox.on("contentLoad", (e) => {
    const content = e.content as VideoContent;
    if (content.type.includes("video")) {
      // stop default content load
      e.preventDefault();

      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "auto";
      video.loop = true;
      video.setAttribute("poster", content.data.msrc ?? "");
      video.src = content.data.src!;

      content.videoElement = video;
      content.element = document.createElement("div");
      content.element.appendChild(video);
    }
  });

  lightbox.on("contentActivate", (e) => {
    const content = e.content as VideoContent;
    if (content.videoElement) {
      void content.videoElement.play();
    }
  });

  lightbox.on("contentDeactivate", (e) => {
    const content = e.content as VideoContent;
    if (content.videoElement) {
      content.videoElement.pause();
    }
  });
};

export default initLightboxVideoPlugin;

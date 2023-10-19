type MessageProps = {
  text: string;
  duration: number;
};

function createSVG(): SVGSVGElement {
  // 创建SVG元素
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 512 512");
  svg.style.width = "20px";
  svg.style.height = "20px";
  svg.style.color = "#00ad00";

  // 创建path元素
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(
    null,
    "d",
    "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256S119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
  );
  path.setAttributeNS(null, "fill", "currentColor");

  // 将path元素添加到SVG元素中
  svg.appendChild(path);

  return svg;
}

function removeExistingMessages(classname: string): void {
  const existingMessages = document.querySelectorAll(classname);
  existingMessages.forEach((msg) => {
    msg.parentElement?.removeChild(msg);
  });
}

export function Message({ text, duration }: MessageProps) {
  removeExistingMessages('.linear-message');
  const messageElement = document.createElement("div");
  messageElement.classList.add("linear-message");

  // 设置元素基本样式
  Object.assign(messageElement.style, {
    position: "fixed",
    top: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    // padding: "10px",
    // backgroundColor: "var(--color-font)",
    color: "var(--color-font)",
    // borderRadius: "var(--radius)",
    opacity: "0",
    transition: "opacity 1s, transform 1s",
  });

  const span = document.createElement("span");
  span.innerText = text;
  span.style.paddingLeft = "4px";

  messageElement.appendChild(createSVG());
  messageElement.appendChild(span);

  document.body.appendChild(messageElement);

  // 实现淡入和向上滑动效果
  requestAnimationFrame(() => {
    Object.assign(messageElement.style, {
      opacity: "1",
      transform: "translate(-50%, 20px)",
    });
  });

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, duration);
}

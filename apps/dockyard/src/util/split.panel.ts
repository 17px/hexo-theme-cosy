export const useSplitPanel = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // 创建两条分割线
    const dividerLeft = createDivider("dividerLeft");
    const dividerRight = createDivider("dividerRight");

    // 设置初始位置
    dividerLeft.style.left = "230px";
    dividerRight.style.right = "20px";

    // 创建遮罩层
    const leftOverlay = document.createElement("div");
    leftOverlay.id = "leftOverlay";
    updateOverlayWidth(); // 初始化遮罩层宽度

    // 添加到文档中
    document.body.appendChild(leftOverlay);
    document.body.appendChild(dividerLeft);
    document.body.appendChild(dividerRight);

    // 更新遮罩层宽度和位置
    function updateOverlayWidth() {
      const left = dividerLeft.getBoundingClientRect().right;
      const right = dividerRight.getBoundingClientRect().left;

      leftOverlay.style.position = "fixed";
      leftOverlay.style.top = "57px";
      leftOverlay.style.left = `${left}px`;
      leftOverlay.style.width = `${right - left}px`;
      leftOverlay.style.height = "100%";
      leftOverlay.style.backgroundColor = "var(--color-bg-mask)";
      leftOverlay.style.backdropFilter = "blur(10px)";
      leftOverlay.style.zIndex = "22222222";
    }

    // 创建分割线的函数
    function createDivider(id: string): HTMLDivElement {
      const divider = document.createElement("div");
      divider.id = id;
      divider.style.width = "2px";
      divider.style.height = "20px";
      divider.style.position = "fixed";
      divider.style.borderRadius = "2px";
      divider.style.transform = "translateY(-50%)";
      divider.style.top = "60%";
      divider.style.backgroundColor = "var(--color-font-3)";
      divider.style.cursor = "ew-resize";

      // 拖拽逻辑
      let isDragging = false;
      let dragStartX: number;

      divider.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();
        isDragging = true;
        dragStartX = e.clientX;
        applyDraggingStyle(divider); // 应用拖拽样式
      });

      document.addEventListener("mousemove", (e: MouseEvent) => {
        if (isDragging) {
          e.preventDefault();
          const deltaX = e.clientX - dragStartX;
          const rect = divider.getBoundingClientRect();

          divider.style.left = `${rect.left + deltaX}px`;
          updateOverlayWidth(); // 更新遮罩层的宽度和位置

          dragStartX = e.clientX;
        }
      });

      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          resetDraggingStyle(divider); // 重置为原始样式
        }
      });

      return divider;
    }

    // 应用拖拽样式的函数
    function applyDraggingStyle(element: HTMLElement) {
      element.style.backgroundColor = "var(--color-primary)"; // 拖拽时的背景颜色
      element.style.width = "2px"; // 拖拽时宽度变大
    }

    // 重置拖拽样式的函数
    function resetDraggingStyle(element: HTMLElement) {
      element.style.backgroundColor = "var(--color-font-3)"; // 原始背景颜色
      element.style.width = "2px"; // 原始宽度
    }
  });
};

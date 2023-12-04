export type DropdownOption = {
  value: string;
  label: string | number;
  icon?: string; // 可选的图标URL
};

const duration = 150;

export class Dropdown {
  private static activeDropdown: Dropdown | null = null;

  private selector: string;
  private options: DropdownOption[];
  private element: HTMLElement | null;
  private dropdownElement: HTMLElement | null = null;
  private onClickItem: ((option: DropdownOption) => void) | undefined; // 新增的回调函数
  rect: DOMRect;

  constructor(
    selector: string,
    options: DropdownOption[],
    event: {
      onClickItem: ((option: DropdownOption) => void) | undefined;
    }
  ) {
    this.selector = selector;
    this.options = options;
    this.element = document.querySelector(this.selector);
    this.onClickItem = event.onClickItem;

    this.init();
  }

  private init(): void {
    if (!this.element) {
      console.error(`Element with selector "${this.selector}" not found.`);
      return;
    }

    this.element.addEventListener("click", this.toggleDropdown.bind(this));
    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }

  private toggleDropdown(event: Event): void {
    event.stopPropagation();

    if (Dropdown.activeDropdown && Dropdown.activeDropdown !== this) {
      Dropdown.activeDropdown.removeDropdown();
    }

    if (this.dropdownElement) {
      this.removeDropdown();
    } else {
      this.createDropdown();
      Dropdown.activeDropdown = this;
    }
  }

  private fadeIn(element: HTMLElement, duration: number): void {
    let opacity = 0;
    const step = 16.7 / duration; // 60fps

    const fade = () => {
      opacity += step;
      if (opacity >= 1) {
        opacity = 1;
        element.style.opacity = String(opacity);
        return;
      }
      element.style.opacity = String(opacity);
      requestAnimationFrame(fade);
    };

    fade();
  }

  private fadeOut(
    element: HTMLElement,
    duration: number,
    callback: () => void
  ): void {
    let opacity = 1;
    const step = 16.7 / duration; // 60fps
    const fadeElement = element; // 保存一个局部引用

    const fade = () => {
      if (!fadeElement) return; // 使用局部引用进行检查

      opacity -= step;
      if (opacity <= 0) {
        opacity = 0;
        fadeElement.style.opacity = String(opacity);
        callback();
        return;
      }
      fadeElement.style.opacity = String(opacity);
      requestAnimationFrame(fade);
    };

    fade();
  }

  private createDropdown(): void {
    this.dropdownElement = document.createElement("div");
    this.dropdownElement.style.opacity = "0";

    this.options.forEach((option) => {
      const item = document.createElement("div");
      item.style.padding = "8px 12px";
      item.style.color = "var(--color-font-2)";
      item.style.borderRadius = "var(--radius-base, 4px)";
      item.style.fontSize = "13px";
      item.style.cursor = "pointer";
      item.style.display = "flex";
      item.style.alignItems = "center";

      // 如果提供了图标URL，插入图标
      if (option.icon) {
        const span = document.createElement("span");
        span.innerHTML = option.icon;
        span.style.marginRight = "8px";
        span.style.width = "16px";
        span.style.height = "16px";
        item.appendChild(span);
      }

      // item.innerHTML = String(option.label);
      const labelText = document.createTextNode(String(option.label));
      item.appendChild(labelText);

      item.addEventListener("click", () => {
        this.onClickItem?.(option);
        this.removeDropdown();
      });

      // 添加 mouseenter 事件监听
      item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = "var(--color-dropdown-hover)";
        item.style.color = "var(--color-font)";
      });

      // 添加 mouseleave 事件监听
      item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "";
        item.style.color = "var(--color-font-2)";
      });

      this.dropdownElement!.appendChild(item);
    });

    document.body.appendChild(this.dropdownElement);

    this.dropdownElement.style.position = "absolute";

    this.dropdownElement.style.padding = `6px 4px`;
    this.dropdownElement.style.borderRadius = "var(--radius-base,4px)";
    // 黑色
    this.dropdownElement.style.backdropFilter = "var(--color-frost-bg)";
    this.dropdownElement.style.background = "var(--color-dropdown-bg)";
    this.dropdownElement.style.border =
      "1px solid var(--color-dropdown-border)";
    this.dropdownElement.style.boxShadow = "var(--color-dropdown-shadow)";

    const rect = document.querySelector(this.selector)?.getBoundingClientRect();
    this.dropdownElement.style.top = `${rect.top}px`;
    this.dropdownElement.style.left = `${rect.left}px`; // 与selector的左边界对齐
    this.dropdownElement.style.minWidth = `${rect.width}px`;

    this.fadeIn(this.dropdownElement, duration); // 300ms 淡入
  }

  private removeDropdown(): void {
    if (this.dropdownElement) {
      const elementToRemove = this.dropdownElement; // 保存一个局部引用
      this.fadeOut(elementToRemove, duration, () => {
        elementToRemove.remove(); // 使用局部引用来移除元素
        if (this.dropdownElement === elementToRemove) {
          this.dropdownElement = null;
        }
      });
    }
  }

  private handleDocumentClick(): void {
    this.removeDropdown();
  }
}

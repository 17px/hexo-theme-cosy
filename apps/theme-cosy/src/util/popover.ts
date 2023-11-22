const duration = 150;

type OptionsType = {
  title?: string;
  content: string;
  styles?: { [key: string]: string | number };
  classNames?: string[];
};

export class Popover {
  private static activePopover: Popover | null = null;

  private options: OptionsType;
  private element: Element | null;
  private popoverElement: HTMLElement | null = null;

  constructor(selector: string | Element, options: OptionsType) {
    this.options = options;
    this.element =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    this.init();
  }

  private init(): void {
    if (!this.element) {
      console.error(`Element with selector "${this.element}" not found.`);
      return;
    }
    this.element.addEventListener("click", this.togglePopover.bind(this));
    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }

  private togglePopover(event: Event): void {
    console.log("togglePopover");
    event.stopPropagation();

    if (Popover.activePopover && Popover.activePopover !== this) {
      Popover.activePopover.removePopover();
    }

    if (this.popoverElement) {
      this.removePopover();
    } else {
      this.createPopover();
      Popover.activePopover = this;
    }
  }

  private fadeIn(element: HTMLElement, duration: number): void {
    let opacity = 0;
    1;
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
    const fadeElement = element;

    const fade = () => {
      if (!fadeElement) return;

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

  private createPopover(): void {
    this.popoverElement = document.createElement("div");
    const { classNames = [] } = this.options;
    this.popoverElement.classList.add("popover-content", "scrollbar-obtrusive");
    classNames.forEach((className) =>
      this.popoverElement?.classList.add(className)
    );
    this.popoverElement.style.opacity = "0";
    if (this.options.title) {
      const title = document.createElement("p");
      title.textContent = this.options.title;
      title.style.margin = "0 0 8px 0";
      title.style.fontSize = "12px";
      title.style.color = "var(--color-font-2)";
      this.popoverElement.appendChild(title);
    }
    if (this.options.content) {
      const content = document.createElement("p");
      content.style.margin = "0";
      content.textContent = this.options.content;
      this.popoverElement.appendChild(content);
    }
    document.body.appendChild(this.popoverElement);

    const { styles = null } = this.options;
    if (styles)
      for (const key in styles)
        this.popoverElement.style.setProperty(key, styles[key] as string);

    this.popoverElement.style.lineHeight = "1.5";
    this.popoverElement.style.zIndex = "20231026";
    this.popoverElement.style.overflow = "auto";
    this.popoverElement.style.padding = `10px`;
    this.popoverElement.style.borderRadius = "var(--radius)";
    this.popoverElement.style.backdropFilter = "var(--dropdown-bdf)";
    this.popoverElement.style.background = "var(--dropdown-bg)";
    this.popoverElement.style.border = "var(--dropdown-border)";
    this.popoverElement.style.boxShadow = "var(--dropdown-boxShadow)";

    this.fadeIn(this.popoverElement, duration);
  }

  private removePopover(): void {
    if (this.popoverElement) {
      const elementToRemove = this.popoverElement;
      this.fadeOut(elementToRemove, duration, () => {
        elementToRemove.remove();
        if (this.popoverElement === elementToRemove) {
          this.popoverElement = null;
        }
      });
    }
  }

  private handleDocumentClick(event: Event): void {
    if (
      event.target &&
      this.popoverElement &&
      this.popoverElement.contains(event.target as Node)
    ) {
      // 如果点击的是Popover自身或其子元素，什么也不做
      return;
    }
    this.removePopover();
  }
}

import algoliasearch from "algoliasearch";

export class SearchMask {
  private client: any;
  private index: any;
  maskElement!: HTMLElement;
  searchInputElement!: HTMLInputElement;
  searchResultsDiv!: HTMLDivElement;
  parentDiv!: HTMLDivElement;
  searchWrapper!: HTMLDivElement;
  currentSelectedIndex = -1;
  resultLinks: HTMLAnchorElement[] = [];
  bottomKeycapsDiv!: HTMLElement;

  constructor({
    appId,
    SearchOnlyAPIKey,
  }: {
    appId: string;
    SearchOnlyAPIKey: string;
  }) {
    this.initAlgolia(appId, SearchOnlyAPIKey);
    this.initElements();
    this.bindEvents();
  }

  private initAlgolia(appId: string, SearchOnlyAPIKey: string) {
    this.client = algoliasearch(appId, SearchOnlyAPIKey);
    this.index = this.client.initIndex("hex-blog");
  }

  private initElements() {
    this.maskElement = this.createElement("div", {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(255 255 255 / 10%)",
      zIndex: "1000",
      display: "none",
      backdropFilter: "blur(2px) saturate(190%) contrast(50%) brightness(130%)",
      "-webkit-backdrop-filter":
        "blur(2px) saturate(190%) contrast(50%) brightness(130%)",
    });
    this.maskElement.classList.add("blur-behind", "search-mask");

    this.parentDiv = this.createElement("div", {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      top: "57px",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "8px",
      boxShadow: "var(--shadow-box)",
      width: "50%",
      maxHeight: "60%",
      border: "1px solid var(--color-border)",
      background: "var(--color-bg-2)",
    }) as HTMLDivElement;

    this.searchWrapper = this.createElement("div", {}) as HTMLDivElement;

    this.searchInputElement = this.createElement("input", {
      outline: "none",
      border: "0",
      borderBottom: "1px solid var(--color-border)",
      width: "100%",
      fontSize: "18px",
      color: "var(--color-font)",
      borderRadius: "8px 8px 0 0",
      background: "transparent",
      fontFamily: "var(--font-regular)",
      padding: "1.2rem",
      type: "text",
      placeholder: "搜索关键词",
    }) as HTMLInputElement;
    this.searchInputElement.setAttribute(
      "placeholder",
      window.i18n["text-search"]
    );

    this.searchResultsDiv = this.createElement("div", {
      flex: "1",
      overflowY: "auto",
      borderRadius: "0 0 8px 8px",
    }) as HTMLDivElement;

    this.bottomKeycapsDiv = this.createElement("div", {
      display: "flex",
      alignItems: "center",
      padding: "1rem 1.2rem",
    });

    this.bottomKeycapsDiv = this.createStyledElement("div", {
      display: "flex",
      alignItems: "center",
      padding: "1rem 1.2rem",
    });
    this.bottomKeycapsDiv.appendChild(this.createKeyElement("↵"));
    this.bottomKeycapsDiv.appendChild(
      this.createTipElement(window.i18n["text-select"])
    );
    this.bottomKeycapsDiv.appendChild(this.createKeyElement("↑"));
    this.bottomKeycapsDiv.appendChild(this.createKeyElement("↓"));
    this.bottomKeycapsDiv.appendChild(
      this.createTipElement(window.i18n["text-move"])
    );
    this.bottomKeycapsDiv.appendChild(this.createKeyElement("esc"));
    this.bottomKeycapsDiv.appendChild(
      this.createTipElement(window.i18n["text-esc"])
    );

    this.searchResultsDiv.classList.add("scrollbar-obtrusive");
    this.searchWrapper.appendChild(this.searchInputElement);
    this.parentDiv.append(
      this.searchWrapper,
      this.searchResultsDiv,
      this.bottomKeycapsDiv
    );
    this.maskElement.appendChild(this.parentDiv);
    document.body.appendChild(this.maskElement);
  }

  private createStyledElement(tag: string, styles: Record<string, string>) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(styles)) {
      element.style[key as any] = value;
    }
    return element;
  }

  private createKeyElement(text: string) {
    const kbd = this.createStyledElement("kbd", {});
    kbd.className = "key-cap";
    const span = document.createElement("span");
    span.textContent = text;
    kbd.appendChild(span);
    return kbd;
  }

  private createTipElement(text: string) {
    const em = this.createStyledElement("em", {
      fontWeight: "300",
      fontStyle: "initial",
      fontSize: "12px",
      color: "var(--color-font-2)",
      margin: "0 20px 0 6px",
    });
    em.textContent = text;
    return em;
  }

  private createArrowRightSVG(): SVGSVGElement {
    // 创建 SVG 根元素
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("width", "12px");
    svg.setAttribute("height", "12px");

    // 创建 <g> 元素
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("fill", "none");

    // 创建 <path> 元素
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M7.646 4.147a.5.5 0 0 1 .707-.001l5.484 5.465a.55.55 0 0 1 0 .779l-5.484 5.465a.5.5 0 0 1-.706-.708L12.812 10L7.647 4.854a.5.5 0 0 1-.001-.707z"
    );
    path.setAttribute("fill", "currentColor");

    // 组装 SVG
    g.appendChild(path);
    svg.appendChild(g);

    return svg;
  }

  private createElement(tag: string, styles: Record<string, string>) {
    const element = document.createElement(tag);
    Object.assign(element.style, styles);
    return element;
  }

  public show() {
    this.maskElement.style.display = "block";
    this.searchInputElement.focus();
  }

  public hide() {
    this.maskElement.style.display = "none";
  }

  private bindEvents() {
    this.maskElement.addEventListener("click", (e) => {
      if (e.target === this.maskElement) {
        this.hide();
      } else {
        // 确保输入框始终保持焦点，除非用户点击了遮罩层关闭搜索界面
        this.searchInputElement.focus();
      }
    });

    this.searchInputElement.addEventListener("input", () =>
      this.performSearch()
    );

    document.addEventListener("keydown", (e) => {
      if (this.maskElement.style.display === "block") {
        this.handleKeydown(e);
      }
      if (e.key === "Escape") this.hide();
    });
  }

  private performSearch() {
    const query = this.searchInputElement.value;
    if (!query) {
      this.searchResultsDiv.style.display = "none";
      return;
    }

    this.index.search(query).then(({ hits }: { hits: any }) => {
      this.searchResultsDiv.innerHTML = "";
      this.currentSelectedIndex = -1;
      this.resultLinks = [];
      if (hits.length === 0)
        return (this.searchResultsDiv.style.display = "none");
      hits.forEach((hit: any, index: number) => {
        const resultLink = this.createResultLink(hit, query, index);
        this.searchResultsDiv.appendChild(resultLink);
        this.resultLinks.push(resultLink);
      });

      this.searchResultsDiv.style.display = "block";
    });
  }

  private createResultLink(hit: any, query: string, index: number) {
    const resultLink = this.createElement("a", {
      margin: "10px 0 0 0",
      display: "block",
      padding: "0 10px",
      textDecoration: "none",
    }) as HTMLAnchorElement;

    resultLink.href = hit.permalink;

    const titleElement = this.createElement("div", {
      fontFamily: "var(--font-regular)",
      padding: "8px",
      borderRadius: "var(--radius)",
      transition: "all .25s ease",
    });

    const categoryTitle = this.createElement("span", {
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      color: "var(--color-font-2)",
    });

    const titleText = this.createElement("span", {
      padding: "0 0 0 5px",
      fontSize: "13px",
      letterSpacing: "1px",
      fontWeight: "300",
      color: "var(--color-font)",
    });
    titleText.textContent = hit.title;

    categoryTitle.append(
      hit.categories[0],
      this.createArrowRightSVG(),
      titleText
    );

    const contentPreview = this.createElement("div", {
      paddingTop: "6px",
      fontFamily: "var(--font-regular)",
      color: "var(--color-font-2)",
      whiteSpace: "nowrap",
      lineHeight: "1.2",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "12px",
    });
    contentPreview.innerHTML = this.highlightKeyword(
      hit.contentStrip ?? hit.contentStripTruncate,
      query
    );

    titleElement.append(categoryTitle, contentPreview);
    resultLink.append(titleElement);

    // 添加 mouseenter 和 mouseleave 事件监听器
    resultLink.addEventListener("mouseenter", () => {
      this.updateCurrentSelectedIndex(index);
    });

    resultLink.addEventListener("mouseleave", () => {
      const childDiv = resultLink.children[0] as HTMLDivElement;
      childDiv.style.backgroundColor = "transparent";
    });

    return resultLink;
  }

  private highlightKeyword(text: string, query: string) {
    const regex = new RegExp(`(.{0,20})(${query})(.{0,20})`, "i");
    const match = text.match(regex);
    return match
      ? `${match[1]}<mark style="margin:0 3px;background:transparent;color:var(--color-primary);text-decoration:underline">${match[2]}</mark>${match[3]}`
      : text;
  }

  private updateCurrentSelectedIndex(newIndex: number) {
    if (this.currentSelectedIndex !== -1) {
      const prevChildDiv = this.resultLinks[this.currentSelectedIndex]
        .children[0] as HTMLDivElement;
      prevChildDiv.style.backgroundColor = "transparent";
    }
    this.currentSelectedIndex = newIndex;
    const childDiv = this.resultLinks[this.currentSelectedIndex]
      .children[0] as HTMLDivElement;
    childDiv.style.backgroundColor = "var(--color-primary-2)";
  }

  private handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.moveSelection(-1);
        event.preventDefault();
        break;
      case "ArrowDown":
        this.moveSelection(1);
        event.preventDefault();
        break;
      case "Enter":
        if (this.currentSelectedIndex !== -1) {
          window.location.href =
            this.resultLinks[this.currentSelectedIndex].href;
        }
        break;
    }
  }

  private ensureActiveLinkVisible() {
    const activeLink = this.resultLinks[this.currentSelectedIndex];
    if (!activeLink) {
      return;
    }

    // 如果是第一个链接，直接置顶
    if (this.currentSelectedIndex === 0) {
      this.searchResultsDiv.scrollTop = 0;
      return;
    }

    const linkTop = activeLink.offsetTop;
    const linkHeight = activeLink.offsetHeight;

    const divScrollTop = this.searchResultsDiv.scrollTop;
    const divHeight = this.searchResultsDiv.offsetHeight;

    // 当resultLink在视窗上方时
    if (linkTop < divScrollTop) {
      this.searchResultsDiv.scrollTop = linkTop;
    }
    // 当resultLink在视窗下方时
    else if (linkTop + linkHeight > divScrollTop + divHeight) {
      this.searchResultsDiv.scrollTop = linkTop + linkHeight - divHeight;
    }
  }

  private moveSelection(step: number) {
    if (this.currentSelectedIndex !== -1) {
      const childDiv = this.resultLinks[this.currentSelectedIndex]
        .children[0] as HTMLDivElement;
      childDiv.style.backgroundColor = "transparent";
    }
    this.currentSelectedIndex = Math.max(
      0,
      Math.min(this.currentSelectedIndex + step, this.resultLinks.length - 1)
    );
    const childDiv = this.resultLinks[this.currentSelectedIndex]
      .children[0] as HTMLDivElement;
    childDiv.style.backgroundColor = "var(--color-primary-2)";
    this.ensureActiveLinkVisible();
  }
}

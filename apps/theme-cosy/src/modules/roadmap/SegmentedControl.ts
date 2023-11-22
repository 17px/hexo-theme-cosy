import './segmented.less'

export class SegmentedControl {
  private container: HTMLElement;
  private options: string[];
  private selectedIndex: number;
  private onSelectionChange: (selected: string, index: number) => void;

  constructor(
    containerId: string,
    options: string[],
    initialSelectedIndex: number,
    onSelectionChange: (selected: string, index: number) => void
  ) {
    this.container = document.getElementById(containerId)!;
    this.options = options;
    this.selectedIndex = initialSelectedIndex;
    this.onSelectionChange = onSelectionChange;

    this.render();
  }

  private render(): void {
    // 清空现有内容
    this.container.innerHTML = "";

    this.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.className =
        index === this.selectedIndex
          ? "segmented-control-button selected"
          : "segmented-control-button";

      button.addEventListener("click", () =>
        this.handleOptionClick(option, index)
      );

      this.container.appendChild(button);
    });
  }

  private handleOptionClick(option: string, index: number): void {
    this.selectedIndex = index;
    this.render();
    this.onSelectionChange(option, index);
  }
}

// 使用方法
const onSelectionChange = (selected: string, index: number) => {
  console.log(`Selected: ${selected}, Index: ${index}`);
};

new SegmentedControl(
  "segmented-control-container",
  ["Option 1", "Option 2", "Option 3"],
  0,
  onSelectionChange
);

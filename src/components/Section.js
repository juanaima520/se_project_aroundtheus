class Section {
  constructor({ items, renderer }, containerSelector) {
    // an array of the items that we want placed on the page when calling renderItems()
    this._items = items;
    // a function that converts the raw objects inside of the this._items array into html, and then place that html on the page
    this._renderer = renderer;
    // the element that we want to place our html items inside of
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element, placement = "prepend") {
    if (placement === "append") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}

export default Section;

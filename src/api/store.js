export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(sourceKey) {
    if (!sourceKey) {
      try {
        return JSON.parse(this._storage.getItem(this._storeKey)) || {};
      } catch (err) {
        return {};
      }
    }

    try {
      const store = JSON.parse(this._storage.getItem(this._storeKey)) || {};
      return store[sourceKey] ? store[sourceKey] : {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, key) {
    const prevStorage = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify({...prevStorage, [key]: items}),
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify({...store, [key]: value}),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}

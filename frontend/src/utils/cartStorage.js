const CART_KEY = "cart_items";

export const getLocalCartItems = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((it) => ({
        productId: it.productId,
        quantity: Number(it.quantity),
      }))
      .filter((it) => it.productId && Number.isFinite(it.quantity) && it.quantity > 0);
  } catch {
    return [];
  }
};

export const setLocalCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items || []));
};

export const clearLocalCartItems = () => {
  localStorage.removeItem(CART_KEY);
};

export const addLocalCartItemDelta = (productId, deltaQuantity) => {
  const qtyDelta = Number(deltaQuantity);
  if (!productId || !Number.isFinite(qtyDelta) || qtyDelta <= 0) return;

  const items = getLocalCartItems();
  const idx = items.findIndex((x) => x.productId === productId);
  if (idx === -1) {
    items.push({ productId, quantity: qtyDelta });
  } else {
    items[idx].quantity += qtyDelta;
  }
  setLocalCartItems(items);
};

export const setLocalCartItemQuantity = (productId, quantity) => {
  const qty = Number(quantity);
  const items = getLocalCartItems();

  if (!productId) return;

  if (!Number.isFinite(qty) || qty < 0) return;

  const idx = items.findIndex((x) => x.productId === productId);
  if (qty === 0) {
    if (idx !== -1) {
      items.splice(idx, 1);
      setLocalCartItems(items);
    }
    return;
  }

  if (idx === -1) {
    items.push({ productId, quantity: qty });
  } else {
    items[idx].quantity = qty;
  }
  setLocalCartItems(items);
};

export const removeLocalCartItem = (productId) => {
  if (!productId) return;
  const items = getLocalCartItems().filter((x) => x.productId !== productId);
  setLocalCartItems(items);
};


import { addCartItem } from "../services/cart";
import {
  addLocalCartItemDelta,
  clearLocalCartItems,
  getLocalCartItems,
} from "./cartStorage";

/**
 * Add a product to cart.
 * - If token exists: sync local cart -> server cart, then add this product to server cart.
 * - Otherwise: add to localStorage cart.
 */
export async function addToCart({ productId, quantity = 1, token }) {
  const qtyNum = Number(quantity);
  if (!productId || !Number.isFinite(qtyNum) || qtyNum < 1) {
    throw new Error("Invalid productId or quantity");
  }

  if (token) {
    const localItems = getLocalCartItems();
    if (localItems.length > 0) {
      // Sync local cart to server once user logs in
      for (const it of localItems) {
        await addCartItem({
          productId: it.productId,
          quantity: it.quantity,
        });
      }
      clearLocalCartItems();
    }

    await addCartItem({ productId, quantity: qtyNum });
    return { source: "server" };
  }

  addLocalCartItemDelta(productId, qtyNum);
  return { source: "local" };
}


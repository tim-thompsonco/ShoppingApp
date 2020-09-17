export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (productId: string) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const bodyToStore = (body) => {
  if (!body.category) {
    throw new Error("Category is required");
  }

  return {
    store_name: body.store_name || "",
    address: body.address || "",
    phone_number: body.phone_number || "",
    rating: body.rating || 0,
    category: body.category,
  };
};

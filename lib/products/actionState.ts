export type ProductActionState = {
  success: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialProductState: ProductActionState = {
  success: false,
  message: "",
  fieldErrors: {},
};
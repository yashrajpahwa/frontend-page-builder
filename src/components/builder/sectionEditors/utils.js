/**
 * Utility function to stop click event propagation on form elements
 * to prevent the collapsing behavior when interacting with inputs
 */
export const stopPropagation = (e) => {
  e.stopPropagation();
};

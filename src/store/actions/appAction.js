

export const appExtraFunctions = (type, values) => async (dispatch) => {
    switch (type) {
case "showLandingLoader":
    return dispatch({
      type: "SHOW_LADING_LOADER",
      payload: values,
    });
  default:
    break;
}
};
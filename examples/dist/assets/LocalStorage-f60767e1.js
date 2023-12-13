function loadStorage(testName) {
  if (typeof window.localStorage === "undefined") {
    return null;
  }
  try {
    const serializedState = localStorage.getItem(`${testName}-state`);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
}
function saveStorage(testName, state) {
  if (typeof window.localStorage === "undefined") {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${testName}-state`, serializedState);
  } catch (err) {
  }
}
function clearStorage(testName) {
  if (typeof window.localStorage === "undefined") {
    return;
  }
  try {
    localStorage.removeItem(`${testName}-state`);
  } catch (err) {
  }
}
export {
  clearStorage as c,
  loadStorage as l,
  saveStorage as s
};
//# sourceMappingURL=LocalStorage-f60767e1.js.map

const _bus = [];  // _bus[0] stores handler to toggle sidebar

export function registerToggleSideBarHandler(func) {
  _bus[0] = func
}

export function toggleSideBar(func) {
  if (_bus[0]) {
    _bus[0]()
  } else {
    console.log('No toggleSideBar handler found!');
  }
}

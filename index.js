"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Portal;
exports.globalStore = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const globalStore = () => {
  let keys = {};
  let watchers = {};
  return {
    get: key => keys[key],
    set: (key, value) => {
      const oldValue = keys[key];
      keys[key] = value;
      (watchers[key] || []).forEach(fn => fn(value, oldValue));
      return oldValue;
    },
    watch: (key, watcher) => {
      if (!watchers[key]) watchers[key] = [];
      watchers[key] = [...watchers[key], watcher];
    },
    unwatch: (key, watcher) => {
      watchers[key] = [...watchers[key]].filter(_w => _w !== watcher);
    }
  };
};

exports.globalStore = globalStore;
const globalState = globalStore();
globalState.set('_id', 1);

function Portal(props) {
  const [id, _] = _react.default.useState(globalState.set('_id', globalState.get('_id') + 1));

  const [counter, setCounter] = _react.default.useState(0);

  _react.default.useEffect(() => {
    if (props.type === 'container') {
      const fn = () => setCounter(counter + 1);

      globalState.watch(props.id, fn);
      return () => globalState.unwatch(props.id, fn);
    }
  }, [props.type, counter]);

  _react.default.useEffect(() => {
    const curChildren = globalState.get(props.id) || [];
    const curIndex = curChildren.findIndex(row => row.id === id);
    const row = {
      id,
      children: props.children
    };
    globalState.set(props.id, curIndex === -1 ? [...curChildren, row] : [...curChildren.slice(0, curIndex), row, ...curChildren.slice(curIndex + 1)]);
    return () => {
      globalState.set(props.id, (globalState.get(props.id) || []).filter(row => row.id !== id));
    };
  }, [props.children]);

  if (props.type === 'item') {
    return null;
  } else if (props.type === 'container') {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (globalState.get(props.id) || []).map(row => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: row.id
    }, _react.default.Children.map(row.children, child => /*#__PURE__*/_react.default.isValidElement(child) ? /*#__PURE__*/_react.default.cloneElement(child, { ...props,
      ...child.props
    }) : child))));
  } else {
    throw new Error('Portal must be either a container or item');
  }
}
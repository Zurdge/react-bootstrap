"use strict";

exports.__esModule = true;
exports.ThemeConsumer = void 0;
exports.createBootstrapComponent = createBootstrapComponent;
exports.default = void 0;
exports.useBootstrapPrefix = useBootstrapPrefix;
exports.useIsRTL = useIsRTL;

var React = _interopRequireWildcard(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ThemeContext = /*#__PURE__*/React.createContext({
  prefixes: {}
});
const {
  Consumer,
  Provider
} = ThemeContext;
exports.ThemeConsumer = Consumer;

function ThemeProvider({
  prefixes = {},
  dir,
  globalPrefix,
  children
}) {
  const contextValue = (0, React.useMemo)(() => ({
    prefixes: { ...prefixes
    },
    globalPrefix,
    dir
  }), [prefixes, dir]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {
    value: contextValue,
    children: children
  });
}

function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = (0, React.useContext)(ThemeContext);
  return "prefix-" + (prefix || prefixes[defaultPrefix] || defaultPrefix);
}

function useIsRTL() {
  const {
    dir
  } = (0, React.useContext)(ThemeContext);
  return dir === 'rtl';
}

function createBootstrapComponent(Component, opts) {
  console.log("creating bootstrap component..", {
    Component,
    opts
  });
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  const isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  const {
    prefix,
    forwardRefAs = isClassy ? 'ref' : 'innerRef'
  } = opts;
  const Wrapped = /*#__PURE__*/React.forwardRef(({ ...props
  }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix(props.globalPrefix + props.bsPrefix, prefix);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, { ...props,
      bsPrefix: bsPrefix
    });
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

var _default = ThemeProvider;
exports.default = _default;
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const ThemeContext = /*#__PURE__*/React.createContext({
  prefixes: {}
});
const {
  Consumer,
  Provider
} = ThemeContext;

function ThemeProvider({
  prefixes = {},
  dir,
  globalPrefix,
  children
}) {
  const contextValue = useMemo(() => ({
    prefixes: { ...prefixes
    },
    globalPrefix,
    dir
  }), [prefixes, dir]);
  return /*#__PURE__*/_jsx(Provider, {
    value: contextValue,
    children: children
  });
}

export function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = useContext(ThemeContext);
  return "prefix-" + (prefix || prefixes[defaultPrefix] || defaultPrefix);
}
export function useIsRTL() {
  const {
    dir
  } = useContext(ThemeContext);
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
    return /*#__PURE__*/_jsx(Component, { ...props,
      bsPrefix: bsPrefix
    });
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
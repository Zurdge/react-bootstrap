import * as React from 'react';
export interface ThemeContextValue {
    globalPrefix?: string;
    prefixes: Record<string, string>;
    dir?: string;
}
export interface ThemeProviderProps extends Partial<ThemeContextValue> {
    children: React.ReactNode;
}
declare const Consumer: React.Consumer<ThemeContextValue>;
declare function ThemeProvider({ prefixes, dir, globalPrefix, children }: ThemeProviderProps): JSX.Element;
declare namespace ThemeProvider {
    var propTypes: any;
}
export declare function useBootstrapPrefix(prefix: string | undefined, defaultPrefix: string): string;
export declare function useIsRTL(): boolean;
declare function createBootstrapComponent(Component: any, opts: any): React.ForwardRefExoticComponent<{
    bsPrefix?: string | undefined;
} & React.RefAttributes<any>>;
export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;

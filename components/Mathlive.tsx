// this code is from https://gist.github.com/gerryfletch/09d9995725027fcbf060d0149441c3a8

import * as React from 'react';

import { CSSProperties, useEffect, useMemo } from 'react';
import { MathfieldElement, MathfieldOptions } from 'mathlive';
import { create } from 'jss';
import camelCase from 'jss-plugin-camel-case';

// mathfield configs
MathfieldElement.fontsDirectory = '/assets/mathlive/fonts'
MathfieldElement.soundsDirectory = '/assets/mathlive/sounds'

export interface MathEditorProps {
  options?: Partial<MathfieldOptions>;

  value: string;
  onChange: (latex: string) => void;
  onPlaceholderChange?: (placeholderId: string, latex: string) => void;

  className?: string;
  containerStyle?: CSSProperties;
  placeholderStyle?: CSSProperties;
};

/**
 * @returns a styled math-editor as a non-controlled React component with placeholder support.
 */
const MathEditor = (props: MathEditorProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mfe = useMemo(() => new MathfieldElement(props.options), []);

  useEffect(() => {
    const container = containerRef.current!!;
    container.innerHTML = "";
    container.appendChild(mfe);

    mfe.className = props.className || "";

    // Listen to changes to main mathfield
    mfe.addEventListener("input", ({ target }) =>
      props.onChange((target as HTMLInputElement).value || "")
    );

    // // Listen to placeholders, firing if onPlaceholderChange present
    // mfe.addEventListener("placeholder-change", ({ detail }) => {
    //   const { placeholderId } = detail;
    //   const value = mfe.getPlaceholderField(placeholderId)?.getValue() || "";
    //   if (props.onPlaceholderChange) {
    //     props.onPlaceholderChange(placeholderId, value);
    //   }
    // });

    // // Add custom styles to placeholder mathfield elements
    // Object.values(mfe.placeholders).forEach((placeholder) =>
    //   addStyleEl(placeholder, props.placeholderStyle ?? {})
    // );
  }, []);

  useEffect(() => {
    mfe.value = props.value;
  }, [props.value]);

  return <div ref={containerRef} style={props.containerStyle} />;
};

/**
 * Mathlive uses shadow DOMs which don't inherit global styles.
 * We patch this by creating <style> tags for nested mathlive
 * elements. `jss` is used to translate React CSSProperties into
 * a stylesheet string which is inserted in a new style node.
 * @param el Mathfield element to create styles for
 * @param st CSS Properties
 */
const addStyleEl = (el: MathfieldElement, css: CSSProperties) => {
  const node = document.createElement("style");
  node.innerHTML = stylesheet("placeholder-mathfield", css);
  el.appendChild(node);
  el.classList.add("placeholder-mathfield");
};

const jss = create({ plugins: [camelCase()] });
const stylesheet = (className: string, styles?: CSSProperties): string =>
  jss
    .createStyleSheet({ [className]: styles }, { generateId: ({ key }) => key })
    .toString();

export default MathEditor;
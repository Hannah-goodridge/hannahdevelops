import type { MDXComponents } from 'mdx/types';
import { IframeWrapper, LinkableTitle, CodeHighlight } from '@components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: LinkableTitle,
    code: CodeHighlight,
    IframeWrapper,
    ...components,
  };
}
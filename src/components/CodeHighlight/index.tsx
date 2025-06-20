'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeHighlightProps {
    className?: string;
    children?: React.ReactNode;
    inline?: boolean;
}

const CodeHighlight = ({ className, children, inline, ...props }: CodeHighlightProps) => {
    if (inline) {
        return <code className={className} {...props}>{children}</code>;
    }

    const match = /language-(\w+)/.exec(className || '');
    return match ? (
        <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            {...props}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default CodeHighlight;
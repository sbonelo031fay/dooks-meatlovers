import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level React ErrorBoundary to prevent unhandled render exceptions
 * from leaving visitors with a blank white screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled application render error:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="empty-state page-container" role="alert" style={{ marginTop: '48px' }}>
          <span className="eyebrow">Something went wrong</span>
          <h1>The kitchen hit a snag.</h1>
          <p>
            Please refresh the page to continue browsing the Dooks Meatlovers menu.
          </p>
          <button
            type="button"
            className="button primary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

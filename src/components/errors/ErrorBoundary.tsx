import React from 'react';

export interface ErrorInfo {
  componentStack: string;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  error?: Error | null;
  info?: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info });
  }

  render() {
    return (
      <>
        {/* {this.state.error && <div>Une erreur est survenue</div>} */}
        {this.props.children}
      </>
    );
  }
}

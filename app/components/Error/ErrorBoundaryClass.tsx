import React, { ReactNode } from "react";
import { Component } from "react";
import { error as debugError } from "../../../app/utils/logger"
import ErrorPage from "../ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}
class ErrorBoundaryClass extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    debugError("Error Boundary caught an error", error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundaryClass;

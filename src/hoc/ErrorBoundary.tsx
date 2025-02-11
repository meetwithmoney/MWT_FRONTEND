import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: false,
    };
  }

  /**
   * This will give an error if errorInfo is true
   * @param error - The caught error
   * @param errorInfo - Error info object
   */
  componentDidCatch(error: Error): void {
    this.setState({ error, errorInfo: true });
    // You can also log the error to an error reporting service here
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { errorInfo } = this.state;

    if (errorInfo) {
      return (
        <div style={{ marginTop: "250px" }}>
          <i className="fa fa-warning fa-4x"></i>
          <h2>Oops..!</h2>
          <h2>Something Went Wrong :(</h2>
          <h2>Please Try Again after Sometime</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

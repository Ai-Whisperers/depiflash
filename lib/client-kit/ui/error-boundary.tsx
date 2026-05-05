"use client"
import { Component, ReactNode } from "react"
interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Algo salió mal</h2>
          <p className="text-gray-500 mb-4">{this.state.error?.message}</p>
          <button onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Recargar</button>
        </div>
      )
    }
    return this.props.children
  }
}

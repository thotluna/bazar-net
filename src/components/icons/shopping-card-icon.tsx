export const ShoppingCardIcon = ({ color = 'currentcolor' }: { color?: string }) => {
  return (
    <svg width="24" height="24" fill="none" aria-label="Go shopping car">
      <path
        d="M23.79 4.763a.889.889 0 0 0-.681-.319H5.186L4.643 1.46A1.778 1.778 0 0 0 2.894 0H.89a.889.889 0 1 0 0 1.778h2l2.84 15.586c.083.462.287.894.591 1.252a3.11 3.11 0 1 0 4.933.937H16.3a3.11 3.11 0 1 0 2.81-1.778H8.351a.889.889 0 0 1-.874-.73l-.352-1.936h12.887a2.666 2.666 0 0 0 2.623-2.19l1.351-7.427a.888.888 0 0 0-.195-.73zM9.778 20.887a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0zm10.665 0a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0zm.445-8.285a.888.888 0 0 1-.878.73H6.8L5.51 6.222h16.534l-1.156 6.38z"
        fill={color}
      />
    </svg>
  )
}

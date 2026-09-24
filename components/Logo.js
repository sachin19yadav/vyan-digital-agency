export default function Logo({
  size = "normal",
  showText = true,
  className = "",
  src = null,
  alt = "Vyan Digital Agency",
}) {
  const iconSize = size === "small" ? 30 : size === "large" ? 44 : 36;

  // Support for custom image file (e.g. /logo.png, /logo.svg)
  if (src) {
    return (
      <div className={`brand-logo ${className}`}>
        <img
          src={src}
          alt={alt}
          width={iconSize}
          height={iconSize}
          className="brand-logo-img"
          style={{ height: iconSize, width: "auto", display: "block" }}
        />
        {showText && (
          <span className="brand-logo-text">
            <span className="brand-name">
              Vyan <span className="brand-accent">Digital</span>
            </span>
            <span className="brand-sub">AGENCY</span>
          </span>
        )}
      </div>
    );
  }

  // High-performance default SVG vector mark
  return (
    <div className={`brand-logo ${className}`}>
      {/* Vector Logo Icon Mark */}
      <svg
        viewBox="0 0 40 40"
        width={iconSize}
        height={iconSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-icon"
      >
        <defs>
          <linearGradient id="vyan-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D2338" />
            <stop offset="100%" stopColor="#121624" />
          </linearGradient>
          <linearGradient id="vyan-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D076" />
            <stop offset="100%" stopColor="#D9A441" />
          </linearGradient>
        </defs>
        <rect
          width="40"
          height="40"
          rx="10"
          fill="url(#vyan-bg-grad)"
          stroke="#D9A441"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <path
          d="M10 13L20 28L24.5 21"
          stroke="url(#vyan-gold-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 13H30V21"
          stroke="url(#vyan-gold-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 24.5L30 13"
          stroke="url(#vyan-gold-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <span className="brand-logo-text">
          <span className="brand-name">
            Vyan <span className="brand-accent">Digital</span>
          </span>
          <span className="brand-sub">AGENCY</span>
        </span>
      )}
    </div>
  );
}

export interface MetaTags {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  type: string;
  twitterCard: "summary" | "summary_large_image" | "player" | "app";
}

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export interface PlatformPreview {
  name: string;
  icon: string;
  render: (meta: MetaTags) => React.ReactNode;
}

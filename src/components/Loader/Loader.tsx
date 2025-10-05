import "./loader.scss";

type LoaderProps = {
  variant?: "small" | "normal" | "large";
};

export const Loader = ({ variant = "normal" }: LoaderProps) => (
  <div className={`loader loader--${variant}`} />
);

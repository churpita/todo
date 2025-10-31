import { TailSpin } from "react-loader-spinner";

interface ILoadingSpinnerProps {
  color?: string;
  height: string;
  width: string;
}

export const LoadingSpinner = (
  props: ILoadingSpinnerProps,
): React.ReactElement => {
  return (
    <TailSpin
      width={props.width}
      height={props.height}
      color={props.color || "var(--theme-font-color)"}
    />
  );
};
